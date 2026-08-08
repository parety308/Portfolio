import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ImageOff, AlertTriangle, Lightbulb } from "lucide-react";
import data from "../../data/portfolioData.json";
import projectImages from "../../utils/projectImages";

const { projects } = data;

const isPlaceholder = (value) => !value || value.startsWith("[");

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Md Parvez Hasan`;
    }
    return () => {
      document.title = "Md Parvez Hasan | Full Stack Developer";
    };
  }, [project]);

  if (!project) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#0b0f19] text-white pt-28">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="text-gray-400 mb-8">This project may have been removed or renamed.</p>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-black font-semibold"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>
      </section>
    );
  }

  const image = projectImages[project.image];

  return (
    <article className="bg-[#0b0f19] text-white min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 mb-8 transition"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-white/10 mb-10 bg-white/5"
        >
          {image ? (
            <img
              src={image}
              alt={`${project.name} preview`}
              className="w-full max-h-[420px] object-cover"
            />
          ) : (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-2 text-gray-600">
              <ImageOff size={32} />
              <span className="text-sm">Add {project.image}.jpg to src/assets/projects</span>
            </div>
          )}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-cyan-400 mb-2"
        >
          {project.name}
        </motion.h1>
        <p className="text-gray-400 mb-8">{project.subtitle}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-14">
          {!isPlaceholder(project.liveLink) && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition shadow-lg shadow-cyan-500/40"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {!isPlaceholder(project.githubLink) ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              <Github size={18} />
              GitHub Repository
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-gray-500 text-sm">
              <Github size={18} />
              GitHub link not provided yet
            </span>
          )}
        </div>

        {/* Overview */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{project.overview}</p>
        </section>

        {/* Challenges */}
        {project.challenges?.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-4 text-amber-400">
              <AlertTriangle size={20} />
              <h2 className="text-2xl font-semibold text-white">Challenges</h2>
            </div>
            <ul className="space-y-3">
              {project.challenges.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                >
                  <span className="text-amber-400 mt-1">▹</span>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Future improvements */}
        {project.improvements?.length > 0 && (
          <section className="mb-4">
            <div className="flex items-center gap-2 mb-4 text-teal-400">
              <Lightbulb size={20} />
              <h2 className="text-2xl font-semibold text-white">Future Improvements</h2>
            </div>
            <ul className="space-y-3">
              {project.improvements.map((imp, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-300 bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                >
                  <span className="text-teal-400 mt-1">▹</span>
                  {imp}
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 mt-14 text-sm text-cyan-400 hover:text-cyan-300 transition"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    </article>
  );
};

export default ProjectDetails;
