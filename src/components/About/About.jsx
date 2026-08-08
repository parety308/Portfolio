import { motion } from "framer-motion";
import { User, Star, Code, Users, Heart, Sparkles } from "lucide-react";
import data from "../../data/portfolioData.json";

const { aboutContent } = data;

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-[#0B1220] to-[#0F172A] text-white py-28 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-700/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={18} className="text-cyan-400" />
            <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase">About Me</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-400">Professional Summary</h2>
          <div className="mt-6 inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm border border-cyan-400/20">
            Full Stack • React • Node.js • REST APIs
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-20 items-start">
          <motion.div
            className="lg:col-span-2 space-y-6 text-gray-300 text-lg leading-relaxed max-w-3xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              {aboutContent.journey}
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              {aboutContent.focus}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="pt-4"
            >
              <div className="flex items-center gap-2 mb-3 text-cyan-400">
                <Sparkles size={18} />
                <h3 className="text-sm tracking-[0.2em] uppercase font-semibold">Work I Enjoy</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-3">
                {aboutContent.enjoy.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-300 text-base bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <span className="text-cyan-400 mt-1">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {aboutContent.hobbies?.length > 0 && (
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="pt-4"
              >
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Heart size={18} />
                  <h3 className="text-sm tracking-[0.2em] uppercase font-semibold">
                    Outside of Code
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aboutContent.hobbies.map((hobby, i) => (
                    <span
                      key={i}
                      className="text-sm px-4 py-2 rounded-full bg-teal-500/10 text-teal-300 border border-teal-400/20"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {aboutContent.highlights?.map((item, i) => {
              const Icon = [Star, Code, Users, User][i % 4];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:border-cyan-400/40 shadow-lg shadow-cyan-500/10"
                >
                  <Icon className="text-cyan-400 mb-3 w-8 h-8 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-1">{item.value || "—"}</h3>
                  <p className="text-xs uppercase tracking-wider text-gray-400">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
        {/* Experience */}
{data.experience?.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mt-24"
  >
    <div className="flex items-center gap-3 mb-4">
      <Code size={18} className="text-cyan-400" />
      <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase">
        Experience
      </p>
    </div>

    <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
      Professional Experience
    </h2>

    <div className="relative max-w-4xl">
      {/* Timeline line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-cyan-400/20" />

      {data.experience.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          viewport={{ once: true }}
          className="relative pl-10 pb-8 last:pb-0"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {experience.position}
                </h3>

                <p className="text-cyan-400 mt-1 font-medium">
                  {experience.company}
                </p>
              </div>

              <span className="inline-flex w-fit px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm">
                {experience.duration}
              </span>
            </div>

            <p className="text-gray-300 leading-relaxed mb-5">
              {experience.description}
            </p>

            <ul className="space-y-3">
              {experience.responsibilities?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
                >
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}
      </div>
    </section>
  );
};

export default About;
