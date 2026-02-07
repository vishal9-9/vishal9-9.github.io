import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import GlassCard from './GlassCard';

const Contact = ({ data }) => {
    return (
        <section id="contact" className="space-y-8 pb-12">
            <h2 className="text-3xl font-bold text-white/90">Get In Touch</h2>
            <GlassCard className="p-8 md:p-12 text-center">
                <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-8">
                    <div className="flex flex-col items-center gap-2 text-white/60">
                        <div className="p-4 rounded-full bg-white/5 mb-2 hover:bg-white/10 transition-colors">
                            <Mail size={24} className="text-blue-400" />
                        </div>
                        <span>{data.email}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-white/60">
                        <div className="p-4 rounded-full bg-white/5 mb-2 hover:bg-white/10 transition-colors">
                            <MapPin size={24} className="text-purple-400" />
                        </div>
                        <span>{data.address}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 text-white/60">
                        <div className="p-4 rounded-full bg-white/5 mb-2 hover:bg-white/10 transition-colors">
                            <Phone size={24} className="text-pink-400" />
                        </div>
                        <span>{data.contactInformation}</span>
                    </div>
                </div>

                <a href={`mailto:${data.email}`} className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/20">
                    Say Hello
                </a>
            </GlassCard>
        </section>
    );
};

export default Contact;
