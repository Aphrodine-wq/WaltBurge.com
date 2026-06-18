---
title: "I Built an AI Safety Tool That Blocks Nothing. On Purpose."
slug: safety-tool-that-blocks-nothing
date: 2026-06-16
readTime: 4 min
tags: [AI, Safety, Governance, Systems]
category: AI
author: James Walton
excerpt: My AI safety layer watches every command an agent runs, decides whether to refuse it — and then lets it happen anyway. That's not a bug. It's the only way I'd ever trust it to say no.
---

I built an AI safety layer that refuses nothing.

It watches every command my AI agent runs. It decides, in real time, whether each one is dangerous or wrong. And then it lets the command happen anyway, every time, no matter the verdict.

That sounds broken. It's the smartest decision in the whole system.

## A safety tool you don't trust is worse than none

Picture the alternative. I ship the thing in full enforce mode on day one — it blocks anything it judges dangerous. Day two, it blocks a command that was completely fine. A false positive. Now I don't trust it. Day three, it does it again, and I turn it off.

A disabled safety tool protects nobody. The most dangerous failure mode for a guardrail isn't being too weak — it's being annoying enough that the human rips it out. Every security team learns this the hard way: the alert that cries wolf gets muted, and then the real alert gets muted with it.

So I flipped the order. Earn trust first, take the wheel second.

## Shadow mode

My system runs in what I call **shadow mode.** It does the full job — reads the action, runs it through a safety rail and an ethics rail, renders a verdict — and then defers. It shows me what it *would* have done without doing it.

```
Glass Box · SHADOW · WOULD-REFUSE · git push --force · safety⛔ values✓
```

That one line is the whole product right now. "Here's the call I'd have made." I get thousands of them, against real work, every day. I can see exactly where it would have stepped in, exactly where it would have been wrong, exactly where it missed. I'm grading a referee before I let it blow the whistle.

Only once I've watched it be right across thousands of real decisions do I flip a single surface to enforce — where the verdict actually blocks. One at a time. The slow way. On purpose.

## The guarantee is in the type system

Here's the part I'm proud of. "It won't block in shadow mode" isn't a promise in my docs. It's a property the compiler enforces. The entire decision lives in one function, and the shadow branch returns "get out of the way" without even *looking* at whether the action was flagged:

```rust
match mode {
    Mode::Shadow => HookOutput::Defer,            // never inspects `blocked`
    Mode::Enforce if blocked => HookOutput::Deny(reason),
    Mode::Enforce => HookOutput::Defer,
}
```

To make shadow mode block, you'd have to change that one visible line. There's no hidden path. The safest mode is the one the type system won't let you screw up.

## The lesson is bigger than one tool

We're about to hand AI agents real power — money, infrastructure, things that don't come back. The instinct is to clamp down hard and fast. But a clamp you don't trust comes off. Trust is earned by watching, in the open, before you give something teeth.

Watch first. Enforce later. It's how you'd onboard a new hire with the company credit card, and it's how I think we should onboard agents too.

This is one rail of a larger system I call the Glass Box — [the full build is here](/blog/the-glass-box), open-source at [github.com/Aphrodine-wq/glassbox](https://github.com/Aphrodine-wq/glassbox). If you're putting an AI somewhere it could do real damage and you want it watchable before it's powerful, that's the work I do. Reach me at **jamesburge.mcm@gmail.com** or [book a call](/contact).
