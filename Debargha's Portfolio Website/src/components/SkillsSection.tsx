import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Globe, 
  Palette, 
  GitBranch, 
  Lightbulb,
  Database,
  Gear,
  Rocket
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  useEffect(() => {
    // Skills icons animation
    gsap.fromTo('.skill-category',
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
          trigger: '.skills-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.skill-item',
      {
        opacity: 0,
        scale: 0.5,
        rotation: 180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.skills-container',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code size={32} weight="light" />,
      skills: [
        { name: 'C', level: 90 },
        { name: 'C++', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 75 }
      ]
    },
    {
      title: 'Web Development',
      icon: <Globe size={32} weight="light" />,
      skills: [
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 }
      ]
    },
    {
      title: 'Tools & Frameworks',
      icon: <Gear size={32} weight="light" />,
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'GSAP', level: 75 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Node.js', level: 70 }
      ]
    },
    {
      title: 'Core Skills',
      icon: <Lightbulb size={32} weight="light" />,
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Data Structures', level: 85 },
        { name: 'Algorithms', level: 80 },
        { name: 'Design Thinking', level: 75 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 relative">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-glow opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-neon-purple/10 blur-2xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiencies
          </p>
        </div>

        <div className="skills-container grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="skill-category glass rounded-2xl p-6 hover:shadow-neon transition-all duration-300 glow-hover group"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-primary/20 text-primary mr-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-light text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-primary font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-button transition-all duration-1000 ease-out rounded-full"
                        style={{ 
                          width: `${skill.level}%`,
                          transitionDelay: `${categoryIndex * 200 + skillIndex * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Icons */}
        <div className="mt-16">
          <h3 className="text-2xl font-light text-center mb-8 text-primary">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <Database size={24} />, name: 'Database' },
              { icon: <GitBranch size={24} />, name: 'Version Control' },
              { icon: <Palette size={24} />, name: 'UI/UX Design' },
              { icon: <Rocket size={24} />, name: 'Performance' }
            ].map((tech, index) => (
              <div
                key={index}
                className="skill-item glass rounded-xl p-4 hover:shadow-neon transition-all duration-300 glow-hover group"
              >
                <div className="text-primary mb-2 group-hover:scale-110 transition-transform flex justify-center">
                  {tech.icon}
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;