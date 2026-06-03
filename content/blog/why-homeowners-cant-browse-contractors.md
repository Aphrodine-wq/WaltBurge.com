---
title: "I Built a Contractor Marketplace Where You Can't Browse Contractors"
slug: why-homeowners-cant-browse-contractors
date: 2026-06-01
readTime: 6 min
tags: [Construction, FairTradeWorker, Product]
category: Construction
author: James Walton
featured: false
excerpt: Every contractor platform works the same way — a directory of profiles, reviews, and stars, and you pick. I built mine so the homeowner can't see a single contractor profile until after they've posted the job. That sounds backwards. It's the most important decision in the whole product, and it comes straight from how hiring actually works in the trade.
---

Every contractor marketplace you've used works like a restaurant menu. Rows of contractor profiles, headshots, star ratings, "responds in 2 hours" badges. You scroll, you compare, you pick. It's the obvious design. It's what Angie's List, Thumbtack, all of them do.

[FairTradeWorker](/blog/marketplace-architecture) doesn't let you do that at all. A homeowner cannot browse contractors. There's no directory to scroll, no profiles to compare, no stars to sort by. You describe the job first. Then contractors bid on it, and *only then* do you see who's competing for your work.

People hear that and think I forgot to build the main feature. I didn't. Removing the directory is the main feature, and it's the decision I'm most sure about in the entire product.

## What the directory actually does

I spent years on the contractor side of this. So I know what the "browse and pick" model does in practice, because I lived inside it.

A directory rewards the wrong things. It rewards whoever has the most reviews — which means whoever's been on the platform longest, not whoever's best for *your* job. It rewards the contractor with time to game his profile, which is rarely the one who's busy because he's good. It rewards a good headshot and a slick bio. The actual question — *can this person do my specific job well, at a fair price, on a timeline that works* — is the one thing a row of profiles can't answer, because none of those profiles have looked at your job.

And it quietly punishes the homeowner. You're asked to evaluate contractors with the one piece of information you don't have: which of these people is right for work you haven't even described yet. So you fall back on stars and gut feel, which is exactly how people end up with the wrong contractor and a half-finished kitchen.

## How hiring actually works in the trade

Here's the thing the directory model gets wrong about construction: nobody good gets hired off a profile. They get hired because they looked at the job and said the right things about it.

The real signal — the one a homeowner can actually judge — is *how a contractor responds to your specific project.* Did the bid show he understood the scope? Did he catch the thing you didn't mention but should have? Is the number honest or is it a lowball he'll claw back in change orders? You can't see any of that in a directory. You can only see it once he's looked at *your* job and told you what he thinks.

So I flipped the order. Post the job first. Contractors who want it bid on it. Now the homeowner is comparing the one thing that matters — real responses to their real project — instead of comparing headshots. The evaluation happens on the actual work, the way it does when you hire a contractor the old-fashioned way, off a referral, by talking about the job.

## Why this is harder to build and worth it anyway

A directory is easy. It's a database of profiles and a search box. What I built is harder — it's a two-sided loop where the job has to be describable by someone who isn't in the trade, routed to the right contractors, and turned into bids a normal person can actually compare. That's real product work, and it's slower than slapping up profile pages.

But the easy version optimizes for the platform, not the homeowner. A directory keeps people scrolling, keeps contractors paying to rank higher, keeps everyone on the site. The post-first version optimizes for *a good hire happening* — which is the only thing the homeowner actually came for.

I'm not building the marketplace that's easiest to build. I'm building the one I'd have wanted on the other side of the truck. You don't pick a contractor off a menu. You describe your job and see who steps up. The software should work the way the trade already does.
