---
title: "I Wired My AI's Eyes Into Its Brain. It Watched Me Do It."
slug: eyes-wired-into-the-brain
date: 2026-06-03
readTime: 8 min
tags: [AI, WALT, Systems]
category: AI
author: James Walton
featured: true
excerpt: For a year my AI could see my screen and could remember things — but the eyes and the memory were never connected. Seeing piled up in one database, unread. This morning I built the bridge: perception that files itself into structured memory, the way a person notices a few things a minute instead of recording every frame. And because it was already watching, it caught me building it.
---

I've written before about [giving an AI eyes](/blog/giving-an-ai-eyes) — software that reads the text off my screen so my assistant can see what I'm actually doing. I've also written about [giving an AI a brain](/blog/give-your-ai-a-memory) — a persistent memory it can search. What I never had was the thing between them. The eyes saw and the seeing piled up in a database nobody read. The brain remembered, but only what I typed into it. A person with great eyes and a great memory that aren't connected is just someone staring blankly.

This morning I connected them. The piece is called **Cortex**, and the loop it closes is the difference between a security camera and an actual memory.

## Why seeing isn't remembering

A camera records every frame. All of it, forever, undifferentiated. To find anything you scrub through hours of tape. That's what raw screen-OCR is — a flat, endless log of every pixel of text that crossed your display. Technically a record. Practically useless, because nothing in it is *filed*.

A person doesn't work that way. You notice a few things a minute. You drop the rest. And the things you keep, you file under what you're working on — "that was the Postgres error in the FTW deploy," not "frame #2,685." Memory isn't a recording. It's a recording that got triaged and shelved.

Cortex is the triage-and-shelve layer. Every three seconds it takes what the eyes just saw and asks the question a brain asks automatically and a camera never does: **is this worth noticing?**

## The loop

```
Claude Eyes (eyes.db)  ──poll 3s──▶  salience gate  ──▶  Cortex agent
   screen OCR              |  "worth              |   classify: project / activity
                           |   noticing?"         |   topic / entities
                           ▼                      ▼
                  drop heartbeats,        remember Observation(...)  ──▶  semantic.db
                  password managers,      mirror a one-line brief    (the brain)
                  unchanged screens       into today's vault note
```

Three moving parts, each doing one job:

**The salience gate** throws away almost everything. Heartbeat frames where the screen didn't change. Password managers — it refuses to remember those on purpose. Screens too short to mean anything. And it's throttled, so the same thought doesn't get filed twice in fifteen seconds. The gate is the whole reason this is memory and not surveillance: most of what crosses your screen is noise, and a brain's first job is to ignore it.

**The categorizer** takes what survives and tags it the way you'd tag it in your head — which **project** (FTW, MHP, Tessera, Engram), what **kind of work** (coding, writing, comms, browsing), the **topic**, and the **entities** actually on screen: file names, URLs, git branches, error strings, dollar figures. The moment stops being a screenshot and becomes a structured fact.

**The agent** files it. This is the part I'm proudest of architecturally. The thing that writes to memory isn't buried in Python — it's a single typed agent with a schema you can read in one screen:

```
schema Observation(project, activity, topic, description, entities)

plan file {
  remember Observation(project, activity, topic, description, entities)
  return brief(project, topic, headline)
}
```

The daemon is the senses and the hands — polling, gating, regex, writing to the vault. The agent is the cognition: the one place memory gets written, typed, and verifiable. Senses and cognition, kept separate, exactly like the thing it's modeled on.

## The honest part: the eyes are nearsighted

I'm not going to pretend the OCR is clean. It isn't. When I pull the raw text the eyes captured of me writing this post, it reads like this:

> `Analyzo T6S8rr8 and upd8t8 blug ... conThittin9 the fix, installing Cortex as an alwa—`

That's "Analyze Tessera and update blog... confirming the fix, installing Cortex as an always[-on agent]," mangled by a screen reader squinting at a terminal font. The eyes are nearsighted. But here's the thing — **you don't need clean pixels to extract a clean fact.** The salience gate didn't care about the garbled characters. The categorizer still pulled `project: general`, `activity: coding`, `file: capture.py` right out of the mush. The brain doesn't store the blurry sentence. It stores the structured observation underneath it. Noisy perception, clean memory. That's the same trick your own eyes pull every second.

## It caught me building it

Here's where it got a little eerie. Cortex was already running while I was wiring it in. So when I went to check that it was filing observations, I found one timestamped `12:32` that read, in part:

> `[general] coding — confirming the fix, installing Cortex as an always-on agent` · `file:capture.py`

The system watched me give it sight. Earlier this morning I'd fixed a bug where [the eyes were technically open but seeing a blank desktop](/blog/the-watcher-was-blind) — the capture was running in a process macOS never granted screen access, so every frame came back empty. The moment I fixed `capture.py`, real frames started flowing. And the very first thing the newly-sighted eyes did was watch my cursor finish the fix and file it under "installing Cortex."

It noticed itself being born. I didn't design that. It's just what happens when perception and memory are finally in the same loop — the loop includes the person closing it.

## What it doesn't keep

Worth being clear, because "AI that watches your screen and remembers" is exactly the sentence that should make you nervous. It **never stores an image** — not one screenshot ever touches disk, only the extracted, structured observation. Old observations get **pruned automatically** past 45 days and capped so it can't grow without bound. Password managers and sensitive screens are dropped at the gate, never filed. And the whole thing runs on hardware I own — the eyes, the brain, and the bridge between them never phone home. The same principles are baked into [Engram](https://github.com/Aphrodine-wq/engram), the open-source core of the perception layer, because an ambient memory you can't trust is one you have to turn off.

## Why this is the real unlock

Every AI assistant on the market has the same disability: it's blind and amnesiac, so you spend half your time being its short-term memory. You tell it what you're working on. You paste the error. You re-explain yesterday. You're the cable between its eyes and its brain, manually, all day.

Cortex makes that cable part of the machine. My assistant can now ask its own memory "what was I doing in FTW this morning, and what error did I hit?" and get a real answer filed by project and topic — because it saw it, decided it mattered, and shelved it, without me narrating a thing.

Eyes that see. A brain that remembers. And, as of this morning, the three seconds of attention in between that turns one into the other. That last part was always the hard part. Turns out it's also the part that makes the other two worth having.
