---
title: Running a Distributed AI System Across Three Machines
slug: three-node-ai-network
date: 2026-06-02
readTime: 10 min
tags: [AI, WALT, Systems]
author: James Walton
excerpt: A Mac for development, a mini PC as the always-on nerve hub, and a GPU workstation for the heavy lifting. How I wired them together with a file-backed event bus so the brain never goes dark.
---

This is Part 3 of a series on the Brain — the persistent AI system I built and own. [Part 1](/blog/the-brain-architecture) is the anatomy. [Part 2](/blog/building-a-second-brain) is what it was actually like to build. This one is about the body it runs on.

In Part 1 I made one claim about hardware and then walked past it: a brain that goes dark every time I close my laptop isn't a brain, it's an app. This post is the long version of that sentence. The Brain runs across three machines, wired together so the lights never go out, and the topology isn't arbitrary — each machine earns its spot.

> A laptop sleeps. A spinal cord doesn't. The whole three-machine design exists to solve one problem: keeping the nervous system live when the daily driver is dark.

## Why one machine wasn't enough

For months the whole Brain ran on my Mac, and it worked — right up until the moment it didn't. The Mac is where I develop. It's also where I close the lid and walk away. And every time I did, everything the Brain was supposed to do *while I wasn't there* stopped: the overnight work, the background syncs, the always-on memory that's supposed to be listening even when I'm not asking.

That's the core tension. The machine I work on is the worst possible place to run the part of the brain that's supposed to never stop. Development hardware sleeps. Infrastructure can't. The minute I admitted those are two different jobs, the single-machine model was dead and the three-node design was obvious.

## The three machines

Each node has a name and a role, and the split is along capability lines, not power lines.

**The Mac — "Twin."** The daily driver. This is where I write code, run Claude Code, and where the screen-watching senses live because this is the screen I'm actually looking at. Its defining trait, for the network's purposes, is `always_on: false`. It sleeps. So it gets to be the brain's hands and eyes — but it is explicitly *not* trusted to be the heart.

**The mini PC — "Spine."** A small box at `192.168.12.220` that does one thing and never stops: it runs the Nerve hub. It's the always-on spinal cord. When the Mac sleeps, the Spine keeps the event bus live, keeps the file server up, keeps the nervous system conducting. It's the least glamorous machine in the house and the most important — its only capabilities are `always-on`, `file-server`, and `nerve-hub`, and that's the point. You don't want your critical infrastructure also trying to be your GPU.

**The GPU workstation — "Body."** The heavy machine at `192.168.12.61`. This is senses and muscle: vision processing, text-to-speech voice, webcam, and the compute-bound work the other two can't touch. When the Brain needs to *do* something physical — speak, see, run a model — it happens here.

Three machines, three jobs: **develop, persist, compute.** No machine does two of those well, so no machine tries.

## Wiring them with an event bus, not an API

The obvious way to connect three machines is to stand up a server and have them all call it. I didn't do that, and the reason is the same reason the Brain on a single machine is a set of organs on an event bus instead of one big program.

The machines talk over **Nerve** — the same file-backed publish/subscribe event bus that wires the organs together inside one machine, extended across the network. Each machine runs its own local Nerve node. A relay process forwards events between them over SSH. When the immune system on the Mac heals something, it emits an event; the relay carries it to the Spine; anything subscribed reacts. No central API to maintain, no service that becomes a single point of failure for *logic* — just events flowing where they're needed.

The relay config is deliberately simple:

```json
{
  "forward_patterns": ["*"],
  "ignore_patterns": ["relay:*", "eyes:capture"],
  "sync_interval_sec": 30
}
```

It forwards everything (`*`) with two exceptions that matter. It ignores `relay:*` — events the relay itself generates — because forwarding those would create a feedback loop where the relay endlessly relays its own relaying. And it ignores `eyes:capture` — the raw screen-capture firehose — because that's high-volume noise that has no business crossing the network. Those two ignore patterns are small lines that prevent two classic distributed-systems failures: the infinite loop and the saturated link.

## Why SSH relay and not just a synced folder

I already sync files between these machines with Syncthing, so a fair question is: why build an SSH relay at all? Why not just put the event log in a synced folder and let it propagate?

Because **a synced folder propagates on its own schedule, and a nervous system can't wait.** File sync is built for eventual consistency — it'll get there, in its own time, which can be tens of seconds or more under load. That's fine for documents. It's wrong for events, where "the Mac just kicked off an overnight build" needs to reach the always-on hub *now*, not whenever the next sync cycle feels like it. The SSH relay is the fast path for signals. The synced folder is the slow path for state. Different jobs, different transport — same principle as the three machines themselves.

## What this buys me

The payoff is simple and it's the whole reason the body exists: **I can close my laptop and the Brain stays awake.** The Spine keeps the nervous system live. The Body keeps the senses and the compute available. Work queued before bed runs against a machine that doesn't sleep. The morning brief that's waiting when I open the Mac was assembled by a brain that never actually went offline — it just went quiet on the one machine that was allowed to.

That's the difference between an AI tool and an AI system. A tool runs when you run it. A system runs whether you're there or not, because the part that matters most was built specifically to never stop.

If you haven't read them, [Part 1](/blog/the-brain-architecture) takes the Brain apart organ by organ, and [Part 2](/blog/building-a-second-brain) is the honest story of building the whole thing.
