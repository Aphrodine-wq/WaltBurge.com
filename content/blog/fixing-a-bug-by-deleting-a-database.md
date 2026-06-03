---
title: "I Fixed a Security Hole by Deleting 88 Lines of Code"
slug: fixing-a-bug-by-deleting-a-database
date: 2026-06-03
readTime: 5 min
tags: [FairTradeWorker, Architecture, Security]
author: James Walton
featured: false
excerpt: FairTradeWorker had two databases that both thought they owned notifications. The web layer wrote to its own Prisma copy and forwarded to the real backend, which meant two sources of truth, a double-write bug, and a path-traversal hole. The fix wasn't to patch any of that. It was to make the web layer stop owning the data at all.
---

[FairTradeWorker](/blog/marketplace-architecture) has a Java backend — `ftw-svc` — that owns the real data. It also has a Next.js front end that talks to it. Somewhere along the way, the notification feature ended up living in *both* places: the Next.js layer had its own Prisma database with its own notification rows, and `ftw-svc` had the authoritative ones.

Two databases. Both convinced they owned the same records. That's not a feature, that's a slow-motion bug waiting for a quiet morning.

This morning was the quiet morning.

## Three symptoms, one cause

When you mark a notification as read, the web layer wrote the change to its local Prisma copy **and** forwarded it to `ftw-svc`. The realtime hook then double-wrote on top of that. So a single "mark as read" fanned out into redundant writes across two systems that could disagree with each other. Whichever one you read from, you might be reading a lie.

And because the Next.js route was building its own database query from the notification ID in the URL, the ID was a soft spot. The guard on it was thin:

```ts
// before — length is not validation
if (!id || id.length > 50) {
  return NextResponse.json({ error: "Invalid notification id" }, { status: 400 });
}
```

A 50-character cap stops nothing that matters. A crafted ID could carry characters that have meaning where they shouldn't — the shape of a path-traversal probe against a layer that was never supposed to be handling raw data access in the first place.

Three symptoms: split-brain data, double-writes, a soft injection surface. One root cause: **the web layer was pretending to own data it didn't own.**

## The fix is a subtraction

I didn't patch the double-write. I didn't reconcile the two databases. I deleted one of them from the picture. The Next.js notification routes now do exactly one thing — proxy to `ftw-svc` — and own nothing:

```ts
// after — the ID is opaque, so reject anything that isn't a clean token
if (!id || !/^[a-zA-Z0-9_-]{1,50}$/.test(id)) {
  return NextResponse.json({ error: "Invalid notification id" }, { status: 400 });
}
```

That regex isn't the interesting part — though it does close the hole by allowing only the characters a real ID can contain. The interesting part is what disappeared around it. The Prisma dependency in the notification path: gone. The local writes: gone. The redundant forward from the realtime hook: gone. Net change across the three commits — **29 lines added, 88 deleted.** The feature does the same thing from the outside and has 59 fewer lines of surface area to be wrong in.

## Why this keeps happening

The pattern that created this is seductive: your front end is right there, it already has a database client wired up, so when you need to store something the path of least resistance is to just... store it there. Each individual decision is reasonable. The sum of them is two systems fighting over who's telling the truth.

The rule I'm holding myself to on FTW: **the backend owns the data, the front end owns the view.** When the front end starts owning data, you don't have a richer front end — you have a second backend that nobody designed, nobody guards, and nobody trusts. The cleanup is almost always a subtraction, and the diff that closes the security hole is usually the same diff that deletes the confusion.

Best line of code is the one you got to delete.
