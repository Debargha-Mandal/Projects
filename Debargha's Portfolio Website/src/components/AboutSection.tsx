import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  useEffect(() => {
    // Section fade + blur-clear animation
    gsap.fromTo('.about-section',
      {
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Profile image animation
    gsap.fromTo('.profile-image',
      {
        opacity: 0,
        x: -100,
        rotation: -10
      },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.profile-image',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Skills icons staggered animation
    gsap.fromTo('.skill-icon',
      {
        opacity: 0,
        scale: 0.5,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  const skills = [
    { name: 'C', icon: '🔷' },
    { name: 'C++', icon: '⚡' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '⚡' }
  ];

  return (
    <section id="about" className="about-section py-32 relative">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-glow opacity-10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div className="profile-image relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Glowing circular frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-button p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <div className="w-72 h-72 rounded-full bg-gradient-to-br from-muted via-card to-muted flex items-center justify-center text-6xl">
                    👨‍💻
                  </div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-glow opacity-0 transition-opacity duration-300 hover:opacity-50" />
            </div>
          </div>

          {/* Right - Bio and Skills */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-6">
                I'm a passionate B.Tech Computer Science student with a deep love for creating 
                innovative digital solutions. My journey in technology is driven by curiosity 
                and the desire to make a meaningful impact through code.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing 
                to open-source projects, or working on creative solutions to real-world problems.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              <h3 className="text-2xl font-light mb-6 text-primary">Core Skills</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="skill-icon glass rounded-2xl p-4 text-center hover:shadow-neon transition-all duration-300 hover:scale-105 glow-hover group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <div className="text-sm font-light text-muted-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;