
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  // Custom Kaggle Icon Component
  const KaggleIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.197 0-.351-.071-.351-.141 0-.023.023-.046.023-.092L9.677 14.29l-1.708 1.96v6.84c0 .141-.154.234-.351.234H4.479c-.176 0-.328-.093-.328-.234V.234C4.151.093.281.002 4.479.002h3.139c.197 0 .351.09.351.232v11.53L15.581.471c.117-.141.258-.234.351-.234h3.234c.176 0 .328.141.234.328L12.9 8.621l6.601 14.705c.070.141.023.281-.070.328-.023.046-.023.07-.023.116 0 .045.023.07.047.089z"/>
    </svg>
  );

  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-slate-950 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6/20%,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6/10%,transparent)]"></div></div>
      <div className="animate-fade-in">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Data Scientist & AI Engineer
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
            10+ years of experience transforming complex data into actionable insights and building intelligent systems that drive business growth.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={() => scrollToSection('projects')}>
            View My Work
          </Button>
          <Button variant="outline" size="lg" onClick={() => scrollToSection('contact')}>
            Contact Me
          </Button>
          <Button variant="outline" size="lg">
            Download Resume
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://www.linkedin.com/in/prashantgpt91/" className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
            <Linkedin className="h-5 w-5" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/prashant-gpt" className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
          <a href="https://www.kaggle.com/prashantgpt" className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
            <KaggleIcon className="h-5 w-5" />
            <span>Kaggle</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
