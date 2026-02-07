import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen text-white/90 selection:bg-purple-500/30">

            {/* Dynamic Background Elements */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm bg-black/5 border-b border-white/5">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Vishal Yadav
                </h1>
                <div className="flex gap-4">
                    <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
                    <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
                    <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
                    <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-24 pb-12 flex flex-col gap-12">
                {children}
            </main>

        </div>
    );
};

export default Layout;
