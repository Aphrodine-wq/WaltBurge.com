---
title: The Day My AI Started Fixing Itself
slug: the-self-healing-loop
date: 2026-06-18
readTime: 6 min
tags: [AI, WALT, Systems]
category: AI
author: James Walton
excerpt: For months my AI could watch itself break and do nothing about it. Then I closed the loop — gave it a narrow list of repairs it's allowed to make to its own body, and a heartbeat that heals the parts that rot. Here's what changed, and where I drew the line.
---

For a long time my AI was a very good observer of its own decline.

It could tell me when one of its own background processes had stopped responding. It could notice that a tool it relied on had quietly rotted — still loaded, still listed, but no longer actually doing the thing. It logged all of this faithfully. And then it sat there, watching itself break, waiting for me to come fix it. A mechanic with a perfect diagnostic readout and his hands tied behind his back.

That gap bugged me more than any single bug. An AI that can see a problem and can't touch it isn't autonomous — it's a very expensive smoke detector. So I closed the loop.

> The line between a tool that watches and a tool that works is whether it's allowed to act on what it sees. Everything I build is a slow, careful march across that line.

## Observe, decide, act — and the part everyone skips

Most "AI systems" stop at observe and decide. They watch, they reason, they produce a recommendation, and a human does the actual work. That's the safe place to stop, and for most of what I'd built, it was where I'd stopped too. The [Brain](/blog/the-brain-architecture) could think. The [Eyes](/blog/giving-an-ai-eyes) could see. But the hands were mine.

The problem with stopping at "decide" is that the system's insight has a half-life. It notices something needs fixing at 2 a.m., I read about it at 9 a.m., and in between, the thing it noticed has cascaded into three other things. The value of an observation decays the longer the distance between seeing and doing. Closing that distance to zero is the whole game.

So I built two pieces that finally let it do the last step itself.

## Piece one: it applies its own upgrades

The first piece lets the Brain take a specific, whitelisted set of self-improvements and apply them to its own running code. Not "rewrite yourself however you want" — a narrow, named list of changes it's allowed to make, the kind I'd otherwise be applying by hand for the hundredth time.

When it has one ready, it doesn't open a branch and wait for a review that might come days later. It applies the change to the live system, because a fix that's waiting in a pull request isn't fixing anything. But it doesn't fly without a net:

```
apply-upgrades.js
  → snapshot current file to backups/
  → apply whitelisted change to live
  → on failure: restore from backup
```

The backup is the deal I made with myself. The system can move fast on its own body because every move is reversible. If an upgrade makes things worse, the previous version is sitting right there, timestamped, and either it or I can roll back to it. Speed and safety usually trade off against each other; backups are how you buy both.

## Piece two: a heartbeat that heals what rots

The second piece is the one I'm fondest of, because it fixes a failure mode I kept hitting personally.

The parts of the system that *do* things — the executors that actually carry out an action — are exactly the parts most likely to break quietly. They depend on the most moving pieces, so they're the first to rot. And a rotted executor is the worst kind of broken: it still looks alive. It's listed, it's loaded, the status check is green. It just doesn't work anymore.

So I gave the action layer a heartbeat. On a regular pulse, it checks whether its own executors are genuinely functional — not "are they present" but "do they still work" — and if one has gone hollow, it heals it. Re-arms it, rebuilds it, brings it back. The system now treats its own ability to act as a vital sign, something to be monitored and restored, not assumed.

That changed the character of the whole thing. Before, "the loop is closed" was true right up until the moment something silently broke, and then it was false and I wouldn't know for hours. Now the closing of the loop is itself something the system maintains.

## Where I drew the line, and why I'm honest about it

I want to be clear about what this is and isn't, because this is exactly the kind of thing people oversell.

This is not an AI rewriting itself into something smarter every night. The set of changes it can make to itself is a **whitelist** — bounded, specific, chosen by me. Every change is backed up before it lands. It runs on my own machines, on my own terms, the same as [everything else I build](/blog/build-your-own-model). When I measure where it actually sits on the path to real autonomy, the number is honest and it is not a hundred. It's a system that has earned a narrow band of trust to maintain itself, and is slowly earning more.

That's the right way to give a system teeth — the same logic as my [safety layer that blocks nothing until it's earned the right to](/blog/safety-tool-that-blocks-nothing). You don't hand over the keys on day one. You let it prove it can make one kind of repair safely, watch it do that a few hundred times, and then widen the whitelist by one entry. Trust is granted in slivers, against evidence, never in a lump.

## Why this is the part that matters

A construction crew that can only flag problems and never fix them isn't a crew — it's an inspection. The reason a good foreman is worth anything is that he sees the issue *and* handles it, and the gap between those two is small enough that the problem never gets a chance to grow.

That's what I was after here. Not a smarter AI — a more *complete* one. The intelligence was already there; what was missing was the wrist. Closing the loop didn't make the system think better. It made its thinking matter, because for the first time the distance between what it knows and what it does is short enough that the knowing actually changes something.

I'd build it this way again. Just keep the whitelist narrow, the backups automatic, and the heartbeat honest.
