import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Package, Layout, ArrowRight, Check, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    type: 'Template' | 'Component';
    features: string[];
    popular?: boolean;
    storeUrl?: string;
}

const products: Product[] = [
    {
        id: 'portfolio-v1',
        title: 'Minimalist Portfolio Kit',
        description: 'A clean, typography-focused personal portfolio template built with Next.js and Tailwind.',
        price: '$49',
        type: 'Template',
        features: ['Dark/Light Mode', 'MDX Blog Support', 'SEO Optimized', 'Framer Motion'],
        popular: true,
        storeUrl: 'https://gumroad.com/waltburge'
    },
    {
        id: 'saas-starter',
        title: 'SaaS Launchpad',
        description: 'Complete dashboard starter kit with authentication, billing, and user management.',
        price: '$89',
        type: 'Template',
        features: ['Stripe Integration', 'Supabase Auth', 'Dashboard UI', 'Email Templates'],
        storeUrl: 'https://gumroad.com/waltburge'
    },
    {
        id: 'agency-landing',
        title: 'Agency X',
        description: 'High-conversion landing page optimized for digital agencies and studios.',
        price: '$59',
        type: 'Template',
        features: ['Case Studies CMS', 'Contact Forms', 'Performance Optimized', 'Scroll Animations'],
        storeUrl: 'https://gumroad.com/waltburge'
    },
    {
        id: 'motion-dock',
        title: 'Physics Dock',
        description: 'The exact floating dock component used on this site with physics-based magnification.',
        price: '$15',
        type: 'Component',
        features: ['React + Framer Motion', 'Fully Customizable', 'TypeScript Ready'],
        storeUrl: 'https://gumroad.com/waltburge'
    },
    {
        id: 'magic-card',
        title: 'Magic Hover Cards',
        description: 'Interactive cards with spotlight hover effects and border gradients.',
        price: '$10',
        type: 'Component',
        features: ['Hardware Accelerated', 'Tailwind Native', 'Copy-Paste Ready'],
        storeUrl: 'https://gumroad.com/waltburge'
    },
    {
        id: 'grid-bg',
        title: 'Geometric Backgrounds',
        description: 'A pack of 5 high-performance, animated SVG background patterns.',
        price: '$12',
        type: 'Component',
        features: ['Lightweight', 'Theme Compatible', 'No JS Dependency'],
        storeUrl: 'https://gumroad.com/waltburge'
    }
];

