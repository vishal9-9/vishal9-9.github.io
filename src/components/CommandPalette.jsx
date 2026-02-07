import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Hash, ExternalLink, ArrowRight, Code, Server, Rocket } from 'lucide-react';
import useSound from '../hooks/useSound';
import { useServer } from '../context/ServerContext';

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { playType, playClick, playHover, playSuccess } = useSound();
    const { openSystemMonitor, startDeploy } = useServer();

    const commands = [
        { id: 'home', title: 'Home', icon: <Hash size={18} />, action: () => window.location.href = '#hero' },
        { id: 'projects', title: 'Projects', icon: <Code size={18} />, action: () => window.location.href = '#projects' },
        { id: 'about', title: 'About', icon: <Terminal size={18} />, action: () => window.location.href = '#about' },
        { id: 'contact', title: 'Contact', icon: <ArrowRight size={18} />, action: () => window.location.href = '#contact' },
        { id: 'htop', title: 'System Monitor (htop)', icon: <Server size={18} />, action: openSystemMonitor },
        { id: 'deploy', title: 'Deploy to Production', icon: <Rocket size={18} />, action: startDeploy },
        { id: 'github', title: 'GitHub', icon: <ExternalLink size={18} />, action: () => window.open('https://github.com', '_blank') },
        { id: 'linkedin', title: 'LinkedIn', icon: <ExternalLink size={18} />, action: () => window.open('https://linkedin.com', '_blank') },
    ];

    const filteredCommands = commands.filter(cmd =>
        cmd.title.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                playClick();
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    const executeCommand = (command) => {
        playSuccess();
        command.action();
        setIsOpen(false);
        setQuery('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Palette Container */}
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-xl pointer-events-auto"
                        >
                            <div className="bg-[#0f0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5 bg-white/5">
                                    <Terminal className="text-white/50" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Type a command or search..."
                                        className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-lg font-mono"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            playType();
                                        }}
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                                                executeCommand(filteredCommands[selectedIndex]);
                                            }
                                            if (e.key === 'ArrowDown') {
                                                e.preventDefault();
                                                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                                            }
                                            if (e.key === 'ArrowUp') {
                                                e.preventDefault();
                                                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                                            }
                                        }}
                                    />
                                    <div className="text-xs font-medium text-white/30 bg-white/10 px-2 py-1 rounded">ESC</div>
                                </div>

                                {/* Results List */}
                                <div className="py-2 max-h-[60vh] overflow-y-auto">
                                    {filteredCommands.length > 0 ? (
                                        filteredCommands.map((cmd, index) => (
                                            <div
                                                key={cmd.id}
                                                onClick={() => executeCommand(cmd)}
                                                onMouseEnter={() => {
                                                    setSelectedIndex(index);
                                                    playHover();
                                                }}
                                                className={`px-4 py-3 mx-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${index === selectedIndex ? 'bg-blue-600/20 text-white' : 'text-white/60 hover:text-white'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {cmd.icon}
                                                    <span className="font-medium">{cmd.title}</span>
                                                </div>
                                                {index === selectedIndex && (
                                                    <motion.span layoutId="active-indicator" className="text-xs text-blue-300 font-mono">
                                                        ↵ Enter
                                                    </motion.span>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-4 py-8 text-center text-white/30 text-sm font-mono">
                                            No commands found.
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-2 bg-black/20 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 font-mono uppercase tracking-wider">
                                    <span>Portfolio OS v1.0.2</span>
                                    <div className="flex gap-2">
                                        <span>Use ↓↑ to navigate</span>
                                        <span>↵ to select</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
