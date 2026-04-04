import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, GraduationCap } from "lucide-react";

const KaggleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.281.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.312"/>
  </svg>
);

const ContactSection = () => {
  const links = [
    {
      href: "mailto:prashantgpt91@gmail.com",
      icon: <Mail className="h-7 w-7 text-blue-600" />,
      label: "Email",
      detail: "prashantgpt91@gmail.com",
      external: false,
    },
    {
      href: "https://www.linkedin.com/in/prashantgpt91/",
      icon: <Linkedin className="h-7 w-7 text-blue-600" />,
      label: "LinkedIn",
      detail: "/in/prashantgpt91",
      external: true,
    },
    {
      href: "https://scholar.google.com/citations?user=fpqALOcAAAAJ&hl=en",
      icon: <GraduationCap className="h-7 w-7 text-blue-600" />,
      label: "Google Scholar",
      detail: "Publications & Citations",
      external: true,
    },
    {
      href: "https://www.kaggle.com/prashantgpt91",
      icon: <KaggleIcon className="h-7 w-7 text-blue-600" />,
      label: "Kaggle",
      detail: "Competitions & Datasets",
      external: true,
    },
  ];

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-slate-400 max-w-3xl mx-auto">
          I'm always interested in discussing new opportunities, innovative projects,
          or collaborating on research.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="block hover:scale-105 transition-transform"
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-5">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    {link.icon}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{link.label}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400 truncate w-full">{link.detail}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
