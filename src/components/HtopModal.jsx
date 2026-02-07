import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useServer } from '../context/ServerContext';

const HtopModal = () => {
    const { isSystemMonitorOpen, closeSystemMonitor } = useServer();
    const [stats, setStats] = useState({
        cpu: [12, 8, 5, 20],
        mem: 42,
        swap: 2,
        tasks: []
    });

    // Simulate fluctuating stats
    useEffect(() => {
        if (!isSystemMonitorOpen) return;

        const interval = setInterval(() => {
            setStats(prev => ({
                cpu: prev.cpu.map(() => Math.floor(Math.random() * 80) + 10),
                mem: Math.min(100, Math.max(20, prev.mem + (Math.random() * 10 - 5))),
                swap: 2,
                tasks: generateTasks()
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [isSystemMonitorOpen]);

    const generateTasks = () => [
        { pid: 482, user: 'root', cpu: 12.5, mem: 4.2, time: '2:14.03', command: 'portfolio-daemon --production' },
        { pid: 1024, user: 'vishal', cpu: 8.2, mem: 12.1, time: '0:45.12', command: 'react-renderer' },
        { pid: 89, user: 'system', cpu: 1.1, mem: 0.5, time: '14:20.00', command: 'kernel_task' },
        { pid: 2201, user: 'vishal', cpu: 0.8, mem: 1.2, time: '0:02.33', command: 'framer-motion-worker' },
        { pid: 44, user: 'root', cpu: 0.2, mem: 0.1, time: '5:01.10', command: 'init' },
        { pid: 332, user: 'daemon', cpu: 0.0, mem: 0.2, time: '1:12.44', command: 'analytics-agent' },
    ];

    const Bar = ({ label, value, color }) => (
        <div className="flex items-center gap-2 font-mono text-xs mb-1">
            <span className="w-8 text-cyan-400 font-bold">{label}</span>
            <div className="flex-1 h-3 bg-gray-800 relative">
                <div
                    className={`h-full ${color} transition-all duration-500 ease-out`}
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="w-12 text-right text-white/80">{value.toFixed(1)}%</span>
        </div>
    );

    return (
        <AnimatePresence>
            {isSystemMonitorOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSystemMonitor}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Window */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative w-full max-w-2xl bg-[#1a1b26] rounded-lg shadow-2xl border border-gray-700 overflow-hidden font-mono text-sm"
                    >
                        {/* Title Bar */}
                        <div className="bg-[#24283b] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                            <div className="text-gray-400 text-xs">vishal@server: ~ (htop)</div>
                            <div className="flex gap-2">
                                <Minus size={14} className="text-gray-500" />
                                <Square size={12} className="text-gray-500" />
                                <X size={14} className="text-red-400 cursor-pointer hover:text-red-300" onClick={closeSystemMonitor} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 text-gray-300">
                            {/* Header Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                                <div>
                                    {stats.cpu.map((c, i) => (
                                        <Bar key={i} label={i + 1} value={c} color="bg-green-500" />
                                    ))}
                                </div>
                                <div>
                                    <Bar label="Mem" value={stats.mem} color="bg-yellow-500" />
                                    <Bar label="Swp" value={stats.swap} color="bg-red-500" />
                                </div>
                            </div>

                            {/* Process List */}
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/20 text-black bg-green-400">
                                        <th className="px-2 py-1 font-normal text-black font-bold">PID</th>
                                        <th className="px-2 py-1 font-normal text-black font-bold">USER</th>
                                        <th className="px-2 py-1 font-normal text-black font-bold">CPU%</th>
                                        <th className="px-2 py-1 font-normal text-black font-bold">MEM%</th>
                                        <th className="px-2 py-1 font-normal text-black font-bold">TIME+</th>
                                        <th className="px-2 py-1 font-normal text-black font-bold">COMMAND</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.tasks.map((task) => (
                                        <tr key={task.pid} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="px-2 py-1 text-green-400">{task.pid}</td>
                                            <td className="px-2 py-1 text-gray-400">{task.user}</td>
                                            <td className="px-2 py-1 text-gray-200">{task.cpu}</td>
                                            <td className="px-2 py-1 text-gray-200">{task.mem}</td>
                                            <td className="px-2 py-1 text-cyan-400">{task.time}</td>
                                            <td className="px-2 py-1 text-white">{task.command}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Footer */}
                            <div className="mt-4 flex gap-4 text-xs">
                                <div><span className="bg-gray-700 text-white px-1">F1</span>Help</div>
                                <div><span className="bg-gray-700 text-white px-1">F2</span>Setup</div>
                                <div><span className="bg-gray-700 text-white px-1">F3</span>Search</div>
                                <div><span className="bg-gray-700 text-white px-1">F10</span>Quit</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HtopModal;
