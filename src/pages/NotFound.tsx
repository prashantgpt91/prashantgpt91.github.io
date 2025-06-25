import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100">
      <Header />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
