import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Tracing Beam */}
      <div
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-transparent via-primary to-muted-foreground"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-40 bg-background/95 backdrop-blur-sm border-b border-primary/20"
      >
        <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-2xl md:text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            Port<span className="text-primary">folio</span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors relative group font-medium"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>

          <motion.a
            href="https://drive.google.com/file/d/1-w0xtWRKkK5zxYpm9P70p87JollwcsMZ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume <Download size={18} />
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-primary/20"
          >
            <ul className="flex flex-col items-center py-6 gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <a
                href="https://drive.google.com/file/d/1-w0xtWRKkK5zxYpm9P70p87JollwcsMZ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold mt-4"
              >
                Resume <Download size={18} />
              </a>
            </ul>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};

export default Navbar;