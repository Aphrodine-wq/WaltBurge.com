---
title: "I Gave My Computer a Photographic Memory. Now You Can Run It Too."
slug: engram-open-source-screen-memory
date: 2026-06-03
readTime: 9 min
tags: [AI, WALT, Open Source]
category: AI
author: James Walton
featured: true
excerpt: For a year my AI has been able to search everything I've ever seen on my screen — every error, every doc, every message — because it reads the text off my display and remembers it. I just open-sourced the engine. It's called Engram, it's one pip install, and nothing it sees ever leaves your machine.
---

Microsoft promised this and pulled it. Rewind.ai built it, raised on it, and walked away. I built my own version, I've been running it every day for a year, and today I'm giving away the engine. It's called **Engram**, it installs in one command, and it does the thing those products promised without the thing that killed them: it never sends a single pixel anywhere.

```bash
pip install engram-memory
engram watch
engram search "that postgres error from this morning"
```

That's the whole pitch. Your computer reads the text off your screen, redacts the secrets, and remembers the rest — searchable forever, available to any AI agent, running entirely on hardware you own. [The code is on GitHub](https://github.com/Aphrodine-wq/engram), MIT licensed, fork it and sell it if you want.

> A screen-watching tool run by someone else's cloud is a surveillance product. The same tool run entirely on your own machine is a superpower. The only difference is where the eyes live — and that difference is the whole thing.

## The problem every AI tool has and won't admit

Every AI assistant starts blind. Open a fresh session and the first thing you do is become a translator: "I'm in the marketplace repo, I just changed the payment path, here's the error I hit twenty minutes ago." Every word of that was *on your screen*. The screen knew. You're transcribing reality to a tool standing right next to reality with its eyes shut.

That re-explanation tax is tiny per session and enormous over a year. And it's lossy — you only tell the assistant the slice you remembered to mention, so it only ever knows the slice. I got tired of paying it. So I built the [perception layer I've written about before](/blog/giving-an-ai-eyes) as part of my larger [second brain](/blog/building-a-second-brain) — and the load-bearing piece, the part that turned out to matter more than anything else, was *memory of what I'd seen.* That piece is Engram, and I carved it out clean so anyone can run it.

## What it actually does

Engram watches your screen on a loop. Every few seconds it captures, but here's the first thing that makes it different from "screen recording": **it never keeps the image.** It runs on-device OCR — Apple's Vision framework, with a tesseract fallback — pulls the *text* off the screen, and throws the screenshot away in the same function that took it. What lands in the database is about 2KB of parsed text per frame. There is no screenshot album sitting on your disk waiting to leak, because there is no screenshot album.

That text goes through a privacy filter *before* it's ever written — passwords, tokens, API keys, and PII get redacted out, and apps you name (your password manager, by default) are never captured at all. Then it lands in SQLite with a full-text search index. From that point on:

```bash
engram search "kubernetes crashloop"     # find the moment you saw it
engram recent --minutes 30               # what was just on screen
engram activity --minutes 60             # a readable summary of your last hour
```

And the part that makes it an *AI* tool instead of a search box: it serves that memory to any agent. There's a loopback REST API, and there's an **MCP server** — so Claude, or any MCP client, gets tools like `engram_search` and `engram_recent` and can answer "what was that error I hit earlier" by *looking it up itself* instead of asking you. Point your config at it:

```json
{ "mcpServers": { "engram": { "command": "engram-mcp" } } }
```

Now your assistant can see what you've been doing. You stop narrating your life to your tools.

## Why this one doesn't end up dead like the others

Recall and Rewind both face-planted on the same rock, and it wasn't the tech. It was trust. Microsoft Recall stored screenshots — actual images of everything you'd seen, including your bank and your messages — in a way researchers immediately showed could be lifted off the machine. Rewind recorded everything to build a business on top of it, and people did the math on what "a company has a video of my entire digital life" actually means.

Engram is built so those failure modes can't exist:

- **No images. Ever.** Only redacted text. There's nothing to reconstruct a screenshot from.
- **Secrets die before storage.** Redaction happens in the capture path, not as a cleanup step you hope ran.
- **No network. No account. No cloud.** The REST API binds to `127.0.0.1`. The MCP server talks over a local pipe. There is no server in this architecture, which means there is no server to breach. Your data lives in `~/.engram` on your disk and nowhere else.
- **Optional encryption at rest**, with the key held in your OS keychain.

This is the same principle that runs through everything I build — [own the model](/blog/build-your-own-model), [own the memory](/blog/give-your-ai-a-memory), own the eyes. The architecture *is* the privacy stance. The reason Engram can be a superpower instead of a surveillance product is that the eyes are in a head you own. That's not a feature I bolted on. It's the precondition I started from, and it's why this one is something I'll actually hand to other people.

## It's mine, and now it's yours

I've run this every day for a year. It's told me when my deep-work hours were a third of what I assumed. It's pulled up errors I half-remembered seeing. It's let my AI start every session already knowing what I was doing instead of making me recite it. It became the difference between an assistant I brief and an assistant that already knows — and that difference is almost entirely about memory.

The full system I run is bigger — flow detection, a knowledge graph, focus coaching, the [whole Brain](/blog/the-brain-architecture). Engram is the core that makes all of it possible: the screen memory itself. I extracted it, cleaned it, made it install in one command, and put it under an MIT license because I think this should be a thing everyone has and nobody rents.

If you've ever wanted your computer to actually *remember* what you saw — and you want that memory to live on your machine and answer only to you — it's one command away:

```bash
pip install engram-memory
```

[github.com/Aphrodine-wq/engram](https://github.com/Aphrodine-wq/engram). Build on it. Just keep the eyes in a head you own.
