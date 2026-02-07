import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // "Heavy" spring physics for magnifying glass feel
    // Lower stiffness = looser follow, Higher mass = more inertia
    const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Velocity tracking for distortion
    const velocityX = useVelocity(springX);
    const velocityY = useVelocity(springY);

    // Transform velocity into scale (Subtle squash & stretch)
    const scaleX = useTransform(velocityX, [-1000, 0, 1000], [1.1, 1, 1.1]);
    const scaleY = useTransform(velocityY, [-1000, 0, 1000], [0.9, 1, 0.9]);

    // Rotate based on movement direction
    const rotate = useTransform(
        [velocityX, velocityY],
        ([latestX, latestY]) => {
            const angle = Math.atan2(latestY, latestX) * (180 / Math.PI);
            return isNaN(angle) ? 0 : angle;
        }
    );

    useEffect(() => {
        const moveCursor = (e) => {
            // Center the larger cursor (w-12 = 48px, so offset 24px)
            mouseX.set(e.clientX - 24);
            mouseY.set(e.clientY - 24);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Check if hovering over clickable elements
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

    // Spring for scale to add "pop" effect
    const springScale = useSpring(1, { damping: 20, stiffness: 300 });

    useEffect(() => {
        if (isHovering) {
            springScale.set(1.2); // Less expansion for larger cursor
        } else {
            springScale.set(1);
        }
    }, [isHovering, springScale]);

    // Combine squash/stretch with hover scale
    const finalScaleX = useTransform(scaleX, (val) => val * springScale.get());
    const finalScaleY = useTransform(scaleY, (val) => val * springScale.get());

    return (
        <motion.div
            className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] backdrop-blur-[2px] backdrop-brightness-125 backdrop-contrast-110 bg-white/5 border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            style={{
                x: springX,
                y: springY,
                scaleX: finalScaleX,
                scaleY: finalScaleY,
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* Inner "Lens" reflection */}
            <div className="absolute top-2 left-2 w-4 h-2 bg-gradient-to-br from-white/40 to-transparent rounded-full -rotate-45 opacity-60" />
        </motion.div>
    );
};

export default CustomCursor;
