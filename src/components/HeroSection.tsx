import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  scrollToSection?: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  // Typewriter effect for role
  const [visibleRole, setVisibleRole] = useState("");
  const fullRole = "Machine Learning Engineer & Researcher";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullRole.length) {
        setVisibleRole(fullRole.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6/20%,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6/10%,transparent)]"></div>
      </div>
      
      {/* Content container */}
      <div className="w-full max-w-4xl mx-auto px-4 animate-fade-in text-center">
        {/* Name and Role */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Prashant</span>
        </h1>
        
        <div className="min-h-[2em] mb-6">
          <h2 className="text-xl sm:text-2xl font-medium text-gray-700 dark:text-slate-300 inline-block border-r-4 border-blue-500 pr-2 animate-pulse">
            {visibleRole}
          </h2>
        </div>
        
        {/* Brief intro */}
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
          I build intelligent systems that solve complex problems. With expertise in machine learning, 
          natural language processing, and computer vision, I develop solutions that make technology 
          more intuitive and accessible.
        </p>
        
        {/* Main action buttons */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 max-w-xs sm:max-w-lg mx-auto mb-8 sm:mb-12">
          <Button size="lg" variant="default" className="w-full px-3 py-2 h-auto" asChild>
            <a href="mailto:prashantgpt91@gmail.com" className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" /> Contact
            </a>
          </Button>
          
          <Button size="lg" variant="outline" className="w-full px-3 py-2 h-auto" asChild>
            <a href="https://linkedin.com/in/prashantgpt91" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </Button>
          
          <Button size="lg" variant="outline" className="w-full px-3 py-2 h-auto" asChild>
            <a href="https://twitter.com/prashantgpt91" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Twitter className="h-4 w-4" /> Twitter
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
