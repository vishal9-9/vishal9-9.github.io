import React from 'react';
import GlassCard from './GlassCard';

const About = ({ data, education, skills }) => {
    return (
        <section id="about" className="space-y-8">
            <h2 className="text-3xl font-bold text-white/90">About Me</h2>

            {/* Summary Section - Full Width */}
            <GlassCard className="p-6 md:p-8">
                <p className="text-lg text-white/70 leading-relaxed font-light">
                    {data.summary}
                </p>
            </GlassCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education Section */}
                <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white/90 flex items-center gap-2">
                        Education
                    </h3>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <GlassCard key={index} className="p-6 transition-transform hover:-translate-y-1 duration-300">
                                <div className="flex flex-col mb-1">
                                    <h4 className="text-xl font-bold text-white leading-tight">{edu.school}</h4>
                                    <div className="flex justify-between items-baseline mt-1">
                                        <p className="text-blue-300 text-base font-medium">{edu.degree}</p>
                                        <span className="text-white/40 text-sm font-mono whitespace-nowrap ml-2">
                                            {edu.startYear} - {edu.endYear || 'Present'}
                                        </span>
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-white/90">Skills</h3>
                    <GlassCard className="p-6">
                        <div className="space-y-6">
                            {skills.map((category, index) => (
                                <div key={index}>
                                    <h4 className="text-base font-bold text-blue-400 uppercase tracking-wider mb-3">
                                        {category.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, i) => (
                                            <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all cursor-default shadow-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
};

export default About;
