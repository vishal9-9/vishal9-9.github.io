import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position - using direct values for zero latency
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const moveCursor = (e) => {
            // Direct mapping for instant response
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseOut = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseover', handleMouseOver);
        document.body.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseover', handleMouseOver);
            document.body.removeEventListener('mouseout', handleMouseOut);
        };
    }, [mouseX, mouseY, isVisible]);

    return (
        <motion.div
            className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                x: mouseX,
                y: mouseY,
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* High-fidelity Glass Arrow Cursor */}
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.1s ease-out',
                    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                }}
            >
                <defs>
                    <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
                    </linearGradient>
                    <linearGradient id="glassFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
                    </linearGradient>
                </defs>

                {/* Main Body */}
                <path
                    d="M6 4L24 11L15 14.5L12 23L6 4Z" // Sharp clean triangle pointer
                    fill="url(#glassFill)"
                    stroke="url(#glassGradient)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    style={{ backdropFilter: 'blur(2px)' }}
                />
            </svg>
        </motion.div>
    );
};

export default CustomCursor;
