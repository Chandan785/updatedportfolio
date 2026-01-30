import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from "lucide-react";

// Import project images
import medease1 from "@/assets/projects/medease-1.jpg";
import medease2 from "@/assets/projects/medease-2.png";
import medease3 from "@/assets/projects/medease-3.png";
import medease4 from "@/assets/projects/medease-4.png";
import medease5 from "@/assets/projects/medease-5.png";
import educonnect1 from "@/assets/projects/educonnect-1.jpeg";
import educonnect2 from "@/assets/projects/educonnect-2.jpeg";
import educonnect3 from "@/assets/projects/educonnect-3.jpeg";
import educonnect4 from "@/assets/projects/educonnect-4.jpeg";
import educonnect5 from "@/assets/projects/educonnect-5.jpeg";
import minichatwebImg from "@/assets/projects/minichatweb.jpg";

interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  emoji: string;
  description: string;
  tech: string[];
  liveLink: string;
  githubLink: string;
  images: ProjectImage[];
  video?: string;
}

const ImageCarousel = ({ images }: { images: ProjectImage[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden group/carousel rounded-xl">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-primary opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 rounded-full flex items-center justify-center text-primary opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Dots indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-primary w-4"
                    : "bg-foreground/50 hover:bg-foreground/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="flex-shrink-0 w-[800px] bg-card rounded-2xl overflow-hidden border border-primary/20 card-hover mx-4">
    <div className="flex h-[320px]">
      {/* Left side - Image Carousel */}
      <div className="w-[320px] h-full p-4 flex-shrink-0">
        <ImageCarousel images={project.images} />
      </div>

      {/* Right side - Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Title and Video Badge */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <span>{project.emoji}</span>
              {project.title}
            </h4>
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-primary transition-colors"
              >
                <Play size={12} /> Demo
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-primary text-xs rounded-full border border-primary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors text-sm font-medium"
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects: Project[] = [
    {
      title: "MEDEASE",
      emoji: "📱",
      description:
        "A healthcare web application designed to simplify doctor–patient interactions. Features include online appointment booking, patient dashboard, report filtering, and secure communication.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
      liveLink: "https://medease-11.onrender.com",
      githubLink: "https://github.com/Chandan785",
      images: [
        { src: medease1, alt: "MEDEASE Layout" },
        { src: medease2, alt: "MEDEASE Dashboard" },
        { src: medease3, alt: "MEDEASE Features" },
        { src: medease4, alt: "MEDEASE Appointments" },
        { src: medease5, alt: "MEDEASE Reports" },
      ],
    },
    {
      title: "EduConnect",
      emoji: "🎓",
      description:
        "A full-stack student–faculty portal with secure backend using Node.js, Express.js, JWT Auth, and MongoDB. Features faculty finder, timetable viewing, and feedback system.",
      tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary"],
      liveLink: "#",
      githubLink: "https://github.com/Chandan785",
      images: [
        { src: educonnect1, alt: "EduConnect Login" },
        { src: educonnect2, alt: "EduConnect Dashboard" },
        { src: educonnect3, alt: "EduConnect Timetable" },
        { src: educonnect4, alt: "EduConnect Faculty" },
        { src: educonnect5, alt: "EduConnect Features" },
      ],
      video: "https://www.galgotiasuniversity.edu.in/public/frontend/videos/Websitevideo.mp4",
    },
    {
      title: "MiniChatWeb",
      emoji: "💬",
      description:
        "A web-based chat app for smooth, persistent conversations. Users can send, edit, and delete messages with timestamps. Backed by MongoDB storage with responsive UI.",
      tech: ["Node.js", "Express.js", "MongoDB", "EJS", "TailwindCSS"],
      liveLink: "#",
      githubLink: "https://github.com/Chandan785",
      images: [
        { src: minichatwebImg, alt: "MiniChatWeb Interface" },
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-primary">Projects</span>
        </motion.h2>

        {/* Seamless Marquee */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee w-max">
            {/* First set */}
            {projects.map((project, index) => (
              <ProjectCard key={`first-${index}`} project={project} />
            ))}
            {/* Duplicate set for seamless loop */}
            {projects.map((project, index) => (
              <ProjectCard key={`second-${index}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
