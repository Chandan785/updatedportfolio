import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "2+", label: "Years of Experience" },
    { number: "5+", label: "Projects Completed" },
    { number: "6+", label: "Technologies Mastered" },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-8 bg-card rounded-xl border border-primary/20 card-hover"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="text-5xl md:text-6xl font-bold text-primary mb-4 glow-text">
                {stat.number}
              </h3>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'm a dedicated Full-Stack Developer passionate about creating responsive, 
            user-friendly web applications. Currently pursuing B.Tech in Computer Science 
            at Galgotias University, I specialize in building secure, production-ready 
            applications using modern technologies. As the Mobile Development Club Head, 
            I lead workshops and guide peers in project development.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;