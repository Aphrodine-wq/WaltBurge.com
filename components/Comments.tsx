import React from 'react';
import Giscus from '@giscus/react';

// giscus = GitHub Discussions-backed comments. No backend, no database — the
// site stays a static SPA. To turn comments on:
//   1. Make sure the repo below is PUBLIC and has Discussions enabled
//      (Settings → General → Features → Discussions).
//   2. Install the giscus GitHub App: https://github.com/apps/giscus
//   3. Go to https://giscus.app, enter the repo, and copy the generated
//      data-repo-id and data-category-id into REPO_ID / CATEGORY_ID below.
// Until REPO_ID and CATEGORY_ID are filled in, the comment box stays hidden.
const REPO = 'Aphrodine-wq/waltburge.com' as `${string}/${string}`;
const REPO_ID = '';        // <-- paste from giscus.app
const CATEGORY = 'Announcements';
const CATEGORY_ID = '';    // <-- paste from giscus.app

export const Comments: React.FC = () => {
  const configured = REPO_ID !== '' && CATEGORY_ID !== '';

  if (!configured) {
    return (
      <div className="mt-16 pt-10 border-t border-brand-border">
        <p className="text-brand-secondary font-mono text-sm">Comments are coming soon.</p>
      </div>
    );
  }

  return (
    <div className="mt-16 pt-10 border-t border-brand-border">
      <h3 className="text-lg font-bold text-brand-primary mb-6 tracking-tight">
        Comments<span className="text-brand-accent">.</span>
      </h3>
      <Giscus
        repo={REPO}
        repoId={REPO_ID}
        category={CATEGORY}
        categoryId={CATEGORY_ID}
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  );
};
