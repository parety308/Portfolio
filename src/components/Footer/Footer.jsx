import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import data from "../../data/portfolioData.json";

const { personalInfo } = data;
const year = new Date().getFullYear();

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0b0f19] border-t border-white/10 text-gray-400 px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {personalInfo.name}
          </p>
          <p className="text-sm text-gray-500">{personalInfo.title}</p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={`/${link.href}`} className="hover:text-cyan-400 transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-5 text-xl">
          {[
            { icon: <FaGithub />, link: personalInfo.socials.github, label: "GitHub" },
            { icon: <FaLinkedin />, link: personalInfo.socials.linkedin, label: "LinkedIn" },
            { icon: <FaFacebook />, link: personalInfo.socials.facebook, label: "Facebook" },
            { icon: <FaTwitter />, link: personalInfo.socials.twitter, label: "Twitter" },
          ].map(
            (item, i) =>
              item.link &&
              !item.link.startsWith("[") && (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="hover:text-white hover:scale-110 transition-all"
                >
                  {item.icon}
                </a>
              )
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-600 mt-10">
        © {year} {personalInfo.name}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
