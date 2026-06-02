---
title: "I Don't Call an AI API. I Own the Model."
slug: build-your-own-model
date: 2026-06-02
readTime: 9 min
tags: [AI, ConstructionAI, Development]
author: James Walton
excerpt: The easy path was a few cents per call to someone else's model. I fine-tuned my own instead — and the reasons have almost nothing to do with the per-call price.
---

When I tell people I trained my own model for construction estimation, the first question is always some version of "why not just use the API?" And it's a fair question. Calling a frontier model is easy, it's cheap per request, and it's good. I use those models every day to *build* things. But the thing my business runs on — the estimation engine inside ConstructionAI — is mine. I fine-tuned it, I own the weights, and it runs on infrastructure I control. The [how is its own post](/blog/fine-tuning-construction-llm). This one is the why, because the why is the part people get wrong.

> Renting intelligence is fine until the intelligence becomes the business. The moment your product *is* the model's output, you don't want to be a tenant.

## "Cheap per call" is the wrong frame

Start with the money, because that's where everyone starts. Yes, an API call costs a few cents. My fine-tuned model, running on serverless GPU, costs somewhere around **two-tenths of a cent per estimate** — roughly $0.002. So it's cheaper. But honestly, if the only argument were cost, I'd have stayed on the API and not thought twice. A few cents a call doesn't sink a business.

The cost frame is wrong because it treats the model as a commodity input, like electricity. It isn't. For ConstructionAI, the model's output *is the product.* When the thing you sell is the model's answer, three things matter way more than the per-call price: whether the answer is right for *your* domain, whether the price and the rules can change out from under you, and whether you actually own the thing customers are paying for. The API loses on all three.

## Reason one: a general model doesn't know construction

A frontier model knows a little about everything. It's read the whole internet. But it has never stood in a half-framed house in Mississippi and priced out the rest of the job. Ask it to estimate and it gives you a plausible national-average answer that's confidently wrong for a real bid in a real market.

My model has seen the work. It's fine-tuned on a large body of construction estimation examples — real line items, real material-and-labor breakdowns, the actual shape of how a job gets priced. It's not smarter than a frontier model in general. It's *narrower and deeper* exactly where my business lives. That's the trade: I gave up the ability to write poetry to get an estimate I'd actually put my name on. For a construction estimation product, that's not a hard call.

This is the part the API can't fix with a better prompt. You can prompt a general model toward construction, but you're renting a tourist and asking it to act like a local. I'd rather train the local.

## Reason two: I refuse to build my business on someone else's terms

Here's the one that actually keeps me up. If my product depends on calling someone else's model, then someone else controls my margins, my availability, and my rules. They can raise the price. They can deprecate the model version I built on and force a migration. They can change the usage policy. They can have an outage on the day a contractor needs an estimate to win a bid. None of those are hypothetical — every one of them has happened to somebody building on an API.

I came up in construction. You don't build a house on a foundation you don't control, and you don't run a business on a supplier who can change the deal whenever they want and you have no other option. **Owning the model is owning the foundation.** The weights sit on my disk. The thing runs on infrastructure I can move. If every AI company changed their terms tomorrow, ConstructionAI keeps running. That's not paranoia — that's the same instinct that makes a contractor own his most important tools instead of renting them by the day.

## Reason three: it compounds, and a rental doesn't

When I improve my model, I keep the improvement forever. Every round of training data I curate, every correction a real estimate teaches it, every version — that's an asset that accrues to me. The model gets better at *my* problem over time and that compounding belongs to my business.

An API doesn't compound for you. You get better at prompting it, sure, but the asset is theirs. You're renting a better and better apartment; you're never building equity. For a tool I use to build other things, renting is perfect — I want the frontier and I want it maintained by people smarter than me at that specific job. But for the core of a product I'm trying to turn into a company, I want to own the thing that gets more valuable.

## When renting is the right call

I want to be fair here, because "build your own model" is terrible advice for most situations and I'd be lying if I pretended otherwise. If the model is a *tool you use* rather than *the product you sell*, rent it. Use the frontier. I do — constantly. Don't fine-tune your own model to write your marketing copy or answer support tickets; that's lighting money and months on fire to reinvent something better that already exists.

The line is simple: **is the model's output your product, or just an ingredient in how you work?** If it's an ingredient, rent the best one. If it's the product — if customers are paying you for what the model says — then own it, narrow it to your domain, and build the asset. ConstructionAI is the second kind. So it's mine.

That's the whole philosophy. The frontier models are extraordinary and I'm not too proud to lean on them every single day. But the estimate a contractor stakes a bid on? That comes from a model that's seen the trade, that I own outright, and that can't be taken away when someone else changes their pricing page.
