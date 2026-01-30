import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/chandank72/", label: "LinkedIn" },
    { icon: <Github size={20} />, href: "https://github.com/Chandan785", label: "GitHub" },
  ];

  return (
    <footer className="bg-card py-12 border-t border-primary/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About This Site</h3>
            <p className="text-muted-foreground leading-relaxed">
              I am Chandan Kumar, a dedicated professional passionate about web development. 
              This portfolio showcases my skills and projects, demonstrating my ability to 
              create responsive and user-friendly web solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
            <div className="flex justify-end gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-muted pt-8 text-center">
          <p className="text-muted-foreground">
            © {currentYear} <span className="text-primary">Chandan Kumar</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;