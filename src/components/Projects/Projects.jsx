import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ImageOff } from "lucide-react";
import data from "../../data/portfolioData.json";
import projectImages from "../../utils/projectImages";

const { projects } = data;

const Projects = () => {
  const [search, setSearch] = useState("");
  const [activeTech, setActiveTech] = useState("All");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const techOptions = useMemo(() => {
    const allTech = projects.flatMap((p) => p.techStack);
    return ["All", ...new Set(allTech)];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
      const matchesTech = activeTech === "All" || project.techStack.includes(activeTech);
      return matchesSearch && matchesTech;
    });
  }, [search, activeTech]);

  return (
    <section
      id="projects"
      className="relative bg-[#0b0f19] text-white px-6 py-24 overflow-hidden"
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-[#111827] -z-20" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{
          background: `radial-gradient(500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(34,211,238,0.08), transparent 80%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">Featured Work</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <label className="flex-1">
            <span className="sr-only">Search projects</span>
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition"
            />
          </label>

          <label>
            <span className="sr-only">Filter by technology</span>
            <select
              value={activeTech}
              onChange={(e) => setActiveTech(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[#111827] border border-cyan-400/20 focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              {techOptions.map((tech, i) => (
                <option key={i}>{tech}</option>
              ))}
            </select>
          </label>
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-gray-400 text-center py-16">No projects match your search.</p>
        )}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const image = projectImages[project.image];
            return (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="group bg-[#0f172a]/80 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-4 shadow-lg hover:shadow-cyan-400/50 hover:border-cyan-400 transition duration-500"
              >
                <Link to={`/projects/${project.id}`} aria-label={`View details for ${project.name}`}>
                  <div className="relative overflow-hidden rounded-xl bg-[#0b0f19]">
                    {image ? (
                      <img
                        src={image}
                        alt={`${project.name} preview`}
                        loading="lazy"
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-56 flex flex-col items-center justify-center gap-2 text-gray-600 bg-white/5">
                        <ImageOff size={28} />
                        <span className="text-xs">Add {project.image}.jpg to src/assets/projects</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 text-white">{project.name}</h3>
                    <p className="text-cyan-400/70 text-xs mb-3">{project.subtitle}</p>
                    <p className="text-gray-400 text-sm mb-5 line-clamp-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 text-sm font-medium">View Details</span>
                      <motion.span className="text-cyan-400 text-lg" whileHover={{ x: 5 }}>
                        →
                      </motion.span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
