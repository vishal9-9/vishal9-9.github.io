import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: delay
            }}
            className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-xl ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
