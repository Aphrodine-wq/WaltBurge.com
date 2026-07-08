// resume.mjs — the /resume recruiter landing. Static, print-clean (cmd+P → PDF).
// Flagship work is pulled from content/work by id so it never drifts from /work.
import { nav, footer, esc } from './layout.mjs';

const CONTACT = {
  name: 'Walt Burge',
  title: 'AI Developer — Data Science & AI Learning Systems',
  location: 'Oxford, MS · Remote-friendly',
  email: 'jamesburge.mcm@gmail.com',
  phone: '(662) 292-5533',
  phoneHref: 'tel:+16622925533',
  github: 'github.com/Aphrodine-wq',
  githubHref: 'https://github.com/Aphrodine-wq',
};

const SKILL_GROUPS = [
  { label: 'ML / AI', items: ['PyTorch', 'LLM fine-tuning (Llama 3.1)', 'Distillation', 'RAG', 'Embeddings', 'LangChain', 'Ollama', 'MCP'] },
  { label: 'Data Science', items: ['Dataset curation', 'Synthetic data generation', 'Evaluation', 'Data pipelines'] },
  { label: 'ML Infra', items: ['RunPod', 'vast.ai (GPU)', 'Serverless inference', 'Model ops'] },
  { label: 'Languages', items: ['Python', 'TypeScript', 'Java', 'Rust'] },
  { label: 'Backend & APIs', items: ['Spring Boot', 'Node.js', 'REST', 'WebSocket', 'PostgreSQL', 'SQLite'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'React Native (Expo)', 'Tailwind CSS'] },
];

const FLAGSHIP = [
  { id: 'constructionai', proves: 'A custom fine-tuned LLM in production, not a notebook — the whole pipeline: data curation, synthetic distillation, hyperparameter tuning, and serverless deploy at ~$0.002/estimate.' },
  { id: 'forge', proves: 'A desktop trainer for the whole fine-tuning loop — GPU provisioning on vast.ai, dataset and hyperparameter management, launch and monitor. The training toolchain, productized.' },
  { id: 'tessera', proves: 'A markdown-native language for AI agents — substrate-typed, executed on PyTorch / LangChain / Ollama backends, and formally verified before it runs.' },
  { id: 'engram', proves: 'MIT-licensed, local-first AI memory — on-device OCR + an MCP server so any agent can search it. One pip install, nothing leaves the machine.' },
  { id: 'fairtradeworker', proves: 'AI shipped to real users — a two-sided marketplace where ConstructionAI prices jobs live, across Next.js web, a Java/Spring backend, and a React Native app.' },
];

