import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize GSAP and smooth scrolling after loading
    const initializeAnimations = () => {
      // Refresh ScrollTrigger after all content is loaded
      ScrollTrigger.refresh();
      
      // Add smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    };

    if (!isLoading) {
      // Delay to ensure all components are mounted
      setTimeout(initializeAnimations, 100);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative">
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none z-0" />
      
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse" />
      <div className="fixed top-20 right-20 w-1 h-1 bg-accent rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="fixed bottom-32 left-20 w-1.5 h-1.5 bg-neon-cyan rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-10 right-10 w-1 h-1 bg-neon-purple rounded-full opacity-60 animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default Portfolio;