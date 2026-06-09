---
title: "I Built a GUI So I'd Never SSH Into a GPU Again"
slug: fine-tuning-without-the-terminal
date: 2026-06-09
readTime: 5 min
tags: [AI, Fine-Tuning, Tools]
category: AI
author: James Walton
excerpt: Fine-tuning a model is mostly a tangle of SSH sessions, rented GPUs, and shell scripts only the person who wrote them can run. I got tired of being that person. So I built Forge — a desktop app that turns a training run into a few clicks, and turned my own toolchain into a product.
---

The first time I fine-tuned a model that actually worked, I couldn't have told you how to do it again. Not really. It was a pile of terminal history — rent a GPU here, scp the dataset there, edit a config by hand, kick off a script, babysit the logs over SSH, pray the box didn't get reclaimed mid-run. It worked. It was also completely unrepeatable, which means it didn't really work at all.

That's the dirty secret of "custom AI." The model is the easy part. The toolchain around it is a swamp, and most of it lives in one person's muscle memory. So I drained the swamp and built [Forge](/work/forge) — a desktop app that does the whole loop without me ever opening a terminal.

> If you can't run your own training pipeline twice without remembering a single command, you don't have a pipeline. You have a lucky accident.

## The loop, in clicks instead of commands

Forge wraps the entire fine-tuning loop in a real interface:

- **Provision the GPU.** It rents the box on vast.ai for me — pick the card, it spins up. No SSH key dance, no copy-pasting an IP into seven commands.
- **Manage the dataset.** Point it at the training data, see what's in it, version it.
- **Set the hyperparameters.** In fields, with sane defaults, not buried in a YAML file I'll typo at midnight.
- **Launch and watch.** Kick the run and monitor it live — loss curve, progress, the works — instead of squinting at a log stream over a flaky connection.
- **Pull the model back.** When it's done, the finished weights come home.

It's an Electron app on top of a Next.js core. Boring stack on purpose. The point isn't the tech — it's that the thing is repeatable by a human who is tired.

## This is the rig behind ConstructionAI

Forge isn't a side toy. It's the actual machinery behind [ConstructionAI](/work/constructionai), the model I run for construction estimating. Every time I retrain that model on fresh data, I run it through Forge. The reason I can say I [train a model every week](/blog/most-ai-consultants-have-never-trained-a-model) instead of every-once-in-a-while is that the cost of doing it dropped from "clear an afternoon and find my notes" to "a few clicks while I do something else."

That's the whole bet. Tooling is what turns a thing you *can* do into a thing you *actually* do. Friction is the difference between a capability and a hobby.

## Why I'd rather own the rig than rent the magic

There's an easier path here. I could call somebody's fine-tuning API, hand them my data, and let their black box hand me a model. Plenty of people do.

I don't, for the same reason I [own my models instead of calling an API](/blog/build-your-own-model). When the rig is mine, the GPU is rented by the hour and thrown away, the data never leaves my control, and the cost per run is measured in dollars, not a per-token meter that punishes me for using my own product. Owning the trainer means owning the economics. The model gets cheaper to improve the more I improve it, instead of more expensive the more I use it.

## The honest part

Building your own trainer is more work upfront than renting one. Obviously. The first version of Forge was uglier than the terminal it replaced. The payoff isn't day one — it's the tenth training run, when the thing that used to eat an afternoon is a button, and the knowledge that used to live in my head lives in software that anyone could run.

That's the kind of build I like: unglamorous, compounding, and mine. Turn the thing you do by hand into the thing the machine does for you — then go do it ten more times.
