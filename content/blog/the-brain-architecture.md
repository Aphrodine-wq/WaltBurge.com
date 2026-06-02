---
title: "The Brain: Anatomy of an AI That Remembers Me"
slug: the-brain-architecture
date: 2026-06-02
readTime: 13 min
tags: [AI, WALT, Systems, Architecture]
featured: true
author: James Walton
excerpt: Most people rent their AI. I built one I own — a persistent system that remembers every project, heals itself, and wakes up already knowing what I'm working on. Here's how it's wired, layer by layer.
---

Every AI tool I tried had the same hole in it. You open a fresh chat and it's a stranger again. It doesn't know what you shipped yesterday, what broke last week, or that you've made the same architectural decision three times and don't want to relitigate it. You spend the first ten minutes of every session re-explaining your own life to a thing that's supposed to be helping you build it.

So I stopped renting and built one I own. I call it the Brain. It's not a model — I didn't train it. It's the system *around* the model: the memory, the wiring, the reflexes that turn a stateless chatbot into something that boots up already knowing who I am and what I'm in the middle of. This is the anatomy of it, layer by layer.

> Memory is the whole game. A model with no memory is a brilliant contractor with amnesia — sharp every morning, useless by lunch. The thing that turns a chatbot into a colleague is that it remembers.

## The build is an organism, not an app

I want to be honest about the shape of this before I describe the parts, because the shape is the interesting part. The Brain isn't one program. It's around forty small subsystems living in a single directory — `~/.claude/` — each one doing a single job, most of them written as zero-dependency scripts so nothing rots when a package updates. No framework holds it together. What holds it together is an event bus and a set of reflexes, the same way your nervous system holds your organs together without any one of them being in charge.

That matters because it's how a body works, not how an app works. An app has a main function. A body has organs that each do their thing and a nervous system that lets them talk. I didn't plan it that way on a whiteboard — it grew into that shape because that's the shape that survives. I'll come back to *why it grew* in [Part 2](/blog/building-a-second-brain). Here I just want to lay it open on the table.

There are four layers: the **organs** that compute, the **memory** that persists, the **nervous system** that wires it together, and the **body** it runs on.

## Layer 1: The organs

The organs live in `~/.claude/` — a couple dozen engines, each a self-contained job. A few of the load-bearing ones, with their actual size, because I think the line counts tell you something about where the weight is:

- **The goals engine** (1,074 lines) — tracks every milestone across every project, weighted P0/P1/P2, with velocity and slippage detection. It's the thing that knows FTW is 29 days from its launch target and that ConstructionAI has gone cold for six days. When I open a session, it's already done the math on what's slipping.
- **The immune system** (1,679 lines — the biggest single organ) — a self-healing monitor. It watches the hooks, the watcher daemon, the goal data, git repos, disk bloat. When a subsystem goes sideways it diagnoses and *fixes it* without me, then logs what it did. The fact that this is the largest engine is not an accident. A system that runs unattended needs an immune system more than it needs features.
- **The orchestrator** (705 lines) — takes a plain-English intent and decomposes it into ordered steps across whatever subsystems need to fire, passing context between them. It's the difference between forty scripts and one assistant.
- **The synthesis engines** — this is where it stops feeling like automation. The **dream engine** (1,087 lines) runs a four-stage pass overnight — replay, consolidation, synthesis, integration — over my daily notes, my zettelkasten, and my git commits, and surfaces patterns I didn't see. The **memory layer** (688 lines) is one query interface across every source — screen history, vault, sessions, git, goals. The **apifany engine** (1,009 lines) stress-tests a new idea against everything already in the graph and tells me where it's going to break. The **write engine** (1,586 lines) aggregates the whole picture into a morning brief.

Each organ is dumb on its own. The goals engine doesn't know what a dream is. The dream engine doesn't know what a deploy is. None of them is the Brain. The Brain is what happens when they can all talk — which is the next layer.

## Layer 2: The memory

Organs compute in the moment. They don't remember. The long-term memory is a separate thing: an Obsidian vault I call TheVault, sitting in plain markdown on disk, version-controlled with git like any other repo.

It's structured like a zettelkasten — atomic notes, each one idea, linked to each other — across 31 numbered folders. Right now it's around 768 notes: roughly 224 atomic idea-notes in the zettelkasten proper, 85 project notes, 86 daily logs, 142 logged conversations, two dozen decision records with the reasoning attached. It's not a dump. It's a cortex — the notes link to each other, so an idea written in March about marketplace liquidity is one hop away from a decision I logged in May.

