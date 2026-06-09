---
title: "Measure Twice, Deploy Once"
slug: measure-twice-deploy-once
date: 2026-06-09
readTime: 5 min
tags: [Construction, Engineering, Career]
category: Construction
author: James Walton
excerpt: Every carpenter learns the same rule before they're trusted with a saw — measure twice, cut once, because you can't un-cut a board. It turns out that's the same rule that keeps you from blowing up a production database. The job site taught me more about shipping software than any tutorial did.
---

The first real thing anybody teaches you in construction isn't how to swing a hammer. It's how to keep from wasting material. Measure twice, cut once. You say it out loud until it's reflex, because a board you cut wrong is a board you throw away, and the lumber doesn't grow back because you felt confident.

Seven months into building software full time, I've noticed that almost everything that's kept me out of trouble came off the job site first. Not the syntax. The discipline. Here's the part of the trade that ported straight over.

> You can always re-run a build. You cannot un-cut a board, and you cannot un-drop a table. The trick is knowing which one you're holding before you commit.

## Some cuts don't come back

On a site, you develop an instant gut read for reversible versus irreversible. Dry-fit a joint? Reversible — wiggle it, adjust it, no harm done. Cut the only piece of crown molding you've got? That one's final. You slow all the way down before the final cut and you triple-check the measurement, because the cost of being wrong just went from zero to a trip back to the supply house.

Code has the exact same split, and most disasters come from not feeling the difference. Editing a file is a dry-fit — change it, undo it, no harm. Running `reset --hard` on work you haven't pushed, force-pushing over a teammate, dropping a column in a production migration — those are final cuts. The board's gone.

So I treat them like final cuts. Before anything irreversible, I stop and answer two questions out loud: what's the worst thing this does, and what's my way back if it does it? If there's no way back, that's not a command, that's a decision, and decisions get measured twice.

## A punch list is just a test suite

At the end of a job, before you get paid, you walk the punch list. Every door, every outlet, every seam. Not the ones you *think* are fine — all of them, because "I'm pretty sure I caught everything" is how you get a callback and lose the next job.

That's a test suite. That's the whole idea. You don't ship on the feeling that it works; you walk every item and prove it. When I'm about to call something done, I do the same walk I'd do on a remodel: enumerate the failure points, check each one, confirm the thing I changed didn't break the thing next to it. [Done means walked, not felt.](/blog/i-run-my-codebase-like-a-job-site)

## The estimate is the spec

A good estimate on a job is brutally specific — line by line, material and labor, what's included and what's explicitly not. Vague estimates are how you eat a job. The number you wrote down is the contract you're held to.

Same energy goes into a spec. Before I build a feature, I write down exactly what it does and — just as important — what it doesn't, the same way I'd scope a build so the customer and I are looking at the same job. Most of the software fights I've watched happen are the same fight as a construction dispute: somebody assumed something was "obviously included" and nobody wrote it down.

## Why the trade was the right school

People act like coming from construction is a thing to overcome on the way to being a developer. I think it's the opposite. The trade beats a specific set of habits into you — respect the irreversible, walk the whole list, write the number down — and those habits are exactly the ones that separate a developer you trust from one you babysit.

The syntax I had to learn. The discipline I already had. I just pointed it at a different kind of board.
