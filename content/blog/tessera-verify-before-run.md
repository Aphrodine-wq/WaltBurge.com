---
title: Verifying AI Agents Before They Ever Run
slug: tessera-verify-before-run
date: 2026-05-19
readTime: 10 min
tags: [AI, Tessera, Systems]
category: AI
author: James Walton
excerpt: Every other agent framework runs the agent and watches what happens. Tessera lowers the agent to an intermediate representation, runs it through 16 local verification passes before a token is spent, then enforces runtime contracts while it runs — catching capability leaks and PII exposure before they hit production.
---

The standard way to find out whether an agent is safe is to run it and watch. You deploy it, you log what it does, and you hope your monitoring catches the bad behavior before a customer does. That's testing, not verification. For anything touching auth, payments, or PII, "run it and watch" is how you ship a breach.

Tessera takes the opposite stance: **verify the agent before it ever runs.** This is possible because the agent isn't an opaque prompt — it's a typed program that lowers to a formal intermediate representation. And I already had the verifier.

## SIR — the intermediate representation

When Tessera compiles a `.t.md` file, it lowers each substrate block into SIR (Substrate IR) — a textual, node-based representation of what the agent does: which functions it calls, which capabilities each region needs, where external input enters, where data egresses. SIR is the thing you can reason about formally.

## Static verification — 16 passes against the IR

Tessera ships its own local verifier (`tessera/verify/passes.py`) — sixteen passes that run entirely offline against SIR, no external service involved. They check things like substrate adjacency (a node feeding another substrate with no adapter between them), capability scope (an effect requiring a capability its region was never granted), governance consistency, and one I'm particularly glad exists: a pass that refuses to compile if an agent's own prose asserts something like "is conscious" or "has subjective experience" (`E1100` — the discipline is spelled out in `PHILOSOPHY.md`).

`tessera doctor` is the one-stop way to see the result:

```bash
tessera doctor examples/contracts.t.md
# health:     OK
# verify:     0 error(s), 0 warning(s)
# eval:       1/1 cases passed
# substrates: agent, contract, eval, intent, prompt
```

Diagnostics map back to specific error codes:

- **E001** — substrate adjacency violation (missing adapter between two substrates)
- **E102** — capability used but not in scope
- **E1100** — a metaphysical claim the module isn't allowed to make

That structural checking happens entirely at compile time, before any LLM call. But it can't see what the model actually *says* at runtime — that's a different problem, and Tessera solves it a different way now.

## Runtime contracts — the part static analysis can't see

Static passes catch shape mistakes; they can't tell you whether a homeowner's message carried a Social Security number or whether an answer drifted off-intent, because that only exists once the agent is running. That's what `tsr:contract` is for: an author-declared before/after guarantee bound to a named effect, checked the instant that effect fires.

```tsr:contract
contract honest_explanation on prompt:explain {
  before: not contains_pii(value())
  after: intent_match() >= 0.2
  on_violation: retry(2) then refuse
}
```

Read `before: not contains_pii(value())` as "this must hold to proceed" — a contract is the inverse of a `tsr:policy`: a policy's `forbid when <expr>` refuses when true, a contract's clause refuses when it evaluates *false*. A clean quote runs normally; one carrying an SSN never reaches the model at all:

```bash
$ tessera compile examples/contracts.t.md --run QuoteExplainer \
    --set quote="bill SSN 123-45-6789 for the reroof"
QuoteExplainer() = '[contract-refused: honest_explanation — before: not contains_pii(value())]'
```

No LLM call happens — the `before` clause is a plain predicate over the input, checkable without spending a token, so the refusal is deterministic and `tessera eval` can assert it directly as a test case rather than something you just hope holds in production.

## Capability discipline, end to end

The capability model runs through the whole stack from a single frontmatter line:

```markdown
---
agent: QuoteExplainer
capabilities_requested: [NetworkOut]
---
```

The compiler propagates that grant to every region of the agent. The actor scheduler refuses to spawn a child with capabilities the parent doesn't hold. And any `tsr:contract` bound to that agent's effects enforces its own before/after guarantees on top — a static grant, a runtime spawn check, and a runtime contract, three enforcement points from one declaration.

## Auditing a whole vault at once

Every agent is a file, so I can discover my entire vault of agents in one pass:

```bash
tessera vault scan ~/Desktop/TheVault
# Found 37 agent(s)
#   Estimator  ←  auditable_estimator.t.md
#       substrates: agent, intent, policy, prompt
#       capabilities: NetworkOut
```

That gives me every agent, its substrates, and its declared capabilities at a glance. `tessera doctor` on any one of them then folds verify errors, eval results, and live contract/audit counts into a single health line — enough to make "does this agent still hold its guarantees" a one-command question instead of something I have to remember to check.

This is the difference between an agent framework and an agent *language*. A framework gives you a runtime. A language gives you something you can prove things about before you trust it.
