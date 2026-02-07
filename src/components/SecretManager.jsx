import { useEffect, useState } from 'react';
import useSound from '../hooks/useSound';

const KONAMI_CODE = [
    'arrowup', 'arrowup',
    'arrowdown', 'arrowdown',
    'arrowleft', 'arrowright',
    'arrowleft', 'arrowright',
    'b', 'a'
];

const SecretManager = () => {
    const [keys, setKeys] = useState([]);
    const [isMatrixMode, setIsMatrixMode] = useState(false);
    const { playSuccess } = useSound();

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            setKeys(prev => {
                const newKeys = [...prev, key];
                if (newKeys.length > KONAMI_CODE.length) {
                    newKeys.shift();
                }
                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const currentParams = keys.slice(-KONAMI_CODE.length).join('');
        const requiredParams = KONAMI_CODE.join('');

        if (currentParams === requiredParams) {
            console.log("Konami Code Activated!");
            setIsMatrixMode(prev => !prev);
            playSuccess();
            setKeys([]);
        }
    }, [keys, playSuccess]);

    // Force inject styles
    useEffect(() => {
        if (isMatrixMode) {
            const style = document.createElement('style');
            style.id = 'matrix-style';
            style.innerHTML = `
                html, body, #root {
                    background-color: #000 !important;
                    filter: contrast(150%) brightness(1.2) sepia(100%) hue-rotate(50deg) saturate(300%) !important;
                }
                * {
                    font-family: 'Courier New', monospace !important;
                    text-transform: uppercase !important;
                    box-shadow: none !important;
                    border-radius: 0 !important;
                    background-image: none !important;
                    transition: none !important;
                }
                div, section, header, footer {
                    border: 1px constant #0f0 !important;
                    outline: 1px solid #00ff00 !important;
                    background: rgba(0, 20, 0, 0.9) !important;
                    color: #00ff00 !important;
                }
                img, svg {
                    filter: invert(100%) opacity(0.5) !important;
                    border: 1px dotted #0f0 !important;
                }
                ::-webkit-scrollbar {
                    width: 12px !important;
                    background: #000 !important;
                }
                ::-webkit-scrollbar-thumb {
                    background: #00ff00 !important;
                    border: 1px solid #000 !important;
                }
            `;
            document.head.appendChild(style);
        } else {
            const style = document.getElementById('matrix-style');
            if (style) style.remove();
        }
    }, [isMatrixMode]);

    return null;
};

export default SecretManager;
