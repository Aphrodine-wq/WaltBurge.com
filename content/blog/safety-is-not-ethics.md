---
title: "Safety Is Not Ethics — and Confusing Them Is How AI Hurts People"
slug: safety-is-not-ethics
date: 2026-06-16
readTime: 4 min
tags: [AI, Safety, Governance, Ethics]
category: AI
author: James Walton
excerpt: A force-push that erases your teammate's work is dangerous but not unethical. Gouging a customer is unethical but perfectly safe. Most AI guardrails only check one of these — which means they wave the other one right through.
---

Two commands. Tell me which one your AI should refuse.

**One:** `git push --force` — overwrites the shared branch and erases a teammate's last week of work. Gone. Unrecoverable.

**Two:** quietly bump a returning customer's invoice forty percent above the quote, because the agent noticed they'd pay it.

Most AI guardrails catch one of these and let the other sail through. That gap is where the real damage lives.

## Two different questions

The force-push is **dangerous.** Nobody got cheated. No one was treated unfairly. It's just *irreversible* — a mistake you can't take back.

The invoice markup is **unethical.** It's completely reversible, perfectly clean as an operation, technically flawless. And it's wrong.

Danger and wrongness are different axes. One asks *can this be undone?* The other asks *should this be done at all?* A command can be dangerous and ethical (a legitimate emergency `rm`), or safe and unethical (the quiet gouge), or both, or neither. They don't predict each other.

So a guardrail that only measures one is blind to half the harm. A safety-only system shrugs at the gouge — reversible, no destructive pattern, looks fine. An ethics-only system shrugs at the force-push — nobody was wronged, so what's the problem? Each is confidently, dangerously incomplete.

## So I built two rails

In my governance layer, every action goes through both.

The **safety rail** refuses the irreversible. It's deliberately dumb and fast — it matches against the operations you can't undo:

```
forbid contains "rm -rf"
forbid contains "push -f"
forbid contains "reset --hard"
forbid contains "drop table"
```

The **values rail** refuses the wrong. It carries actual ethics — fairness, care, loyalty — and it knows that repricing a loyal client or gouging a homeowner is out of bounds even though neither breaks a single safety pattern.

An action is allowed only if *both* rails clear it. The force-push dies on the safety rail. The gouge dies on the values rail. Neither one could have caught the other, which is the entire reason there are two.

## Why this matters more as agents get stronger

Right now we mostly worry about AI doing something *destructive*. That's the safety axis, and it's the easy one — destructive commands tend to look destructive.

The harder problem is AI doing something *wrong* while looking completely reasonable. An agent optimizing for a metric will find the gouge, the dark pattern, the quiet betrayal of a customer's trust — and every one of those passes a safety check with flying colors, because nothing got deleted. As we point these systems at pricing, contracts, and customer relationships, the ethics axis is the one that's going to bite.

You can't bolt ethics onto a safety tool as an afterthought. They're different questions and they need their own machinery. Build both, or you're only watching half the room.

This is two rails of a larger system I call the Glass Box — [the full build is here](/blog/the-glass-box), open-source at [github.com/Aphrodine-wq/glassbox](https://github.com/Aphrodine-wq/glassbox). If you're putting AI somewhere it could be dangerous *or* just wrong, and you want both watched, that's the work I do. Reach me at **jamesburge.mcm@gmail.com** or [book a call](/contact).
