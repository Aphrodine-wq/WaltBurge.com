---
title: Shipping Code While You Sleep
slug: overnight-autonomous-runner
date: 2026-03-08
readTime: 8 min
tags: [Systems, Automation]
author: James Walton
excerpt: My overnight runner executes multi-project work queues autonomously — building features, running verification, rolling back on failure. 1,600 lines of bash that changed everything, and the guardrails that keep it from changing everything for the worse.
---

The best feature I ever shipped, I shipped while I was asleep. Not me — the runner. I queue up work before bed, close the laptop, and wake up to commits that weren't there the night before. It sounds reckless. It mostly isn't, because the interesting part of the system isn't the part that writes code — it's the part that refuses to trust the code it just wrote.

> Autonomy without verification isn't autonomy, it's gambling. The runner's whole value is in what it does *after* it builds something — not the building.

## The work-queue model

The runner is about 1,600 lines of bash. I know — bash. I'll defend it: every machine already has it, it has no dependencies to rot, and for orchestrating other tools rather than doing heavy logic itself, it's exactly the right amount of language. The runner doesn't compute anything hard. It sequences things and checks their exit codes. That's bash's whole job.

The model is a queue. I drop tasks into it — "add this feature to FairTradeWorker," "write tests for that module," "fix the docs on this repo" — each one scoped to a project the system already knows. The runner picks them up and works them one after another, or in parallel when they don't touch the same code. Each task runs in its own tmux session so it survives a disconnect and so I can attach in the morning and read the whole transcript of what it did and why.

Tasks run with zero permission prompts. That's the part that makes people flinch, and they're right to — so the entire rest of the design exists to make that safe.

## The verification gate

Here's the rule the runner lives by: **nothing it builds is trusted until something else proves it.**

After a task writes code, it doesn't get to declare victory. It runs through a verification gate first. The build has to pass. The tests have to pass. And then it goes through AEON — my formal-verification layer — which scans the changes for bugs and security holes the tests wouldn't catch. Only work that clears all of that is allowed to stand. Work that fails the gate gets rolled back, and the failure gets logged with enough detail that I can read it over coffee and understand exactly what went sideways.

That rollback-on-failure behavior is the difference between an autonomous runner and a loaded gun. A system that builds confidently and commits blindly will, given a whole night, do real damage. A system that builds, then tries to *disprove its own work* and reverts when it can't defend it — that one I can leave alone with my repos. The skepticism is the safety.

## What keeps it honest — and what doesn't

I want to be straight about the guardrails, including the one that bit me, because "I let an AI commit code overnight" deserves more honesty than a victory lap.

**It builds on a branch, never on main.** The runner's work lands on a dedicated overnight branch. It does not push to main, it does not deploy, it does not touch production. The morning ritual is mine: I read the diff, I decide what merges. The runner proposes. A human disposes. That line is bright and it does not move.

**The hardest lesson was about the ground it builds on, not the code it writes.** One night the runner built a full night of solid work — on top of a local branch that was dozens of commits behind the real remote. The code was good. The base was stale. Some of what it built on had already been deleted upstream, which made the whole branch a headache to reconcile and impossible to cleanly rebase. The runner did nothing wrong. *I* had pointed it at bad ground.

The lesson generalizes past my setup: **an autonomous system is only as safe as the assumptions it inherits at launch.** It will faithfully build a beautiful thing on a cracked foundation, because checking the foundation wasn't its job — it was mine. Now fetching and checking divergence against the remote is a precondition before any overnight branch gets queued. The runner got more careful because I got burned, which is how most good guardrails get built.

## Why it changed everything

The honest payoff isn't "free code while I sleep." Code you have to review in the morning isn't free — review is work. The real payoff is **leverage on the boring middle.** The mechanical, well-specified, slightly-tedious tasks — the test coverage, the doc fixes, the straightforward feature with a clear spec — those are exactly what a verified overnight runner is good at, and exactly what I least want to spend my sharp morning hours on. It clears the boring middle so the daylight goes to the work that actually needs a human.

I'm a one-man shop most days, plus a cofounder and an AI I treat like one. A runner that turns eight sleeping hours into a reviewed pile of mechanical progress is the closest thing a solo builder has to a night shift. The trick was never making it work. The trick was making it *trustworthy* — and that lives entirely in the verification gate and the bright line at main.
