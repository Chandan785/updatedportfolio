import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Facebook, Instagram } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const Hero = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const titles = ["Full-Stack Developer", "Web Developer", "Problem Solver"];

  useEffect(() => {
    const handleTyping = () => {
      const currentTitle = titles[loopNum % titles.length];
      setText(
        isDeleting
          ? currentTitle.substring(0, text.length - 1)
          : currentTitle.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  const socialLinks = [
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/chandank72/", label: "LinkedIn" },
    { icon: <Github size={20} />, href: "https://github.com/Chandan785", label: "GitHub" },
    { icon: <Mail size={20} />, href: "mailto:chandankumar700785@gmail.com", label: "Email" },
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-20"
    >
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        {/* Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-xl md:text-2xl font-semibold text-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.h3>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Chandan <span className="text-primary">Kumar</span>
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            And I'm a <span className="glow-text">{text}</span>
            <span className="animate-pulse">|</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-base md:text-lg max-w-2xl mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Full-Stack Developer skilled in JavaScript, Next.js, Node.js, Express, and MongoDB
            with hands-on experience building secure, production-ready web applications.
            Committed to continuous learning and delivering innovative solutions.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-secondary hover:text-primary hover:shadow-lg hover:shadow-primary/50 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <motion.a
              href="#contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-secondary hover:text-primary hover:shadow-lg hover:shadow-primary/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary glow-effect">
              <img
                src={profilePhoto}
                alt="Chandan Kumar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glow Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" style={{ animationDuration: "3s" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;