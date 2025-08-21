import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  useEffect(() => {
    // Hero animation timeline
    const tl = gsap.timeline({ delay: 4 }); // After loading

    tl.fromTo('.hero-headline',
      { 
        opacity: 0, 
        y: 50,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }
    )
    .fromTo('.hero-subtitle',
      { 
        opacity: 0, 
        y: 30,
        filter: 'blur(5px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      },
      '-=0.5'
    )
    .fromTo('.hero-tagline',
      { 
        opacity: 0, 
        y: 20
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      },
      '-=0.3'
    )
    .fromTo('.hero-buttons',
      { 
        opacity: 0, 
        y: 20,
        filter: 'blur(5px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out'
      },
      '-=0.2'
    )
    .fromTo('.spline-container',
      { 
        opacity: 0, 
        x: 100,
        scale: 0.8
      },
      { 
        opacity: 1, 
        x: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      },
      '-=1'
    );

    // Floating background elements
    gsap.to('.floating-orb', {
      y: -30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.8
    });

  }, []);

  const handleDownloadResume = () => {
    // Add resume download logic here
    console.log('Downloading resume...');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Floating Orbs */}
      <div className="floating-orb absolute top-20 left-20 w-64 h-64 rounded-full bg-gradient-glow opacity-20 blur-3xl" />
      <div className="floating-orb absolute bottom-32 right-20 w-48 h-48 rounded-full bg-neon-purple/10 blur-2xl" />
      <div className="floating-orb absolute top-1/2 left-10 w-32 h-32 rounded-full bg-neon-cyan/20 blur-xl" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 z-10">
          <div className="hero-headline">
            <h1 className="text-5xl md:text-7xl font-extralight mb-4">
              Hi, I'm{' '}
              <span className="text-gradient font-light">Debargha</span>
            </h1>
            <div className="hero-subtitle">
              <p className="text-2xl md:text-3xl font-light text-muted-foreground">
                B.Tech CSE Student
              </p>
            </div>
          </div>

          <div className="hero-tagline space-y-4">
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
              Bridging creativity and technology to craft unique digital journeys.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
              With every line of code, I aim to solve problems and spark possibilities.
            </p>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
              Innovation, growth, and passion fuel my journey forward.
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg"
              className="bg-gradient-button hover:shadow-neon transition-all duration-300 hover:scale-105 pulse-glow"
            >
              Hire Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadResume}
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              Download Resume
            </Button>
          </div>
        </div>

        {/* Right Content - Spline 3D Model */}
        <div className="spline-container relative h-[600px] lg:h-[700px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <iframe
              src="https://my.spline.design/orb-5fNHOSADqfTuWgP2CJJSmVnh/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="scale-110"
            />
          </div>
          
          {/* Overlay glow effect */}
          <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none rounded-3xl" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;