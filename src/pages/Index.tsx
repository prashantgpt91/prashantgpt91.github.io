import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      <Header />

      {/* Main content - Only HeroSection */}
      <main>
        <HeroSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-600 dark:text-slate-400 flex items-center justify-center gap-2 cursor-pointer">
            Built with <span className="text-red-500 animate-pulse">❤️</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
