import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import data from "../../data/portfolioData.json";

const { personalInfo } = data;

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const isEmailConfigured = EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY;

const Contacts = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) next.email = "Enter a valid email";
    if (!formData.message.trim()) next.message = "Please add a short message";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!isEmailConfigured) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#0F172A] to-[#111827] text-white py-28 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">
            Career Opportunities
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Open to Full-Time Opportunities
          </h2>

          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm mb-6 border border-green-400/20">
            ● Available for Remote / Onsite Roles
          </div>

          <p className="text-gray-400 leading-relaxed max-w-lg mb-10">
            I'm currently seeking full-time opportunities where I can contribute to
            impactful products and collaborate with strong engineering teams. I
            typically respond within 24 hours.
          </p>

          <div className="space-y-6 text-sm">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-3 hover:text-cyan-300 transition w-fit"
            >
              <Mail size={16} className="text-cyan-400" />
              <span>{personalInfo.email}</span>
            </a>

            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-3 hover:text-cyan-300 transition w-fit"
            >
              <Phone size={16} className="text-cyan-400" />
              <span>{personalInfo.phone}</span>
            </a>

            {personalInfo.whatsapp && (
              <a
                href={`https://wa.me/${personalInfo.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-cyan-300 transition w-fit"
              >
                <MessageCircle size={16} className="text-cyan-400" />
                <span>Chat on WhatsApp</span>
              </a>
            )}

            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-cyan-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl shadow-cyan-500/20"
        >
          <h3 className="text-xl font-semibold mb-6 text-cyan-400">Hiring Inquiry</h3>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="sr-only">
                Your name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Recruiter / Company Name"
                aria-invalid={!!errors.name}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Your email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Company Email"
                aria-invalid={!!errors.email}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about the role and responsibilities..."
                aria-invalid={!!errors.message}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 resize-none transition"
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-4 rounded-xl transition shadow-lg shadow-cyan-500/40 disabled:opacity-60"
            >
              <Send size={18} />
              {status === "loading" ? "Sending..." : "Submit Inquiry"}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-cyan-400 text-sm text-center mt-4"
                >
                  <CheckCircle2 size={16} />
                  Thank you! I will respond shortly.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-red-400 text-sm text-center mt-4"
                >
                  <AlertCircle size={16} />
                  {isEmailConfigured
                    ? "Something went wrong — please email me directly instead."
                    : "Form isn't configured yet — please email me directly instead."}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contacts;
