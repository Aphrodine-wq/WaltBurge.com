import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Specialties } from './components/Specialties';
import { Expertise } from './components/Expertise';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { CustomCursor } from './components/CustomCursor';
import { ArtisticNav } from './components/ArtisticNav';
import { TooltipProvider } from './components/ui/tooltip';
import { ContentSkeleton } from './components/ui/content-skeleton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SplashScreen } from './components/SplashScreen';
import { getPostBySlug } from './lib/blog';
import { getSystem } from './lib/shop';
import { localSlugs, getLocalPage } from './lib/local';
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

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showBlogIndex, setShowBlogIndex] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [servicesSlug, setServicesSlug] = useState<string>('');
  const [showShop, setShowShop] = useState(false);
  const [shopSlug, setShopSlug] = useState<string>('');
  const [localSlug, setLocalSlug] = useState<string>('');
  const [activeTechFilter, setActiveTechFilter] = useState<string | null>(null);

  // URL routing for a static SPA. The vercel.json rewrite serves index.html for
  // any non-/api path, so history.pushState gives us real, indexable URLs:
  //   /blog/<slug> → an open post   ·   /blog → the full index   ·   else → home.
  useEffect(() => {
    const syncFromPath = () => {
      const path = window.location.pathname;
      const blogSlug = path.match(/^\/blog\/(.+?)\/?$/);
      const services = path.match(/^\/services(?:\/(.+?))?\/?$/);
      const shop = path.match(/^\/shop(?:\/(.+?))?\/?$/);
      const local = path.match(/^\/([a-z0-9-]+)\/?$/);
      const localHit = local && localSlugs.includes(local[1]) ? local[1] : '';
      // Reset every view, then set the one this path selects.
      setSelectedPost(null);
      setSelectedProject(null);
      setShowBlogIndex(false);
      setShowServices(false);
      setShowShop(false);
      setLocalSlug('');
      if (localHit) {
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

  const handleProjectClick = (project: Project) => setSelectedProject(project);
  const handleBackToHome = () => setSelectedProject(null);

  const handleTechClickFromDetail = (tech: string) => {
    setActiveTechFilter(tech);
    setSelectedProject(null);
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
    const wasHome = !selectedProject && !selectedPost && !showBlogIndex && !showServices && !showShop && !localSlug;
    setSelectedProject(null);
    setSelectedPost(null);
    setShowBlogIndex(false);
    setShowServices(false);
    setShowShop(false);
    setLocalSlug('');
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

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-brand-base text-brand-primary selection:bg-brand-accent/20 selection:text-brand-accent font-sans">
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        </AnimatePresence>

        {!showSplash && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <ArtisticNav onNavigate={goToSection} onHome={goHome} />

            <main className="relative z-10 w-full overflow-x-hidden">
              <Hero />
              <Specialties onOpenMenu={() => openServices()} />
              <Blog onPostClick={handlePostClick} onViewAll={openBlogIndex} />
              <Expertise />

              <ErrorBoundary>
                <Suspense fallback={<div className="py-24 md:py-32 px-6 max-w-7xl mx-auto"><ContentSkeleton count={3} variant="grid" /></div>}>
                  <Projects
                    onProjectClick={handleProjectClick}
                    activeFilter={activeTechFilter}
                    onFilterChange={setActiveTechFilter}
                  />
                </Suspense>
              </ErrorBoundary>

              <FAQ />
              <About />
            </main>
            <Contact />
            <Footer />
            <Analytics />
          </>
        )}
      </div>
    </TooltipProvider>
  );
}

export default App;
