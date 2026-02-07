import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useServer } from '../context/ServerContext';

const NetworkStream = () => {
    const { streamData } = useServer();

    if (!streamData) return null;

    const { start, end, type } = streamData;
    const isResponse = type === 'response';

    // Calculate control point for curve
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 100; // Curve upward
    const path = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;

    return (
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-visible">
            <defs>
                <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={isResponse ? "#4ade80" : "#dca54c"} stopOpacity="0" />
                    <stop offset="50%" stopColor={isResponse ? "#4ade80" : "#dca54c"} stopOpacity="1" />
                    <stop offset="100%" stopColor={isResponse ? "#4ade80" : "#dca54c"} stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* The Beam */}
            <motion.path
                d={path}
                fill="none"
                stroke="url(#streamGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                animate={{
                    pathLength: [0, 0.4, 0],
                    pathOffset: [0, 0.6, 1],
                    opacity: [0, 1, 0]
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
            />

            {/* Particle Head */}
            <motion.circle
                r="3"
                fill={isResponse ? "#4ade80" : "#fff"}
                filter="url(#glow)"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ offsetPath: `path('${path}')` }}
            />
        </svg>
    );
};

export default NetworkStream;
