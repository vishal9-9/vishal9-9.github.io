import React, { createContext, useContext, useState, useRef } from 'react';

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [streamData, setStreamData] = useState(null); // { start: {x,y}, end: {x,y}, type: 'request' | 'response' }
    const [isSystemMonitorOpen, setIsSystemMonitorOpen] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const fanRef = useRef(null);

    const openSystemMonitor = () => setIsSystemMonitorOpen(true);
    const closeSystemMonitor = () => setIsSystemMonitorOpen(false);

    const startDeploy = () => setIsDeploying(true);
    const endDeploy = () => setIsDeploying(false);

    const triggerRequest = (startRect, onComplete) => {
        if (!fanRef.current) return;

        const fanRect = fanRef.current.getBoundingClientRect();

        // Center points
        const start = {
            x: startRect.left + startRect.width / 2,
            y: startRect.top + startRect.height / 2
        };
        const end = {
            x: fanRect.left + fanRect.width / 2,
            y: fanRect.top + fanRect.height / 2
        };

        // Phase 1: Request (Card -> Fan)
        setStreamData({ start, end, type: 'request' });
        setIsProcessing(true);

        setTimeout(() => {
            // Phase 2: Processing (Fan Spin)
            setStreamData(null); // Hide stream during processing

            setTimeout(() => {
                // Phase 3: Response (Fan -> Card)
                setStreamData({ start: end, end: start, type: 'response' });
                setIsProcessing(false);

                setTimeout(() => {
                    setStreamData(null);
                    if (onComplete) onComplete();
                }, 400); // Stream duration
            }, 600); // Processing duration
        }, 400); // Stream duration
    };

    return (
        <ServerContext.Provider value={{ isProcessing, streamData, triggerRequest, fanRef, isSystemMonitorOpen, openSystemMonitor, closeSystemMonitor, isDeploying, startDeploy, endDeploy }}>
            {children}
        </ServerContext.Provider>
    );
};

export const useServer = () => useContext(ServerContext);
