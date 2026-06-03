---
title: "Your Business Doesn't Need ChatGPT. It Needs Its Own Model."
slug: your-business-doesnt-need-chatgpt
date: 2026-06-03
readTime: 7 min
tags: [AI, AI Consulting, Small Business]
category: AI
author: James Walton
featured: false
excerpt: Most small businesses bolting AI onto their workflow are renting someone else's model and hoping it learns their world. It won't. Here's the difference between renting intelligence and owning it — and why owning it is finally cheap enough for a small business to do.
---

Every week a business owner tells me they "added AI." What they mean is they pay $20 a month for ChatGPT and paste their work into it. That's not adding AI to your business. That's renting a stranger's brain that has never seen your business and never will.

There's a better model — literally. You can own one. And the gap between renting and owning is the difference between an AI that sounds smart about your industry and one that actually knows *your* business. I want to walk through that gap, because most "AI consultants" won't, since the renting version is the only one they know how to set up.

## What you're actually renting

A general model like ChatGPT read most of the public internet. That makes it a phenomenal generalist and a mediocre specialist. Ask it about your trade and it gives you the *average* of everything ever written about your trade online — which is to say, the beginner version, because beginners write most of the content. It has never seen your pricing, your customers, your past jobs, the way you actually talk to a client. It's guessing, fluently.

For a lot of tasks, fluent guessing is fine. Draft an email, summarize a doc — rent the brain, it's great at that. But the moment the task depends on knowledge specific to *you* — your numbers, your process, your judgment — the rented brain hits a wall it can't see, and confidently walks straight into it.

## What it means to own one

Owning a model means taking a capable open base model and [training it on your world](/blog/build-your-own-model) until your knowledge is baked into its weights, not pasted into a prompt. I did exactly this for construction estimating — took an open model and [fine-tuned it on how the trade actually prices work](/blog/fine-tuning-construction-llm) until it estimated like someone who'd been on job sites, not like someone who'd read about them.

The practical differences for a business:

- **It knows your specifics by default.** You stop re-explaining your business in every prompt. The knowledge lives in the model.
- **It runs on hardware you control.** Your customer data, your pricing, your records never leave to train someone else's product. [Privacy is the architecture](/blog/give-your-ai-a-memory), not a setting.
- **It doesn't change under you.** Rented models get updated, deprecated, repriced, and quietly made dumber at your specific task whenever the vendor reshuffles. Yours sits still and does its job.
- **The cost flips.** Renting is a forever bill that scales with usage. Owning is mostly a one-time training cost and then near-free to run. At volume, that math gets lopsided fast.

## "But isn't training a model expensive and hard?"

It used to be. That's the part that's changed, and it's why I bring it up to small businesses now instead of telling them to wait. The open base models got good. The training tooling got cheap. [I train models for a few dollars of rented GPU time](/blog/gpu-rig-pixel-art), not the millions the headlines quote — those numbers are for building a model from nothing, which you'd never do. You're not building GPT from scratch. You're taking a great free brain and teaching it your job. That's an afternoon of compute, not a research lab.

The honest catch: it only pays off when you have a specific, repeated, knowledge-heavy task — estimating, drafting proposals from your templates, answering customers from your actual policies. If your AI use is "occasionally write an email," keep renting, save your money. Owning a model is for the thing you do a hundred times a week where being *right about your business* matters.

## How to tell which one you need

Ask one question: *is the task limited by general writing ability, or by knowledge of my specific business?* If it's writing ability, rent — ChatGPT is great and you're done. If it's knowledge of your business, no amount of clever prompting fixes it, because the knowledge isn't in the rented brain to begin with. That's the line. Most businesses I talk to are on the wrong side of it and don't know there's another side.

---

*This is what I do — I build custom AI for small businesses that have a real, repeated task worth owning a model for. If you're not sure which side of that line you're on, [tell me about the task](/#contact) and I'll tell you straight whether it's worth it. No pitch if the answer is "just use ChatGPT" — sometimes it is.*
