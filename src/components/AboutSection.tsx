import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  const skills = [
    "Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision",
    "Python", "R", "SQL", "Apache Spark", "TensorFlow", "PyTorch", "Scikit-learn",
    "AWS", "GCP", "Docker", "Kubernetes", "Apache Airflow", "Git", "Linux"
  ];

  return (
    <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="space-y-16">
        {/* About Me */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-slate-300 leading-relaxed">
              I'm a passionate data scientist with over a decade of experience in machine learning, 
              artificial intelligence, and statistical analysis. I specialize in building end-to-end 
              ML systems that solve real-world business problems.
            </p>
            <p className="text-xl text-gray-700 dark:text-slate-300 leading-relaxed">
              My expertise spans from traditional statistical modeling to cutting-edge deep learning 
              architectures, with a focus on practical applications that drive measurable business impact.
            </p>
          </div>
          
          {/* Experience Badge */}
          <div className="inline-flex items-center gap-3 mt-8 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-blue-200 dark:border-blue-800">
            <div className="text-2xl">🧠</div>
            <span className="font-semibold text-lg">10+ Years Experience</span>
          </div>
        </div>

        {/* Skills */}
        <div className="text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-sm px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