export function resumePage({ workItems }) {
  const byId = new Map(workItems.map((w) => [w.id, w]));
  const flagship = FLAGSHIP.map((f) => ({ ...f, project: byId.get(f.id) })).filter((x) => x.project);

  const contactCol = `          <div class="rz-contact">
            <span><span class="rz-i">&#9679;</span> ${esc(CONTACT.location)}</span>
            <a href="mailto:${CONTACT.email}"><span class="rz-i">&#9679;</span> ${esc(CONTACT.email)}</a>
            <a href="${CONTACT.phoneHref}"><span class="rz-i">&#9679;</span> ${esc(CONTACT.phone)}</a>
            <a href="${CONTACT.githubHref}" target="_blank" rel="noopener"><span class="rz-i">&#9679;</span> ${esc(CONTACT.github)}</a>
          </div>`;

  const skills = SKILL_GROUPS.map((g) => `            <div class="rz-skill">
              <span class="rz-skill__label">${esc(g.label)}</span>
              <span class="rz-skill__items">${esc(g.items.join(' · '))}</span>
            </div>`).join('\n');

  const work = flagship.map(({ project, proves }) => {
    const href = project.link || project.repositoryUrl;
    const linkLabel = project.repositoryUrl && !project.link ? 'Code' : 'Live';
    return `            <div class="rz-work">
              <div>
                <div class="rz-work__head">
                  <a class="rz-work__title" href="/work/${esc(project.slug)}" data-cursor="hover">${esc(project.title)}</a>
                  <span class="rz-work__meta">${esc(project.status || '')}${project.year ? ` · ${esc(project.year)}` : ''}</span>
                </div>
                <p class="rz-work__proves">${esc(proves)}</p>
                <p class="rz-work__tech">${esc((project.techStack || []).join(' · '))}</p>
              </div>
              ${href ? `<a class="rz-work__link" href="${esc(href)}" target="_blank" rel="noopener" data-cursor="hover">${linkLabel} &#8599;</a>` : ''}
            </div>`;
  }).join('\n');

  const main = `${nav()}
    <main class="rz">
      <a class="rz-back wrap-narrow print-hide" href="/" data-cursor="hover">&larr; Back</a>
      <div class="rz-sheet">
        <header class="rz-id">
          <div>
            <span class="eyebrow">Résumé</span>
            <h1 class="rz-name">${esc(CONTACT.name)}<span class="dot">.</span></h1>
            <p class="rz-title">${esc(CONTACT.title)}</p>
          </div>
${contactCol}
        </header>

        <section class="rz-section">
          <p class="rz-summary">Self-taught AI developer with a heavy data-science and learning-systems focus. I wrote my first line of code seven months ago; since then I've <strong>trained a custom LLM</strong> end to end — data curation, synthetic distillation, fine-tuning, and serverless deploy — built the <strong>tooling and agent systems</strong> around it, and shipped production systems that put real AI in front of real users. I build the model and everything around it: when the thing I needed didn't exist, I built it.</p>
        </section>

        <section class="rz-section">
          <h2 class="rz-h2">Skills</h2>
          <div class="rz-skills">
${skills}
          </div>
        </section>

        <section class="rz-section">
          <h2 class="rz-h2">Selected Work</h2>
          <div class="rz-works">
${work}
          </div>
          <a class="rz-more print-hide" href="/work" data-cursor="hover">See the portfolio &rarr;</a>
        </section>

        <section class="rz-section">
          <h2 class="rz-h2">Background</h2>
          <div class="rz-bg">
            <span class="rz-bg__when">2025 — now</span>
            <p>Self-taught AI / ML development, with the full-stack to ship it. Trained a custom model and built the data, training, and agent systems around it — live in production for a paying contractor (MHP Construction, Oxford MS).</p>
            <span class="rz-bg__when">Before</span>
            <p>Construction — ran crews and wrote estimates by hand. That's where the engineering instinct comes from: scope it, sequence it, ship something that holds under load.</p>
          </div>
        </section>

        <section class="rz-cta">
          <div class="rz-cta__btns">
            <a class="btn btn--primary" href="mailto:${CONTACT.email}" data-cursor="hover">Get in touch</a>
            <a class="btn btn--ghost" href="${CONTACT.githubHref}" target="_blank" rel="noopener" data-cursor="hover">GitHub</a>
          </div>
          <button class="rz-print print-hide" data-print type="button">Save as PDF</button>
        </section>
      </div>
    </main>
${footer()}`;

  return {
    title: 'Résumé — AI Developer (Data Science & Learning Systems) | Walt Burge',
    description: 'Walt Burge — AI developer in Oxford, MS, focused on data science and AI learning systems. Self-taught in seven months; trained a custom LLM end to end and built the tooling and agent systems around it. Open to AI / ML roles.',
    path: '/resume',
    ogTitle: 'Résumé — Walt Burge',
    bodyClass: 'body--resume',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: 'Walt Burge',
          alternateName: 'James Walton',
          jobTitle: 'AI Developer',
          url: 'https://waltburge.com/resume',
          email: CONTACT.email,
          telephone: '+1-662-292-5533',
          sameAs: ['https://github.com/Aphrodine-wq'],
          knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'LLM Fine-Tuning', 'Model Distillation', 'Dataset Curation', 'PyTorch', 'Llama', 'RAG', 'Embeddings', 'LangChain', 'MCP', 'Agentic AI', 'Python'],
          address: { '@type': 'PostalAddress', addressLocality: 'Oxford', addressRegion: 'MS', addressCountry: 'US' },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://waltburge.com/' },
          { '@type': 'ListItem', position: 2, name: 'Résumé', item: 'https://waltburge.com/resume' },
        ],
      },
    ],
    main,
  };
}