export const Marketplace: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'Template' | 'Component'>('Template');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(p => p.type === activeTab);

    return (
        <section id="marketplace" className="py-24 px-4 bg-brand-base border-t border-brand-border/10 relative overflow-hidden transition-colors duration-500">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none text-brand-accent">
                <ShoppingBag size={400} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono mb-6"
                    >
                        <Package size={14} />
                        <span>PREMIUM ASSETS</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-black text-brand-primary mb-6 tracking-tight">
                        The System <span className="text-brand-accent">Store</span>
                    </h2>
                    <p className="text-brand-secondary max-w-2xl mx-auto text-lg font-light">
                        Production-ready templates and components extracted from my best work.
                        High-quality, typed, and accessible primitives.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12 relative z-0 opacity-50 pointer-events-none filter blur-sm select-none">
                    <div className="p-1.5 bg-brand-surface/50 backdrop-blur-md rounded-2xl border border-brand-border inline-flex shadow-inner">
                        {(['Template', 'Component'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-500 ${activeTab === tab
                                    ? 'bg-brand-primary text-brand-base shadow-xl'
                                    : 'text-brand-secondary hover:text-brand-primary hover:bg-brand-accent/5'
                                    }`}
                            >
                                {tab}s
                            </button>
                        ))}
                    </div>
                </div>

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 z-50 flex items-center justify-center top-64">
                    <div className="bg-brand-surface/80 backdrop-blur-xl border border-brand-border p-8 rounded-3xl text-center shadow-2xl max-w-md mx-4">
                        <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-accent animate-pulse">
                            <Package size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-primary mb-2">System Upgrade in Progress</h3>
                        <p className="text-brand-secondary text-sm leading-relaxed mb-6">
                            The Marketplace is currently offline for inventory updates.
                            New assets will be available soon.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-xs font-mono text-brand-primary/60">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                            STATUS: MAINTENANCE
                        </div>
                    </div>
                </div>

                {/* Grid - Blurred */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-20 pointer-events-none filter blur-sm select-none"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="group relative bg-brand-surface/30 backdrop-blur-sm border border-brand-border/40 rounded-3xl p-8 hover:border-brand-accent/40 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-brand-accent/5 overflow-hidden"
                            >
                                {product.popular && (
                                    <div className="absolute top-6 right-6">
                                        <Badge className="bg-brand-accent border-none text-black font-bold shadow-lg">
                                            <Star size={10} className="mr-1 fill-current" /> POPULAR
                                        </Badge>
                                    </div>
                                )}

                                <div className="mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-brand-base border border-brand-border flex items-center justify-center mb-6 text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-all duration-500 shadow-inner">
                                        {product.type === 'Template' ? <Layout size={28} /> : <Package size={28} />}
                                    </div>
                                    <h3 className="text-2xl font-bold text-brand-primary mb-3">{product.title}</h3>
                                    <p className="text-sm text-brand-secondary leading-relaxed font-light">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {product.features.slice(0, 3).map((f, i) => (
                                        <span key={i} className="text-[10px] font-mono tracking-widest text-brand-secondary/70 bg-brand-base/50 px-2.5 py-1 rounded-full border border-brand-border/30 capitalize">
                                            {f}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-brand-border/20">
                                    <span className="text-3xl font-black text-brand-primary tracking-tighter">{product.price}</span>
                                    <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all duration-500">
                                        EXPLORE NEXUS <ArrowRight size={16} />
                                    </div>
                                </div>

                                {/* Animated Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 via-transparent to-brand-purple/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Product Nexus Detail Overlay */}
                <AnimatePresence>
                    {selectedProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
                        >
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-brand-base/90 backdrop-blur-xl cursor-pointer"
                                onClick={() => setSelectedProduct(null)}
                            />

                            {/* Modal */}
                            <motion.div
                                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                                className="relative w-full max-w-5xl bg-brand-surface border border-brand-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[850px]"
                            >
                                {/* Left Side: visual */}
                                <div className="w-full md:w-1/2 bg-brand-base p-12 flex flex-col justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-mesh-gradient opacity-10" />
                                    <div className="relative z-10 space-y-8">
                                        <div className="w-20 h-20 rounded-3xl bg-brand-accent flex items-center justify-center text-black shadow-2xl shadow-brand-accent/20">
                                            {selectedProduct.type === 'Template' ? <Layout size={40} /> : <Package size={40} />}
                                        </div>
                                        <div>
                                            <h3 className="text-5xl font-black text-brand-primary tracking-tighter leading-none mb-4">
                                                {selectedProduct.title}
                                            </h3>
                                            <Badge className="bg-brand-accent/10 text-brand-accent border-brand-accent/20">
                                                {selectedProduct.type} RESOURCE
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div>
                                                <p className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase mb-1">LICENSE</p>
                                                <p className="text-brand-primary font-bold">Standard Commercial</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase mb-1">VERSION</p>
                                                <p className="text-brand-primary font-bold">v1.2.4</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Details & Buy */}
                                <div className="w-full md:w-1/2 p-12 overflow-y-auto">
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="text-4xl font-black text-brand-primary">{selectedProduct.price}</div>
                                        <button
                                            onClick={() => setSelectedProduct(null)}
                                            className="w-10 h-10 rounded-full bg-brand-base border border-brand-border flex items-center justify-center text-brand-secondary hover:text-brand-primary transition-colors"
                                        >
                                            <ArrowRight size={20} className="rotate-180" />
                                        </button>
                                    </div>

                                    <div className="space-y-10">
                                        <section>
                                            <h4 className="text-[10px] font-mono text-brand-secondary tracking-[0.4em] uppercase mb-4">Core Architecture</h4>
                                            <p className="text-brand-primary font-light text-lg leading-relaxed">
                                                {selectedProduct.description} Built specifically for high-performance applications with absolute type safety and modern primitives.
                                            </p>
                                        </section>

                                        <section>
                                            <h4 className="text-[10px] font-mono text-brand-secondary tracking-[0.4em] uppercase mb-4">Functional Specs</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                {selectedProduct.features.map((f, i) => (
                                                    <div key={i} className="flex items-center gap-4 group/spec">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent group-hover/spec:scale-150 transition-transform" />
                                                        <span className="text-sm text-brand-secondary group-hover/spec:text-brand-primary transition-colors">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        <a
                                            href={selectedProduct.storeUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block"
                                        >
                                            <Button className="w-full h-16 rounded-2xl bg-brand-primary text-brand-base text-lg font-black hover:bg-brand-accent hover:text-black transition-all group cursor-pointer">
                                                ACQUIRE ASSET
                                                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                                            </Button>
                                        </a>

                                        <p className="text-center text-[10px] font-mono text-brand-secondary/40">
                                            SECURE ENCRYPTED TRANSACTION • INSTANT REPOSITORY ACCESS
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
