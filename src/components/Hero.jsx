import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ data }) => {
    return (
        <section className="min-h-[70vh] flex flex-col justify-center items-start">
            <div className="space-y-4 max-w-2xl">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-blue-300 font-medium tracking-wide"
                >
                    Hello, I'm
                </motion.h2>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50"
                >
                    {data.name}
                </motion.h1>

                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl md:text-3xl text-white/60"
                >
                    {data.position}
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg text-white/50 leading-relaxed max-w-xl"
                >
                    Based in {data.address}. Building scalable backend systems and integrating Generative AI.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex gap-4 pt-6"
                >
                    <a href={`mailto:${data.email}`} className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110">
                        <Mail size={24} />
                    </a>
                    {data.socialMedia.map((social, index) => {
                        if (social.socialMedia === 'Github') {
                            return (
                                <a key={index} href={`https://${social.link}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110">
                                    <Github size={24} />
                                </a>
                            )
                        }
                        if (social.socialMedia === 'LinkedIn') {
                            return (
                                <a key={index} href={`https://${social.link}`} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110">
                                    <Linkedin size={24} />
                                </a>
                            )
                        }
                        return null;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
