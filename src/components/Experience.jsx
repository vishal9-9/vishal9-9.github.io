import React from 'react';
import GlassCard from './GlassCard';

const Experience = ({ data }) => {
    return (
        <section id="experience" className="space-y-8">
            <h2 className="text-3xl font-bold text-white/90">Experience</h2>
            <div className="space-y-6">
                {data.map((job, index) => (
                    <GlassCard key={index} className="p-6 md:p-8 transition-transform hover:-translate-y-1 hover:bg-white/10 duration-300">
                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{job.position}</h3>
                                <h4 className="text-lg text-blue-300">{job.company}</h4>
                            </div>
                            <div className="text-white/40 text-sm mt-2 md:mt-0 font-mono">
                                {job.startYear} - {job.endYear || 'Present'}
                            </div>
                        </div>
                        <p className="text-white/60 mb-4 italic">{job.description}</p>
                        <div className="space-y-2">
                            {job.keyAchievements.map((achievement, i) => (
                                <div key={i} className="flex items-start gap-3 text-white/70">
                                    <span className="text-blue-400 text-lg leading-tight mt-[1px]">•</span>
                                    <span className="text-sm leading-relaxed">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
};

export default Experience;
