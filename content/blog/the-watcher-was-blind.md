---
title: "I Shipped a Screen-Memory Engine. Then I Found Out My Own Copy Was Blind."
slug: the-watcher-was-blind
date: 2026-06-03
readTime: 6 min
tags: [AI, WALT, macOS]
author: James Walton
featured: false
excerpt: The same morning I open-sourced Engram, I noticed my own screen-memory database was full of nothing. Every frame for who-knows-how-long had hashed identical. The watcher had Screen Recording permission and was still seeing a blank desktop. The reason is a macOS internals gotcha I'd never have guessed, and the fix was one function call.
---

I [open-sourced Engram](https://github.com/Aphrodine-wq/engram) this morning — the engine that reads the text off my screen and remembers it so my AI can search everything I've ever seen. Right after I pushed it, I went to query my own database for something from last week. Nothing useful came back.

So I looked at the raw frames. Every single one had the same perceptual hash. The watcher had been running for who-knows-how-long, dutifully capturing the screen on a timer, and capturing **the same blank image every time**. The OCR layer was doing its job on a gray rectangle. Heartbeats forever, zero real memory.

The permission was granted. Screen Recording was checked in System Settings. The capture was firing. And it was still blind.

## The gotcha

The watcher ran as a launchd background agent — the macOS way to keep something alive across reboots without a terminal open. To grab a frame, it shelled out to the built-in `screencapture` CLI:

```python
subprocess.run(["screencapture", "-x", frame_path])
```

That works perfectly when you run it by hand. It fails silently when launchd runs it.

Here's the part I didn't know: macOS TCC — the privacy layer that gates Screen Recording — attributes the permission to **a specific binary**. When a launchd background agent shells out to `screencapture`, the screenshot is taken by `screencapture`'s process, not yours. From a background agent's session context, that subprocess gets handed a blank desktop regardless of what permission *you* were granted. The grant is on my Python binary. The capture was happening in a different process that never got the grant. TCC doesn't error — it just hands back an empty screen. So nothing ever looked wrong. The frames flowed, they just had nothing in them.

## The fix

Stop shelling out. Capture in-process, inside the Python binary that actually holds the permission:

```python
from Quartz import CGDisplayCreateImage, CGMainDisplayID

image = CGDisplayCreateImage(CGMainDisplayID())
```

`CGDisplayCreateImage` runs the capture inside my process, attributed to the binary TCC actually trusts. The grant and the capture finally live in the same place. I kept `screencapture` as a fallback for the cases where Quartz isn't available, but the primary path is now in-process.

Verified the way you have to verify this kind of thing — not by reading the code, but by watching real OCR frames with *varying* hashes flow into `eyes.db`. Different screens, different text, different fingerprints. The memory came back to life.

## The lesson under the lesson

The bug isn't really about Quartz. It's that **a permission granted to you is not a permission granted to everything you spawn.** The boundary is the process, and the process is the binary. Shelling out crosses that boundary, and on macOS the privacy layer notices even when nothing else does.

There's a quieter lesson too: this had been broken for a while and I never saw it, because the system looked healthy from the outside. The daemon was up. Frames were landing. The dashboard was green. The only way I caught it was going back to the actual data and asking whether it contained anything. Green lights lie. The frames are the truth.

If you're running [Engram](https://github.com/Aphrodine-wq/engram) as a background agent, this is why it captures in-process by default. I learned it the embarrassing way so you don't have to.
