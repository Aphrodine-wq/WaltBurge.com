---
title: Tessera: Why I'm Writing AI Agents in Markdown
slug: tessera-markdown-native-agents
date: 2026-05-23
readTime: 11 min
tags: [AI, Tessera]
author: James Walton
excerpt: Building an AI agent shouldn't require five frameworks, three vendor SDKs, and a vector DB you babysit. It should require markdown and a compiler that takes the boundaries seriously. So I built one.
---

Most agent frameworks start from the wrong place. They hand you a Python class, a vendor SDK, a vector database to babysit, and a prompt string that nobody can verify. The agent's behavior lives in five files and a developer's head. The friction between those two places is documentation that's always stale.

Tessera starts somewhere else. You write an agent in a single markdown file — `.t.md` — and that one file is simultaneously the program, the spec, the docs, and a browsable note in your Obsidian vault. I call it the **soil thesis**: the syntax file and the developer's head should be the same file.

## Hello, agent

Here's the smallest thing Tessera can run, in full:

````markdown
---
agent: HelloAgent
capabilities_requested: []
---

```tsr:logic
fn greet(name: String) -> String = "hello " + name
```

```tsr:agent
agent HelloAgent {
  beliefs:
    @last_write target: String
  intentions:
    plan say_hello {
      let msg = greet(target)
      return msg
    }
}
```
````

That's it. Markdown all the way down. The compiler reads the frontmatter as config, the fenced `tsr:` blocks as substrate-typed code, and produces a runnable agent. Run it:

```bash
tessera compile examples/hello.t.md --run HelloAgent --set target=world
# → HelloAgent() = 'hello world'
```

## Why markdown is the right substrate

Programming languages live in two places: a syntax file, and a developer's head. The gap between them is where documentation rots. Markdown collapses the gap. A `.t.md` file is at once:

- A **valid Obsidian note** — browsable, linkable, indexable
- A **compilable program** — `tessera compile` produces an intermediate representation plus an executable
- An **audited safety boundary** — my formal verifier checks it like any source file
- An **introspectable cognitive architecture** — the modes of thinking are declared as fenced blocks

You don't need a separate IDE, a separate docs site, or a separate "agent management tool." The vault is the source of truth. Drop a `.t.md` file in any folder and `tessera vault scan` finds it.

This is the same insight that made Obsidian's plugin ecosystem work: structure emerges from links between notes, not from a top-down hierarchy. Tessera adds a second dimension — substrate fences inside notes — so the same emergence happens at the *agent* level. Your vault becomes a workshop for cognition.

## It doesn't stand alone — and that's the point

Tessera is the body. Around it live four neighbor systems, each useful on its own, each sharper in combination:

- **AEON** is the immune system — a 73-engine formal verifier that checks an agent before it runs.
- **Synapse** is the brain — a knowledge graph with synaptic weighting, so an agent's `memory:semantic` writes and my personal Zettelkasten live in the same place.
- **Obsidian / TheVault** is the soil — markdown notes where agents are written, scanned, and read.
- **Ollama / Anthropic / LangChain / PyTorch** are the external cortex and hands — LLM calls, tools, learned models, all callable from inside substrate-typed code with effect tracking and graceful degradation.

No other agent framework I've seen does formal verification *before* the agent runs. That's the combination talking, not any one piece.

## Where it is now

This post launched with nine substrates and thirty-three tests. As of `v0.1.0` it's **thirty substrates shipped and 316 tests green** — `logic`, `agent`, the full `memory:*` family, `prompt`, `tool`, `neural`, and a stack of cognitive-science substrates that used to be research code and are now first-class language features.

The most interesting additions are the ones that make an agent feel less like a script and more like a mind:

- **`tsr:rl`** — a reinforcement-learning substrate. An agent can `rl_choose()` an action and `rl_reward()` the outcome, and it keeps a persisted Q-table per agent. It learns which move works without you rewriting its plan.
- **Auto-recall (RAG built into the runtime)** — any agent with a `memory:semantic` or `memory:episodic` block gets the relevant facts and recent events pulled into *every* prompt automatically. It remembers without being told to look.
- **Auto-confidence routing** — reasoning substrates write their own confidence, and a dual-process layer reads it to route the next step fast or slow. The agent decides for itself when to think harder.

It's still early and it's still moving fast, but it's no longer pre-alpha — it runs real agents today, verified by AEON before a single line executes.

The thesis hasn't changed: writing an agent should feel like writing a note. The compiler does the rest — there's just a lot more "rest" now.
