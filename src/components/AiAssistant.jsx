import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import useSound from '../hooks/useSound';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm Portfolio OS v2. I can tell you about Vishal's stack, experience, or just chat. Try asking: 'What's the tech stack?'" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { playClick, playType, playSuccess } = useSound();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        playClick();
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const reply = generateReply(userMsg);
            setMessages(prev => [...prev, { role: 'bot', text: reply }]);
            setIsTyping(false);
            playSuccess();
        }, 1000 + Math.random() * 500);
    };

    const generateReply = (msg) => {
        const lower = msg.toLowerCase();

        if (lower.includes('stack') || lower.includes('tech') || lower.includes('built')) {
            return "This site is built with React, Vite, and Tailwind CSS. Animations are powered by Framer Motion, and the 3D-like effects use custom CSS transforms. No heavy 3D libraries were harmed in the making of this portfolio.";
        }
        if (lower.includes('contact') || lower.includes('email') || lower.includes('hire')) {
            return "You can reach Vishal via the Contact section below, or connect on LinkedIn (see the footer links). He is currently open to new opportunities!";
        }
        if (lower.includes('experience') || lower.includes('work') || lower.includes('job')) {
            return "Vishal has extensive experience in Full Stack Development. Creating scalable web apps is his jam. Check out the 'Experience' section for the detailed timeline.";
        }
        if (lower.includes('resume') || lower.includes('cv')) {
            return "You can download the resume from the 'About' section. It's concise, updated, and ready for your ATS.";
        }
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            return "Hi there! 👋 How can I help you navigate this system?";
        }
        if (lower.includes('project')) {
            return "The projects showcase backend robustness. Click on any card to see deep-dive details (or use the JSON view if you're a data nerd).";
        }

        return "I'm a simple portfolio bot, so I might have missed that. Try asking about the 'stack', 'projects', or 'contact' info!";
    };

    return (
        <div className="fixed bottom-24 left-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-16 left-0 w-80 bg-[#1a1b26]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ height: '400px' }}
                    >
                        {/* Header */}
                        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center">
                                    <Bot size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Assistant</h3>
                                    <p className="text-[10px] text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-hide">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                        {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div className={`p-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/10 text-white/90 rounded-tl-none'}`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                        <Bot size={14} className="text-cyan-400" />
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-100" />
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce delay-200" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white/5 border-t border-white/10">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        playType();
                                    }}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    playClick();
                }}
                className={`w-12 h-12 rounded-full shadow-lg border border-white/10 flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-500 text-white' : 'bg-black/40 backdrop-blur-md text-cyan-400 hover:bg-cyan-500/20'}`}
            >
                {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
            </motion.button>
        </div>
    );
};

export default AiAssistant;
