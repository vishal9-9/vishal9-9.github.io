import { useCallback, useRef, useEffect } from 'react';

const useSound = () => {
    const audioContextRef = useRef(null);

    useEffect(() => {
        // Initialize AudioContext on first user interaction to comply with browser autoplay policies
        const initAudio = () => {
            if (!audioContextRef.current) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                audioContextRef.current = new AudioContext();
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        window.addEventListener('keydown', initAudio, { once: true });

        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    const playTone = useCallback((frequency, type, duration, volume = 0.1) => {
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, []);

    const playClick = useCallback(() => {
        // High-pitched blip
        playTone(1200, 'sine', 0.1, 0.05);
    }, [playTone]);

    const playHover = useCallback(() => {
        // Low frequency wash (subtle)
        playTone(200, 'sine', 0.15, 0.02);
    }, [playTone]);

    const playType = useCallback(() => {
        // Crisp mechanical tick
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Noise-like effect using random frequencies could be better, but simple square wave works well for "retro" feel
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }, []);

    const playSuccess = useCallback(() => {
        // Ascending power-up tone
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }, []);

    const playError = useCallback(() => {
        // Low buzz
        playTone(150, 'sawtooth', 0.2, 0.05);
    }, [playTone]);

    return { playClick, playHover, playType, playSuccess, playError };
};

export default useSound;
