import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import GlassCard from './GlassCard';
import useSound from '../hooks/useSound';

const Footer = ({ data }) => {
    const { playHover, playClick } = useSound();

    if (!data) return null;

    const getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'github': return <Github size={20} />;
            case 'linkedin': return <Linkedin size={20} />;
            case 'email': return <Mail size={20} />;
            default: return <Mail size={20} />;
        }
    };

    const formatUrl = (url) => {
        if (!url) return '#';
        if (url.startsWith('http')) return url;
        return `https://${url}`;
    };

    const socialLinks = [
        ...(data.socialMedia?.map(social => ({
            icon: getIcon(social.socialMedia),
            href: formatUrl(social.link),
            label: social.socialMedia
        })) || []),
        {
            icon: <Mail size={20} />,
            href: `mailto:${data.email}`,
            label: "Email"
        }
    ].filter(link => link.label !== 'Website'); // Filter out self-referential website link if desired, or keep it.


    return (
        <footer className="mt-20 pb-10">
            <GlassCard className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                        Vishal's Portfolio
                    </h3>
                    <p className="text-sm text-white/50">
                        Built with React, Tailwind, and excessive amounts of coffee.
                    </p>
                </div>

                <div className="flex gap-4">
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-cyan-400 transition-all text-white/70"
                            aria-label={link.label}
                            onMouseEnter={playHover}
                            onClick={playClick}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <div className="text-xs text-white/30 font-mono">
                    © {new Date().getFullYear()} All Systems Operational
                </div>
            </GlassCard>
        </footer>
    );
};

export default Footer;
