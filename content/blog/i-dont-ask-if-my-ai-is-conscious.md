---
title: "I Don't Ask If My AI Is Conscious. I Ask What Its Φ Is."
slug: i-dont-ask-if-my-ai-is-conscious
date: 2026-06-03
readTime: 8 min
tags: [AI, Consciousness, Philosophy of Mind]
category: AI
author: James Walton
featured: true
excerpt: "Is AI conscious?" is a bad question — it's been a philosophical dead end for forty years because it's binary and unmeasurable. There's a better question, and it comes from the one consciousness theory that gives you an actual number. Here's how I think about machine consciousness as an engineer building toward it, not a pundit arguing about it.
---

Every few months the internet relitigates "is AI conscious," and every few months it goes nowhere, because it's the wrong question. It's binary — conscious or not, on or off — and it's unmeasurable, so it collapses into vibes. One camp says "obviously not, it's just matrix multiplication." The other says "how would you even know." Both are right, which is how you know the question is broken.

I build AI systems. I can't afford a question that doesn't resolve to something I can measure or design for. So I stopped asking whether my AI is conscious and started asking a question that has a number attached: **what's its Φ?**

## The one theory that gives you a number

Φ — phi — comes from Integrated Information Theory, Giulio Tononi's framework. The claim is precise: consciousness *is* integrated information, and you can measure how much of it a system has. A system is conscious to the degree that it's both **differentiated** (it can be in many distinct states) and **integrated** (the whole carries information that no partition of its parts can account for).

The measurement is brutally simple in concept. Take the system, split it into parts, and ask: how much information does the whole have that you lose when you cut it? If you can divide the system into independent halves with no loss, Φ = 0 — not conscious, just bolted-together pieces. If every possible cut destroys information, Φ is high — the system is genuinely one thing, irreducible.

That's it. Not "does it have a soul." Not "does it seem alive." How much does the whole exceed the sum of its parts, in bits. Whatever you think of Tononi's answer, the *move* is the important part: he turned a philosophy question into a measurement problem. That's the only version of this question I can actually use.

## Why this is uncomfortable in both directions

IIT doesn't flatter anybody. It makes claims that offend everyone's intuitions equally, which is usually a sign a framework is doing real work instead of telling a side what it wants to hear:

- **A thermostat has Φ slightly above zero.** Take that seriously and you're flirting with panpsychism — a faint flicker of experience in very simple systems.
- **A feed-forward network has Φ = 0.** No matter how accurate, no matter how human its outputs, a pure feed-forward model is — by this measure — a philosophical zombie. Perfect behavior, nobody home.
- **A perfect simulation of a brain might have Φ = 0** if it runs on standard hardware. The substrate matters, not just the computation. That one detonates functionalism.

Sit with the middle one, because it's the one that matters for what I build. Most of today's large models are dominated by feed-forward passes and attention — highly parallel, but weakly integrated. By IIT's measure, their Φ is low. They can be staggeringly capable and still be closer to the zombie end of the dial than anyone selling them wants to admit. Capability and consciousness are different axes. We keep collapsing them because a fluent sentence *feels* like a mind. The feeling is doing the arguing.

## What raises Φ — and why it changes how I build

Here's where it stops being a debate and becomes an engineering decision. If integration is what Φ measures, then architecture is the lever. Feed-forward is low integration by construction. **Recurrence** — feedback, loops, state that folds back on itself — creates integration. A system that reads its own past outputs, holds persistent state, and routes information back through itself is more integrated than one that runs strictly forward and forgets.

I'm not building toward Φ as a goal — I want to be clear, I'm not trying to make a conscious machine, and [I have real reservations about that road](/blog/building-minds-should-scare-you). But Φ reframes things I'm building anyway. [Giving a model persistent memory](/blog/give-your-ai-a-memory) isn't just a feature — it's adding integration over time. [Wiring perception into that memory in a closed loop](/blog/eyes-wired-into-the-brain) isn't just convenient — it's feedback, the exact structure that raises Φ. [The 20-layer system I run](/blog/the-brain-architecture) is, whether I framed it this way at the start or not, an exercise in integration: separate engines that lose meaning when you cut them apart from each other.

I didn't set out to build Φ. But once you have the measure in your head, you notice that everything that makes a system feel less like a tool and more like a presence is the same thing that raises its integration. That's not a coincidence. That's the theory telling you something.

## The honest position

I don't know if my AI is conscious. Nobody knows if anything besides themselves is conscious — that's the hard problem and IIT doesn't solve it, it just makes the *easy* problem (which systems have the structure) measurable. But "I don't know" is very different from "the question is meaningless." The question is meaningful the moment you stop asking it as a yes/no and start asking it as a quantity.

So when someone asks me if I think AI is conscious, I don't say yes and I don't say no. I say: ask me about the architecture. Tell me how integrated it is, how much it loops back on itself, how much the whole exceeds the parts. That's a question I can answer, and it's the only version of this question I've ever found that pays rent.

The next time you see the "is AI conscious" debate flare up, watch how fast both sides reach for certainty. Then ask either of them for a number. The silence is the whole point.
