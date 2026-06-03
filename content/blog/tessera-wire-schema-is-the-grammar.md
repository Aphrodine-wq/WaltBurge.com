---
title: "The Format Where a Model Can't Emit an Invalid Call"
slug: tessera-wire-schema-is-the-grammar
date: 2026-06-03
readTime: 10 min
tags: [AI, Tessera, Development]
author: James Walton
excerpt: Every agent framework hopes the model returns valid JSON and writes a retry loop for when it doesn't. I built the opposite — a wire format where the schema *is* the decoding grammar, so a malformed tool call isn't unlikely, it's unrepresentable.
---

When an AI agent calls a tool, it emits text and you pray it parses. That's the actual state of the art. The model returns a blob of JSON, your runtime tries to parse it, and when the blob is malformed — a trailing comma, a hallucinated field, an argument that's a stringified object inside a stringified object — you catch the exception and ask again. Every serious agent framework has a retry loop bolted onto this exact spot, because the model is a probabilistic text generator and JSON is a format it was only ever *trained to imitate*, never *required to honor*.

I got tired of the retry loop. So I built [Tessera](/blog/tessera-markdown-native-agents) a wire format of its own — a token-dense, deterministic, agent-native way for an agent to speak at runtime — and made one design choice that the rest of the project hangs off of: **the schema you write isn't documentation that hopes the model complies. It's the grammar the model decodes through.** A malformed call isn't rare. It's unrepresentable.

> Token density is table stakes — other formats have it. A format where the model *literally cannot emit an invalid call* is the part nobody ships. That's the moat.

## The thing JSON tool-calling makes you pay for

Look at what a single tool call costs you in the standard OpenAI-style format. There's a role-object wrapper. There's `"type": "function"` boilerplate. The arguments arrive as a JSON string *inside* the JSON — so you parse once to get the envelope, then parse the `arguments` field again to get the actual values. Every scalar is quoted whether it needs to be or not. You are paying tokens, latency, and parse-failure surface for structure the model and the runtime both already agree on.

Here's the same turn in the wire form Tessera speaks:

```
>assistant I'll look up the weather for you.
!get_weather #c1 location:"Oxford, MS" units:f
=get_weather #c1 ok temp:72 condition:"partly cloudy" humidity:0.61
```

Three lines. `>` is an assistant message, `!` is a call, `=` is a result. `#c1` is the call id that ties the result back to the request. No role wrappers, no `type:"function"`, no stringified-JSON-in-JSON, bare scalars wherever they're unambiguous. It reads like something a person could write and a machine can't misread — which is exactly the property you want on a wire that an LLM is generating token by token.

But terseness alone isn't the point. [TOON and a handful of other formats](/blog/build-your-own-model) already get you token density. Density is table stakes. The interesting question is the one nobody answers well: how do you *guarantee* the model produces a valid call, instead of producing something plausible-looking and validating it after the fact?

## Schema = decoding grammar

Here's the move. You write one schema:

```python
from tessera_wire import compile_schema

c = compile_schema("""
@schema get_weather
  location: str !
  units:    enum(f c) = f
  detail:   int 0..3 = 0
""")
```

And it compiles to two artifacts that **cannot drift apart**, because they came from the same source:

- `c.gbnf` — a **GBNF grammar** you hand to a llama.cpp-class backend. This is the load-bearing piece. A grammar isn't a validator that runs after generation; it constrains generation *itself*, at the token level. At every step, the backend masks the model's output distribution down to only the tokens the grammar permits next. The model isn't asked to produce valid output and graded on whether it did — it's structurally incapable of producing anything else.
- `c.json_schema` — a **JSON Schema** for the Tier-B fallback (Ollama, OpenAI), for backends that constrain to JSON but won't take a raw grammar.
- `c.grammar_hash` — a stable hash of the schema, so you can cache compiled grammars by identity.

The same object validates incoming records too:

```python
c.validate('!get_weather #c1 location:"Oxford, MS" units:f detail:2')  # -> Record
```

