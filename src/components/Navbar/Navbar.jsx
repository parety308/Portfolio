import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";

const navItems = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Education", href: "education" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Contact", href: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      navItems.forEach((item) => {
        const section = document.getElementById(item.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(item.href);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setScrolled(!isHome ? true : window.scrollY > 10);
  }, [isHome]);

  const goToSection = (id) => {
    setIsOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0f172a]/80 shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => goToSection("home")}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
          aria-label="Go to home"
        >
          {"< PARVEZ />"}
        </motion.button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = isHome && activeSection === item.href;
            return (
              <li key={item.href} className="relative">
                <button
                  onClick={() => goToSection(item.href)}
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive ? "text-teal-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-400"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-xl bg-[#0f172a]/95 border-t border-white/10"
          >
            <ul className="flex flex-col px-6 py-6 gap-4">
              {navItems.map((item) => {
                const isActive = isHome && activeSection === item.href;
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => goToSection(item.href)}
                      className={`block w-full text-left py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "text-teal-400 bg-teal-400/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
