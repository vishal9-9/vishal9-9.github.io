import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useServer } from '../context/ServerContext';
import useSound from '../hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Truck, Bot, HeartPulse, Bell, Users, Code, Braces } from 'lucide-react';
import TiltCard from './TiltCard';
import GlassCard from './GlassCard';

const Projects = ({ data }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isJsonView, setIsJsonView] = useState(false);
    const { triggerRequest, isProcessing, streamData } = useServer();
    const { playHover, playClick, playSuccess } = useSound();

    const handleProjectClick = (index, e) => {
        // Prevent interaction if server is busy (processing or beaming) or app is already open
        if (isProcessing || streamData || selectedId !== null) return;

        playClick();
        // Get card coordinates for animation start point
        const cardRect = e.currentTarget.getBoundingClientRect();

        triggerRequest(cardRect, () => {
            playSuccess();
            setSelectedId(index);
        });
    };

    const getProjectDetails = (name) => {
        if (name.includes("FreightMate")) return {
            icon: <Truck size={48} className="text-white drop-shadow-md" />,
            gradient: "from-blue-500 to-cyan-400",
            shadow: "shadow-blue-500/20",
            type: "browser"
        };
        if (name.includes("AI Analytics")) return {
            icon: <Bot size={48} className="text-white drop-shadow-md" />,
            gradient: "from-violet-600 to-indigo-400",
            shadow: "shadow-violet-500/20",
            type: "browser"
        };
        if (name.includes("Health")) return {
            icon: <HeartPulse size={48} className="text-white drop-shadow-md" />,
            gradient: "from-rose-500 to-pink-400",
            shadow: "shadow-rose-500/20",
            type: "mobile"
        };
        if (name.includes("Notification")) return {
            icon: <Bell size={48} className="text-white drop-shadow-md" />,
            gradient: "from-amber-500 to-orange-400",
            shadow: "shadow-amber-500/20",
            type: "browser"
        };
        if (name.includes("Raidesh")) return {
            icon: <Users size={48} className="text-white drop-shadow-md" />,
            gradient: "from-emerald-500 to-teal-400",
            shadow: "shadow-emerald-500/20",
            type: "browser"
        };
        return {
            icon: <span className="text-4xl font-bold text-white drop-shadow-md select-none">{name.substring(0, 2).toUpperCase()}</span>,
            gradient: "from-slate-700 to-slate-500",
            shadow: "shadow-white/10",
            type: "browser"
        };
    };

    return (
        <section id="projects" className="space-y-12 relative z-10 py-12">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight">
                Featured Projects
            </h2>

            {/* App Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((project, index) => {
                    const { icon, gradient, shadow } = getProjectDetails(project.name);

                    return (
                        <div className="flex flex-col items-center gap-4">
                            <TiltCard
                                key={index}
                                onClick={(e) => handleProjectClick(index, e)}
                                className="cursor-none group"
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={playHover}
                                noGlass={true} // Clean aesthetic
                                disabled={isProcessing}
                            >
                                {/* App Icon Shape */}
                                <motion.div
                                    layoutId={`card-${index}`}
                                    className={`w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] bg-gradient-to-br ${gradient} ${shadow} shadow-xl flex items-center justify-center overflow-hidden relative border border-white/10`}
                                >
                                    {/* Glossy Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-80 pointer-events-none" />
                                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-50 pointer-events-none" />

                                    {/* Icon */}
                                    <motion.div
                                        className="relative z-10"
                                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                                    >
                                        {icon}
                                    </motion.div>
                                </motion.div>
                            </TiltCard>

                            {/* App Name (Outside Card) */}
                            <motion.h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors text-center tracking-wide">
                                {project.name}
                            </motion.h3>
                        </div>
                    );
                })}
            </div>

            {/* Expanded Modal - Portaled to Body to escape Z-Index traps */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedId !== null && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => { setSelectedId(null); setIsJsonView(false); }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999]"
                            />

                            {/* Modal Container */}
                            <div className="fixed inset-0 flex items-center justify-center z-[999] pointer-events-none p-0 md:p-8">
                                <motion.div
                                    layoutId={`card-${selectedId}`}
                                    className={`
                                        relative flex flex-col pointer-events-auto overflow-hidden shadow-2xl transition-all duration-500
                                        ${getProjectDetails(data[selectedId].name).type === 'mobile'
                                            ? 'w-full h-full md:h-[800px] md:max-h-[90vh] md:w-full md:max-w-[380px] md:rounded-[3rem] md:border-[8px] md:border-gray-900 bg-black box-content'
                                            : 'w-full h-full md:h-[85vh] md:max-w-5xl md:rounded-xl md:border md:border-white/20 bg-[#0f0f1a]/95 backdrop-blur-3xl'}
                                    `}
                                >
                                    {/* --- MOBILE FRAME --- */}
                                    {getProjectDetails(data[selectedId].name).type === 'mobile' && (
                                        <>
                                            {/* Notch */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-xl z-50 flex items-center justify-center">
                                                <div className="w-12 h-1 rounded-full bg-gray-800/50" />
                                            </div>
                                            {/* Status Bar */}
                                            <div className="absolute top-3 right-5 flex gap-1.5 z-50">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                                                <div className="w-4 h-2 rounded-[2px] border border-white/60" />
                                            </div>

                                            {/* Mobile Content Background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black rounded-[2.2rem] overflow-hidden flex flex-col">

                                                {/* Mobile Header Image / Gradient */}
                                                <div className={`shrink-0 h-48 w-full bg-gradient-to-br ${getProjectDetails(data[selectedId].name).gradient} relative`}>
                                                    <motion.button
                                                        onClick={() => { setSelectedId(null); setIsJsonView(false); }}
                                                        className="absolute top-12 left-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-black/40 transition-colors"
                                                    >
                                                        <X size={20} />
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => setIsJsonView(!isJsonView)}
                                                        className="absolute top-12 right-6 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-black/40 transition-colors"
                                                    >
                                                        {isJsonView ? <Braces size={20} /> : <Code size={20} />}
                                                    </motion.button>
                                                    <div className="absolute bottom-6 left-6 text-white max-w-[80%]">
                                                        <h2 className="text-2xl font-bold leading-tight">{data[selectedId].name}</h2>
                                                    </div>
                                                </div>

                                                {/* Mobile Body */}
                                                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
                                                    {isJsonView ? (
                                                        <div className="font-mono text-xs text-green-400 p-2 break-all whitespace-pre-wrap">
                                                            {JSON.stringify(data[selectedId], null, 2)}
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex flex-wrap gap-2 mb-6">
                                                                {data[selectedId].techStack?.map((tech, i) => (
                                                                    <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/5">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>

                                                            <div className="space-y-6">
                                                                <div>
                                                                    <h4 className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2">About</h4>
                                                                    <p className="text-white/80 text-sm leading-relaxed">
                                                                        {data[selectedId].description}
                                                                    </p>
                                                                </div>

                                                                {data[selectedId].keyAchievements && (
                                                                    <div>
                                                                        <h4 className="text-xs uppercase tracking-wider text-white/40 font-bold mb-2">Highlights</h4>
                                                                        <ul className="space-y-3">
                                                                            {data[selectedId].keyAchievements.map((item, i) => (
                                                                                <li key={i} className="flex gap-3 text-sm text-white/70">
                                                                                    <span className="text-blue-400 mt-1">•</span>
                                                                                    {item}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Home Indicator */}
                                                <div className="shrink-0 h-6 flex justify-center items-center pb-2">
                                                    <div className="w-1/3 h-1 bg-white/20 rounded-full" />
                                                </div>
                                            </div>
                                        </>
                                    )}


                                    {/* --- BROWSER FRAME --- */}
                                    {getProjectDetails(data[selectedId].name).type === 'browser' && (
                                        <>
                                            {/* Browser Toolbar */}
                                            <div className="h-12 bg-white/5 border-b border-white/10 flex items-center px-4 gap-4 backdrop-blur-xl rounded-t-xl z-20 shrink-0">
                                                <div className="flex gap-2">
                                                    <div
                                                        onClick={() => { setSelectedId(null); setIsJsonView(false); }}
                                                        className="w-3.5 h-3.5 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 cursor-pointer flex items-center justify-center group/close"
                                                    >
                                                        <X size={8} className="text-black/60 opacity-0 group-hover/close:opacity-100" />
                                                    </div>
                                                    <div className="w-3.5 h-3.5 rounded-full bg-[#FEBC2E]" />
                                                    <div className="w-3.5 h-3.5 rounded-full bg-[#28C840]" />
                                                </div>

                                                {/* Address Bar */}
                                                <div className="flex-1 max-w-2xl mx-auto h-8 bg-black/20 rounded-md border border-white/5 flex items-center px-3 text-xs text-white/30 font-medium">
                                                    <span className="mr-2 text-green-500/50">GET</span>
                                                    <span className="flex-1 text-center">{data[selectedId].link || `https://${data[selectedId].name.toLowerCase().replace(/\s/g, '-')}.com`}</span>
                                                    <button
                                                        onClick={() => setIsJsonView(!isJsonView)}
                                                        className={`p-1 rounded hover:bg-white/10 transition-colors ${isJsonView ? 'text-green-400' : 'text-white/40'}`}
                                                    >
                                                        {isJsonView ? <Braces size={14} /> : <Code size={14} />}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Browser Content */}
                                            <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#0f0f1a]">
                                                {isJsonView ? (
                                                    <div className="p-8 font-mono text-sm max-w-full overflow-x-auto">
                                                        <div className="text-white/30 mb-4 flex items-center gap-2">
                                                            <span className="text-green-500">➜</span>
                                                            <span>HTTP/1.1 200 OK</span>
                                                            <span className="text-white/20 ml-4">Content-Type: application/json</span>
                                                        </div>
                                                        <div className="text-green-300/90 whitespace-pre">
                                                            {JSON.stringify(data[selectedId], null, 4)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {/* Hero Section */}
                                                        <div className="relative p-12 overflow-hidden">
                                                            <div className={`absolute inset-0 bg-gradient-to-br ${getProjectDetails(data[selectedId].name).gradient} opacity-10`} />
                                                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-b from-blue-500/20 to-purple-500/0 rounded-full blur-[100px] pointer-events-none" />

                                                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                                                <div className={`p-6 rounded-3xl bg-gradient-to-br ${getProjectDetails(data[selectedId].name).gradient} shadow-2xl`}>
                                                                    {React.cloneElement(getProjectDetails(data[selectedId].name).icon, { size: 48 })}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                                                                        {data[selectedId].name}
                                                                    </h2>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {data[selectedId].techStack?.map((tech, i) => (
                                                                            <span key={i} className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-blue-200 border border-white/10">
                                                                                {tech}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Details Section */}
                                                        <div className="p-12 pt-0">
                                                            <div className="space-y-8 max-w-4xl">
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-white/90 mb-4">About this Project</h3>
                                                                    <p className="text-white/70 text-lg leading-relaxed">
                                                                        {data[selectedId].description}
                                                                    </p>
                                                                </div>

                                                                <div className="space-y-6">
                                                                    <h3 className="text-xl font-bold text-white/90">Key Achievements</h3>
                                                                    <div className="grid gap-4">
                                                                        {data[selectedId].keyAchievements?.map((achievement, i) => (
                                                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                                                <div className={`mt-2 w-2 h-2 shrink-0 rounded-full bg-gradient-to-r ${getProjectDetails(data[selectedId].name).gradient}`} />
                                                                                <span className="text-white/80">{achievement}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default Projects;
