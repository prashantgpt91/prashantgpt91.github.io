import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, GraduationCap } from "lucide-react";
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
        <div className="flex justify-center gap-4 mb-8 sm:mb-12">
          <Button size="icon" variant="default" asChild>
            <a href="mailto:prashantgpt91@gmail.com">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          
          <Button size="icon" variant="outline" asChild>
            <a href="https://www.linkedin.com/in/prashantgpt91/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>

          <Button size="icon" variant="outline" asChild>
            <a href="https://scholar.google.com/citations?user=fpqALOcAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              <GraduationCap className="h-4 w-4" />
            </a>
          </Button>

          <Button size="icon" variant="outline" asChild>
            <a href="https://www.kaggle.com/prashantgpt91" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.312"/></svg>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
