import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Check, Rocket, AlertTriangle } from 'lucide-react';
import useSound from '../hooks/useSound';
import confetti from 'canvas-confetti';

const DeployOverlay = ({ isDeploying, onComplete }) => {
    const [logs, setLogs] = useState([]);
    const { playType, playSuccess } = useSound();

    const steps = [
        { msg: "Connecting to remote builder...", delay: 500 },
        { msg: "Cloning repository 'portfolio-v3'...", delay: 800 },
        { msg: "Installing dependencies (npm install)...", delay: 1200 },
        { msg: "Running linter (ESLint)...", delay: 800 },
        { msg: "Optimizing assets (images, fonts)...", delay: 1000 },
        { msg: "Compiling production build...", delay: 1500 },
        { msg: "Minifying JS/CSS bundles...", delay: 900 },
        { msg: "Verifying e2e tests...", delay: 1100 },
        { msg: "Uploading to Edge Network...", delay: 1000 },
        { msg: "Clearing CDN cache...", delay: 600 },
        { msg: "DEPLOYMENT SUCCESSFUL", delay: 200, type: 'success' }
    ];

    useEffect(() => {
        if (isDeploying) {
            setLogs([]); // Reset
            let cumulativeDelay = 0;

            steps.forEach((step, index) => {
                cumulativeDelay += step.delay;
                setTimeout(() => {
                    setLogs(prev => [...prev, step]);
                    if (step.type === 'success') {
                        playSuccess();
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#22c55e', '#ffffff', '#00ff00']
                        });
                        setTimeout(onComplete, 2000); // Close after 2s
                    } else {
                        playType();
                    }
                }, cumulativeDelay);
            });
        }
    }, [isDeploying, playType, playSuccess, onComplete]);

    return (
        <AnimatePresence>
            {isDeploying && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black font-mono text-sm p-8 overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 border-b border-white/20 pb-4">
                        <Terminal size={20} className="text-green-500 animate-pulse" />
                        <span className="text-green-500 font-bold tracking-wider">DEPLOYMENT SEQUENCE INITIATED</span>
                        <div className="flex-1" />
                        <span className="text-white/30 text-xs">v3.4.1-rc</span>
                    </div>

                    {/* Logs */}
                    <div className="flex-1 overflow-y-auto space-y-2 font-mono scrollbar-hide">
                        {logs.map((log, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex items-center gap-3 ${log.type === 'success' ? 'text-green-400 font-bold text-lg mt-4' : 'text-white/70'}`}
                            >
                                <span className="text-white/20 select-none">
                                    {(Date.now() + index * 100).toString().slice(-6)}
                                </span>
                                {log.type === 'success' ? <Rocket size={18} /> : <span className="text-green-500">➜</span>}
                                <span>{log.msg}</span>
                                {log.type === 'success' && <Check size={18} className="ml-2" />}
                            </motion.div>
                        ))}
                        <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                    </div>

                    {/* Footer Progress */}
                    <div className="mt-6 border-t border-white/20 pt-4">
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 10, ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeployOverlay;
