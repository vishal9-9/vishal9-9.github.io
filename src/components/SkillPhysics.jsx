import React, { useRef, useEffect, useState } from 'react';
import useSound from '../hooks/useSound';

const SkillPhysics = ({ skills }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const { playHover, playClick } = useSound();

    // Physics State
    const orbs = useRef([]);
    const mouse = useRef({ x: 0, y: 0, isActive: false });

    // Constants
    const FRICTION = 0.98;
    const ELASTICITY = 0.7;
    const MOUSE_GRAVITY = 0.5;

    useEffect(() => {
        // Initialize Orbs
        if (skills && containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            orbs.current = skills.map(skill => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                radius: 35 + Math.random() * 15,
                color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`, // Blues/Cyans
                label: skill
            }));
        }
    }, [skills]);

    const updatePhysics = () => {
        if (!containerRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = containerRef.current.getBoundingClientRect();

        // Resize Canvas
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        ctx.clearRect(0, 0, width, height);

        // Update each orb
        orbs.current.forEach((orb, i) => {
            // Mouse Interaction
            if (mouse.current.isActive) {
                const dx = mouse.current.x - orb.x;
                const dy = mouse.current.y - orb.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    orb.vx += dx * 0.001 * MOUSE_GRAVITY;
                    orb.vy += dy * 0.001 * MOUSE_GRAVITY;
                }
            }

            // Move
            orb.x += orb.vx;
            orb.y += orb.vy;

            // Friction
            orb.vx *= FRICTION;
            orb.vy *= FRICTION;

            // Wall Collisions
            if (orb.x < orb.radius) { orb.x = orb.radius; orb.vx *= -1; }
            if (orb.x > width - orb.radius) { orb.x = width - orb.radius; orb.vx *= -1; }
            if (orb.y < orb.radius) { orb.y = orb.radius; orb.vy *= -1; }
            if (orb.y > height - orb.radius) { orb.y = height - orb.radius; orb.vy *= -1; }

            // Orb Collisions (Simple O(N^2))
            for (let j = i + 1; j < orbs.current.length; j++) {
                const other = orbs.current[j];
                const dx = other.x - orb.x;
                const dy = other.y - orb.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = orb.radius + other.radius;

                if (dist < minDist) {
                    const angle = Math.atan2(dy, dx);
                    const tx = orb.x + Math.cos(angle) * minDist;
                    const ty = orb.y + Math.sin(angle) * minDist;

                    const ax = (tx - other.x) * 0.05; // Spring force
                    const ay = (ty - other.y) * 0.05;

                    orb.vx -= ax;
                    orb.vy -= ay;
                    other.vx += ax;
                    other.vy += ay;
                }
            }

            // Draw Orb
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(orb.x - 10, orb.y - 10, 0, orb.x, orb.y, orb.radius);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.05)");
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.stroke();

            // Draw Text
            ctx.font = "12px Inter, sans-serif";
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(orb.label, orb.x, orb.y);
        });

        requestRef.current = requestAnimationFrame(updatePhysics);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouse.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            isActive: true
        };
    };

    const handleMouseLeave = () => {
        mouse.current.isActive = false;
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[400px] border border-white/5 bg-black/20 rounded-xl overflow-hidden relative cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <canvas ref={canvasRef} className="block" />

            {/* Overlay hint */}
            <div className="absolute top-4 left-4 text-xs text-white/30 font-mono pointer-events-none">
                // GRAVITY SIMULATOR: MOUSE TO ATTRACT
            </div>
        </div>
    );
};

export default SkillPhysics;