One schema, one source of truth, fanning out to: the grammar that constrains the model, the JSON-schema fallback for backends that can't take the grammar, and the validator that checks anything that slipped through a weaker tier. They can't disagree about what a valid `get_weather` call looks like, because there's nowhere for them to disagree — there's one definition and three projections of it.

## Why this is hard, and where I drew the honest line

I want to be straight about the limits, because the easy version of this pitch overclaims and I'd rather you trust the next thing I tell you.

GBNF is a **context-free grammar**. Context-free means no arithmetic — the grammar can describe shapes, not compute bounds. That cuts a real line through what the grammar can enforce versus what the validator has to:

- **Enums, required-vs-optional, and small integer ranges** → enforced *exactly* by the grammar. `units` can only ever decode to `f` or `c`. There is no token path to a third value.
- **Large or open integer ranges, and all float ranges** → the grammar guarantees the *shape* (it's a number, in the right slot), and the **validator** enforces the actual bound. You can't express "0.0 to 1.0" in a context-free grammar without it exploding, so I don't pretend to. The grammar gets you a float; the validator gets you a float in range.
- **Field order** → fields decode in **declaration order**. Allowing free permutation of fields turns the grammar super-factorial — it blows up combinatorially — so I made ordered emission a documented design choice, not an accident.

That's the real shape of it. The headline — *malformed calls go to zero* — is true, and it's proven against a **local GGUF model** with a benchmark in the repo (`bench/grammar_yield.py`), not asserted in a README. It is *not* magically true everywhere: true token-level grammar enforcement needs a backend that exposes it — `llama-cpp-python`, `llama-server`, or vLLM's guided-grammar mode. Ollama gives you JSON-schema-constrained output, which is the weaker Tier-B. Cloud-routed models that reject constraints entirely fall to Tier-C: generate, validate, and repair after the fact. Three tiers, degrading gracefully, and I tell you which one you're on instead of selling the best case as the default case. That's the same discipline behind [owning the model in the first place](/blog/build-your-own-model) — the guarantees only mean something if you control the stack they run on.

## The wire and the language are different things

This is worth pulling apart, because I conflated them in my own head for a while. Tessera-the-language is how you *define* an agent — the [`.t.md` files](/blog/tessera-markdown-native-agents), the substrates, the beliefs and plans and the [formal verification that runs before the agent does](/blog/tessera-verify-before-run). The wire is how a running agent *talks* — the calls it emits, the results it gets back, the deltas and queries that flow over the connection while it's actually working.

A programming language and its serialization protocol are different layers, and pretending they're one thing is how you end up with a format that's good at neither. So I split them. The wire is its own repo with its own spec, modeled on a separate interchange-format design I'd been sketching, and Tessera-the-language is its **first consumer** — the agents you write in markdown will speak this wire at runtime. But the wire doesn't need Tessera to be useful. Any agent that calls tools has the exact problem this solves.

The name's still open — I've been turning over TSON, TILE, and GROUT. There's a reason I like the family: *tessera* is Latin for a small tile in a mosaic, and also for a **token** — a tally, a pass, a marker you hand over to prove a claim. The etymology already means the thing the format does. A tessera was a token two thousand years before it was a data structure.

## Why I keep building at this layer

I could have written another retry loop. Everybody else does, and it mostly works — you eat a few percent malformed calls, you pay for the re-rolls, you move on. But "mostly works" compounds badly when agents start calling agents and a malformed call three levels deep poisons everything above it. The failure you tolerate at one agent becomes the failure you can't debug at fifty.

So I went after the layer underneath: not a better parser for when the model gets it wrong, but a generation path where getting it wrong isn't on the menu. That's the same instinct that runs through everything in this portfolio — [own the model](/blog/build-your-own-model), [own the memory](/blog/give-your-ai-a-memory), own the verification, and now own the wire the whole thing speaks. The pieces are sharper alone and sharper still together. This is the one I shipped today, and it's the one I think matters most.
