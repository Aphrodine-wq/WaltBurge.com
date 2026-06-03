---
title: "Give Your AI a Memory: A 30-Minute Build"
slug: give-your-ai-a-memory
date: 2026-06-02
readTime: 11 min
tags: [AI, Development, Systems]
category: AI
author: James Walton
excerpt: The single highest-leverage thing you can do with an AI assistant is stop it from forgetting you. Here's the exact pattern I use — a memory file it reads at the start of every session — built step by step so you can copy it today.
---

I've written a lot on this site about [the Brain](/blog/the-brain-architecture) — the big, multi-machine, self-healing AI system I run. That's the cathedral. This post is the first brick, and it's the one I'd tell anyone to lay first: a memory file your AI reads at the start of every session, so it stops greeting you like a stranger every morning.

This is a real tutorial. By the end you'll have a working memory your assistant actually uses, and you can build it in about half an hour. No frameworks, no vector database, no vendor lock-in. Just a text file and a little discipline — which, it turns out, is most of what memory is.

> An AI with no memory is a brilliant new hire who quits every night and you re-hire every morning. The fix isn't a smarter model. It's a file it reads before it talks to you.

## What you're building

The whole system is one idea: **a plain-text file that gets loaded into the AI's context before your first message.** That's it. When the assistant "wakes up," the first thing it reads is a file describing who you are, what you're working on, and how you like to work. It starts the conversation already knowing, instead of asking.

Most modern AI coding tools already support this — Claude Code reads a file called `CLAUDE.md`, other tools have their own equivalent (a project instructions file, a system file, a "custom instructions" box). The *mechanism* varies. The *pattern* is identical, and the pattern is the part that matters. If you're using a tool that has no such hook at all, you can still do this manually by pasting the file in at the start of a session — clumsy, but the discipline is the same.

## Step 1: Create the file

Make a markdown file where your tool expects it. For Claude Code, that's `CLAUDE.md` in your project root:

```bash
touch CLAUDE.md
```

That's the entire infrastructure. One file. Resist every urge to make this more complicated than a text file until a text file has actually stopped being enough — and it won't, for a long time.

## Step 2: Write down what it should never have to ask twice

The content rule is simple and it's the one people get wrong: **put in facts that are stable and that you're tired of repeating. Leave out everything else.**

Good memory is durable context — the stuff that's true across many sessions:

```markdown
# Project Memory

## Who I am
- I'm a solo developer. Be direct, skip the preamble, don't over-explain
  basics I already know.
- I value working code over clever code. Minimal solution that fully
  solves the problem.

## What this project is
- A contractor marketplace. Next.js frontend, Java/Spring Boot backend.
- Payments go through QuickBooks, NOT Stripe. Don't suggest Stripe.

## How I work
- Don't push to main. Branch, then let me review the diff.
- Run the tests before you tell me something works.

## Decisions already made (don't relitigate)
- Homeowners can't browse contractors — they post a job and contractors
  bid. This is deliberate. Don't propose a contractor directory.
```

Notice what's in there. Preferences ("be direct"), hard constraints ("not Stripe"), workflow rules ("branch, don't push"), and settled decisions ("don't relitigate the no-directory call"). Every one of those is something I'd otherwise re-type in a dozen sessions. That re-typing tax is exactly what the file kills.

And notice what's *not* in there: today's todo list, the bug I'm currently chasing, anything that'll be stale by Thursday. Memory is for what's durable. Transient stuff belongs in the conversation, not the memory file — put it here and you'll be maintaining a lie within a week.

## Step 3: Confirm it actually gets read

This is the step people skip and then wonder why nothing changed. Writing the file does nothing if the assistant isn't loading it. Verify it.

Start a fresh session and ask something the file answers but you did *not* mention:

> "What payment system does this project use, and would you ever suggest Stripe?"

If the memory is wired up, it answers "QuickBooks, and no — you've ruled out Stripe" without you having said a word about payments this session. If it doesn't know, the file isn't being loaded, and you need to fix that before anything else — check your tool's docs for where it expects the file and what it's named. **Don't build on a foundation you haven't confirmed is there.** (I've learned that one the hard way more than once.)

## Step 4: When one file gets crowded, split and index

A single file is perfect until it's a few hundred lines and turning into a junk drawer. When that happens, don't keep growing the one file — switch to the pattern that scales: **atomic fact files plus a small index.**

One fact per file, each with a tiny bit of metadata so it's findable:

```markdown
---
name: payments-quickbooks
description: Why this project uses QuickBooks, not Stripe
---

Payments run through QuickBooks Online because contractors already keep
their books there. Stripe was considered and rejected — it would force
a parallel set of books. Don't suggest it.
```

Then keep one index file — the thing that's always loaded — with a single line pointing at each fact:

```markdown
# Memory Index
- [Payments: QuickBooks not Stripe](payments-quickbooks.md) — don't suggest Stripe
- [No contractor directory](no-directory-decision.md) — post-and-bid, deliberate
```

The index stays small and always-loaded; the detail lives in files the assistant pulls only when relevant. This is the same idea as a [zettelkasten](/blog/thinking-in-a-zettelkasten) — one idea per note, an index to find them — and it scales from ten facts to a thousand without the always-loaded part ever getting heavy. It's exactly how the long-term memory in my own setup is structured.

## Step 5: Prune, or it rots

Here's the discipline nobody mentions: **a memory file is only as good as the day you last cleaned it.** Wrong memory is worse than no memory, because the assistant will confidently act on a stale fact and you won't notice until it's caused a problem.

So two habits. When a decision changes, *update the file in the same breath* — don't let the memory and reality drift apart. And every so often, re-read the whole thing and delete anything that's no longer true. When I save a new fact, I check whether it duplicates or contradicts an existing one and fix that instead of piling on. Memory you don't weed becomes a swamp, and an assistant fed from a swamp gives you swamp answers.

## The mistakes to skip

A few traps, since you can avoid them for free by hearing them now:

- **Dumping transient junk in.** Today's task is not memory. Keep the file durable or it'll be wrong constantly.
- **Writing it once and never touching it.** The value is in the upkeep. A stale memory file actively misleads.
- **Reaching for a vector database on day one.** You do not need embeddings to remember twenty facts. A text file the model reads beats a search system you have to babysit, right up until you have hundreds of notes — and you'll know when you cross that line because the plain file will visibly stop being enough. Don't pay that complexity early.
- **Not verifying it loads.** Build nothing on top until Step 3 passes.

## Where this goes next

That's the first brick. A memory file is the smallest possible version of the idea that runs through everything I build: an AI that *persists* — that remembers you, your project, and your decisions — is a categorically different tool than one that resets every morning. You just built the seed of that.

From here it compounds. Add facts as you stop wanting to repeat yourself. Split to atomic files when it's crowded. Eventually you wire it to load the *right* notes automatically based on what you're doing — and at that point you're building toward the [perception and recall layers](/blog/the-brain-architecture) of something much bigger. But none of that matters if you skip the brick. Start with the file. Build it in the next half hour. Then watch how much you stop re-explaining your own work to a machine that should already know.
