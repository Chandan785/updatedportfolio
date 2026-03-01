import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Laptop,
  Server,
  Database,
  Users,
  GitBranch,
  Lightbulb,
  MessageCircle,
  BookOpen,
  Clock,
  Shield,
} from "lucide-react";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technicalSkills = [
    { icon: <Server size={24} />, name: "Backend: Node.js, Express.js, REST APIs, JWT" },
    { icon: <Laptop size={24} />, name: "Frontend: React.js, Next.js" },
    { icon: <Database size={24} />, name: "Database: MongoDB, MySQL" },
    { icon: <GitBranch size={24} />, name: "Tools: Git, Postman, Cloudinary" },
    { icon: <Shield size={24} />, name: "Concepts: DSA, OOP, DBMS" },
  ];

  const softSkills = [
    { icon: <Users size={24} />, name: "Collaboration & Teamwork" },
    { icon: <Lightbulb size={24} />, name: "Problem-Solving" },
    { icon: <MessageCircle size={24} />, name: "Communication" },
    { icon: <BookOpen size={24} />, name: "Continuous Learning" },
    { icon: <Clock size={24} />, name: "Time Management" },
  ];

  return (
    <section id="skills" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-primary">Skills</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Technical Skills */}
          <motion.div
            className="bg-card p-8 rounded-2xl border-2 border-primary/30 card-hover"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-primary">
              Technical Skills
            </h3>
            <ul className="space-y-4">
              {technicalSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border-b border-muted hover:border-primary transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-primary">{skill.icon}</span>
                  <span className="text-foreground">{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            className="bg-card p-8 rounded-2xl border-2 border-primary/30 card-hover"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-primary">
              Soft Skills
            </h3>
            <ul className="space-y-4">
              {softSkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg border-b border-muted hover:border-primary transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-primary">{skill.icon}</span>
                  <span className="text-foreground">{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;