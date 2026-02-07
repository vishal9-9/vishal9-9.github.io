import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = "", onClick, noGlass = false, ...props }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Glare effect
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const isHoverable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

    const handleMouseMove = (e) => {
        if (!isHoverable) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXCurrent = e.clientX - rect.left;
        const mouseYCurrent = e.clientY - rect.top;

        const xPct = mouseXCurrent / width - 0.5;
        const yPct = mouseYCurrent / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out select-none ${className}`}
            {...props}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className={`relative z-10 h-full overflow-hidden ${noGlass ? '' : 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl'}`}
            >
                {/* Glare Overlay */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX.get() || "50%"} ${glareY.get() || "50%"}, rgba(255,255,255,${noGlass ? 0.3 : 0.4}) 0%, transparent 80%)`,
                        opacity: x.get() !== 0 ? 1 : 0,
                        mixBlendMode: 'overlay'
                    }}
                    className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
                />

                <div className="relative z-10 h-full">
                    {children}
                </div>
            </div>

            {/* Border Glow */}
            {!noGlass && (
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl"
                />
            )}
        </motion.div>
    );
};

export default TiltCard;
