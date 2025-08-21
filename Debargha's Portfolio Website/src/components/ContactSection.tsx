import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  GithubLogo, 
  LinkedinLogo, 
  EnvelopeSimple, 
  PaperPlaneTilt,
  MapPin,
  Phone
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Contact form animation
    gsap.fromTo('.contact-form',
      {
        opacity: 0,
        x: -50,
        filter: 'blur(5px)'
      },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.contact-info',
      {
        opacity: 0,
        x: 50,
        filter: 'blur(5px)'
      },
      {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Social icons hover animation
    gsap.set('.social-icon', { scale: 1 });

  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit animation
    gsap.to('.submit-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <EnvelopeSimple size={24} weight="light" />,
      label: 'Email',
      value: 'debargha@example.com',
      href: 'mailto:debargha@example.com'
    },
    {
      icon: <Phone size={24} weight="light" />,
      label: 'Phone',
      value: '+91 12345 67890',
      href: 'tel:+911234567890'
    },
    {
      icon: <MapPin size={24} weight="light" />,
      label: 'Location',
      value: 'India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <GithubLogo size={24} weight="light" />,
      name: 'GitHub',
      url: 'https://github.com',
      color: 'hover:text-gray-400'
    },
    {
      icon: <LinkedinLogo size={24} weight="light" />,
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: <EnvelopeSimple size={24} weight="light" />,
      name: 'Email',
      url: 'mailto:debargha@example.com',
      color: 'hover:text-green-400'
    }
  ];

  return (
    <section id="contact" className="contact-section py-32 relative">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-neon-cyan/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Let's connect and discuss how we can work together on your next project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="glass rounded-2xl p-8 hover:shadow-neon transition-all duration-300">
              <h3 className="text-2xl font-light mb-6 text-foreground">
                Send me a message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="glass border-glass-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass border-glass-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="glass border-glass-border focus:border-primary focus:ring-primary/20 transition-all duration-300 resize-none"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="submit-button w-full group"
                >
                  <PaperPlaneTilt size={20} className="mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            {/* Contact Details */}
            <div className="glass rounded-2xl p-8 hover:shadow-neon transition-all duration-300">
              <h3 className="text-2xl font-light mb-6 text-foreground">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center group hover:text-primary transition-colors duration-300"
                  >
                    <div className="p-3 rounded-xl bg-primary/20 text-primary mr-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-foreground font-light">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass rounded-2xl p-8 hover:shadow-neon transition-all duration-300">
              <h3 className="text-2xl font-light mb-6 text-foreground">
                Connect with me
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-icon p-4 glass rounded-xl hover:shadow-neon transition-all duration-300 group ${social.color}`}
                  >
                    <div className="group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground font-light mt-6">
                I'm always open to discussing new opportunities and interesting projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;