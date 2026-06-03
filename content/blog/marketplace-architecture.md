---
title: Designing a Three-Sided Construction Marketplace
slug: marketplace-architecture
date: 2026-03-14
readTime: 9 min
tags: [Architecture, FTW]
category: Construction
author: James Walton
excerpt: Homeowners, contractors, and subcontractors all have different incentives. The bidding system, payment flows, and trust mechanics that make it work — and the one feature everyone expects that I deliberately left out.
---

Most marketplaces have two sides: people who want a thing and people who sell it. Construction has three, and pretending otherwise is why so much construction-tech feels wrong to anyone who's actually swung a hammer. A homeowner hires a contractor. A contractor hires subcontractors. Those are three different people with three different incentives, and a platform that only models two of them is missing the middle of how the work actually gets done.

FairTradeWorker models all three. That decision drives the architecture more than anything else, so it's where I'll start.

> The fastest way to lose a contractor's trust is to build a tool by a product manager who's never lost a bid. I built this from the spot where the bid gets lost.

## Three sides, three sets of incentives

**Homeowners** want the job done right, for a fair price, without getting taken. Their fear is overpaying or hiring someone who disappears halfway through a bathroom.

**Contractors** want qualified leads they can actually win, and they want to not waste their evenings writing estimates for jobs that were never real. Their fear is burning unpaid hours chasing tire-kickers.

**Subcontractors** want steady work from contractors they trust to pay them. Their fear is doing the work and fighting to get paid for it.

These aren't variations on one user. They pull in different directions, and the platform's job is to line the incentives up so that what's good for one isn't paid for by another. The whole design is incentive engineering before it's software.

## The decision everyone questions: no browsing contractors

Here's the feature people expect and I deliberately left out: **homeowners cannot browse contractors.** There's no directory, no list of profiles to scroll, no "find a pro near you" grid.

That sounds backwards until you've watched how the directory model actually plays out. A browsable directory turns into a beauty contest — the contractor with the best photos and the most reviews wins, not the one who's the best fit for *this* job at *this* price right now. It rewards marketing budget over craft. And it dumps the entire filtering burden on the homeowner, who is the person least equipped to judge which of forty profiles can actually do their job.

So I inverted it. The homeowner **posts the job.** Contractors who want it **bid.** The homeowner **reviews the bids** and picks. Post → bid → review. The work comes to the contractor instead of the contractor advertising at the work. That flips the platform's center of gravity from "who markets best" to "who wants this specific job and what will they charge for it," which is the question that actually matters. It was the hardest product call to hold the line on, and it's the one I'm most sure about.

## The bidding system

Bidding is where the three sides meet, so it carries the most design weight. A bid isn't just a number — it's a contractor spending real attention on a real job, and the system has to respect that on both ends.

For the homeowner, bids arrive as a small set of real offers on the job they actually described, not a wall of cold profiles to evaluate. For the contractor, the jobs they bid on are real — a posted job is a homeowner who took the time to describe what they need, which filters out a lot of the noise that makes lead-gen sites miserable. The goal on the contractor's side is simple and it's the thing every contractor I've talked to actually wants: **stop wasting evenings estimating jobs that were never going to happen.**

When a contractor needs help to deliver, the third side activates: they post sub-jobs, subcontractors bid on those, and the same post-bid-review loop runs one layer down. The architecture is recursive on purpose — the contractor is a "homeowner" to their subs. One mechanism, two layers.

## Payments, native to where the money already lives

I made an early call on payments that I'll defend hard: FairTradeWorker is built **QuickBooks-native**, not on a generic payments processor.

The reason is that contractors already live in QuickBooks. That's where their books are, where their invoices come from, where their accountant looks. A platform that makes them run a parallel set of books in some other payment system is asking them to do double-entry bookkeeping for the privilege of using your app. They won't, and they shouldn't have to. By building payments into the system they already use to run their business, the money flow fits their existing world instead of fighting it. Meet the trade where it already keeps its money.

## Trust is the actual product

Strip away the bidding and the payments and what a construction marketplace really sells is **trust** — a homeowner's confidence that the stranger they're about to let into their house will do good work and not vanish, and a sub's confidence that the contractor will pay.

That's why the brand is FairTrade*Worker* and why there's a FairTrade Promise behind it, not a tagline. The trust mechanics — verification, the reviewing-bids flow that puts the homeowner in control, the payment path that's transparent to both sides — aren't features bolted on top. They're the reason the marketplace can exist at all. Two strangers don't transact on a big, scary, expensive job without something in the middle vouching that the deal is fair both ways. Being that something is the entire business.

## Why this is the one I had to build

I've stood in the exact spot this platform is designed for. I've watched a good contractor lose a job because his honest estimate took three days while someone else guessed a number in an hour. I've seen subs do the work and then chase the check. This isn't construction-tech built from user interviews — it's built from the job site, by someone who lived the problem before he ever wrote a line of code to solve it. That's the only reason a three-sided marketplace with no contractor directory and QuickBooks-native payments makes sense: every one of those calls came from the trade, not from a whiteboard.
