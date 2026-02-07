import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuVariants = {
        closed: {
            opacity: 0,
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    return (
        <div className="min-h-screen text-white/90 selection:bg-purple-500/30">

            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/5 border-b border-white/5">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 relative z-50">
                    Vishal Yadav
                </h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">
                    <a href="#about" className="hover:text-blue-400 transition-colors text-sm font-medium tracking-wide">About</a>
                    <a href="#experience" className="hover:text-blue-400 transition-colors text-sm font-medium tracking-wide">Experience</a>
                    <a href="#projects" className="hover:text-blue-400 transition-colors text-sm font-medium tracking-wide">Projects</a>
                    <a href="#contact" className="hover:text-blue-400 transition-colors text-sm font-medium tracking-wide">Contact</a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden relative z-50 p-2 -mr-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="fixed inset-0 bg-[#0f0f1a]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden"
                        >
                            <div className="flex flex-col gap-8 text-center">
                                <a
                                    href="#about"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-bold text-white/80 hover:text-blue-400 transition-colors"
                                >
                                    About
                                </a>
                                <a
                                    href="#experience"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-bold text-white/80 hover:text-blue-400 transition-colors"
                                >
                                    Experience
                                </a>
                                <a
                                    href="#projects"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-bold text-white/80 hover:text-blue-400 transition-colors"
                                >
                                    Projects
                                </a>
                                <a
                                    href="#contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-bold text-white/80 hover:text-blue-400 transition-colors"
                                >
                                    Contact
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-24 pb-12 flex flex-col gap-12 md:gap-24 overflow-x-hidden">
                {children}
            </main>

        </div>
    );
};

export default Layout;
