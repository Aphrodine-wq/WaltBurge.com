// Walt Builds service menus. The source-of-truth markdown lives in
// content/services/*.md (copied from the Strata menu docs). Vite inlines them as
// raw strings at build time, same as the blog — so all menus render on-site and
// stay in the exact format of the printed menu.
const modules = import.meta.glob('../content/services/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface ServiceMenu {
  slug: string;
  industry: string; // display name, e.g. "Legal & Business"
  body: string;      // cleaned markdown — page header + contact block stripped
}

function parse(path: string, raw: string): ServiceMenu {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');

  // Industry display name from the "### <Industry> Services." heading.
  const m = raw.match(/^###\s+(.+?)\s+Services\.?\s*$/m);
  const industry = m ? m[1].trim() : slug;

  let body = raw;

  // Drop the trailing contact block — the site has its own contact section, and
  // the menu's QR/contact markup ("::: contactmeta") doesn't render in markdown.
  const contact = body.search(/^##\s+Let.s build something/m);
  if (contact !== -1) body = body.slice(0, contact);

  // Drop the "# Walt Builds" + "### <Industry> Services." title block — the page
  // renders its own header. Start the body at the first real section.
  const firstSection = body.search(/^##\s+SECTION/m);
  if (firstSection !== -1) {
    body = body.slice(firstSection);
  } else {
    body = body.replace(/^#\s+Walt Builds[\s\S]*?\n---\s*\n/, '');
  }

  return { slug, industry, body: body.trim() };
}

const all: ServiceMenu[] = Object.entries(modules).map(([p, r]) => parse(p, r));

// Legal & Business (the flagship merged menu) leads; the rest alphabetical.
all.sort((a, b) =>
  a.slug === 'legal-business' ? -1 : b.slug === 'legal-business' ? 1 : a.industry.localeCompare(b.industry)
);

export const menus = all;

export function getMenu(slug: string): ServiceMenu | undefined {
  return all.find(m => m.slug === slug);
}
