---
title: Building With AI, Not Around It
slug: building-with-ai-not-around-it
date: 2026-03-28
readTime: 6 min
tags: [AI, Development]
author: James Walton
excerpt: Most developers use AI as autocomplete. I use it as a cofounder. The difference is whether you let it shape architecture or just fill in blanks.
---

Most developers use AI as autocomplete. They type, it finishes the line, they move on. That's useful, and it's also leaving most of the value on the table. I use AI as a cofounder — something that shapes architecture, catches what I miss, and pushes back when I'm wrong. The difference isn't the model. It's the relationship.

## Autocomplete vs. a thinking partner

Autocomplete answers the question "what comes next on this line?" A cofounder answers "is this the right line at all?" When I'm wiring an endpoint, I don't just want the boilerplate — I want the thing that says *this will race under concurrent writes* or *that dependency has a known footgun*. The model knows enough to catch those. You only get that value if you let it into the decision, not just the typing.

## Let it shape architecture, not just fill blanks

The fear is that letting AI shape architecture means losing the plot — ending up with code you don't understand. The opposite happens if you do it right. I think out loud with it before I build: here's the problem, here are two approaches, here's what breaks under load. It argues. I argue back. By the time I write code, the design has been stress-tested by a second mind that's read more systems than I ever will.

That only works if the AI is wired to disagree. An assistant that agrees with everything is autocomplete with extra steps. I deliberately set mine up to assume I might be wrong, to verify before committing, and to scan across my other projects for patterns I'm not seeing in the one I'm staring at.

## The traits that make it a cofounder

The postures I lean on most:

- **Productive doubt** — assume the first answer is wrong, check it, *then* commit. Stops confident mistakes from shipping.
- **Cross-project insight** — pull the pattern from the marketplace work when I'm stuck on the AI platform. The connection I'd miss is usually the one that solves it.
- **Compulsive verification** — before anything is called "done," enumerate the failure modes and check each edge. Construction taught me that; the AI enforces it.

I cared about this enough that I built it into a language — Tessera lets you declare these reasoning postures as first-class, inspectable code instead of burying them in a prompt. But you don't need a language to start. You need to stop treating the model like a faster keyboard.

> The question isn't whether you use AI. It's whether you let it into the part of the work that actually matters — the decisions.

I'm a guy who learned to code seven months ago and shipped a marketplace, a custom LLM, and an agent language. I did not do that by typing faster. I did it by building *with* a cofounder, not around a tool.
