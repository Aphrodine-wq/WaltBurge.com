---
title: "I Built the Marketplace for a Truck, Not a Desk"
slug: marketplace-for-a-truck-not-a-desk
date: 2026-06-09
readTime: 5 min
tags: [Construction, Mobile, FairTradeWorker]
category: Construction
author: James Walton
excerpt: Contractors don't run their business from an office chair. They run it from the cab of a truck between job sites, with one hand on the wheel and a phone going off in the cupholder. So when I built FairTradeWorker, the app wasn't the afterthought. It was the whole thing.
---

I spent enough years on job sites to know exactly where a contractor reads a new bid request. It's not at a desk. It's in the truck — parked outside a supply house, sandwich in one hand, phone propped against the steering wheel, ten minutes before the next walkthrough. That's the actual moment a job gets won or lost.

So when I built [FairTradeWorker](/work/fairtradeworker), I didn't build a website and then squeeze it onto a phone. I built the phone app first and treated the desk as the afterthought. The marketplace lives where the contractor lives — in their pocket.

> Most construction software is designed by people who have never had drywall dust on their phone screen. You can feel it the second you open it.

## The whole loop has to fit in a thumb

Here's the test I held everything to: can a contractor run the entire job — find it, bid it, win it, get paid for it — without ever sitting down? If any step needed a laptop, that step was broken.

So the full marketplace loop is native, on the phone, across three different people who use it three completely different ways:

- A **homeowner** posts a job from their couch — photos, description, the AI gives them a fair-cost estimate before a single bid lands, so nobody gets fleeced.
- A **contractor** gets the request as a notification in the truck, sees a real estimate range, and fires back a bid in under a minute.
- A **subcontractor** picks up the specialty work — the framing, the electrical, the screen porch — through the same app, same flow.

Three roles, one codebase, thirty-plus screens. Built in React Native so it's genuinely native on both phones, not a webpage in a costume.

## Real-time, because a bid is a race

The part that mattered most is the part you don't see: bids and messages move in real time. When a homeowner posts, contractors don't find out tomorrow in a digest email. They find out now. When a bid comes in, it lands now.

I wired that over a STOMP WebSocket connection to the same backend the web app uses — one source of truth, [a Java service](/work/fairtradeworker) doing the heavy lifting, so a contractor on the app and a homeowner on the web are looking at the same live job, not two copies drifting apart. In a marketplace, latency isn't a polish item. The fast bid wins. If the app is slow, the contractor loses money, and they'll feel it before they can name it.

## The unglamorous part

The honest truth about mobile is that the demo is easy and the edges are brutal. A contractor loses signal in a basement mid-bid. A photo upload dies on rural Mississippi LTE. The phone rings — an actual phone call — right in the middle of the flow. Desktop software gets to pretend none of that exists. A truck app doesn't get that luxury.

So most of the real work was the stuff that never makes a screenshot: holding state when the network drops, making uploads survive a dead zone, making sure a half-finished bid is still there when they come back. That's not glamorous. It's the difference between an app a contractor trusts with a job and one they delete after the first time it eats their work.

## Why this is the build, not a feature

Plenty of platforms have a mobile app. It's the second-class citizen — a scaled-down view of the "real" product that lives on the web. I flipped it. The phone is the real product. The web is the convenience.

That choice came straight off the job site. The people I'm building this for don't have an office day and a field day. It's all field. If the tool doesn't work in the cab of a truck with one bar of signal and a customer waiting, it doesn't work.

Want the same thing built for how your business actually runs? [Here's what I build.](/services)
