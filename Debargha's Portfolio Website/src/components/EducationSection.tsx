import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Trophy } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const EducationSection: React.FC = () => {
  useEffect(() => {
    // Timeline animation
    gsap.fromTo('.timeline-item',
      {
        opacity: 0,
        y: 50,
        filter: 'blur(5px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.education-timeline',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Glowing connectors animation
    gsap.fromTo('.timeline-connector',
      {
        scaleY: 0
      },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: '.education-timeline',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  const educationData = [
    {
      year: '2022 – Present',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Your College Name',
      grade: 'CGPA: 8.5/10',
      icon: <GraduationCap size={24} weight="light" />,
      status: 'Current'
    },
    {
      year: '2020 – 2022',
      degree: 'Senior Secondary (12th)',
      institution: 'Your School Name',
      grade: '88%',
      icon: <BookOpen size={24} weight="light" />,
      status: 'Completed'
    },
    {
      year: '2018 – 2020',
      degree: 'Secondary (10th)',
      institution: 'Your School Name',
      grade: '92%',
      icon: <Trophy size={24} weight="light" />,
      status: 'Completed'
    }
  ];

  return (
    <section id="education" className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-gradient">Education</span> Journey
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            My academic path that shaped my passion for technology and innovation
          </p>
        </div>

        <div className="education-timeline relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary opacity-30 transform -translate-x-1/2 hidden md:block" />
          
          {educationData.map((item, index) => (
            <div
              key={index}
              className={`timeline-item relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Connector */}
              <div className="timeline-connector absolute left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 shadow-neon hidden md:block z-10">
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse" />
              </div>
              
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="glass rounded-2xl p-6 hover:shadow-neon transition-all duration-300 glow-hover group">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary mr-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="text-sm font-light text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {item.status}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-lg font-light text-muted-foreground mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-medium text-foreground mb-2">
                      {item.degree}
                    </h3>
                    <p className="text-muted-foreground font-light">
                      {item.institution}
                    </p>
                  </div>
                  
                  <div className="text-primary font-medium">
                    {item.grade}
                  </div>
                </div>
              </div>
              
              {/* Mobile Timeline Dot */}
              <div className="md:hidden absolute left-4 w-3 h-3 bg-primary rounded-full shadow-neon" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;