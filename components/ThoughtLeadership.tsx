import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Award, ExternalLink, BookOpen, Code2 } from 'lucide-react';

interface GitHubStats {
    repos: number;
    stars: number;
    followers: number;
}

const certifications = [
    { name: 'AWS Solutions Architect', icon: Award, color: 'from-orange-400 to-orange-600' },
    { name: 'Kubernetes Administrator', icon: Award, color: 'from-blue-400 to-blue-600' },
    { name: 'Machine Learning Specialist', icon: Award, color: 'from-purple-400 to-purple-600' },
    { name: 'System Design Expert', icon: Award, color: 'from-green-400 to-green-600' }
];

const articles = [
    {
        title: 'Building Scalable RAG Pipelines',
        description: 'A deep dive into architecting production-ready retrieval systems',
        link: '#',
        icon: BookOpen
    },
    {
        title: 'From Bare Metal to AI',
        description: 'How systems programming informs modern AI development',
        link: '#',
        icon: Code2
    },
    {
        title: 'Enterprise Architecture Patterns',
        description: 'Lessons from scaling to millions of users',
        link: '#',
        icon: BookOpen
    }
];

export const ThoughtLeadership: React.FC = () => {
    const [githubStats, setGithubStats] = useState<GitHubStats>({
        repos: 42,
        stars: 1200,
        followers: 350
    });

    // Placeholder for GitHub API integration
    // In production, you would fetch real data here
    useEffect(() => {
        // const fetchGitHubStats = async () => {
        //   try {
        //     const response = await fetch('https://api.github.com/users/YOUR_USERNAME');
        //     const data = await response.json();
        //     setGithubStats({
        //       repos: data.public_repos,
        //       stars: data.total_stars, // Would need additional API call
        //       followers: data.followers
        //     });
        //   } catch (error) {
        //     console.error('Failed to fetch GitHub stats:', error);
        //   }
        // };
        // fetchGitHubStats();
    }, []);

    return (
        <section className="py-20 md:py-32 px-4 md:px-6 bg-brand-base relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-20 right-10 w-96 h-96 bg-brand-purple/5 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-brand-accent font-mono text-xs uppercase tracking-widest mb-4 block">
                        <span className="inline-block w-8 h-px bg-brand-accent mr-3" />
                        04. Contributions
                        <span className="inline-block w-8 h-px bg-brand-accent ml-3" />
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6">
                        Thought <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-purple">Leadership</span>
                    </h2>
                    <p className="text-lg text-brand-secondary max-w-2xl mx-auto">
                        Sharing knowledge through open source, writing, and community engagement
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    {/* GitHub Activity */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-brand-primary flex items-center gap-3">
                            <Github className="text-brand-accent" size={32} />
                            Open Source
                        </h3>

                        {/* GitHub Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                className="p-4 md:p-6 rounded-xl bg-brand-surface/50 border border-brand-border hover:border-brand-accent/50 transition-all cursor-default group"
                            >
                                <Code2 className="text-brand-accent mb-2 group-hover:scale-110 transition-transform" size={24} />
                                <div className="text-2xl md:text-3xl font-black text-brand-primary">{githubStats.repos}</div>
                                <div className="text-xs text-brand-secondary uppercase tracking-wider font-mono">Repositories</div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                className="p-4 md:p-6 rounded-xl bg-brand-surface/50 border border-brand-border hover:border-brand-purple/50 transition-all cursor-default group"
                            >
                                <Star className="text-brand-purple mb-2 group-hover:scale-110 transition-transform" size={24} />
                                <div className="text-2xl md:text-3xl font-black text-brand-primary">{githubStats.stars}</div>
                                <div className="text-xs text-brand-secondary uppercase tracking-wider font-mono">Stars</div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, y: -4 }}
                                className="p-4 md:p-6 rounded-xl bg-brand-surface/50 border border-brand-border hover:border-brand-gold/50 transition-all cursor-default group"
                            >
                                <GitFork className="text-brand-gold mb-2 group-hover:scale-110 transition-transform" size={24} />
                                <div className="text-2xl md:text-3xl font-black text-brand-primary">{githubStats.followers}</div>
                                <div className="text-xs text-brand-secondary uppercase tracking-wider font-mono">Followers</div>
                            </motion.div>
                        </div>

                        {/* Certifications */}
                        <div className="mt-8">
                            <h4 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
                                <Award className="text-brand-gold" size={24} />
                                Certifications
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={cert.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="p-4 rounded-xl bg-brand-surface/50 border border-brand-border hover:border-brand-accent/50 transition-all cursor-default group"
                                    >
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.color} p-2 mb-2 group-hover:scale-110 transition-transform`}>
                                            <cert.icon className="w-full h-full text-white" />
                                        </div>
                                        <div className="text-sm font-semibold text-brand-primary">{cert.name}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Articles & Writing */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-brand-primary flex items-center gap-3">
                            <BookOpen className="text-brand-purple" size={32} />
                            Technical Writing
                        </h3>

                        <div className="space-y-4">
                            {articles.map((article, index) => (
                                <motion.a
                                    key={article.title}
                                    href={article.link}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ x: 8, scale: 1.02 }}
                                    className="block p-6 rounded-xl bg-brand-surface/50 border border-brand-border hover:border-brand-purple/50 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <article.icon className="text-brand-purple group-hover:text-brand-accent transition-colors" size={20} />
                                                <h4 className="text-lg font-bold text-brand-primary group-hover:text-brand-accent transition-colors">
                                                    {article.title}
                                                </h4>
                                            </div>
                                            <p className="text-sm text-brand-secondary">
                                                {article.description}
                                            </p>
                                        </div>
                                        <ExternalLink className="text-brand-secondary group-hover:text-brand-accent transition-colors flex-shrink-0" size={18} />
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* CTA for more */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-6 rounded-xl bg-gradient-to-br from-brand-accent/10 to-brand-purple/10 border border-brand-accent/30 hover:border-brand-accent/50 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-brand-primary mb-1">View All Articles</h4>
                                    <p className="text-sm text-brand-secondary">Explore more technical insights and tutorials</p>
                                </div>
                                <ExternalLink className="text-brand-accent group-hover:translate-x-1 transition-transform" size={24} />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
