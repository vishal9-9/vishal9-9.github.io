import React from 'react';
import { Server, Network, Brain, BarChart } from 'lucide-react';
import GlassCard from './GlassCard';

const iconMap = {
    Server: Server,
    Network: Network,
    Brain: Brain,
    BarChart: BarChart,
};

const Services = ({ data }) => {
    return (
        <section id="services" className="space-y-8">
            <h2 className="text-3xl font-bold text-white/90">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map((service, index) => {
                    const IconComponent = iconMap[service.icon] || Server;

                    return (
                        <GlassCard key={index} className="p-6 hover:bg-white/10 transition-colors duration-300 group">
                            <div className="p-3 rounded-full bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                                <IconComponent className="text-blue-400" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </GlassCard>
                    );
                })}
            </div>
        </section>
    );
};

export default Services;
