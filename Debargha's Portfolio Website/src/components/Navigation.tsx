import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav on mount
    gsap.fromTo('.nav-container',
      { 
        opacity: 0, 
        y: -20,
        filter: 'blur(10px)'
      },
      { 
        opacity: 1, 
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        delay: 3.5, // After loading completes
        ease: 'power2.out'
      }
    );
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (!isMobileMenuOpen) {
      // Open animation
      gsap.to('.mobile-menu', {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.1 }
      );
    } else {
      // Close animation
      gsap.to('.mobile-menu', {
        opacity: 0,
        x: '100%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  };

  return (
    <>
      <nav className={`nav-container fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-custom' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-light text-gradient">
              Debargha
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileToggle}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed inset-0 z-30 glass backdrop-blur-custom md:hidden ${
        isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
      }`} style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              href={item.href}
              className="mobile-nav-item text-2xl font-light text-foreground hover:text-primary transition-colors duration-300"
              onClick={() => handleMobileToggle()}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;