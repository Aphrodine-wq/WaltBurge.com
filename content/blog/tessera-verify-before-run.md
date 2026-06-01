---
title: Verifying AI Agents Before They Ever Run
slug: tessera-verify-before-run
date: 2026-05-19
readTime: 10 min
tags: [AI, Tessera, Systems]
author: James Walton
excerpt: Every other agent framework runs the agent and watches what happens. Tessera lowers the agent to an intermediate representation and runs 73 formal-verification engines against it first — catching capability leaks and PII egress before they hit production.
---

The standard way to find out whether an agent is safe is to run it and watch. You deploy it, you log what it does, and you hope your monitoring catches the bad behavior before a customer does. That's testing, not verification. For anything touching auth, payments, or PII, "run it and watch" is how you ship a breach.

Tessera takes the opposite stance: **verify the agent before it ever runs.** This is possible because the agent isn't an opaque prompt — it's a typed program that lowers to a formal intermediate representation. And I already had the verifier.

## SIR — the intermediate representation

When Tessera compiles a `.t.md` file, it lowers each substrate block into SIR (Substrate IR) — a textual, node-based representation of what the agent does: which functions it calls, which capabilities each region needs, where external input enters, where data egresses. SIR is the thing you can reason about formally.

## AEON — 73 engines pointed at the agent

AEON is a formal verifier I built that checks code in 21 languages against 73 analysis engines: substrate adjacency, effect inference, capability checking, taint analysis, refinement types, Hoare logic, and 22 dedicated cybersecurity engines. It catches injection, auth bugs, crypto misuse, PII leaks, and race conditions.

The unlock: Tessera added a `.sir` language adapter, so AEON now verifies an agent *the same way it verifies my Python, Rust, and Java*. One command:

```bash
tessera compile examples/researcher.t.md --aeon
# ✔ AEON: 4 functions, 0 errors, 0 warnings
```

Diagnostics map back to specific error codes:

- **E001** — substrate adjacency violation (a memory block touching something it shouldn't)
- **E102** — capability used but not in scope
- **E301** — tainted PII reaching a non-sanitized egress

That last one is the important one. The flow analysis tracks `Tainted<T, pii>` through the agent. If personally identifiable information reaches a tool invocation without first passing through a sanitizer, AEON refuses it at compile time. The agent never gets the chance to leak it.

## Capability discipline, end to end

The capability model runs through the whole stack from a single frontmatter line:

```markdown
---
agent: QuoteExplainer
capabilities_requested: [NetworkOut]
---
```

The compiler propagates that grant to every region of the agent. The actor scheduler refuses to spawn a child with capabilities the parent doesn't hold. AEON's PII analysis verifies nothing sensitive crosses a boundary it shouldn't. Three enforcement points, one declaration.

## Auditing a whole vault at once

Because every agent is a file and AEON has a portfolio profile, I can audit my entire vault of agents in one pass:

```bash
tessera vault scan ~/Desktop/TheVault   # found 17 agents in 0.48s
aeon scan ~/Desktop/TheVault --profile portfolio
```

Every `.t.md` and `.sir` file routes through the translator, all 73 engines run against each, and I get per-agent diagnostics. The same security engines that scan my production Python and Rust now scan my agents. At PR time, a capability grant that shows up in a diff gets caught before it merges.

This is the difference between an agent framework and an agent *language*. A framework gives you a runtime. A language gives you something you can prove things about before you trust it.
