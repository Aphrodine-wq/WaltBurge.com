---
title: How I Think in a Box of Notes
slug: thinking-in-a-zettelkasten
date: 2026-06-02
readTime: 8 min
tags: [Systems, Development]
author: James Walton
excerpt: I keep a couple hundred atomic notes, each one idea, all linked to each other. It started as a way to remember things. It turned into the way I actually think.
---

I didn't set out to build a thinking system. I set out to stop forgetting good ideas. What I ended up with is a zettelkasten — a "slip box," German, the method a sociologist named Niklas Luhmann used to write a frankly absurd amount of work — and somewhere along the way it stopped being a place I *store* thinking and became the place I *do* the thinking. That's a bigger difference than it sounds, and it's the whole post.

The mechanics are dead simple: a couple hundred notes, each holding exactly one idea, each linked to the other notes it relates to. No folders-as-hierarchy doing the heavy lifting. The links are the structure. That's it. The magic isn't in the tooling — it's in two rules that sound like constraints and turn out to be the engine.

> A folder is where an idea goes to be filed and forgotten. A link is where two ideas meet and make a third. The whole method is choosing links over folders.

## Rule one: one note, one idea

Every note holds a single thought. Not a meeting. Not a project. Not "things about marketplaces." One idea, stated once, in a note small enough that you could read it in twenty seconds.

This feels fussy until you've done it for a while, and then you realize the constraint is doing something sneaky. **Forcing an idea down to one note forces you to actually know what the idea is.** You can't link a vague blob to anything useful. The discipline of "what is the single claim here" is the discipline of thinking clearly, smuggled in as a filing rule. Half the time I sit down to write a note, the act of trying to make it atomic reveals that I had two ideas tangled together, or that I didn't actually have an idea at all — I had a vibe. The note is where the vibe either becomes a thought or gets exposed as nothing.

A construction parallel, because I can't help it: a clear idea is like a properly dimensioned cut. "About eight feet" frames nothing. "Ninety-three and a quarter" builds a wall. The atomic note forces the measurement.

## Rule two: link, don't file

Here's where it stops being note-taking and becomes thinking. When I write a new note, I link it to the existing notes it relates to. Not "file it under the right category" — *connect it to specific other ideas.*

The act of asking "what does this connect to" is the thinking. To link a new idea, I have to go find the related ones, which means I'm re-reading old thoughts in the light of a new one, which is exactly the moment connections happen. An idea I had about marketplace liquidity in one project turns out to be the same shape as a problem in a totally different one — I'd never have noticed if linking hadn't *made* me go look. The box doesn't store connections I already knew about. It manufactures connections I didn't.

After a couple hundred notes, the links form a graph, and the graph has properties no folder tree ever has. Dense clusters show me where my thinking is deep. Lonely notes show me ideas I haven't developed. And a single new note can suddenly bridge two clusters that were never connected — which is, as far as I can tell, what "having an insight" actually is, mechanically: two known things touching for the first time.

## Why it has to be plain text I own

The notes live in plain markdown on my own disk, version-controlled like code. That's not an aesthetic choice and it's the same stubbornness that runs through everything I build — [own the model](/blog/build-your-own-model), own the memory, own the tools. A thinking system you rent is a thinking system someone else can deprecate, paywall, or read. My second brain is not going to live somewhere a company can change the terms on my own thoughts.

Plain text also means the notes outlive any app. I can open them in any editor, on any machine, in twenty years. A box of notes you can't open in the future isn't a thinking tool — it's a time bomb. Markdown defuses it.

## How it plugs into the rest

This box of notes isn't separate from the AI work — it's the long-term memory of the [Brain](/blog/the-brain-architecture). The same notes I write to think with get pulled back into my AI sessions automatically when they're relevant, so the thinking I did in March shows up exactly when I need it in June without my having to remember it exists. The zettelkasten is where I think; the Brain is what makes that thinking *recallable* at the moment it matters. One is the practice, the other is the retrieval.

But I want to be clear that the value stands on its own, no AI required. Even if I unplugged every model tomorrow, the box of notes would still be the best thinking tool I have, because the thinking happens in the writing and the linking — not in the retrieval. The AI makes it faster to find. It doesn't make it true.

## The honest catch

It's slow at first and it pays off late. For the first fifty notes it feels like overhead — you're filing thoughts into a system that hasn't earned its keep yet, and the temptation to quit and go back to a messy document is real. The payoff only shows up once the graph is dense enough that links start surprising you. You have to build it on faith before it builds anything back.

But that's true of most things worth having. You frame a lot of wall before the house looks like anything. The zettelkasten is the same trade: do the atomic, link-disciplined work long enough and one day you go looking for one idea and walk out holding three, two of which you forgot you knew. That's the day it stops being a filing cabinet and starts being a mind.
