# Md Parvez Hasan — Developer Portfolio

A modern, fully responsive developer portfolio built with React 19, Vite, Tailwind CSS v4, Framer Motion and React Router. Rebuilt from an earlier fetch-based prototype into a static-data, statically-routed site with dedicated project detail pages.

## 🔎 Overview

- Single-page hero → about → education → skills → projects → contact flow
- Each project has its own route (`/projects/:id`) with a full case-study layout
- Portfolio data lives in one JSON file (`src/data/portfolioData.json`) and is bundled at build time — no runtime `fetch` or loading flicker
- Contact form uses EmailJS, configured through environment variables (no secrets in code)

## ✨ Features

- Responsive navbar with mobile drawer and scroll-spy
- Animated hero with resume download + social links
- About section: journey, current focus, what I enjoy, hobbies, quick stats
- Skills grouped by category with animated progress bars
- Education timeline
- Searchable / filterable project grid
- Dedicated project detail pages: overview, tech stack, live demo, GitHub link, challenges, future improvements
- Contact section with `mailto:` / `tel:` / WhatsApp links plus a validated form (loading / success / error states)
- Footer with nav + social links
- `prefers-reduced-motion` support, visible focus states, semantic headings, alt text
- SEO meta tags (title, description, Open Graph, Twitter card), `favicon.svg`, `robots.txt`

## 🧰 Technologies

- **React 19** + **Vite 7**
- **React Router 7** (data router)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, no separate config file needed)
- **Framer Motion** — animations
- **lucide-react** / **react-icons** — icons
- **@emailjs/browser** — contact form delivery

## 📁 Project Structure

```
src/
├── assets/projects/        # drop project-1.jpg / project-2.jpg / project-3.jpg here
├── components/
│   ├── Navbar/
│   ├── Banner/              # hero
│   ├── About/
│   ├── Education/
│   ├── Skills/
│   ├── Projects/            # grid + search/filter
│   ├── ProjectDetails/      # /projects/:id page
│   ├── Contact/
│   └── Footer/
├── data/portfolioData.json  # single source of truth for all content
├── Layouts/RootLayout.jsx   # Navbar + <Outlet/> + Footer
├── pages/Home.jsx           # composes the one-page sections
├── pages/NotFound.jsx
├── Routes/Routes.jsx        # createBrowserRouter config
├── utils/projectImages.js   # maps "project-1" -> the actual image file
├── main.jsx
└── index.css
```

## ⚙️ Requirements

- Node.js 20.19+ or 22.12+ (matches the Vite 7 / React Router 7 engine requirement)
- npm 9+

## 🚀 Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

## 🖼️ Assets you still need to add

The AI rebuild could not invent these — drop them in and everything wires up automatically:

| What                     | Where                                        |
| ------------------------ | --------------------------------------------- |
| Project screenshots      | `src/assets/projects/project-1.jpg`, `project-2.jpg`, `project-3.jpg` |
| Resume PDF                | `public/resume/Parvez_Web-Developer.pdf`      |
| Twitter/X profile URL     | `src/data/portfolioData.json` → `personalInfo.socials.twitter` |
| RentNest GitHub repo URL  | `src/data/portfolioData.json` → `projects[2].githubLink` (not published in the source README) |

## 🔑 Environment Variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials (get these from [emailjs.com](https://www.emailjs.com/)):

```bash
cp .env.example .env
```

```dotenv
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

If these are left empty, the contact form still validates input but shows a friendly error asking the visitor to email you directly instead of silently failing.

## 🧑‍💻 Run Locally

```bash
npm run dev
```

Open **http://localhost:5173**.

## 🏗️ Production Build

```bash
npm run build
npm run preview   # serves the dist/ build locally to sanity-check it
```

## ☁️ Render Deployment

This is a static Vite site — deploy it on Render as a **Static Site**.

1. Push this repository to GitHub.
2. In the Render dashboard: **New → Static Site**.
3. Connect your GitHub repository.
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Add environment variables under the service's **Environment** tab:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. Under **Redirects/Rewrites**, add a catch-all rewrite so client-side routes (like `/projects/local-chef-bazaar`) don't 404 on refresh:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`
7. Click **Create Static Site** and wait for the build to finish.
8. Visit the generated `*.onrender.com` URL and verify the site, then optionally attach a custom domain.

> Changed an environment variable after the first deploy? Trigger **Manual Deploy → Clear build cache & deploy**, since `VITE_*` variables are inlined into the JS bundle at build time, not read at runtime.

## 🐛 Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm install` fails on Node version error | Use Node 20.19+/22.12+ (`nvm install 22`) |
| Build fails with a Tailwind/oxide native binding error | Delete `node_modules` + lockfile, `npm install` again on a supported OS/arch |
| Contact form shows the "not configured" error | Set the three `VITE_EMAILJS_*` variables and rebuild |
| Project images show the placeholder icon | Add `project-1/2/3.jpg` to `src/assets/projects/` |
| Refreshing `/projects/:id` on Render gives a 404 | Add the `/* → /index.html` rewrite rule described above |
| Blank page after deploy, console shows a routing error | Confirm the rewrite rule is set and the publish directory is `dist` |

## 📄 License

MIT — free to use as a base for your own portfolio.
