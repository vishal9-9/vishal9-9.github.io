import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music, Volume2, VolumeX, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RadioWidget = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef(new Audio('https://stream.zeno.fm/0r0xa792kwzuv')); // Lofi Girl / Chillhop stream

    // Fallback streams if one fails
    // https://stream.zeno.fm/0r0xa792kwzuv (Lofi Girl)
    // https://streams.ilovemusic.de/iloveradio17.mp3 (Chill)

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume;
        audio.loop = true;

        // Handle play/pause
        if (isPlaying) {
            audio.play().catch(e => {
                console.error("Audio playback failed:", e);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }

        return () => {
            audio.pause();
        };
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.volume = isMuted ? 0 : volume;
    }, [isMuted, volume]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-3">
            <motion.div
                initial={{ width: 48 }}
                whileHover={{ width: 'auto' }}
                className="h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center overflow-hidden group shadow-lg"
            >
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-cyan-400 transition-colors shrink-0"
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>

                {/* Expanded Controls */}
                <motion.div
                    className="flex items-center gap-3 pr-4 overflow-hidden"
                >
                    {/* Visualizer (Fake) */}
                    <div className="flex items-end gap-0.5 h-4 w-12">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 bg-cyan-500/50 rounded-t-sm"
                                animate={{
                                    height: isPlaying ? [4, 12, 6, 16, 8] : 4
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.1,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white whitespace-nowrap">System Radio</span>
                        <span className="text-[10px] text-white/50 whitespace-nowrap">Lofi / Chillhop</span>
                    </div>

                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Volume */}
                    <button onClick={toggleMute} className="text-white/60 hover:text-white">
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default RadioWidget;
