import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Award, ExternalLink, BookOpen, Code2, Cpu, Network, Lightbulb } from 'lucide-react';

interface GitHubStats {
    repos: number;
    stars: number;
    followers: number;
}

const certifications = [
    { name: 'AWS Solutions Architect', icon: Award, color: 'from-orange-400 to-orange-600' },
    { name: 'Kubernetes Administrator', icon: Network, color: 'from-blue-400 to-blue-600' },
    { name: 'Machine Learning Specialist', icon: Cpu, color: 'from-purple-400 to-purple-600' },
    { name: 'System Design Expert', icon: Lightbulb, color: 'from-green-400 to-green-600' }
];

const articles = [
    {
        title: 'Building Scalable RAG Pipelines',
        description: 'Deep dive into production-ready retrieval systems.',
        link: 'https://github.com/Aphrodine-wq',
        icon: BookOpen,
        tag: 'AI Engineering'
    },
    {
        title: 'From Bare Metal to Cloud',
        description: 'Systems programming principles in modern infra.',
        link: 'https://github.com/Aphrodine-wq',
        icon: Code2,
        tag: 'Systems'
    },
    {
        title: 'Enterprise Architecture',
        description: 'Lessons from scaling to millions of users.',
        link: 'https://github.com/Aphrodine-wq',
        icon: Network,
        tag: 'Architecture'
    }
];

export const ThoughtLeadership: React.FC = () => {
    const [githubStats, setGithubStats] = useState<GitHubStats>({
        repos: 42,
        stars: 1200,
        followers: 350
    });

    // GitHub API integration with caching and error handling
    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                // Check cache first
                const cachedStats = localStorage.getItem('githubStats');
                const cachedTime = localStorage.getItem('githubStatsTime');
                const now = Date.now();

                // Use cache if less than 1 hour old
                if (cachedStats && cachedTime && now - parseInt(cachedTime) < 3600000) {
                    setGithubStats(JSON.parse(cachedStats));
                    return;
                }

                // Fetch user data
                const userResponse = await fetch('https://api.github.com/users/Aphrodine-wq');
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();

                // Fetch repos to calculate total stars
                const reposResponse = await fetch('https://api.github.com/users/Aphrodine-wq/repos?per_page=100');
                if (!reposResponse.ok) throw new Error('Failed to fetch repos');
                const repos = await reposResponse.json();

                const totalStars = repos.reduce((sum: number, repo: any) => sum + (repo.stargazers_count || 0), 0);

                const stats = {
                    repos: userData.public_repos,
                    stars: totalStars,
                    followers: userData.followers
                };

                setGithubStats(stats);
                // Cache the results
                localStorage.setItem('githubStats', JSON.stringify(stats));
                localStorage.setItem('githubStatsTime', now.toString());
            } catch (error) {
                console.error('Failed to fetch GitHub stats:', error);
                // Keep fallback values on error
            }
        };

        fetchGitHubStats();
    }, []);

    return (
        <section className="py-24 md:py-32 px-4 md:px-6 bg-brand-base relative overflow-hidden border-t border-brand-border/10">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
                >
                    <div>
                        <span className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-2 block">
                            Knowledge Base
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-primary tracking-tighter">
                            Research & <br /> <span className="text-brand-secondary opacity-60">Insights</span>
                        </h2>
                    </div>

                    <a href="https://github.com/Aphrodine-wq" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 rounded-full bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-all">
                        <Github className="text-brand-primary group-hover:text-brand-accent transition-colors" size={20} />
                        <span className="font-mono text-xs uppercase tracking-wider text-brand-primary">View GitHub</span>
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* GitHub Stats Card - Spans 4 Cols */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-4 p-8 rounded-3xl bg-brand-surface/50 border border-brand-border backdrop-blur-sm hover:border-brand-accent/30 transition-all"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 rounded-2xl bg-brand-primary/5">
                                <Github size={24} className="text-brand-primary" />
                            </div>
                            <h3 className="font-bold text-xl text-brand-primary">Open Source</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                                <span className="text-brand-secondary text-sm font-mono uppercase">Repositories</span>
                                <span className="text-2xl font-black text-brand-accent">{githubStats.repos}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                                <span className="text-brand-secondary text-sm font-mono uppercase">Total Stars</span>
                                <span className="text-2xl font-black text-brand-purple">{githubStats.stars}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                                <span className="text-brand-secondary text-sm font-mono uppercase">Followers</span>
                                <span className="text-2xl font-black text-brand-secondary">{githubStats.followers}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Articles Grid - Spans 8 Cols */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles.map((article, index) => (
                            <motion.a
                                key={article.title}
                                href={article.link}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-3xl bg-brand-surface border border-brand-border hover:border-brand-accent/50 transition-all flex flex-col justify-between h-full"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 rounded-2xl bg-brand-surface border border-brand-border group-hover:bg-brand-accent/10 transition-colors">
                                            <article.icon size={20} className="text-brand-secondary group-hover:text-brand-accent transition-colors" />
                                        </div>
                                        <ExternalLink size={16} className="text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h4 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">{article.title}</h4>
                                    <p className="text-sm text-brand-secondary leading-relaxed">{article.description}</p>
                                </div>
                                <div className="mt-8">
                                    <span className="px-3 py-1 rounded-full bg-brand-base border border-brand-border text-[10px] uppercase tracking-wider text-brand-secondary font-mono">
                                        {article.tag}
                                    </span>
                                </div>
                            </motion.a>
                        ))}

                        {/* Certifications Mini-Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-3xl bg-gradient-to-br from-brand-surface to-brand-base border border-brand-border flex flex-col justify-center items-center text-center gap-4"
                        >
                            <div className="flex -space-x-4">
                                {certifications.map((cert) => (
                                    <div key={cert.name} className={`w-10 h-10 rounded-full bg-gradient-to-br ${cert.color} p-2 border-2 border-brand-surface shadow-lg flex items-center justify-center`} title={cert.name}>
                                        <cert.icon size={16} className="text-white" />
                                    </div>
                                ))}
                            </div>
                            <h4 className="font-bold text-brand-primary">4+ Major Certifications</h4>
                            <p className="text-xs text-brand-secondary">Across Cloud, AI & Systems</p>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};
