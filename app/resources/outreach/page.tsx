import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Outreach Templates',
  robots: { index: false, follow: false },
};

interface TemplateProps {
  title: string;
  subject?: string;
  children: React.ReactNode;
}

function Template({ title, subject, children }: TemplateProps) {
  return (
    <div className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-brand-primary tracking-tight mb-2">
        {title}
      </h2>
      {subject && (
        <p className="text-sm text-brand-accent font-mono mb-4">
          Subject: &quot;{subject}&quot;
        </p>
      )}
      <div className="p-6 rounded-xl bg-brand-surface/40 border border-brand-border/40 font-mono text-sm text-brand-secondary leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

export default function OutreachPage() {
  return (
    <div className="min-h-screen bg-brand-base">
      {/* Nav bar */}
      <div className="fixed top-0 left-0 w-full z-50 px-6 h-16 md:h-20 flex items-center bg-brand-base/95 backdrop-blur border-b border-brand-border">
        <Link
          href="/"
          className="flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-colors font-mono uppercase tracking-wider text-xs md:text-sm"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
          Private Reference
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-2">
          Outreach Templates
        </h1>
        <p className="text-brand-secondary text-sm font-mono mb-12">
          Copy-ready templates for cold email, freelance profiles, and directory listings.
        </p>

        {/* Template 1: Construction Companies */}
        <Template
          title="Template 1: Construction Companies"
          subject="Cut your estimation time from days to seconds"
        >
{`Hi [Name],

I built an AI-powered estimation tool for MHP Construction in Oxford, MS. It cut their bid turnaround from 3 days to seconds \u2014 generating detailed line-item estimates with materials, labor, and market-adjusted pricing.

The model was trained on 18,000+ real construction projects and runs at $0.002 per estimate.

If [Company] is still estimating manually, I\u2019d love to show you a quick demo. No cost, no commitment \u2014 just 15 minutes to see if it\u2019s a fit.

Best,
Walt Burge
AI Engineer & Full-Stack Developer
waltburge.com | jamesburge.mcm@gmail.com`}
        </Template>

        {/* Template 2: Local Businesses (Web Design) */}
        <Template
          title="Template 2: Local Businesses (Web Design)"
          subject="Your business deserves better than a Facebook page"
        >
{`Hi [Name],

I\u2019m Walt Burge, a developer based here in Oxford. I noticed [Company] doesn\u2019t have a website (or the current one could use an upgrade).

I build fast, mobile-friendly, SEO-optimized websites for local businesses \u2014 the kind that actually show up on Google when someone searches for [their industry] in Oxford.

Starting at $2,000, most sites are live within 3-4 weeks. Happy to chat for 15 minutes about what would work for [Company] \u2014 no pressure.

Best,
Walt Burge
waltburge.com | jamesburge.mcm@gmail.com`}
        </Template>

        {/* Template 3: Startups / Non-Technical Founders */}
        <Template
          title="Template 3: Startups / Non-Technical Founders"
          subject="Technical cofounder without the equity"
        >
{`Hi [Name],

I saw [Company/Product] on [where you found them \u2014 AngelList, LinkedIn, etc.] \u2014 interesting concept.

I\u2019m an AI engineer and full-stack developer who works with non-technical founders as a fractional CTO. I handle the architecture, build the MVP, and set up the team \u2014 without taking equity or a $300K salary.

Recent work: built a 3-sided construction marketplace (FairTradeWorker), a custom AI estimation platform (ConstructionAI), and an AI voice system for an insurance company.

If you\u2019re looking for someone who ships production software, not prototypes, I\u2019d love to hear more about what you\u2019re building.

Best,
Walt Burge
waltburge.com/services/fractional-cto`}
        </Template>

        {/* Template 4: Businesses with Expensive Manual Processes */}
        <Template
          title="Template 4: Businesses with Expensive Manual Processes (AI Automation)"
          subject="What if that 3-day process took 3 seconds?"
        >
{`Hi [Name],

I build AI automation systems for businesses that are spending too much time and money on manual processes.

One example: I built a custom AI model for a contractor that turned a 3-day manual estimation process into a 3-second automated one \u2014 at $0.002 per estimate. That\u2019s the kind of ROI I\u2019m talking about.

If [Company] has any process that\u2019s slow, expensive, or repetitive, there\u2019s a good chance I can automate it with AI. Happy to do a free 15-minute assessment.

Best,
Walt Burge
AI Engineer | Oxford, MS
waltburge.com/services/ai-automation`}
        </Template>

        {/* Template 5: Reddit r/forhire Post */}
        <Template title="Template 5: Reddit r/forhire Post">
{`[Title] [For Hire] AI Engineer & Full-Stack Developer \u2014 Custom LLMs, SaaS, Automation | $150/hr+

I\u2019m an AI engineer and full-stack developer based in Oxford, MS.

**What I build:**
- Custom LLM fine-tuning (I trained a Llama 3.1 8B on 18K+ examples \u2014 it\u2019s in production)
- SaaS platforms from zero to launch
- AI-powered business automation
- Construction technology
- Web applications (Next.js, TypeScript, PostgreSQL)

**Proof:**
- MHP Construction: AI estimation cut bid time from 3 days to seconds
- Lafayette Insurance: AI voice system handles 60%+ of calls
- FairTradeWorker: 3-sided construction marketplace with real-time bidding
- ConstructionAI: Custom fine-tuned LLM, $0.002/inference, ~88% accuracy

**Rates:** $150/hr, project-based pricing available ($5K-$150K+ depending on scope)

**Portfolio:** waltburge.com/hire
**Scope Builder:** waltburge.com/contact

DM me or email jamesburge.mcm@gmail.com`}
        </Template>

        {/* Template 6: Upwork Profile Bio */}
        <Template title="Template 6: Upwork Profile Bio">
{`I build custom AI models, production SaaS platforms, and intelligent automation systems. Not API wrappers \u2014 real model training, real deployment, real results.

**What I\u2019ve shipped:**
\u2022 Custom LLM trained on 18,000+ construction projects \u2014 live in production at $0.002/inference
\u2022 AI voice system for an insurance company \u2014 handles 60%+ of inbound calls
\u2022 Three-sided construction marketplace \u2014 homeowners, contractors, subcontractors
\u2022 Contractor estimation platform \u2014 AI-powered bids in seconds, not days

**Services:**
\u2022 Custom LLM Fine-Tuning ($25K-$100K)
\u2022 SaaS Product Development ($25K-$150K+)
\u2022 AI-Powered Automation ($15K-$75K)
\u2022 Full-Stack Web Applications ($5K-$25K)
\u2022 Fractional CTO ($5K-$15K/month)

**Stack:** Next.js, TypeScript, Python, PyTorch, Llama, React Native, Kotlin, PostgreSQL, Rust

Based in Oxford, MS. Working with clients nationwide.

Portfolio: waltburge.com/hire`}
        </Template>

        {/* Template 7: Clutch/Yelp/Directory Profile */}
        <Template title="Template 7: Clutch/Yelp/Directory Profile Description">
{`Walt Burge is an AI engineer and full-stack developer based in Oxford, Mississippi. Specializing in custom AI model training, SaaS platform development, and intelligent business automation.

Key projects include a custom fine-tuned LLM for construction cost estimation (18,000+ training examples, deployed in production), an AI-powered voice system for an insurance company, and a three-sided construction marketplace platform.

Services: Custom Software Development, AI & Machine Learning, SaaS Development, Construction Technology, Web Design, Fractional CTO.

Serving Oxford, MS, North Mississippi, Memphis metro, and clients nationwide.`}
        </Template>

        {/* Template 8: Construction Tech Companies (Partnership/Acquisition) */}
        <Template
          title="Template 8: Construction Tech Companies (Partnership/Acquisition)"
          subject="18,000+ construction training examples — interested in licensing?"
        >
{`Hi [Name],

I saw [Company]'s work on AI-powered [estimation/project management/etc.] — impressive.

I built ConstructionAI — a Llama 3.1 8B model fine-tuned on 18,000+ real construction project estimates. It generates detailed line-item estimates (materials, labor, waste factors, market-adjusted pricing) in seconds at $0.002 per inference. It's live in production for a contractor in Oxford, MS.

I'm open to licensing the model, white-labeling the API, or exploring a deeper partnership. If [Company] is building estimation capabilities, it might save you months of data collection and training.

Happy to do a quick demo or share accuracy benchmarks.

Best,
Walt Burge
waltburge.com/products/construction-ai`}
        </Template>

        {/* Template 9: Enterprise Construction Companies ($100K+ deals) */}
        <Template
          title="Template 9: Enterprise Construction Companies ($100K+ deals)"
          subject="AI estimation for [Company] — 3 days to 3 seconds"
        >
{`Hi [Name],

I built an AI estimation platform that a contractor in Oxford, MS uses in production. It generates detailed line-item construction estimates — materials, labor, quantities, market-adjusted pricing — in seconds instead of days.

The model is trained on 18,000+ real construction projects and runs at $0.002 per estimate. For a company like [Company] doing [X] bids per month, the ROI is significant.

I build custom AI platforms for construction companies starting at $50K. Happy to show you a demo — 15 minutes, no commitment.

Best,
Walt Burge
AI Engineer | Oxford, MS
waltburge.com/products/construction-ai`}
        </Template>

        {/* Template 10: Mississippi Government Agencies */}
        <Template
          title="Template 10: Mississippi Government Agencies"
          subject="AI & software development services — Mississippi-based vendor"
        >
{`Hi [Name],

I'm Walt Burge, an AI engineer and software developer based in Oxford, Mississippi. I specialize in custom AI systems, web applications, and enterprise software development.

I'm writing to introduce myself as a Mississippi-based IT vendor available for state contracts and RFP responses. Recent work includes a custom AI-powered estimation platform for a construction company, an AI voice system for an insurance company, and a multi-sided marketplace platform.

I'd welcome the opportunity to discuss any upcoming IT projects or be added to your vendor list. Happy to provide a capability statement and past performance documentation.

Best,
Walt Burge
waltburge.com/enterprise`}
        </Template>

        {/* Template 11: Acquire.com / Investor Outreach */}
        <Template
          title="Template 11: Acquire.com / Investor Outreach"
          subject="Construction AI SaaS — 18K+ training examples, production deployed"
        >
{`ConstructionAI is a fine-tuned Llama 3.1 8B model that generates detailed construction cost estimates in seconds. Trained on 18,000+ curated examples with a distillation pipeline scaling to 500K+.

Currently deployed in production for a contractor in Oxford, MS via MsHomePros (contractor platform) and integrated into FairTradeWorker (3-sided construction marketplace).

Key metrics:
- 18,000+ training examples
- $0.002 per inference (RunPod Serverless)
- ~88% accuracy on held-out real jobs
- Seconds per estimate vs. 2-3 days manual

Looking for: acquisition, investment, or strategic partnership with a construction tech company.

Portfolio: waltburge.com/products/construction-ai
Full case study: waltburge.com/work/constructionai`}
        </Template>
      </div>
    </div>
  );
}
