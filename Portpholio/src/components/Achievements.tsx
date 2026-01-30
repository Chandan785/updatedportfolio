import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Award } from "lucide-react";

const CertificateCard = ({ achievement }: { achievement: { title: string; emoji: string; focus: string; skills: string; link: string } }) => (
  <div className="flex-shrink-0 w-[400px] bg-card p-6 rounded-2xl border border-primary/20 card-hover mx-3">
    <div className="flex items-start gap-4">
      <span className="text-4xl">{achievement.emoji}</span>
      <div className="flex-1">
        <h4 className="text-xl font-bold mb-3">{achievement.title}</h4>
        <p className="text-muted-foreground text-sm mb-2">
          <strong className="text-foreground">Focus:</strong> {achievement.focus}
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          <strong className="text-foreground">Skills:</strong> {achievement.skills}
        </p>
        <a
          href={achievement.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors text-sm font-medium"
        >
          <ExternalLink size={16} /> View Certificate
        </a>
      </div>
    </div>
  </div>
);

const Achievements = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = [
    {
      title: "Data Analytics Certificate",
      emoji: "📊",
      focus: "Introduction to data analysis, statistical methods, and insights extraction.",
      skills: "Handling datasets, identifying patterns, and making data-driven decisions.",
      link: "https://drive.google.com/file/d/1fMBCskLKaMb35s_ibR7ohHA1VwoRraSp/view?usp=sharing",
    },
    {
      title: "Android Developer Certificate",
      emoji: "📱",
      focus: "Mobile app development using Android.",
      skills: "Building, testing, and deploying Android applications, working with Java/Kotlin.",
      link: "https://drive.google.com/file/d/1xv16z0nVnO8hNwoe-VzAyOcpR2CxhzYO/view?usp=sharing",
    },
    {
      title: "Ethical Hacking Certificate",
      emoji: "🛡️",
      focus: "Cybersecurity fundamentals, penetration testing, and ethical hacking practices.",
      skills: "Vulnerability assessment, network security, system protection.",
      link: "https://drive.google.com/file/d/1sR4LNoT5ZBvqF2164zTb8OMgBSg-kI0S/view?usp=sharing",
    },
    {
      title: "Generative AI Certificate",
      emoji: "🤖",
      focus: "Fundamentals of AI models, especially generative models (LLMs and image generation).",
      skills: "Prompt engineering and applying generative AI tools in real-world use cases.",
      link: "https://drive.google.com/file/d/130cqSmn80T6LsGP2zjhitgU0Q6BAyc32/view?usp=sharing",
    },
  ];

  const experiences = [
    {
      role: "Club Head",
      org: "Mobile Dev Club",
      description: "Led workshops, guided peers, and drove successful project development.",
    },
    {
      role: "Volunteer",
      org: "Tech Fest",
      description: "Handled logistics, speaker coordination, and hackathon support.",
    },
    {
      role: "Class Representative",
      org: "Academic",
      description: "Bridged communication between faculty and students.",
    },
    {
      role: "Event Organizer",
      org: "CodeAastra",
      description: "Organized coding events and managed operations.",
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-primary">Achievements</span>
        </motion.h2>

        {/* Certificates - Seamless Marquee */}
        <div className="overflow-hidden mb-16">
          <div className="flex animate-marquee-fast w-max">
            {/* First set */}
            {achievements.map((achievement, index) => (
              <CertificateCard key={`first-${index}`} achievement={achievement} />
            ))}
            {/* Duplicate set for seamless loop */}
            {achievements.map((achievement, index) => (
              <CertificateCard key={`second-${index}`} achievement={achievement} />
            ))}
          </div>
        </div>

        {/* Experience/Activities */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Extracurricular <span className="text-primary">Activities</span>
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role}
              className="bg-card p-6 rounded-2xl border border-primary/20 text-center card-hover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary" size={28} />
              </div>
              <h4 className="font-bold text-lg mb-1">{exp.role}</h4>
              <p className="text-primary text-sm mb-3">{exp.org}</p>
              <p className="text-muted-foreground text-sm">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
