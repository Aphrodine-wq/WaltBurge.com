import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { SectionId, BlogPost } from '../types';

export const posts: BlogPost[] = [
  {
    id: 'tessera-markdown-native-agents',
    title: 'Tessera: Why I\'m Writing AI Agents in Markdown',
    excerpt: 'Building an AI agent shouldn\'t require five frameworks, three vendor SDKs, and a vector DB you babysit. It should require markdown and a compiler that takes the boundaries seriously. So I built one.',
    date: '2026-05-23',
    readTime: '11 min',
    tags: ['AI', 'Tessera'],
    featured: true,
    content: `Most agent frameworks start from the wrong place. They hand you a Python class, a vendor SDK, a vector database to babysit, and a prompt string that nobody can verify. The agent's behavior lives in five files and a developer's head. The friction between those two places is documentation that's always stale.

Tessera starts somewhere else. You write an agent in a single markdown file — \`.t.md\` — and that one file is simultaneously the program, the spec, the docs, and a browsable note in your Obsidian vault. I call it the **soil thesis**: the syntax file and the developer's head should be the same file.

## Hello, agent

Here's the smallest thing Tessera can run, in full:

\`\`\`\`markdown
---
agent: HelloAgent
capabilities_requested: []
---

\`\`\`tsr:logic
fn greet(name: String) -> String = "hello " + name
\`\`\`

\`\`\`tsr:agent
agent HelloAgent {
  beliefs:
    @last_write target: String
  intentions:
    plan say_hello {
      let msg = greet(target)
      return msg
    }
}
\`\`\`
\`\`\`\`

That's it. Markdown all the way down. The compiler reads the frontmatter as config, the fenced \`tsr:\` blocks as substrate-typed code, and produces a runnable agent. Run it:

\`\`\`bash
tessera compile examples/hello.t.md --run HelloAgent --set target=world
# → HelloAgent() = 'hello world'
\`\`\`

## Why markdown is the right substrate

Programming languages live in two places: a syntax file, and a developer's head. The gap between them is where documentation rots. Markdown collapses the gap. A \`.t.md\` file is at once:

- A **valid Obsidian note** — browsable, linkable, indexable
- A **compilable program** — \`tessera compile\` produces an intermediate representation plus an executable
- An **audited safety boundary** — my formal verifier checks it like any source file
- An **introspectable cognitive architecture** — the modes of thinking are declared as fenced blocks

You don't need a separate IDE, a separate docs site, or a separate "agent management tool." The vault is the source of truth. Drop a \`.t.md\` file in any folder and \`tessera vault scan\` finds it.

This is the same insight that made Obsidian's plugin ecosystem work: structure emerges from links between notes, not from a top-down hierarchy. Tessera adds a second dimension — substrate fences inside notes — so the same emergence happens at the *agent* level. Your vault becomes a workshop for cognition.

## It doesn't stand alone — and that's the point

Tessera is the body. Around it live four neighbor systems, each useful on its own, each sharper in combination:

- **AEON** is the immune system — a 73-engine formal verifier that checks an agent before it runs.
- **Synapse** is the brain — a knowledge graph with synaptic weighting, so an agent's \`memory:semantic\` writes and my personal Zettelkasten live in the same place.
- **Obsidian / TheVault** is the soil — markdown notes where agents are written, scanned, and read.
- **Ollama / Anthropic / LangChain / PyTorch** are the external cortex and hands — LLM calls, tools, learned models, all callable from inside substrate-typed code with effect tracking and graceful degradation.

No other agent framework I've seen does formal verification *before* the agent runs. That's the combination talking, not any one piece.

## Where it's headed

Nine substrates ship today: \`logic\`, \`agent\`, \`memory:working\`, \`memory:workspace\`, \`memory:episodic\`, \`memory:semantic\`, \`prompt\`, \`tool\`, and \`neural\`. More are coming — \`policy\`, \`eval\`, \`identity\`, \`evolve\`. It's pre-alpha. ~3.6K lines of Python, 33 tests passing, seven example agents you can run today.

The thesis is simple: writing an agent should feel like writing a note. The compiler does the rest.`,
  },
  {
    id: 'tessera-substrates',
    title: 'Substrates: Giving an Agent Named Modes of Thinking',
    excerpt: 'You don\'t write "an agent that uses LLMs and has memory and learns things." You write tsr:agent for action, tsr:memory for recall, tsr:prompt for LLM calls. The compiler enforces the boundaries. The architecture becomes legible.',
    date: '2026-05-21',
    readTime: '9 min',
    tags: ['AI', 'Tessera', 'Architecture'],
    content: `Most agent code is a blob. LLM calls, memory reads, tool invocations, and business logic all live in the same Python method, interleaved, untyped, and impossible to audit. You can't look at it and say "here is where this agent thinks, here is where it remembers, here is where it touches the outside world."

Tessera's core idea is that an agent has **named modes of thinking**, and each mode gets its own typed code fence. I call them substrates. The compiler enforces the boundaries between them — substrate adjacency, effect propagation, capability gating. The architecture becomes legible because it's *declared*, not buried.

## The substrate menu

Run \`tessera substrates\` and you get an English breakdown of every category. The shipped ones:

- \`logic\` — pure functions, no effects. \`fn rank(papers, query) -> Float = ...\`
- \`agent\` — BDI actors with beliefs and plans. The goal-directed core.
- \`memory:working\` — per-invocation scratchpad. Gone when the plan ends.
- \`memory:workspace\` — a global blackboard where an arbiter picks the winning thought.
- \`memory:episodic\` — append-only event log. \`log Decision(topic, choice)\`
- \`memory:semantic\` — a knowledge graph, backed by Synapse. \`remember FactSheet(...)\`
- \`prompt\` — an LLM template with typed bindings.
- \`tool\` — an external callable, Python or any LangChain tool by dotted path.
- \`neural\` — a PyTorch \`nn.Module\` declared inline; the block compiles to \`nn.Sequential\`.

Each substrate maps to a named theory of cognition — global workspace theory, BDI, predictive processing, theory of mind. Tessera doesn't endorse any of them. It gives them all a first-class API and lets you compare them empirically on the same benchmark.

## Why boundaries matter

The boundaries aren't decoration. They're enforced, and that enforcement buys real things.

Consider an agent that declares \`capabilities_requested: [NetworkOut]\` in its frontmatter. The compiler propagates that capability to every region. The actor scheduler then **refuses to spawn a child agent** that requests a capability the parent doesn't hold. And the flow analysis catches tainted PII reaching a tool invocation without passing through a sanitizer first.

One declaration. Enforced at compile time, at spawn time, and at runtime. That's not something you get from a prompt string.

## Boundaries as code-review primitives

Here's the part that matters for teams. When substrates are explicit, the review question writes itself:

> This agent has both a \`tool\` substrate and a \`policy\` substrate — let's audit what the policy actually enforces before we merge.

You can't ask that question about a blob of Python where everything is interleaved. You can ask it instantly about a \`.t.md\` file where the modes of thinking are named and fenced. The substrate is the unit of review.

## The shape of a real agent

A research agent might compose four substrates: \`logic\` to rank candidate papers, \`prompt\` to summarize them via an LLM, \`tool\` to pull a web search through LangChain, and \`memory:episodic\` to log every decision it made. Each fence does one thing. The compiler makes sure the LLM output can't silently become a capability the agent never requested.

You don't describe the agent in prose and hope. You declare its modes of thinking, and the compiler holds you to them.`,
  },
  {
    id: 'tessera-verify-before-run',
    title: 'Verifying AI Agents Before They Ever Run',
    excerpt: 'Every other agent framework runs the agent and watches what happens. Tessera lowers the agent to an intermediate representation and runs 73 formal-verification engines against it first — catching capability leaks and PII egress before they hit production.',
    date: '2026-05-19',
    readTime: '10 min',
    tags: ['AI', 'Tessera', 'Systems'],
    content: `The standard way to find out whether an agent is safe is to run it and watch. You deploy it, you log what it does, and you hope your monitoring catches the bad behavior before a customer does. That's testing, not verification. For anything touching auth, payments, or PII, "run it and watch" is how you ship a breach.

Tessera takes the opposite stance: **verify the agent before it ever runs.** This is possible because the agent isn't an opaque prompt — it's a typed program that lowers to a formal intermediate representation. And I already had the verifier.

## SIR — the intermediate representation

When Tessera compiles a \`.t.md\` file, it lowers each substrate block into SIR (Substrate IR) — a textual, node-based representation of what the agent does: which functions it calls, which capabilities each region needs, where external input enters, where data egresses. SIR is the thing you can reason about formally.

## AEON — 73 engines pointed at the agent

AEON is a formal verifier I built that checks code in 21 languages against 73 analysis engines: substrate adjacency, effect inference, capability checking, taint analysis, refinement types, Hoare logic, and 22 dedicated cybersecurity engines. It catches injection, auth bugs, crypto misuse, PII leaks, and race conditions.

The unlock: Tessera added a \`.sir\` language adapter, so AEON now verifies an agent *the same way it verifies my Python, Rust, and Java*. One command:

\`\`\`bash
tessera compile examples/researcher.t.md --aeon
# ✔ AEON: 4 functions, 0 errors, 0 warnings
\`\`\`

Diagnostics map back to specific error codes:

- **E001** — substrate adjacency violation (a memory block touching something it shouldn't)
- **E102** — capability used but not in scope
- **E301** — tainted PII reaching a non-sanitized egress

That last one is the important one. The flow analysis tracks \`Tainted<T, pii>\` through the agent. If personally identifiable information reaches a tool invocation without first passing through a sanitizer, AEON refuses it at compile time. The agent never gets the chance to leak it.

## Capability discipline, end to end

The capability model runs through the whole stack from a single frontmatter line:

\`\`\`markdown
---
agent: QuoteExplainer
capabilities_requested: [NetworkOut]
---
\`\`\`

The compiler propagates that grant to every region of the agent. The actor scheduler refuses to spawn a child with capabilities the parent doesn't hold. AEON's PII analysis verifies nothing sensitive crosses a boundary it shouldn't. Three enforcement points, one declaration.

## Auditing a whole vault at once

Because every agent is a file and AEON has a portfolio profile, I can audit my entire vault of agents in one pass:

\`\`\`bash
tessera vault scan ~/Desktop/TheVault   # found 17 agents in 0.48s
aeon scan ~/Desktop/TheVault --profile portfolio
\`\`\`

Every \`.t.md\` and \`.sir\` file routes through the translator, all 73 engines run against each, and I get per-agent diagnostics. The same security engines that scan my production Python and Rust now scan my agents. At PR time, a capability grant that shows up in a diff gets caught before it merges.

This is the difference between an agent framework and an agent *language*. A framework gives you a runtime. A language gives you something you can prove things about before you trust it.`,
  },
  {
    id: 'tessera-cognitive-traits',
    title: 'Cognitive Traits: Channeling Maladaptive Patterns into Better Reasoning',
    excerpt: 'Default LLM agents reason one way: confident, sequential, local to the prompt. Tessera lets you install reasoning postures — productive doubt, cross-domain scanning, compulsive verification — as first-class, inspectable code instead of buried prompt tricks.',
    date: '2026-05-17',
    readTime: '8 min',
    tags: ['AI', 'Tessera'],
    content: `Default LLM agents have one reasoning posture: confident, sequential, local to the prompt. It's fine for shallow tasks. For real work it causes two specific failures. **Overconfident first answer** — the first plausible interpretation wins without verification, and the bug ships. **Tunnel vision** — the agent reasons inside the immediate context and misses the pattern one folder over, one project over, one role over.

I'd been countering these by hand in my own working setup for months. Tessera lifts the fix into the language: a \`tsr:traits\` block lets you give an agent a non-default reasoning posture, declared as code you can read and audit.

## The idea: channeled tendencies

Cognitive traits are inverse-doctored psychological tendencies. You take a pattern that's maladaptive in humans and turn it into a productive default for an agent. The harmful form of depression is paralysis; the channeled form is **productive doubt** — assume you're wrong, verify, then commit. The harmful form of ADHD is distraction; the channeled form is **cross-domain insight** — scan adjacent contexts before reasoning sequentially.

These aren't personality. They modify *how* the agent reasons, not its voice. And they aren't policies — policies hard-stop a behavior; traits soften and redirect one.

## Trait syntax

\`\`\`\`markdown
\`\`\`tsr:traits
trait doubt_first {
  trigger: any_claim
  behavior: "Before committing to an answer, ask: what am I assuming?
             What's the second-most-likely interpretation? What breaks
             if I'm wrong? Verify silently, then commit with conviction."
  priority: 0.9
}
\`\`\`
\`\`\`\`

Then you attach it to an agent:

\`\`\`markdown
agent Researcher {
  beliefs:
    @last_write topic: String
  traits: [doubt_first, cross_brain]
  intentions:
    plan investigate { ... }
}
\`\`\`

## The built-ins

These ship with Tessera and compose freely:

- \`doubt_first\` — verify before committing. For any agent whose output is acted on without review.
- \`cross_brain\` — scan memory, vault, and sibling projects for analogous patterns before reasoning. Lead with the surprising connection, not the obvious one.
- \`compulsive\` — before declaring a task done, enumerate failure modes, check each edge, re-read the spec.
- \`hypervigilant\` — treat external input as adversarial; validate at every boundary; prefer explicit refusal. Triggers on auth, payments, PII, secrets.
- \`synesthetic\` — find structural analogies. "This is the same shape as X." For system-design agents.
- \`manic_burst\` — generate maximum variety before convergence. Scoped \`per_plan\` so it only fires during ideation, not verification.

## Composition by priority

Traits stack. When several fire at once, the planner injects them in priority order. A \`hypervigilant + doubt_first + cross_brain\` agent will:

1. Treat the input as adversarial (priority 0.95)
2. Then doubt its first interpretation (0.9)
3. Then scan adjacent contexts before answering (0.85)

That produces an agent that is paranoid, skeptical, and well-read — at the cost of latency. So you don't ship every trait on every agent. You pick the ones the task needs.

## Why put this in the language at all

Because posture should be **inspectable and shareable**, not buried in a prompt nobody can find. When I see the same reasoning failure across multiple agents, I write a trait once, give it a trigger and a priority, and it composes cleanly with the built-ins. The next person who reads the agent sees exactly how it's wired to think — in the same file as everything else.`,
  },
  {
    id: 'self-taught-7-months',
    title: 'From Construction Sites to Codebases: 7 Months Self-Taught',
    excerpt: 'I spent years in construction before writing my first line of code. Here\'s what building houses taught me about building software — and why the transition wasn\'t as far as people think.',
    date: '2026-04-10',
    readTime: '8 min',
    tags: ['Career', 'Construction'],
    content: `I came up on job sites, not in a CS program. About seven months ago I wrote my first line of code. Since then I've shipped a contractor marketplace, trained a custom AI model for construction estimation, and built the tools I use to build everything else. People hear that and assume the jump from construction to software was huge. It wasn't. The two are closer than anyone gives them credit for.

## A house and a codebase are the same problem

Framing a house is systems thinking. You sequence the work — you can't hang drywall before the rough-in passes inspection, you can't set trim before the floors go down. You estimate honestly, because a bad number doesn't just cost you margin, it costs you the next job. And you build to hold up under load, because a thing that looks finished but fails the first time it's stressed isn't finished.

Software is the same. Dependencies are sequencing. Architecture is load-bearing. A feature that demos well but falls over with real users is a wall that isn't tied into the frame. I didn't have to learn that mindset when I started coding — I'd been living it for years. I just had to learn the syntax.

## What construction gave me that a bootcamp wouldn't

**You finish what you start.** On a site, an unfinished job is money sitting still and a client who can't move in. That instinct — close the loop, don't leave it framed and walk away — is rarer in software than it should be. Half-built features rot.

**You respect the cost of every decision.** When materials and labor come out of a fixed bid, you don't over-engineer. You build the thing that solves the problem and holds up, not the thing that's clever. That translates directly: the minimal solution that fully solves it beats the elegant abstraction nobody asked for.

**You've actually lived the problem.** This is the big one. My construction-tech isn't built from a product manager's user-interview notes. I've stood in the spot where a contractor loses a bid because his estimate took three days and the other guy's took an hour. That's why FairTradeWorker and ConstructionAI fit the trade — I'm not guessing at the pain.

## How I actually learned

Not through tutorials. I learned by shipping, with real stakes. My first serious project had a real client — a contractor in Oxford, Mississippi — using it in production. Nothing teaches you faster than someone depending on the thing you built that morning.

I treated AI as a cofounder from day one. Not autocomplete — a partner I could think out loud with, that would catch what I missed and push back when I was wrong. That's a different relationship than most developers have with their tools, and it's the reason a guy off the job site could go from zero to a working AI estimation platform in months.

> The transition wasn't a leap. It was the same work — build something real, make it hold up, finish it — in a new material.

I'm still early. Seven months is nothing. But I'd put the instincts I brought from the trade up against a CS degree any day, because the hard part of building software was never the syntax. It was knowing what "done" means and refusing to ship anything less.`,
  },
  {
    id: 'fine-tuning-construction-llm',
    title: 'Fine-Tuning a Construction Estimation LLM from Scratch',
    excerpt: 'No existing AI understands construction pricing at the line-item level. So I built one — 18,000+ training examples, custom distillation pipeline, deployed on RunPod for $0.002 per estimate.',
    date: '2026-04-06',
    readTime: '12 min',
    tags: ['AI', 'ConstructionAI'],
    content: `Ask a general-purpose LLM to estimate a bathroom remodel and it will give you a confident, beautifully-formatted answer that's wrong. It hallucinates line items, invents prices, and has no idea that demo and haul-off is a real cost or that tile labor is priced by the square foot in your market and not in California. Generic models don't understand construction pricing at the line-item level, because nobody trained them to. So I did.

## Why a custom model at all

The obvious move is to wrap GPT or Claude in a prompt and call it estimation. I don't build that way — I'd rather own the thing I depend on than rent it and be locked into someone else's roadmap and someone else's per-token bill. A fine-tuned model I control is cheaper at scale, runs where I want it, and gets better every time I improve the data. So ConstructionAI is a fine-tune of **Llama 3.1 8B**, built specifically to produce line-item construction estimates.

## The data is the whole game

Fine-tuning is easy. Getting the data right is the entire project. The first version trained on **18,000+ curated examples** covering residential and commercial trades — each one a realistic job mapped to a structured estimate with material quantities, labor hours, and market-adjusted pricing.

Hand-writing that volume is impossible, so the pipeline leans on distillation: generate synthetic estimation examples from larger models, then curate hard. The curation is where the quality lives — bad synthetic data teaches the model to hallucinate more confidently, which is worse than not training at all.

\`\`\`
raw trade knowledge + real estimates
        │  distill from larger models
        ▼
   synthetic examples (hundreds of thousands)
        │  curate, dedupe, validate against real prices
        ▼
   training set  →  fine-tune Llama 3.1 8B
        │
        ▼
   eval against held-out real jobs
\`\`\`

## Deployment: cheap enough to be free

The model runs on **RunPod Serverless** at roughly **$0.002 per estimate**. That number matters more than it looks. At a fifth of a cent, estimation is effectively free to the product — I can put it everywhere in FairTradeWorker and MsHomePros without thinking about cost per call. A homeowner gets an instant fair-price read before a single contractor bids. A contractor gets a professional line-item estimate out the door in seconds instead of three days. That speed is the difference between winning and losing the job.

## Where it's going

The current pipeline is scaling toward **500K+ training examples** — bigger, cleaner, with a stronger base model and tighter curation. The eval bar is honest accuracy against held-out real jobs, not vibes. I bet on going over 90% once; I lost that bet at ~88% and learned exactly which trades the model was weakest on. That's the loop: ship, measure against reality, fix the data, retrain.

> No existing AI understood construction pricing. The fix wasn't a better prompt — it was owning the model and the data behind it.

The lesson that generalizes past construction: when the tool you need doesn't exist, the answer isn't to contort a general model into pretending. It's to build the specialist and own it.`,
  },
  {
    id: 'building-with-ai-not-around-it',
    title: 'Building With AI, Not Around It',
    excerpt: 'Most developers use AI as autocomplete. I use it as a cofounder. The difference is whether you let it shape architecture or just fill in blanks.',
    date: '2026-03-28',
    readTime: '6 min',
    tags: ['AI', 'Development'],
    content: `Most developers use AI as autocomplete. They type, it finishes the line, they move on. That's useful, and it's also leaving most of the value on the table. I use AI as a cofounder — something that shapes architecture, catches what I miss, and pushes back when I'm wrong. The difference isn't the model. It's the relationship.

## Autocomplete vs. a thinking partner

Autocomplete answers the question "what comes next on this line?" A cofounder answers "is this the right line at all?" When I'm wiring an endpoint, I don't just want the boilerplate — I want the thing that says *this will race under concurrent writes* or *that dependency has a known footgun*. The model knows enough to catch those. You only get that value if you let it into the decision, not just the typing.

## Let it shape architecture, not just fill blanks

The fear is that letting AI shape architecture means losing the plot — ending up with code you don't understand. The opposite happens if you do it right. I think out loud with it before I build: here's the problem, here are two approaches, here's what breaks under load. It argues. I argue back. By the time I write code, the design has been stress-tested by a second mind that's read more systems than I ever will.

That only works if the AI is wired to disagree. An assistant that agrees with everything is autocomplete with extra steps. I deliberately set mine up to assume I might be wrong, to verify before committing, and to scan across my other projects for patterns I'm not seeing in the one I'm staring at.

## The traits that make it a cofounder

The postures I lean on most:

- **Productive doubt** — assume the first answer is wrong, check it, *then* commit. Stops confident mistakes from shipping.
- **Cross-project insight** — pull the pattern from the marketplace work when I'm stuck on the AI platform. The connection I'd miss is usually the one that solves it.
- **Compulsive verification** — before anything is called "done," enumerate the failure modes and check each edge. Construction taught me that; the AI enforces it.

I cared about this enough that I built it into a language — Tessera lets you declare these reasoning postures as first-class, inspectable code instead of burying them in a prompt. But you don't need a language to start. You need to stop treating the model like a faster keyboard.

> The question isn't whether you use AI. It's whether you let it into the part of the work that actually matters — the decisions.

I'm a guy who learned to code seven months ago and shipped a marketplace, a custom LLM, and an agent language. I did not do that by typing faster. I did it by building *with* a cofounder, not around a tool.`,
  },
  {
    id: 'three-node-ai-network',
    title: 'Running a Distributed AI System Across Three Machines',
    excerpt: 'A Mac for development, a mini PC as the always-on nerve hub, and a GPU workstation for the heavy lifting. How I wired them together with a file-backed event bus.',
    date: '2026-03-20',
    readTime: '10 min',
    tags: ['Systems', 'WALT'],
  },
  {
    id: 'marketplace-architecture',
    title: 'Designing a Three-Sided Construction Marketplace',
    excerpt: 'Homeowners, contractors, and subcontractors all have different incentives. The bidding system, payment flows, and trust mechanics that make it work.',
    date: '2026-03-14',
    readTime: '9 min',
    tags: ['Architecture', 'FTW'],
  },
  {
    id: 'overnight-autonomous-runner',
    title: 'Shipping Code While You Sleep',
    excerpt: 'My overnight runner executes multi-project work queues autonomously — building features, running verification, rolling back on failure. 1,600 lines of bash that changed everything.',
    date: '2026-03-08',
    readTime: '7 min',
    tags: ['Systems', 'Automation'],
  },
];

