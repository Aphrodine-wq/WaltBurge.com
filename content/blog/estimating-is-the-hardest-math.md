---
title: "Estimating Is the Hardest Math on a Job Site. So I'm Teaching It to a Machine."
slug: estimating-is-the-hardest-math
date: 2026-06-03
readTime: 6 min
tags: [Construction, ConstructionAI, Estimating]
category: Construction
author: James Walton
featured: true
excerpt: Everybody thinks the hard part of construction is the labor. It isn't. The hard part is the number you write down before any work happens — the estimate. Get it wrong by ten percent and you either lose the job or lose the profit. That number is what I'm training an AI to produce, and it's a harder problem than anything I've built in software.
---

Before I wrote a line of code, I wrote estimates. That's the part of construction nobody outside the trade understands. People picture the work — the framing, the concrete, the trim. The work is the easy part. You know how to do the work or you don't.

The hard part is the number you commit to *before any of it happens.* The estimate. You walk a job, you picture the whole thing finished in your head, and you write down a single dollar figure that you are then on the hook for. Guess high and the homeowner goes with the next guy. Guess low and you just volunteered to work for free on the back half of the job. There's no margin for "about right." Ten percent in the wrong direction is the difference between a good month and explaining to your wife why there isn't one.

That's the problem I'm building [ConstructionAI](/blog/fine-tuning-construction-llm) to solve. And I'll be honest — it's harder than anything I've done in pure software.

## Why it's hard for a computer specifically

Estimating looks like arithmetic. It is not arithmetic. It's arithmetic wrapped in a hundred judgment calls that never get written down.

A deck isn't "square footage times a number." It's: what's the soil like, how far is the lumber yard, is the homeowner going to change their mind about railings twice, is this the kind of inspector who measures everything, are joist hangers $4 or $9 this month, and is the back corner going to need a third footing because the grade drops off and you could *see* it drops off the second you walked the yard. None of that is in a spreadsheet. It's in the head of a guy who's built forty decks, and he can't fully explain how he knows — he just knows the number when he sees the job.

That's exactly the kind of knowledge that's miserable to write as rules and perfect to *train.* You can't write an `if` statement for "the grade drops off." But you can show a model ten thousand real jobs — scope, conditions, and what it actually cost when the dust settled — and let it learn the shape of the judgment the way a young guy learns it riding along on estimates for two years.

## What I'm actually feeding it

The model isn't learning to multiply. It's learning the gap between what a job looks like on paper and what it costs in the dirt. So the training data is built around that gap:

- **Scope in the language a contractor actually uses** — not "linear feet of dimensional lumber," but "12x16 deck, two steps, picture-frame border." The way it gets said on the phone.
- **The conditions that move the number** — access, grade, what's already there, what has to come out first.
- **Real outcomes** — what it was bid at and what it came in at, because the lie every estimate tells is that the bid and the actual are the same number. They rarely are, and the distance between them is the whole education.

Teach a model the first two and you get a calculator. Teach it the third and you start getting something that estimates like a person who's been burned before — which is the only kind of estimator worth trusting.

## Why I won't just use a generic AI for this

People ask why I don't just pipe job descriptions into a big general model and call it done. Because a general model has read the whole internet and built exactly zero decks. It'll give you a confident, articulate, *wrong* number, because it's pattern-matching on blog posts about decks instead of on what decks actually cost in north Mississippi when the lumber yard's an hour out and the grade drops off.

The knowledge that makes an estimate good is narrow, regional, and earned. It doesn't live on the internet. It lives in tradespeople, and most of them are going to retire with it still in their heads. [I'm trying to capture some of that](/blog/fine-tuning-construction-llm) before it walks off the job for good — not to replace the estimator, but to give the next guy a model that already rode along on ten thousand jobs he never got to see.

The labor was never the hard part. The number is the hard part. That's the one I'm building for.
