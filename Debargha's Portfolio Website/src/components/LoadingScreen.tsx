import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    });

    // After progress completes, fade out preloader
    tl.to(".preloader", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete();
      }
    });

    // Animate logo/text
    gsap.fromTo(".loading-text", 
      { 
        opacity: 0, 
        y: 30,
        filter: "blur(10px)"
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
      }
    );

    // Animate glow orbs
    gsap.to(".glow-orb", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.5
    });

  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Background Glow Orbs */}
      <div className="glow-orb absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-glow opacity-30 blur-xl"></div>
      <div className="glow-orb absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-neon-purple/20 blur-2xl"></div>
      <div className="glow-orb absolute top-1/2 right-1/3 w-20 h-20 rounded-full bg-neon-cyan/30 blur-xl"></div>
      
      {/* Loading Content */}
      <div className="text-center space-y-8">
        <div className="loading-text">
          <h1 className="text-6xl md:text-8xl font-extralight text-gradient mb-4">
            Debargha
          </h1>
          <p className="text-muted-foreground text-lg font-light tracking-wider">
            Crafting Digital Experiences
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Loading Portfolio</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-button transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Animated Dots */}
      <div className="absolute bottom-20 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;