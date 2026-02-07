import React from 'react';
import GlassCard from './GlassCard';

const Skills = ({ data }) => {
    return (
        <section id="skills" className="space-y-8">
            <h2 className="text-3xl font-bold text-white/90">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((category, index) => (
                    <GlassCard key={index} className="p-6 hover:bg-white/10 transition-colors duration-300">
                        <h3 className="text-xl font-semibold text-blue-300 mb-4">{category.title}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 rounded-full text-sm bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>
    );
};

export default Skills;
