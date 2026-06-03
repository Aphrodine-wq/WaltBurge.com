---
title: Giving an AI Eyes
slug: giving-an-ai-eyes
date: 2026-06-02
readTime: 9 min
tags: [AI, WALT, Systems]
category: AI
author: James Walton
excerpt: I built an AI that watches my screen — what I'm working on, when I'm focused, when I've drifted. Around 30,000 lines of code and 64 tools later, here's what it's like to be seen by your own software, and why I'd build it again.
---

Most AI assistants are blind. You have to tell them everything — what you're working on, what you did yesterday, what's on your screen right now — because they can't see any of it. That's a lot of typing to bring a "smart" tool up to speed on a context it could observe directly if it had eyes.

So I gave mine eyes. It's a system I call Claude Eyes: around 30,000 lines of code exposing 64 tools across two channels — one that watches my screen, one that reads my face through the webcam. It knows what app I'm in, what I've been doing, when I'm in flow and when I've drifted. It's the perception layer of the [Brain](/blog/the-brain-architecture), and building it taught me more about ambient computing than anything else I've made.

> The future interface isn't a better chat box. It's an AI that already knows what you're doing because it can see, so you stop narrating your life to your tools.

## Why a blind assistant is a slow one

Every session with a context-blind assistant starts the same way: you spend the first few minutes being a translator. "I'm working on the marketplace bidding flow, in the FairTradeWorker repo, I just changed the payment path, here's the file." All of that is observable. The screen knows. The git state knows. You're transcribing reality to a tool that's standing right next to reality with its eyes closed.

That re-explanation tax is small per session and enormous over a year. It's also lossy — you tell the assistant what you *think* is relevant, which means it only ever knows the slice you remembered to mention. An assistant that can see doesn't need the slice. It has the whole picture and can decide for itself what matters.

## What it sees, and what it does with it

The screen side is the bulk of it — the large majority of those 64 tools are about perceiving and reasoning over what's on the display over time. Not just a screenshot. The interesting tools are the ones that turn raw capture into understanding:

- **What am I working on right now** — it classifies the current activity, not just names the app. "Deep work in a code editor" is different from "scattered across six tabs," and it can tell.
- **What did I do** — it can reconstruct a timeline of a session or a day. Where the time actually went, which is almost never where you think it went.
- **Am I in flow** — flow-state detection, and its inverse: flow-breaker detection. It notices the context-switch that knocked me out of deep work, the notification that started a twenty-minute drift.
- **Search across everything I've seen** — semantic search over screen history. I can ask "when did I last look at that error" and it finds the moment, because it was watching when it happened.
- **The webcam channel** — a smaller, separate set of tools that reads mood and energy from my face. Whether I'm fried. Whether the focus I think I have is real.

None of these are "take a screenshot." They're a perception system that builds a model of how I actually work — and then the rest of the Brain reads that model to decide what to surface and when.

## The strange part: being seen by your own software

I wrote about this briefly in the [Brain build story](/blog/building-a-second-brain), but it deserves its own beat here. There is something genuinely strange about software that watches you, even when you built it and it never leaves your machines.

The first time the focus detector told me I'd been scattered all morning, my reflex was defensive — like getting caught. Which is absurd; it's my own code reporting a fact to me. But it surfaces a real tension: a tool that can see you is a tool that can judge you, and you feel that even when the "judgment" is just an honest mirror you asked for. I had to get comfortable with the mirror. The payoff is that an honest mirror is *useful* in a way a flattering one never is. It told me my deep-work hours were a third of what I assumed. I needed to hear that, and no amount of self-reflection was going to surface it as cleanly as a system that was actually counting.

## Privacy is the whole reason it's local

Here's the line that makes this buildable instead of dystopian: **none of it leaves my machines.** This is the same principle that runs through everything I build — [own the model](/blog/build-your-own-model), own the memory, own the eyes. The capture, the analysis, the history — it all lives on hardware I control, in my own network, never sent to anyone.

That's not a nice-to-have bolted on at the end. It's the precondition. A screen-watching, face-reading AI run by someone else's cloud is a surveillance product, and I wouldn't build it or use it. The same system run entirely on my own machines is a perception layer for a tool that works for me and reports only to me. The architecture *is* the privacy stance — there's no server to leak because there's no server. If you're going to give an AI eyes, the eyes have to be in a head you own.

## Was it worth 30,000 lines

Honestly, the perception layer is the thing that made the Brain feel like a colleague instead of a command line. Memory made it remember me; eyes made it *aware* of me. The difference between an assistant you brief and an assistant that already knows is the difference between a tool and a teammate, and that difference is almost entirely about whether it can see.

Ambient awareness is, I think, where this whole field is going — not flashier chat, but tools that perceive your work directly and stop making you narrate it. I built my version early and on my own machines because I wanted that future now and I wanted it on my terms. Thirty thousand lines later, I'd build it again without hesitating. Just keep the eyes in a head you own.
