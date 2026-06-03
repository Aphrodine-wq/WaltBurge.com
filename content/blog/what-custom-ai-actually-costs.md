---
title: "What Custom AI Actually Costs a Small Business in 2026"
slug: what-custom-ai-actually-costs
date: 2026-06-02
readTime: 7 min
tags: [AI, AI Consulting, Cost]
category: AI
author: James Walton
featured: false
excerpt: The honest numbers on what it costs to build, train, and run custom AI for a small business — not the enterprise figures, not the agency markup. What you actually pay for a model that knows your business, broken down line by line by someone who builds them.
---

Search "what does custom AI cost" and you get two useless answers: a McKinsey PDF quoting millions, and an agency landing page that says "it depends, book a call." Both are designed to make you feel like this is out of reach. It isn't, and the people telling you it is usually want either the consulting retainer or the enterprise contract.

I build these for small businesses. Here's the real breakdown, line by line, in numbers a contractor or a shop owner can actually act on.

## The three costs, separated

Most quotes are useless because they blend three very different things into one scary number. Separate them and it gets clear fast:

1. **Training** — teaching a model your business. One-time, per version.
2. **Running it** — what it costs every time the model answers. Ongoing, scales with use.
3. **Building the thing around it** — the app, the integration, wiring it into how you work. One-time, where most of the real cost actually lives.

The headlines quote a fourth thing — building a foundation model from scratch — which costs millions and which no small business should ever do. You're not doing that. You're standing on a free, already-trained open model and teaching it your slice. Take that off the table and the numbers get human.

## What training actually costs

This is the part people think is expensive and it's the cheapest line on the page. [Fine-tuning an open model](/blog/build-your-own-model) on your data is rented GPU time, billed by the hour. A focused model for one business task is often **single-digit to low-double-digit dollars of compute per training run** — I've trained construction models for [the price of a lunch](/blog/gpu-rig-pixel-art). You'll run training a handful of times as you refine it. Call the whole training budget a few hundred dollars of compute across the life of the project, and you're being generous.

The real training cost isn't the compute. It's **assembling the data** — getting your knowledge into a form the model can learn from. That's labor, yours or mine, and it's where a real consultant earns their keep. Budget your time or my time here, not your GPU bill.

## What running it costs

Two roads:

- **Self-hosted (you own the hardware or rent a small server):** near-zero marginal cost per answer. A model sized for one business task runs on modest hardware. You're paying for a server, not per-question. This is the road that makes owning beat renting at volume.
- **Hosted for you:** pennies per interaction, no hardware to babysit. Fine for low volume, and it adds up exactly like the rental model it resembles.

The whole financial case for owning is here: rent and you pay per use forever; own and the per-answer cost falls toward zero. If you use AI a lot for one thing, owning wins. If you barely use it, it doesn't — and I'll tell you that before you spend a dollar.

## What building the thing costs

This is the honest big number, and it's not the AI part — it's the software around it. A model is just an engine. Turning it into something your team actually uses — a clean interface, hooked into your existing tools, reliable enough to trust — is real engineering, and it's where most of a project's budget goes. This is the line that "it depends" is hiding. It depends on how deep it wires into your business: a standalone tool that drafts estimates is modest; something threaded through your scheduling, invoicing, and customer records is a real build.

## So what's the number

For a small business with one clear, repeated, knowledge-heavy task, a custom AI that genuinely knows your business is a **low-thousands project, not a six-figure one** — most of it the build, a little of it the training, almost none of it the compute. The ongoing cost can be near-free if you self-host. That's the range nobody states plainly because plain numbers don't sell retainers.

The catch, again, because I'd rather you hear it twice than get sold: this only pays off for a task you do constantly where being right about *your* business matters. For anything else, [rent ChatGPT and keep your money](/blog/your-business-doesnt-need-chatgpt).

---

*I build custom AI for small businesses at small-business prices — I came up in construction, I'm not an agency, and I won't quote you enterprise numbers for a one-task model. If you've got a task in mind, [tell me what it is](/#contact) and I'll give you a real range, free, before you commit to anything.*