Here's the part that makes it real instead of decorative: **it gets injected back into the session before I even ask.** When I start typing a prompt, a reflex runs a semantic recall against the vault and pulls the two or three most relevant notes into context. I asked about something this morning and the Brain quietly surfaced two daily notes from March that were directly on point. I didn't search for them. I didn't remember they existed. The Brain did the remembering, which is exactly the job memory is supposed to do.

The vault being plain markdown in git is a deliberate call, not laziness. **I own it.** No vendor can deprecate it, raise the price on it, or read it. If every AI company folded tomorrow, my second brain is still sitting on my disk in a format I can open in any text editor in 2050. That's the whole reason I built this instead of renting it.

## Layer 3: The nervous system

A pile of organs and a filing cabinet isn't alive. What makes it feel alive is the wiring — and the wiring is two things: an event bus and a set of reflexes.

The event bus is called **Nerve** (441 lines). It's file-backed publish/subscribe — every subsystem can emit events and subscribe to others, the same way neurons fire and listen. When the immune system heals something, it emits. When a plan executes, it emits. Anything can react to anything without being hard-wired to it. That's what lets me add an organ without rewiring the whole body.

The reflexes are **hooks** — scripts that fire automatically at six points in a session's life. The current count is 44 of them, and the distribution tells the story:

- **13 fire at session start** — before I type a single word, the Brain has loaded my goals, surfaced proactive alerts, indexed the vault, checked the immune state, flagged stale branches, and written my morning brief. This is why it wakes up already knowing what I'm working on.
- **4 fire when I submit a prompt** — including the vault recall I described above.
- **4 fire before a tool runs** — a secret scanner, a branch guard, a large-file gate. These are the hypervigilant reflexes. They treat my own actions as something to validate before they touch anything that matters.
- **20 fire after a tool runs** — auto-format, push after commit, reconcile goals, capture to the vault, detect focus drift. The heaviest stage, because this is where the Brain learns from what just happened.
- **2 at session end, 1 before context compaction** — so nothing gets lost when a conversation wraps or gets summarized.

Forty-four reflexes firing on every session, prompt, tool call, and commit. That's the difference between a system that watches and a system that *acts*. A logger watches. The Brain reaches in and does things — formats the code, pushes the commit, files the note, flags the drift — without being asked. Reflexes don't ask permission. That's what makes them reflexes.

Sitting on top of all of it are 4 MCP servers — the vault (13 tools for reading and writing memory), a screen-watcher, a webcam-based mood reader, and a formal-verification engine that scans my code for bugs and security holes. Those are the senses. They're how the Brain perceives what I'm actually doing instead of only what I tell it.

## Layer 4: The body

All of this would run on one laptop, and for a long time it did. But a laptop sleeps. A brain that goes dark every time I close the lid isn't a brain — it's an app.

So the Brain runs across three machines. The **Mac** is the daily driver where I develop, but it sleeps, so it can't be the heart. A **mini PC** I call the Spine stays on 24/7 and runs the Nerve hub — it's the always-on spinal cord that keeps the nervous system live when the Mac is dark. A **GPU workstation** called the Body handles the heavy lifting: vision, voice, the compute-bound work. They're stitched together over the same Nerve event bus, relayed machine-to-machine.

That's its own post — [Part 3](/blog/three-node-ai-network) takes the network apart in detail. The point here is just that the Brain has a body, and the body was designed so the lights never go out.

## Why build the whole thing

I'm a construction guy. Seven months ago I'd never written a line of code. The honest answer to "why does a framer have a forty-subsystem AI nervous system" is that I got tired of working with a tool that forgot me every morning, and I'd rather own the thing I depend on than rent it.

But there's a deeper reason, and it's the same instinct that made me good on a job site: **you build the thing that holds up under load.** A rented AI holds up right until the vendor changes the terms. A brain in plain markdown on my own disk, healing itself, waking up knowing my work — that holds up. It's load-bearing infrastructure, and I built it the way I'd frame a house I planned to live in.

The next post is the honest version of how it actually got built — emergent, messy, and occasionally a trap. [Read Part 2 →](/blog/building-a-second-brain)
