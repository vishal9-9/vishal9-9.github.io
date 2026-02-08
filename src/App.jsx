import React from 'react';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlassCard from './components/GlassCard';
import resumeData from './data/resume.json';

import FluidBackground from './components/FluidBackground';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import ServerFan from './components/ServerFan';
import NetworkStream from './components/NetworkStream';
import HtopModal from './components/HtopModal';
import SecretManager from './components/SecretManager';
import DeployOverlay from './components/DeployOverlay';
import AiAssistant from './components/AiAssistant';
import RadioWidget from './components/RadioWidget';
import { ServerProvider, useServer } from './context/ServerContext';

const DeployOverlayWrapper = () => {
  const { isDeploying, endDeploy } = useServer();
  return <DeployOverlay isDeploying={isDeploying} onComplete={endDeploy} />;
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // In a real app we might fetch this, but here we import directly.
    // Setting it to state to simulate async data if needed later.
    setData(resumeData);
  }, []);

  if (!data) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <ServerProvider>
      <Layout>
        <SecretManager />
        <DeployOverlayWrapper />
        <AiAssistant />
        <RadioWidget />
        <FluidBackground />
        <CustomCursor />
        <CommandPalette />
        <ServerFan />
        <NetworkStream />
        <HtopModal />
        <Hero data={data} />
        <About data={data} education={data.education} skills={data.skills} />
        <Experience data={data.workExperience} />
        <Projects data={data.projects} />
        <Contact data={data} />
        <Footer data={data} />
      </Layout>
    </ServerProvider>
  );
}

export default App;
