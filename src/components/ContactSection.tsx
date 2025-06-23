import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Twitter } from "lucide-react";


const ContactSection = () => {




  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-xl text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
          I'm always interested in discussing new opportunities, innovative projects, 
          or collaborating on research. You can reach me via email or connect with me on social media.
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="mailto:prashantgpt91@gmail.com" className="block hover:scale-105 transition-transform">
            <Card className="h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400 truncate">prashantgpt91@gmail.com</p>
              </CardContent>
            </Card>
          </a>
          <a href="https://www.linkedin.com/in/prashantgpt91/" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
            <Card className="h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">/in/prashantgpt91</p>
              </CardContent>
            </Card>
          </a>
          <a href="https://twitter.com/prashantgpt91" target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform">
            <Card className="h-full">
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Twitter className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Twitter</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">@prashantgpt91</p>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
