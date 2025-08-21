import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { DownloadSimple, Eye, FileText } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ResumeSection: React.FC = () => {
  useEffect(() => {
    // Resume section animation
    gsap.fromTo('.resume-content',
      {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.resume-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating button animation
    gsap.to('.resume-button',
      {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      }
    );

  }, []);

  const handleViewResume = () => {
    // Add logic to open resume in modal or new tab
    console.log('Opening resume preview...');
  };

  const handleDownloadResume = () => {
    // Add logic to download resume
    console.log('Downloading resume...');
  };

  return (
    <section id="resume" className="resume-section py-32 relative">
      {/* Background Elements */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-glow opacity-10 blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="resume-content text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              My <span className="text-gradient">Resume</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto mb-8">
              View or download my detailed resume to learn more about my academic and project journey.
            </p>
          </div>

          {/* Resume Preview Card */}
          <div className="glass rounded-3xl p-8 mb-8 max-w-2xl mx-auto hover:shadow-neon transition-all duration-300 glow-hover">
            {/* Resume Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                <FileText size={48} weight="light" />
              </div>
            </div>

            {/* Resume Details */}
            <div className="mb-8">
              <h3 className="text-2xl font-medium text-foreground mb-2">
                Debargha - Software Developer
              </h3>
              <p className="text-muted-foreground font-light">
                B.Tech Computer Science Student • 2 Pages • Updated Dec 2024
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-light text-primary mb-1">4+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-primary mb-1">8.5</div>
                <div className="text-sm text-muted-foreground">Current CGPA</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="lg"
                onClick={handleViewResume}
                className="resume-button group"
              >
                <Eye size={20} className="mr-2" />
                View Resume
              </Button>
              <Button
                variant="glow"
                size="lg"
                onClick={handleDownloadResume}
                className="group"
              >
                <DownloadSimple size={20} className="mr-2 group-hover:translate-y-1 transition-transform" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground font-light">
              Available in PDF format • Last updated December 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;