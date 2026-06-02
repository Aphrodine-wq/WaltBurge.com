---
title: Formal Verification for a Team of One
slug: formal-verification-team-of-one
date: 2026-06-02
readTime: 10 min
tags: [AI, Systems, Development]
author: James Walton
excerpt: Formal verification has a reputation as something only PhD teams at aerospace companies use. I'm a self-taught construction guy shipping solo, and I built a verification layer into my workflow. Here's why, and how it actually pays off.
---

Formal verification sounds like something that happens in a lab. Mathematical proofs that code is correct, the kind of thing NASA does for flight software and the rest of us are told we can't afford. I'm a construction guy who started coding seven months ago and I ship mostly alone. By that reputation, formal methods are the last thing I should be touching.

I built a verification layer into my workflow anyway. I call it AEON, and it's become one of the most load-bearing tools I have — precisely *because* I ship alone. The reasoning is the opposite of what you'd think: it's not that I have the resources of a big team to spend on rigor. It's that I don't have a team at all, and verification is how one person covers the ground a team would.

> A team catches your mistakes in code review. When you're the whole team, something else has to be the second set of eyes. Formal verification is the reviewer that never gets tired and never assumes you knew what you were doing.

## The problem with being the only reviewer

On a crew, you don't let one guy frame a wall and also be the only one who inspects it. The inspection is a separate role for a reason — the person who built it is the worst person to find what's wrong with it, because they'll see what they meant instead of what's there. Software has the same trap. The author reads their own code and sees the intent, not the bug.

When you ship solo, you *are* the author and the inspector, and that's a structural weakness no amount of being careful fixes. I needed a reviewer that wasn't me — one that reads what's actually written, not what I meant to write. That's the job AEON does. It's not smarter than I am about my own code. It's just immune to the one thing that makes me bad at reviewing it: it has no idea what I intended, so it can only react to what's real.

## What it actually does

AEON isn't one check. It's a whole command surface I run against code, and the verbs tell you the shape of it. A few of the ones I lean on:

- **`check`** — verify a source file. Auto-detects the language and runs the analysis. This is the everyday one.
- **`harden`** — the security pass. Scans for the classes of vulnerability that a solo builder will absolutely miss because nobody's whispering "did you sanitize that input" over your shoulder.
- **`review`** — an AI-powered read of the code, plain-English, the way a senior dev would comment on a pull request you never opened.
- **`explain`** — plain-English bug explanations with suggested fixes, so a finding isn't just "line 84 is wrong" but *why* it's wrong and what to do.
- **`formal-diff`** — checks what a change actually altered in terms of behavior, not just text. The difference between "these lines changed" and "this change can now return null where it couldn't before."
- **`autopsy`** and **`ghost`** — post-mortem and dead-code analysis. What broke and why, and what's still in the codebase pretending to be alive.
- **`mcp-safety`** — checks the safety of the AI tool integrations themselves, which matters a lot when your whole workflow is wired through AI.
- **`portfolio`** — runs the whole thing across every project at once and tells me what regressed since the last baseline.

There's also the proof-oriented machinery underneath — abstract interpretation traces, Hoare-logic proof obligations — the actual formal-methods core. I don't read those every day. But it's there, and it's the reason a finding is more than a linter's opinion.

## Where it actually pays off

The honest answer to "is formal verification worth it for a solo builder" is: not everywhere, and the trick is knowing where.

**Anywhere money or trust moves.** Payments, authentication, anything handling someone else's data. This is where a quiet bug isn't a crash — it's a breach or a wrong charge, the kind of failure that doesn't announce itself in testing and shows up in production as a disaster. A solo builder has no security team. The `harden` pass is the closest thing I have to one, and I run it hardest on exactly these surfaces.

**Right before something ships.** I don't run the full portfolio scan on every save — that'd be friction with no payoff during normal building. I run it during the polish phase, before a release, when the question shifts from "does it work" to "what did I miss." That's when verification earns its keep: it's the pre-flight checklist, not the thing you do while you're still framing.

**On the changes, not just the code.** `formal-diff` is the one that surprised me most. The dangerous bug usually isn't in code I wrote carefully — it's in a small change I made confidently to code I thought I understood. Verifying the *delta* catches the "this innocent edit quietly broke an invariant three functions away" class of bug, which is the one that actually bites you.

## The thing nobody tells you about verification

Here's what I didn't expect: the biggest value isn't the bugs it catches. It's that it lets me move *faster*, not slower.

That sounds backwards. Verification is supposed to be the careful, slow thing. But fear is what makes a solo builder slow — the quiet dread that you changed something and don't fully know what it touched, so you tiptoe, you re-test by hand, you avoid the refactor the code obviously needs because you can't be sure it's safe. A verification layer eats that fear. I can make the aggressive change and let the checker tell me if I broke an invariant. I refactor things I'd otherwise leave alone, because the net under me is real instead of imagined.

A construction guy knows this feeling exactly. You move fast and confident when you trust the inspection will catch a mistake before it's buried in a wall. You move slow and scared when you know nobody's checking and a mistake stays hidden until it fails. Verification is the inspection. It's what lets one person build like they've got a crew watching their back — because, in the only way that matters, they do.

I'm not a formal-methods researcher and I never will be. I'm a guy who ships alone and refuses to let "alone" mean "unchecked." That's the whole pitch. You don't need a PhD team to verify your code. You need to admit you're the worst reviewer of your own work, and build something that isn't you to do the reviewing.
