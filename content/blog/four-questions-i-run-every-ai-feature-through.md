---
title: "The Four Questions I Run Every AI Feature Through"
slug: four-questions-i-run-every-ai-feature-through
date: 2026-06-03
readTime: 8 min
tags: [AI, AI Ethics, Product]
category: AI
author: James Walton
featured: true
excerpt: AI ethics gets talked about like a corporate compliance chore or a Twitter fight. For me it's a checklist I run before I ship — four questions, drawn from four ethical traditions, that have actually killed features I wanted to build. Here's the checklist, and what it costs to honor it.
---

Most "AI ethics" content is one of two things: a corporation publishing principles it has no intention of being constrained by, or people online fighting about killer robots. Neither helps you decide whether the feature you're building this afternoon should ship.

I needed something I could actually use, so I stole one. Philosophers have spent two thousand years building frameworks for "is this the right thing to do." Four of those traditions map cleanly onto AI decisions, and together they make a checklist. I run every AI feature through all four before it ships. When a feature fails one, I don't ship it — and I've killed features I really wanted because of this. That's the test of whether an ethics framework is real: does it ever cost you anything? This one does.

## Question 1 (Utilitarian): Does this create more benefit than harm — across *everyone* it touches?

Utilitarianism: greatest good, greatest number. Easy to say, sneaky to apply, because the harm usually lands on someone who isn't in the room when you build.

[My estimation AI](/blog/estimating-is-the-hardest-math) produces a number a contractor bids on. Watch where the harm hides: an underestimate wins the contractor the job and then quietly eats his margin for the next three weeks — his crew, his family, absorb the miss. An overestimate protects his margin and loses him the job. The AI is making a trade-off between two real people's interests every time it returns a number, whether I designed for that or not.

The utilitarian answer isn't "optimize the number." It's **honesty about the trade-off.** Don't hide risk behind a single confident figure. Show the range, show where the model is least sure, show who bears the cost of it being wrong. Utilitarian honesty beats utilitarian optimization, because a system that hides its uncertainty isn't maximizing anyone's good — it's maximizing the appearance of certainty, which is a harm wearing a tie.

## Question 2 (Deontological): Does this respect people's rights — even when violating them would help?

Deontology: some things are wrong regardless of outcome. This is the framework that says "but it would improve the model" is not a sufficient answer.

The hard one in my world: is it okay to train a model on one contractor's historical bid data in a way that helps his competitor win against him? Even if the aggregate product makes the whole industry better — does that violate his right to his own competitive intelligence? Deontology says the aggregate good doesn't get to launder the individual violation.

So every system I build gets a **deontological floor** — things I will not do with user data no matter how much it would help the metrics:

- Never train on one client's data to benefit their direct competitor.
- Never use surveillance-style tracking, even when it would sharpen the output.
- Always allow deletion. The right to be forgotten is not negotiable against model quality.
- Be transparent about what the AI sees and what it decides.

That floor costs accuracy. I keep it anyway, because a floor you'll lift when it's expensive was never a floor.

## Question 3 (Virtue): Would I be proud to explain this to a framing crew?

Virtue ethics looks at the character of the builder, not just the act. The same feature can be virtuous or extractive depending entirely on *why* you built it — and you usually know which one it is, even when the metrics look identical.

My test is specific and I use the literal words: **would I be proud to explain this to a framing crew?** Not to a board, not to a conference — to the guys in the field who'll be on the other end of it. If I'd have to dress it up, soften it, or hope they don't ask the obvious follow-up, I have my answer. A feature built to genuinely help a contractor and a feature built to lock him in can look the same in a demo. The crew can always tell the difference, because they're the ones it happens *to*. Building like they're watching is the whole discipline.

## Question 4 (Care): Does this protect the person with *less* power?

Care ethics is about relationships and the people affected — especially whoever has the least say. Construction runs on power imbalances: GCs over subs, developers over contractors, the office over the field, the company over the homeowner who's never priced this work and doesn't know the going rate. The question is whether my AI flattens those gaps or deepens them.

This one isn't abstract for me — it's the reason [FairTradeWorker](/blog/why-homeowners-cant-browse-contractors) exists and why "fair" is in the name instead of in the marketing. Fair doesn't just mean accurate. It means the tool should hand the small contractor the same estimation intelligence the big firm already has. It should surface the information that protects whoever has less leverage in the negotiation. It should remember that a lowballed estimate isn't a data point — it's someone's crew not getting paid right. [I came up on the losing end of those imbalances](/blog/i-run-my-codebase-like-a-job-site), so I know exactly who the tool has to protect, because for years it should have been protecting me.

## The checklist, and the point of it

| Framework | The question | Kills the feature when… |
|-----------|--------------|--------------------------|
| Utilitarian | More benefit than harm across *all* stakeholders? | It hides who pays for being wrong |
| Deontological | Respects rights regardless of outcome? | "But it improves the model" is the only defense |
| Virtue | Proud to explain it to a framing crew? | You'd have to dress it up |
| Care | Protects the party with less power? | It widens an existing imbalance |

Here's what makes this real instead of decoration: any single failure is a veto. Not a deduction, not a note for later — a stop. A feature with great numbers that fails the care question doesn't ship with an asterisk. It doesn't ship.

That's the only version of AI ethics I trust — not a published principle, but a gate that has actually turned me back. [AI's failures aren't usually technical, they're failures of judgment about who gets hurt](/blog/i-dont-ask-if-my-ai-is-conscious), and judgment is exactly what a checklist is for. Anybody can write principles. The question is whether yours has ever cost you something you wanted. If it hasn't, it isn't ethics. It's marketing.
