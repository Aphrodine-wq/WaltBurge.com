---
title: "Substrates: Giving an Agent Named Modes of Thinking"
slug: tessera-substrates
date: 2026-05-21
readTime: 9 min
tags: [AI, Tessera, Architecture]
category: AI
author: James Walton
excerpt: You don't write "an agent that uses LLMs and has memory and learns things." You write tsr:agent for action, tsr:memory for recall, tsr:prompt for LLM calls. The compiler enforces the boundaries. The architecture becomes legible.
---

Most agent code is a blob. LLM calls, memory reads, tool invocations, and business logic all live in the same Python method, interleaved, untyped, and impossible to audit. You can't look at it and say "here is where this agent thinks, here is where it remembers, here is where it touches the outside world."

Tessera's core idea is that an agent has **named modes of thinking**, and each mode gets its own typed code fence. I call them substrates. The compiler enforces the boundaries between them — substrate adjacency, effect propagation, capability gating. The architecture becomes legible because it's *declared*, not buried.

## The substrate menu

Run `tessera substrates` and you get an English breakdown of every category. The shipped ones:

- `logic` — pure functions, no effects. `fn rank(papers, query) -> Float = ...`
- `agent` — BDI actors with beliefs and plans. The goal-directed core.
- `memory:working` — per-invocation scratchpad. Gone when the plan ends.
- `memory:workspace` — a global blackboard where an arbiter picks the winning thought.
- `memory:episodic` — append-only event log. `log Decision(topic, choice)`
- `memory:semantic` — a knowledge graph, backed by Synapse. `remember FactSheet(...)`
- `prompt` — an LLM template with typed bindings.
- `tool` — an external callable, Python or any LangChain tool by dotted path.
- `neural` — a PyTorch `nn.Module` declared inline; the block compiles to `nn.Sequential`.

Each substrate maps to a named theory of cognition — global workspace theory, BDI, predictive processing, theory of mind. Tessera doesn't endorse any of them. It gives them all a first-class API and lets you compare them empirically on the same benchmark.

## Why boundaries matter

The boundaries aren't decoration. They're enforced, and that enforcement buys real things.

Consider an agent that declares `capabilities_requested: [NetworkOut]` in its frontmatter. The compiler propagates that capability to every region. The actor scheduler then **refuses to spawn a child agent** that requests a capability the parent doesn't hold. And the flow analysis catches tainted PII reaching a tool invocation without passing through a sanitizer first.

One declaration. Enforced at compile time, at spawn time, and at runtime. That's not something you get from a prompt string.

## Boundaries as code-review primitives

Here's the part that matters for teams. When substrates are explicit, the review question writes itself:

> This agent has both a `tool` substrate and a `policy` substrate — let's audit what the policy actually enforces before we merge.

You can't ask that question about a blob of Python where everything is interleaved. You can ask it instantly about a `.t.md` file where the modes of thinking are named and fenced. The substrate is the unit of review.

## The shape of a real agent

A research agent might compose four substrates: `logic` to rank candidate papers, `prompt` to summarize them via an LLM, `tool` to pull a web search through LangChain, and `memory:episodic` to log every decision it made. Each fence does one thing. The compiler makes sure the LLM output can't silently become a capability the agent never requested.

You don't describe the agent in prose and hope. You declare its modes of thinking, and the compiler holds you to them.
