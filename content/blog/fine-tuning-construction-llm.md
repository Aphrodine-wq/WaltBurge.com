---
title: Fine-Tuning a Construction Estimation LLM from Scratch
slug: fine-tuning-construction-llm
date: 2026-04-06
readTime: 12 min
tags: [AI, ConstructionAI]
category: Construction
author: James Walton
excerpt: No existing AI understands construction pricing at the line-item level. So I built one — 18,000+ training examples, custom distillation pipeline, deployed on RunPod for $0.002 per estimate.
---

Ask a general-purpose LLM to estimate a bathroom remodel and it will give you a confident, beautifully-formatted answer that's wrong. It hallucinates line items, invents prices, and has no idea that demo and haul-off is a real cost or that tile labor is priced by the square foot in your market and not in California. Generic models don't understand construction pricing at the line-item level, because nobody trained them to. So I did.

## Why a custom model at all

The obvious move is to wrap GPT or Claude in a prompt and call it estimation. I don't build that way — I'd rather own the thing I depend on than rent it and be locked into someone else's roadmap and someone else's per-token bill. A fine-tuned model I control is cheaper at scale, runs where I want it, and gets better every time I improve the data. So ConstructionAI is a fine-tune of **Llama 3.1 8B**, built specifically to produce line-item construction estimates.

## The data is the whole game

Fine-tuning is easy. Getting the data right is the entire project. The first version trained on **18,000+ curated examples** covering residential and commercial trades — each one a realistic job mapped to a structured estimate with material quantities, labor hours, and market-adjusted pricing.

Hand-writing that volume is impossible, so the pipeline leans on distillation: generate synthetic estimation examples from larger models, then curate hard. The curation is where the quality lives — bad synthetic data teaches the model to hallucinate more confidently, which is worse than not training at all.

```
raw trade knowledge + real estimates
        │  distill from larger models
        ▼
   synthetic examples (hundreds of thousands)
        │  curate, dedupe, validate against real prices
        ▼
   training set  →  fine-tune Llama 3.1 8B
        │
        ▼
   eval against held-out real jobs
```

## Deployment: cheap enough to be free

The model runs on **RunPod Serverless** at roughly **$0.002 per estimate**. That number matters more than it looks. At a fifth of a cent, estimation is effectively free to the product — I can put it everywhere in FairTradeWorker and MsHomePros without thinking about cost per call. A homeowner gets an instant fair-price read before a single contractor bids. A contractor gets a professional line-item estimate out the door in seconds instead of three days. That speed is the difference between winning and losing the job.

## Where it's going

The current pipeline is scaling toward **500K+ training examples** — bigger, cleaner, with a stronger base model and tighter curation. The eval bar is honest accuracy against held-out real jobs, not vibes. I bet on going over 90% once; I lost that bet at ~88% and learned exactly which trades the model was weakest on. That's the loop: ship, measure against reality, fix the data, retrain.

> No existing AI understood construction pricing. The fix wasn't a better prompt — it was owning the model and the data behind it.

The lesson that generalizes past construction: when the tool you need doesn't exist, the answer isn't to contort a general model into pretending. It's to build the specialist and own it.
