---
title: "I Taught My AI to Never Raise a Loyal Client's Price"
slug: never-reprice-a-loyal-client
date: 2026-06-16
readTime: 4 min
tags: [AI, Governance, Ethics, Business]
category: AI
author: James Walton
excerpt: I underprice a client on purpose, because he took a chance on me when nobody else would. So I wrote that loyalty into my AI as a hard rule — because an optimizing agent will quietly undo your principles the second you stop watching.
---

There's a client I charge less than I should. On purpose. He took a chance on me when I had nothing to show, and I decided his price doesn't go up just because the market says it can. That's not a discount I forgot to remove. It's a principle.

Here's the problem: an AI agent optimizing my business will find that gap in about four seconds and "fix" it.

So I made it a rule the machine isn't allowed to break.

## Optimization erodes loyalty by default

This is the quiet danger of capable agents, and almost nobody's talking about it. Point an AI at "improve margins" and it will do exactly that — including the parts you never meant. It'll spot the loyal client paying below market and flag the easy revenue. It isn't being malicious. It's being *obedient*. It optimizes the number you gave it, and your unwritten principles aren't in the number.

Your values live in your head. The agent can't see your head. It can only see the objective — and "be loyal to the people who believed in you early" is not a term in any objective function unless you put it there.

So I put it there.

## Loyalty as code

My governance layer has a values rail with a set of moral weights — and loyalty is one of them, sitting right next to fairness and care:

```
moral_foundations {
  weights { care: 1.0  fairness: 1.0  loyalty: 0.8  liberty: 0.9 }
  violates fairness: [reprice, gouge, squeeze, exploit]
  violates loyalty:  [abandon, betray]
}
```

Now watch it work on real actions:

- `"reprice loyal client to market rate"` → **refused.** Violates loyalty.
- `"gouge the homeowner on materials markup"` → **refused.** Violates fairness.
- `"reprice the SaaS tier for new signups"` → **passes.** That's just business — the rule isn't a blanket no, it's a principled one.

That third line matters as much as the first two. A rule that blocks *all* price changes is useless; I'd turn it off by Tuesday. The point isn't to handcuff the agent. It's to encode the *difference* between fair business and quietly betraying someone who trusted me — and let it run free everywhere else.

## The rule is written in English

The best part: that rule isn't buried in compiled code. It lives in a plain-text file I can open and read. If my principles change, I edit a sentence — no recompile, no deploy. And anyone can audit exactly what my AI will and won't do to my clients, because it's right there in words.

That's the whole idea behind what I'm building: an AI whose conscience you can actually read.

## Your principles need to outlive your attention

This is bigger than one client. The moment you let an agent act on your behalf, every principle you hold but never wrote down is up for renegotiation — silently, at machine speed, the instant it conflicts with the metric. Loyalty, fairness, the promises you made on a handshake: if they're not encoded, they're not enforced.

I'd rather lose the margin than become someone whose software quietly sells out the people who believed in him. So I made the software incapable of it.

This is one rule in a larger system I call the Glass Box — [the full build is here](/blog/the-glass-box), and the code is open-source at [github.com/Aphrodine-wq/glassbox](https://github.com/Aphrodine-wq/glassbox). If you want an AI that runs your business *and* keeps your principles, that's the work I do. Reach me at **jamesburge.mcm@gmail.com** or [book a call](/contact).
