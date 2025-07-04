import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  // Initialize theme from localStorage, default to light theme
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Apply theme on mount and when darkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      window.dispatchEvent(new Event('theme-change'));
      return newMode;
    });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Prashant Gupta
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/projects" className="px-3 py-2 rounded-lg transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10">
            Projects
          </Link>
          <Link to="/papers" className="px-3 py-2 rounded-lg transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10">
            Papers
          </Link>
          <Link to="/blog" className="px-3 py-2 rounded-lg transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10">
            Blog
          </Link>
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
        <div className="md:hidden flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <button
            className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-5 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-gray-600 dark:bg-gray-300 block transform transition duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-gray-600 dark:bg-gray-300 block transition duration-300 ${mobileMenuOpen ? 'w-0 opacity-0' : 'w-full opacity-100'}`} />
              <span className={`h-0.5 w-full bg-gray-600 dark:bg-gray-300 block transform transition duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
          <Link 
            to="/projects"
            className="block px-3 py-2 rounded-md text-base font-medium w-full text-left mb-1 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            to="/papers"
            className="block px-3 py-2 rounded-md text-base font-medium w-full text-left mb-1 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Papers
          </Link>
          <Link 
            to="/blog"
            className="block px-3 py-2 rounded-md text-base font-medium w-full text-left mb-1 hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
