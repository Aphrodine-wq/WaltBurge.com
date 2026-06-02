---
title: Why I Run Four AIs at Once
slug: running-four-ais-at-once
date: 2026-06-02
readTime: 8 min
tags: [AI, Development]
author: James Walton
excerpt: Claude, Codex, Gemini, and MiniMax — four different models, wired so I can route a task to the best one, run them in parallel, or have them check each other's work. Here's why one model is rarely the right answer.
---

I work with one AI as a cofounder — Claude, all day, the one I think out loud with. But for the actual production of code and answers, I don't bet everything on a single model. I keep four wired up: Claude, Codex (OpenAI), Gemini (Google), and MiniMax. Not because more is automatically better, but because they're genuinely different, and the difference is exactly the thing a solo builder can turn into an edge.

The instinct most people have is to pick "the best model" and use it for everything. That's the wrong frame. There's no best model; there are models with different strengths, and the move is to use the right one for the job — or, when the stakes are high enough, to use several and make them argue.

> One model is one opinion. The expensive mistakes are the ones a single confident model talks you into. A second opinion isn't redundancy — it's how you catch the confident wrong answer.

## They're actually different

If the four models were just reskins of the same thing, running all of them would be theater. They're not. They have real, repeatable personalities:

- **Claude** is the one I reason with — strong at long-context thinking, careful work, and being a partner rather than a vending machine. It's my default cofounder.
- **Codex** leans hard into code generation and automated editing — point it at a refactor and let it grind.
- **Gemini** brings current web information through Google's search and is strong at chewing on a big codebase's architecture. When the task needs *fresh* facts or a wide read, that's its lane.
- **MiniMax** is the long-context, creative-generation, multilingual one — a genuinely different fourth perspective rather than a clone of the other three.

Knowing those lanes is most of the value. A task that's "refactor this module" goes to a different model than "what changed in this library last month" than "think through this architecture with me." Routing the task to the model whose strength it matches beats forcing one model to be mediocre at everything.

## Three ways I actually use them

**Routing — send the task to the right specialist.** Most of the time this is all it is. The work has a shape, one model fits that shape best, it goes there. No drama, just don't ask the creative-writing model to audit your security and don't ask the code-grinder to think with you about strategy.

**Parallel — fan the same task out and compare.** When I genuinely don't know the best approach, I'll hand the same problem to several models at once and look at what comes back. Four takes on the same question surface the option I wouldn't have thought of, and they surface it fast, because they ran at the same time instead of me iterating with one model four times in a row.

**Cross-validation — make them check each other.** This is the one that earns its keep. For anything high-stakes, I have one model produce the work and another try to tear it apart. When they agree, my confidence is real. When they *disagree*, that disagreement is a flare over exactly the spot that needs a human — me — to look closely. The disagreement isn't a problem to resolve away. It's the most valuable signal in the whole setup, because it points straight at the thing that isn't as settled as one confident model made it sound.

## Why this matters more when you're solo

On a team, the second opinion is built in. Someone reviews your pull request, someone questions your approach in standup, someone says "wait, are you sure about that." When you ship alone, all of that is missing, and the failure mode of solo work isn't being wrong occasionally — it's being *confidently* wrong with nobody in the room to flinch.

A single AI doesn't fix that, because a single AI will confidently agree with the framing you handed it. It's one voice, and it's a voice that's inclined to be agreeable. Four voices with different strengths, set up to disagree, is the closest a solo builder gets to a room full of people who'll tell you you're wrong. I'd rather hear it from four models in private than from a customer in production.

This is the same logic as the [verification layer](/blog/formal-verification-team-of-one) — when you're the whole team, you have to manufacture the second set of eyes, because there isn't a natural one. Multiple models is one way to manufacture it. Formal verification is another. They catch different things, so I use both.

## The honest cost

Running four models is more setup, more cost, and more output to read than running one, and it would be silly to do it for everything. Most tasks don't need a panel — they need one good model and a quick check. The discipline is reserving the heavy machinery for when it's worth it: the architectural fork in the road, the security-sensitive change, the decision that's expensive to get wrong. For the daily grind, you route to one model and move. For the call you can't afford to blow, you convene the panel and let them fight.

That's the whole philosophy. Not "more AI is better." It's "no single model is the answer to everything, and the disagreements between good models are worth more than the agreement of any one of them." Use the right one for the job. And when the job is too important to trust one opinion, get four — especially the ones that don't agree.
