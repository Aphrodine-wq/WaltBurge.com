---
title: "What It's Actually Like to Build a Second Brain"
slug: building-a-second-brain
date: 2026-06-02
readTime: 10 min
tags: [AI, WALT, Development]
author: James Walton
excerpt: The architecture post made it sound clean. It wasn't. Here's the honest version — the thing that grew instead of being designed, the war stories, and the trap I almost didn't see.
---

[Part 1](/blog/the-brain-architecture) laid out the Brain like an anatomy diagram — four clean layers, organs with line counts, a tidy nervous system. That's true, but it's the after picture. It makes it look like I sat down, drew the layers, and built them. I didn't. Nothing about this was designed up front. It *grew*, the way a thing grows when you keep solving the next annoying problem and don't stop. This is the honest version.

## It started as a memory hack

The first version wasn't a brain. It was one file. I was tired of re-explaining my projects every morning, so I wrote down the context and had the assistant read it at the start of each session. That's it. A text file and a reflex to load it.

Then the file got stale, so I built something to keep it current. Then I wanted it to remember decisions, not just facts, so I added a decision log. Then I wanted it to notice when I was contradicting a decision I'd already made — so I added a reflex for that. Every organ in the Brain exists because something annoyed me enough to automate it. There was never a master plan. There was a man on a job site who hates doing the same thing twice.

> I didn't architect a brain. I kept closing loops, and one day I looked up and the loops had grown a nervous system.

That's the real lesson in here, and it's a construction lesson: you don't design a system that complex top-down and get it right. You build the smallest thing that solves today's problem, make it hold, and let the structure reveal itself. The four-layer anatomy in Part 1 is real — but I discovered it, I didn't draw it.

## Building a thing that watches you build it

Here's the genuinely strange part. The Brain has eyes — a subsystem that watches my screen and a webcam-based one that reads whether I'm focused or fried. Useful. Also deeply weird to develop.

Because when you're debugging the watcher, the watcher is watching you debug the watcher. You're inside the loop you're building. I'd be fixing the focus-detection logic while the focus-detector logged that my focus was scattered — which, fair, it was, because I was debugging a recursive surveillance system at the time. There's no clean outside vantage point. You're always modifying the brain with the brain.

The deepest version of this: I use the Brain to build the Brain. I plan its features in sessions that the Brain itself logs to the vault, then recalls later when I'm planning the next feature. It bootstraps on itself. That's powerful — it compounds — but it also means a bad idea can get baked in and then *cited back to you as precedent.* You have to be willing to delete the brain's own memories when they turn out to be wrong, which feels stranger than it should.

## What broke, and what it taught

Two failures are worth telling because they taught me the actual difference between a script and a system.

**The daemon that died silently.** I had background daemons running on a schedule — the always-on parts of the Brain. Three of them just stopped. No crash, no error, nothing in the logs. They were *configured* to run and they simply weren't. It turned out to be an environment trap: the scheduler launched them with a stripped-down shell and a different PATH than the one I'd tested in, and an old version of bash sitting in the wrong place quietly broke the startup. Everything looked fine. Nothing was fine.

The lesson wasn't "fix the PATH." The lesson was that **a system that runs unattended needs to be supervised by something that itself can't fail the same way.** I put the watchdog under the OS's own supervisor with a keep-alive, so if it dies, the OS restarts it. You don't trust the thing to stay up. You build a thing whose only job is making sure it stays up. That's why the immune system ended up being the single biggest organ — I learned the hard way that healing matters more than features.

**The synthesis loop that poisoned itself.** The Brain has a loop where it generates an insight, acts on it, and feeds the result back in. Beautiful when it works. But "0 events emitted" looked like success when it was actually silence, and a self-referential scratchpad could feed its own output back as if it were new input — the system slowly convincing itself of things it had made up. It auto-disabled after enough failures, which is the right instinct, but the failure mode was *confident wrongness*, not a crash. Those are the dangerous ones. A crash tells you it's broken. A confidently wrong system tells you everything's great.

That's why a whole layer of the Brain is dedicated to doubt — reflexes that assume the input is adversarial, that verify before acting, that refuse on uncertainty. I didn't build those because I'm clever. I built them because the system lied to me and I believed it for a while.

## The trap nobody warns you about

I have to say this part plainly, because it's the most important thing I learned and it's the least flattering.

**A system this big can become the most productive form of procrastination there is.**

There's a note in my own vault that says exactly that — "building infrastructure to avoid shipping." I wrote it about myself. There were days I built three new organs for the Brain and shipped zero features for the actual businesses the Brain is supposed to serve. It feels like work. It *is* work. It's just not the work. Polishing the tool that builds the thing is one level removed from building the thing, and that one level is where good builders go to hide.

The Brain is supposed to be load-bearing infrastructure for FairTradeWorker, for ConstructionAI, for the client work that pays the bills. The moment it becomes the project instead of the thing that serves the project, it's failed — no matter how elegant it is. I keep a hard line on this now: the Brain earns its keep by making me ship faster, and if a week goes by where it didn't, the week was a loss. The setup is not the mission. The setup exists so I can close the laptop and the work keeps happening.

## Would I build it again

Yes — but I'd tell my seven-months-ago self the truth: you're not building an app, you're growing an organism, and organisms need an immune system before they need a sixth sense. Build the healing first. Build the doubt first. Add the magic later. And every single day, ask the hardest question there is about a tool this seductive — *did this help me ship, or did I just enjoy building it?*

If you want the clean diagram, [Part 1](/blog/the-brain-architecture) has it. If you want to see the body it runs on — three machines wired so the lights never go out — that's [Part 3](/blog/three-node-ai-network).