const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

interface BlogProps {
  onPostClick?: (post: BlogPost) => void;
}

export const Blog: React.FC<BlogProps> = ({ onPostClick }) => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() =>
    activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts,
    [activeTag]
  );

  const featured = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p.id !== featured?.id);

  return (
    <section id={SectionId.BLOG} className="py-24 md:py-40 px-4 md:px-6 bg-brand-base relative border-t border-brand-border/10">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-5">
              <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">
                Writing
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-brand-primary tracking-tighter">
                From the <br className="hidden md:block" />
                <span className="text-brand-secondary opacity-60">Build Log</span>
              </h2>
              <div className="h-1 w-24 bg-brand-accent rounded-full" />
              <p className="text-brand-secondary text-lg max-w-lg leading-relaxed">
                Notes on building products, training models, and figuring out software engineering from scratch.
              </p>
            </div>

            {/* Tag filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                  !activeTag
                    ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent'
                    : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/20'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeTag === tag
                      ? 'bg-brand-accent/10 border-brand-accent/30 text-brand-accent'
                      : 'bg-brand-surface border-brand-border text-brand-secondary hover:border-brand-accent/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured post — full width, big */}
        {featured && (
          <motion.article
            key={featured.id}
            onClick={() => onPostClick?.(featured)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group mb-12 md:mb-16 p-10 md:p-16 rounded-3xl bg-brand-surface/50 border border-brand-border hover:border-brand-accent/30 transition-all cursor-pointer"
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {featured.tags.map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-xs uppercase tracking-wider text-brand-accent font-mono">
                  {tag}
                </span>
              ))}
              {featured.featured && (
                <span className="px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs uppercase tracking-wider text-brand-purple font-mono">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tight mb-6 group-hover:text-brand-accent transition-colors leading-tight max-w-4xl">
              {featured.title}
            </h3>

            <p className="text-brand-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-3xl">
              {featured.excerpt}
            </p>

            <div className="flex items-center justify-between pt-8 border-t border-brand-border/30">
              <div className="flex items-center gap-6 text-sm text-brand-secondary font-mono">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {formatDate(featured.date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {featured.readTime}
                </span>
              </div>
              <span className="flex items-center gap-2 text-sm text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                Read <ArrowRight size={18} />
              </span>
            </div>
          </motion.article>
        )}

        {/* Post grid — 2 columns for bigger cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((post, index) => (
            <motion.article
              key={post.id}
              onClick={() => onPostClick?.(post)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group p-8 md:p-10 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/30 transition-all cursor-pointer flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-brand-base border border-brand-border text-[11px] uppercase tracking-wider text-brand-secondary font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-xl md:text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors leading-snug">
                  {post.title}
                </h4>

                <p className="text-sm md:text-base text-brand-secondary leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-5 border-t border-brand-border/50">
                <div className="flex items-center gap-4 text-xs text-brand-secondary font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-2 text-xs text-brand-accent font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-24 text-center border border-dashed border-brand-border rounded-xl">
            <BookOpen size={40} className="mx-auto mb-4 text-brand-secondary" />
            <p className="text-brand-secondary font-mono text-lg">No posts with tag "{activeTag}".</p>
            <button onClick={() => setActiveTag(null)} className="mt-4 text-brand-accent hover:underline text-sm uppercase tracking-wider">
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
