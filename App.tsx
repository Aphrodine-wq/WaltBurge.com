import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { Specialties } from './components/Specialties';
import { HowItWorks } from './components/HowItWorks';
import { WhyWaltBuilds } from './components/WhyWaltBuilds';
import { RevenueCalculator } from './components/RevenueCalculator';
import { EngineeringCredibility } from './components/EngineeringCredibility';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ArtisticNav } from './components/ArtisticNav';
import { TooltipProvider } from './components/ui/tooltip';
import { ContentSkeleton } from './components/ui/content-skeleton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getPostBySlug } from './lib/blog';
import { getSystem } from './lib/shop';
import { getWorkItem } from './lib/work';
import { localSlugs, getLocalPage } from './lib/local';
import { getVertical, SMB_CALC } from './lib/practice';
import { captureUtm } from './lib/leadContext';
import { SectionId, Project, BlogPost } from './types';

const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
// Blog routes carry the markdown + syntax-highlight + giscus weight — split them
// into their own chunks so the homepage bundle stays light.
const BlogPostDetail = lazy(() => import('./components/BlogPostDetail').then(module => ({ default: module.BlogPostDetail })));
const BlogIndex = lazy(() => import('./components/BlogIndex').then(module => ({ default: module.BlogIndex })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(module => ({ default: module.ServicesPage })));
const ShopPage = lazy(() => import('./components/ShopPage').then(module => ({ default: module.ShopPage })));
const ShopSystemDetail = lazy(() => import('./components/ShopSystemDetail').then(module => ({ default: module.ShopSystemDetail })));
const LocalLandingPage = lazy(() => import('./components/LocalLandingPage').then(module => ({ default: module.LocalLandingPage })));
const PrivatePracticePage = lazy(() => import('./components/PrivatePracticePage').then(module => ({ default: module.PrivatePracticePage })));
const ResumePage = lazy(() => import('./components/ResumePage').then(module => ({ default: module.ResumePage })));
const AuditPage = lazy(() => import('./components/AuditPage').then(module => ({ default: module.AuditPage })));

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showBlogIndex, setShowBlogIndex] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [servicesSlug, setServicesSlug] = useState<string>('');
  const [showShop, setShowShop] = useState(false);
  const [shopSlug, setShopSlug] = useState<string>('');
  const [localSlug, setLocalSlug] = useState<string>('');
  const [practiceSlug, setPracticeSlug] = useState<string>('');
  const [showResume, setShowResume] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  // URL routing for a static SPA. The vercel.json rewrite serves index.html for
  // any non-/api path, so history.pushState gives us real, indexable URLs:
  //   /blog/<slug> → an open post   ·   /blog → the full index   ·   else → home.
  useEffect(() => {
    // Stash UTM params once on landing so a lead submitted pages later still
    // carries its original attribution.
    captureUtm();
    const syncFromPath = () => {
      const path = window.location.pathname;
      const blogSlug = path.match(/^\/blog\/(.+?)\/?$/);
      const services = path.match(/^\/services(?:\/(.+?))?\/?$/);
      const shop = path.match(/^\/shop(?:\/(.+?))?\/?$/);
      const work = path.match(/^\/work(?:\/(.+?))?\/?$/);
      const resume = path.match(/^\/resume\/?$/);
      const audit = path.match(/^\/audit\/?$/);
      const practice = path.match(/^\/(for-doctors|for-lawyers)\/?$/);
      const local = path.match(/^\/([a-z0-9-]+)\/?$/);
      const localHit = local && localSlugs.includes(local[1]) ? local[1] : '';
      // Reset every view, then set the one this path selects.
      setSelectedPost(null);
      setSelectedProject(null);
      setShowBlogIndex(false);
      setShowServices(false);
      setShowShop(false);
      setLocalSlug('');
      setPracticeSlug('');
      setShowResume(false);
      setShowAudit(false);
      if (audit) {
        setShowAudit(true);
      } else if (resume) {
        setShowResume(true);
      } else if (practice) {
        setPracticeSlug(practice[1]);
      } else if (work) {
        // /work/<slug> opens the case study; bare /work is the homepage section.
        if (work[1]) setSelectedProject(getWorkItem(work[1]) ?? null);
        else setTimeout(() => document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' }), 400);
      } else if (localHit) {
        setLocalSlug(localHit);
      } else if (shop) {
        setShowShop(true);
        setShopSlug(shop[1] || '');
      } else if (services) {
        setShowServices(true);
        setServicesSlug(services[1] || '');
      } else if (blogSlug) {
        setSelectedPost(getPostBySlug(blogSlug[1]) ?? null);
      } else if (/^\/blog\/?$/.test(path)) {
        setShowBlogIndex(true);
      }
    };
    syncFromPath();
    window.addEventListener('popstate', syncFromPath);
    return () => window.removeEventListener('popstate', syncFromPath);
  }, []);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setShowBlogIndex(false);
    window.history.pushState(null, '', `/blog/${post.id}`);
    window.scrollTo(0, 0);
  };

  const openBlogIndex = () => {
    setSelectedPost(null);
    setShowBlogIndex(true);
    window.history.pushState(null, '', '/blog');
    window.scrollTo(0, 0);
  };

  // A post returns up one level to the blog index.
  const handlePostBack = () => {
    setSelectedPost(null);
    setShowBlogIndex(true);
    window.history.pushState(null, '', '/blog');
  };

  const handleBlogIndexBack = () => {
    setShowBlogIndex(false);
    window.history.pushState(null, '', '/');
  };

  const openServices = (slug?: string) => {
    setShowServices(true);
    setServicesSlug(slug || '');
    setSelectedPost(null);
    setShowBlogIndex(false);
    setSelectedProject(null);
    window.history.pushState(null, '', slug ? `/services/${slug}` : '/services');
    window.scrollTo(0, 0);
  };

  const handleServicesBack = () => {
    setShowServices(false);
    window.history.pushState(null, '', '/');
  };

  // Switching industry on the menu updates the URL without a view change.
  const handleServicesSelect = (slug: string) => {
    setServicesSlug(slug);
    window.history.replaceState(null, '', `/services/${slug}`);
  };

  const openShop = (slug?: string) => {
    setShowShop(true);
    setShopSlug(slug || '');
    setSelectedPost(null);
    setSelectedProject(null);
    setShowBlogIndex(false);
    setShowServices(false);
    window.history.pushState(null, '', slug ? `/shop/${slug}` : '/shop');
    window.scrollTo(0, 0);
  };

  const openLocal = (slug: string) => {
    setLocalSlug(slug);
    setSelectedPost(null);
    setSelectedProject(null);
    setShowBlogIndex(false);
    setShowServices(false);
    setShowShop(false);
    window.history.pushState(null, '', `/${slug}`);
    window.scrollTo(0, 0);
  };

  const handleLocalBack = () => {
    setLocalSlug('');
    window.history.pushState(null, '', '/');
  };

  const openPractice = (slug: string) => {
    setPracticeSlug(slug);
    setSelectedPost(null);
    setSelectedProject(null);
    setShowBlogIndex(false);
    setShowServices(false);
    setShowShop(false);
    setLocalSlug('');
    window.history.pushState(null, '', `/${slug}`);
    window.scrollTo(0, 0);
  };

  const handlePracticeBack = () => {
    setPracticeSlug('');
    window.history.pushState(null, '', '/');
  };

  const openResume = () => {
    setShowResume(true);
    setShowAudit(false);
    setSelectedPost(null);
    setSelectedProject(null);
    setShowBlogIndex(false);
    setShowServices(false);
    setShowShop(false);
    setLocalSlug('');
    setPracticeSlug('');
    window.history.pushState(null, '', '/resume');
    window.scrollTo(0, 0);
  };

  const handleResumeBack = () => {
    setShowResume(false);
    window.history.pushState(null, '', '/');
  };

  const openAudit = () => {
    setShowAudit(true);
    setShowResume(false);
    setSelectedPost(null);
    setSelectedProject(null);
    setShowBlogIndex(false);
    setShowServices(false);
    setShowShop(false);
    setLocalSlug('');
    setPracticeSlug('');
    window.history.pushState(null, '', '/audit');
    window.scrollTo(0, 0);
  };

  const handleAuditBack = () => {
    setShowAudit(false);
    window.history.pushState(null, '', '/');
  };

  // From a system detail, back goes up to the shop index.
  const handleShopBack = () => {
    setShopSlug('');
    if (shopSlug) {
      window.history.pushState(null, '', '/shop');
    } else {
      setShowShop(false);
      window.history.pushState(null, '', '/');
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setShowResume(false);
    setShowAudit(false);
    window.history.pushState(null, '', `/work/${project.slug || project.id}`);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', '/');
  };

  const handleTechClickFromDetail = (tech: string) => {
    setActiveTechFilter(tech);
    setSelectedProject(null);
    window.history.pushState(null, '', '/');
    setTimeout(() => {
      document.getElementById(SectionId.PROJECTS)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Global nav: works from any view. Blog routes to the full index; every other
  // item returns to the homepage and scrolls to its section (after the home view
  // mounts, when coming from a sub-page).
  const goToSection = (id: string) => {
    if (id === SectionId.BLOG) { openBlogIndex(); return; }
    if (id === 'marketplace') { openShop(); return; }
    if (id === 'services') { openServices(); return; }
    if (id === 'resume') { openResume(); return; }
    if (id === 'audit') { openAudit(); return; }
    const wasHome = !selectedProject && !selectedPost && !showBlogIndex && !showServices && !showShop && !localSlug && !practiceSlug && !showResume && !showAudit;
    setSelectedProject(null);
    setSelectedPost(null);
    setShowBlogIndex(false);
    setShowServices(false);
    setShowShop(false);
    setLocalSlug('');
    setPracticeSlug('');
    setShowResume(false);
    setShowAudit(false);
    if (!wasHome) window.history.pushState(null, '', '/');
    const scrollToSection = () => {
      if (id === SectionId.HERO) window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (wasHome) scrollToSection();
    else requestAnimationFrame(() => setTimeout(scrollToSection, 80));
  };

  const goHome = () => goToSection(SectionId.HERO);

  if (selectedProject) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToHome}
              onTechClick={handleTechClickFromDetail}
              onNavigate={goToSection}
            />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (selectedPost) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <BlogPostDetail
              post={selectedPost}
              onBack={handlePostBack}
              onPostClick={handlePostClick}
              onTagClick={openBlogIndex}
              onNavigate={goToSection}
            />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (showBlogIndex) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <BlogIndex onPostClick={handlePostClick} onBack={handleBlogIndexBack} onNavigate={goToSection} />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (showServices) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <ServicesPage
              initialSlug={servicesSlug}
              onBack={handleServicesBack}
              onNavigate={goToSection}
              onSelect={handleServicesSelect}
            />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (practiceSlug) {
    const vertical = getVertical(practiceSlug);
    if (vertical) {
      return (
        <TooltipProvider>
          <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
            <CustomCursor />
            <Suspense fallback={null}>
              <PrivatePracticePage
                vertical={vertical}
                onBack={handlePracticeBack}
                onNavigate={goToSection}
                onOpenSystem={openShop}
              />
            </Suspense>
            <Analytics />
          </div>
        </TooltipProvider>
      );
    }
  }

  if (localSlug) {
    const page = getLocalPage(localSlug);
    if (page) {
      return (
        <TooltipProvider>
          <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
            <CustomCursor />
            <Suspense fallback={null}>
              <LocalLandingPage page={page} onBack={handleLocalBack} onNavigate={goToSection} onOpenSystem={openShop} />
            </Suspense>
            <Analytics />
          </div>
        </TooltipProvider>
      );
    }
  }

  if (showShop) {
    const system = shopSlug ? getSystem(shopSlug) : undefined;
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            {system ? (
              <ShopSystemDetail
                system={system}
                onBack={handleShopBack}
                onNavigate={goToSection}
                onOpenSystem={openShop}
              />
            ) : (
              <ShopPage onBack={handleShopBack} onNavigate={goToSection} onOpenSystem={openShop} />
            )}
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (showAudit) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <ArtisticNav onNavigate={goToSection} onHome={goHome} />
          <Suspense fallback={null}>
            <AuditPage onBack={handleAuditBack} onNavigate={goToSection} />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  if (showResume) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
          <CustomCursor />
          <Suspense fallback={null}>
            <ResumePage onBack={handleResumeBack} onNavigate={goToSection} onProjectClick={handleProjectClick} />
          </Suspense>
          <Analytics />
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
        {/* Splash is static HTML in index.html — it paints before any JS loads
            and never unmounts page content, so LCP lands on the real hero
            instead of waiting out the splash timer. */}
        <>
            <CustomCursor />
            <ScrollProgress />
            <ArtisticNav onNavigate={goToSection} onHome={goHome} />

            <main className="relative z-10 w-full overflow-x-hidden">
              {/* Services-first funnel: hook → who it's for → process → proof →
                  cost of doing nothing → risk reversal → objections → who builds
                  it (secondary trust) → book. */}
              <Hero onBookCall={() => goToSection(SectionId.CONTACT)} />

              <Specialties onOpenMenu={() => openServices()} />

              <HowItWorks />

              <ErrorBoundary>
                <Suspense fallback={<div className="py-24 md:py-32 px-6 max-w-7xl mx-auto"><ContentSkeleton count={3} variant="grid" /></div>}>
                  <Projects
                    onProjectClick={handleProjectClick}
                    onOpenResume={openResume}
                    onOpenServices={() => openServices()}
                    activeFilter={activeTechFilter}
                    onFilterChange={setActiveTechFilter}
                  />
                </Suspense>
              </ErrorBoundary>

              {/* The cost of doing nothing — runs on the visitor's own numbers and
                  carries the estimate into the lead. */}
              <section id={SectionId.CALC} className="py-20 md:py-28 px-4 md:px-6 bg-brand-muted border-t border-brand-border/40">
                <div className="max-w-5xl mx-auto">
                  <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-accent mb-6">
                    The cost of doing nothing
                  </div>
                  <RevenueCalculator calc={SMB_CALC} onBook={() => goToSection(SectionId.CONTACT)} />
                </div>
              </section>

              <WhyWaltBuilds />
              <EngineeringCredibility onOpenResume={openResume} />
            </main>
            <Contact />
            <Footer />
            <Analytics />
          </>
      </div>
    </TooltipProvider>
  );
}

export default App;
