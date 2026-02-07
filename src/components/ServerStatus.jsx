import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const ServerStatus = () => {
    const [latency, setLatency] = useState(24);

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomize latency between 15ms and 45ms for realism
            setLatency(Math.floor(Math.random() * 30) + 15);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5 shadow-lg"
        >
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono font-medium text-emerald-400/80">
                <span>ALL SYSTEMS OPERATIONAL</span>
                <span className="text-white/20">|</span>
                <span className="text-white/30 hidden lg:block">PRESS CMD+K</span>
                <span className="text-white/20 hidden lg:block">|</span>
                <div className="flex items-center gap-1 text-white/40">
                    <Activity size={10} />
                    <span>{latency}ms</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ServerStatus;
