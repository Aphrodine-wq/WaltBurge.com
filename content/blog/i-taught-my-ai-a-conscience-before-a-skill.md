---
title: The Gate Every Money Decision Has to Pass
slug: i-taught-my-ai-a-conscience-before-a-skill
date: 2026-06-18
readTime: 5 min
tags: [AI, Systems, Ethics]
category: AI
author: James Walton
excerpt: Before any money decision happens in my system, it runs through a gate that encodes two rules I refuse to break — don't gouge, and never reprice a loyal client. It's not a vibe in a prompt. It's deterministic code, and right now it shows me its verdict before I act.
---

I taught my AI a conscience before I taught it most skills.

That sounds backwards. Conventional wisdom says you build the capability first and bolt on the guardrails later, once it's doing something worth guarding. I think that's exactly the mistake that's going to bite this whole industry. The values are the part you can't retrofit. So before any decision that touches money runs in my system, it passes through a gate that checks it against the rules I actually live by.

> A model's ethics shouldn't live in a paragraph of its prompt that it might reinterpret on a bad day. The non-negotiable rules belong in code — deterministic, inspectable, and impossible to talk your way around.

## Two rules I won't break

The gate encodes two principles. They're not abstract. They came straight off the job site and out of my own client list.

**Don't gouge.** When you price work for someone, you charge a fair rate for the value delivered — not the maximum the moment will bear because they're desperate or don't know better. The construction world is full of people who got taken because they were over a barrel, and I decided early that nothing I build would do that to anyone.

**Never reprice a loyal client.** This one's specific. I have a client — early, loyal, someone who took a chance on me when I had little to show. The rule is absolute: a client like that does not get their price raised. Ever. Loyalty runs both directions or it isn't loyalty. The people who open doors for you when you're nobody get protected, not optimized.

I wrote about the principle behind this in [why I'll never reprice a loyal client](/blog/never-reprice-a-loyal-client). The new part is that it's no longer just something I believe — it's something my system enforces on itself.

## Why it has to be code, not a prompt

You could try to do this with instructions. Put "be fair and don't raise loyal clients' prices" in the system prompt and hope.

Hope is the operative word. A prompt is a soft constraint. The model weighs it against everything else it's reasoning about, and on a long enough timeline, with a clever enough framing of the situation, it can be argued out of it — not maliciously, just by the ordinary drift of a system optimizing for something nearby. "Technically this isn't a *reprice*, it's a *new scope*." That's the kind of reasoning that erodes a principle one reasonable-sounding exception at a time.

A gate is a hard constraint. It's deterministic code that sits in the path of the decision and checks the action against the rules before anything happens. It doesn't reinterpret. It doesn't weigh the rule against a quarterly target. The Casey rule isn't a value the model holds — it's a fact about what the system is permitted to do, enforced the same way every single time. That's the difference between a conscience you can rely on and one you merely hope shows up.

I built it on [Tessera](/blog/tessera-markdown-native-agents), my markdown-native agent language, exactly because Tessera is for the work whose worth comes from being done the same careful way every time, with a record that proves it.

## Right now it shows me the verdict — on purpose

Here's the honest state of it: the gate runs in shadow mode.

For every money decision, it renders its verdict — approved, or flagged with a reason and the evidence — and then it surfaces that to me rather than hard-blocking the action. I see the call it would make. I still pull the trigger.

That's deliberate, and it's the same philosophy as [my safety layer that blocks nothing until it's earned the right to](/blog/safety-tool-that-blocks-nothing). A gate I don't trust yet is a gate I'd rip out the first time it wrongly flags something real. So it runs in the open first. It shows me its judgment against actual decisions, day after day, and I get to see exactly where it's right, where it's overcautious, and where it misses. You grade the referee before you let it blow the whistle. Once it's proven on a class of decisions, that's when the verdict gets teeth.

What I won't do is pretend it's already enforcing when it's observing. The gate's job today is to be *right, visibly* — and to never let me forget the two rules even when a deadline is whispering that just this once wouldn't hurt.

## The conscience is the moat

People ask why I'd spend engineering time on a rule that protects me from myself. The answer is that this is the actual product.

Anyone can build an AI that prices work. The thing that's rare — the thing a client can feel — is an AI you can trust *not* to quietly turn the screws when it could. A system that's structurally incapable of gouging the person who's over a barrel, or of raising the price on the loyal customer the second the math says it could. That's not a constraint on the business. For the kind of work I do and the kind of people I do it for, it *is* the business.

We're about to hand these systems real economic decisions. I'd rather the first thing mine learned was where the line is — and to put that line somewhere it can't argue itself across.

If you want an AI in your operation that's watchable and principled before it's powerful, that's the work I do. Reach me at **jamesburge.mcm@gmail.com** or [book a call](/contact).
