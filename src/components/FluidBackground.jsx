import { useRef, useEffect } from 'react';

const FluidBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push(Math.random() * canvas.width);
            particles.push(Math.random() * canvas.height);
        }

        // Simplex noise implementation would go here, using simple sine waves for now
        const noise = (x, y, t) => {
            return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t);
        };

        let t = 0;
        const render = () => {
            t += 0.005;
            ctx.fillStyle = '#0f0f1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i += 2) {
                const x = particles[i];
                const y = particles[i + 1];
                const ns = noise(x * 0.0015, y * 0.0015, t);

                const r = Math.floor((ns + 1) * 100);
                const g = Math.floor((ns + 1) * 50);
                const b = 255;

                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.5)`;
                ctx.fillRect(x, y, 1.5, 1.5);

                particles[i] += Math.cos(ns * Math.PI) * 0.5;
                particles[i + 1] += Math.sin(ns * Math.PI) * 0.5;

                if (particles[i] < 0) particles[i] = canvas.width;
                if (particles[i] > canvas.width) particles[i] = 0;
                if (particles[i + 1] < 0) particles[i + 1] = canvas.height;
                if (particles[i + 1] > canvas.height) particles[i + 1] = 0;
            }
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

export default FluidBackground;
