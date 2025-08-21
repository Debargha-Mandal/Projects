import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  useEffect(() => {
    // Projects cards animation
    gsap.fromTo('.project-card',
      {
        opacity: 0,
        y: 80,
        rotationX: 45,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

  }, []);

  const projects = [
    {
      title: 'AI-Powered Web App',
      description: 'A modern web application utilizing machine learning algorithms for predictive analytics and data visualization.',
      image: '/lovable-uploads/7726ed6a-8815-4438-9636-f48e72e0e74f.png',
      technologies: ['React', 'Python', 'TensorFlow', 'Node.js'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with modern animations and glassmorphic design elements.',
      image: '/lovable-uploads/a22d8afb-88a5-479a-8003-08d17ed23cf6.png',
      technologies: ['React', 'GSAP', 'Tailwind', 'TypeScript'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and real-time inventory management.',
      image: '/lovable-uploads/e15b5ab9-9872-4c33-bb13-79c66253ee13.png',
      technologies: ['Next.js', 'MongoDB', 'Stripe', 'Redux'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    },
    {
      title: 'Data Visualization Tool',
      description: 'Interactive dashboard for complex data analysis with customizable charts and export features.',
      image: '/lovable-uploads/b5380839-beda-4125-90e1-55c2b7aa725c.png',
      technologies: ['D3.js', 'React', 'Python', 'FastAPI'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Mobile Game UI',
      description: 'Modern gaming interface design with advanced animations and responsive layouts.',
      image: '/lovable-uploads/5ce0d5be-e7bb-4b01-9e43-5631b72d61fd.png',
      technologies: ['React Native', 'Lottie', 'Figma', 'Unity'],
      githubUrl: '#',
      liveUrl: '#',
      featured: false
    },
    {
      title: 'Social Media Dashboard',
      description: 'Comprehensive social media management tool with analytics and scheduling features.',
      image: '/lovable-uploads/603dc9c7-27b8-4a66-957b-b65e7da3e8f0.png',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js'],
      githubUrl: '#',
      liveUrl: '#',
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-96 h-96 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            A showcase of my latest work, demonstrating creativity, technical skills, and problem-solving abilities
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {/* Horizontal Scrolling Container */}
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory" style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            {projects.map((project, index) => (
              <div
                key={index}
                className={`project-card glass rounded-2xl overflow-hidden glow-hover group snap-start flex-shrink-0 ${
                  project.featured ? 'w-80 md:w-96' : 'w-72 md:w-80'
                }`}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="glow"
                      size="sm"
                      className="flex-1 group"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <Globe size={16} className="mr-2" />
                      Live Demo
                      <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <GithubLogo size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="group">
            View All Projects
            <ArrowUpRight size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;