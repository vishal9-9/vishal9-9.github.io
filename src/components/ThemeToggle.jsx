import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import useSound from '../hooks/useSound';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { playClick } = useSound();

    return (
        <button
            onClick={() => {
                toggleTheme();
                playClick();
            }}
            className="fixed top-6 right-20 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-white/80 hover:text-white"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
