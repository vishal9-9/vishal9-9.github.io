import React from 'react';
import { motion } from 'framer-motion';
import { useServer } from '../context/ServerContext';
import useSound from '../hooks/useSound';
import { Fan, Cpu } from 'lucide-react';

const ServerFan = () => {
    const { isProcessing, fanRef, openSystemMonitor } = useServer();
    const { playClick } = useSound();

    return (
        <div
            ref={fanRef}
            onClick={() => {
                playClick();
                openSystemMonitor();
            }}
            className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-center gap-2 cursor-pointer group/fan"
        >

            {/* Fan Unit */}
            <div className="relative w-16 h-16 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group-hover/fan:border-cyan-400/50 transition-colors">

                {/* RGB Ring */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${isProcessing ? 'animate-pulse opacity-60' : ''}`} />

                {/* Spinning Blades */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: isProcessing ? 0.2 : 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="relative z-10 text-white/80"
                >
                    <Fan size={32} />
                </motion.div>

                {/* Center Hub */}
                <div className="absolute z-20 w-4 h-4 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/20 shadow-inner flex items-center justify-center">
                    <div className={`w-1 h-1 rounded-full ${isProcessing ? 'bg-green-400 shadow-[0_0_5px_#4ade80]' : 'bg-white/20'}`} />
                </div>

                {/* Corner Screws */}
                <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white/20" />
                <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white/20" />
                <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-white/20" />
                <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-white/20" />
            </div>

            {/* Status Text */}
            <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
                <span className="text-[10px] font-mono font-medium text-white/50 tracking-wider">
                    {isProcessing ? 'PROCESSING...' : 'SYSTEM IDLE'}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-[10px] font-mono font-medium text-white/30 tracking-wider">CMD+K</span>
            </div>

        </div>
    );
};

export default ServerFan;
