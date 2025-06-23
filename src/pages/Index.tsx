import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ArrowUp } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import PapersSection from "@/components/PapersSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

import { useScrollSections } from "@/hooks/useScrollSections";

const Index = () => {
  // Initialize theme from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Section IDs for scroll navigation
  const sectionIds = ['hero', 'about', 'projects', 'papers', 'blog', 'contact'];
  const { scrollToSection } = useScrollSections(sectionIds);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Show back to top button
      setShowBackToTop(scrollTop > windowHeight * 0.5);
      
      // Find active section
      const sections = sectionIds.map(id => document.getElementById(id));
      const currentSection = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigation = (sectionId: string) => {
    const sectionIndex = sectionIds.indexOf(sectionId);
    if (sectionIndex !== -1) {
      scrollToSection(sectionIndex);
    }
  };

  const scrollToTop = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'papers', label: 'Papers' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div ref={scrollableContainerRef} className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-white text-gray-900'} overflow-y-scroll h-screen scroll-smooth snap-y snap-mandatory`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-slate-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={scrollToTop}
          >
            Prashant Gupta
          </h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavigation(item.id)} 
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 font-medium' 
                    : 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 dark:text-slate-200 hover:text-blue-600 transition-colors p-2"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-slate-900/95 px-4 py-3 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { 
                    handleNavigation(item.id); 
                    setMobileMenuOpen(false); 
                  }} 
                  className={`py-3 px-4 rounded-lg transition-all duration-200 text-left ${
                    activeSection === item.id 
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 font-medium' 
                      : 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Hero Section with Matrix Animation - Combined First Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-16 pb-8 snap-start">
        <div className="max-w-6xl mx-auto w-full">
          <HeroSection scrollToSection={handleNavigation} />
          <div className="px-4 sm:px-6 mt-auto">

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen pt-16 flex items-center snap-start">
        <div className="w-full">
          <AboutSection />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen pt-16 flex items-center snap-start">
        <div className="w-full">
          <ProjectsSection />
        </div>
      </section>

      {/* Papers Section */}
      <section id="papers" className="min-h-screen pt-16 flex items-center snap-start">
        <div className="w-full">
          <PapersSection />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="min-h-screen pt-16 flex items-center snap-start">
        <div className="w-full">
          <BlogSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen pt-16 flex items-center snap-start">
        <div className="w-full">
          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600 dark:text-slate-400">
            2024 Prashant Gupta. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
