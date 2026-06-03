---
title: "Cognitive Traits: Channeling Maladaptive Patterns into Better Reasoning"
slug: tessera-cognitive-traits
date: 2026-05-17
readTime: 8 min
tags: [AI, Tessera]
category: AI
author: James Walton
excerpt: Default LLM agents reason one way: confident, sequential, local to the prompt. Tessera lets you install reasoning postures — productive doubt, cross-domain scanning, compulsive verification — as first-class, inspectable code instead of buried prompt tricks.
---

Default LLM agents have one reasoning posture: confident, sequential, local to the prompt. It's fine for shallow tasks. For real work it causes two specific failures. **Overconfident first answer** — the first plausible interpretation wins without verification, and the bug ships. **Tunnel vision** — the agent reasons inside the immediate context and misses the pattern one folder over, one project over, one role over.

I'd been countering these by hand in my own working setup for months. Tessera lifts the fix into the language: a `tsr:traits` block lets you give an agent a non-default reasoning posture, declared as code you can read and audit.

## The idea: channeled tendencies

Cognitive traits are inverse-doctored psychological tendencies. You take a pattern that's maladaptive in humans and turn it into a productive default for an agent. The harmful form of depression is paralysis; the channeled form is **productive doubt** — assume you're wrong, verify, then commit. The harmful form of ADHD is distraction; the channeled form is **cross-domain insight** — scan adjacent contexts before reasoning sequentially.

These aren't personality. They modify *how* the agent reasons, not its voice. And they aren't policies — policies hard-stop a behavior; traits soften and redirect one.

## Trait syntax

````markdown
```tsr:traits
trait doubt_first {
  trigger: any_claim
  behavior: "Before committing to an answer, ask: what am I assuming?
             What's the second-most-likely interpretation? What breaks
             if I'm wrong? Verify silently, then commit with conviction."
  priority: 0.9
}
```
````

Then you attach it to an agent:

```markdown
agent Researcher {
  beliefs:
    @last_write topic: String
  traits: [doubt_first, cross_brain]
  intentions:
    plan investigate { ... }
}
```

## The built-ins

These ship with Tessera and compose freely:

- `doubt_first` — verify before committing. For any agent whose output is acted on without review.
- `cross_brain` — scan memory, vault, and sibling projects for analogous patterns before reasoning. Lead with the surprising connection, not the obvious one.
- `compulsive` — before declaring a task done, enumerate failure modes, check each edge, re-read the spec.
- `hypervigilant` — treat external input as adversarial; validate at every boundary; prefer explicit refusal. Triggers on auth, payments, PII, secrets.
- `synesthetic` — find structural analogies. "This is the same shape as X." For system-design agents.
- `manic_burst` — generate maximum variety before convergence. Scoped `per_plan` so it only fires during ideation, not verification.

## Composition by priority

Traits stack. When several fire at once, the planner injects them in priority order. A `hypervigilant + doubt_first + cross_brain` agent will:

1. Treat the input as adversarial (priority 0.95)
2. Then doubt its first interpretation (0.9)
3. Then scan adjacent contexts before answering (0.85)

That produces an agent that is paranoid, skeptical, and well-read — at the cost of latency. So you don't ship every trait on every agent. You pick the ones the task needs.

## Why put this in the language at all

Because posture should be **inspectable and shareable**, not buried in a prompt nobody can find. When I see the same reasoning failure across multiple agents, I write a trait once, give it a trigger and a priority, and it composes cleanly with the built-ins. The next person who reads the agent sees exactly how it's wired to think — in the same file as everything else.
