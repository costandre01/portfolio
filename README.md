# André Costa — Hybrid portfolio

React, TypeScript, Vite and Tailwind CSS, retaining the existing dark/lime visual identity. No additional dependencies.

## Development and validation

```sh
npm install
npm run dev
npm run build
npm run lint
npm run check:pages
npm run preview
```

## Pages and navigation

- `/` — complete home with profile, key skills, experience preview, projects, skills, CV and contact.
- `/about` — web CV with profile, professional experience, education, technical skills, soft skills, languages and contacts.
- `/projects` — all published projects from the shared data array.
- `/projects/eldritch-horror`
- `/projects/deskentra`
- `/projects/3d-product-experience`

Navigation uses ordinary HTML links and native browser history. On page load, a small path resolver selects the React page. No router dependency is required. In development, Vite serves the application for direct paths.

For production, `npm run build` uses React DOM server rendering through Vite to generate a real `index.html` for every route. React hydrates these documents. Each URL has its own HTML text, one H1, title, description, author and Open Graph metadata. The Home includes Person JSON-LD. The build also emits `404.html` and `.nojekyll`.

Direct requests and refreshes work with static directory index hosting; this does not depend on an SPA fallback. A host can redirect `/about` to `/about/` before serving `/about/index.html`; both are supported. Back/forward, anchor navigation and scroll restoration use the browser's native behavior.

## Deployment, including GitHub Pages

Publish the **contents of `dist/`**, including the route subdirectories and `.nojekyll`, through GitHub Pages Actions or equivalent static hosting. No production Node server is needed. This change prepares files only; it does not deploy or modify Git.

For a root domain or a user site, use the default build. For a GitHub Pages project site under `/portfolio/`, set the base before building:

```powershell
$env:VITE_BASE_PATH = '/portfolio/'
npm run build
npm run check:pages
```

In CI, set the `VITE_BASE_PATH` environment variable to your actual repository subpath, including both slashes. The shared URL helper applies it to navigation, photos, project images, galleries and CV links; Vite applies it to built assets. Return to root mode by removing this environment variable before rebuilding. No 404 redirect workaround is required for the six generated pages.

Optionally set `site.url` in `src/data/site.ts` to the real public site URL (including the repository subpath for a project site), then rebuild to emit canonical and `og:url` metadata. It is blank until the actual deployment address is known.

## Content and assets

- `src/data/site.ts`: social links, email, CV path, optional photo and public site URL.
- `src/data/profile.ts`: shared experience, education, languages, soft skills and key technologies, based on the supplied CV and brief.
- `src/data/projects.ts`: central project data for Home, index and detail pages. Add `detail` to give a project a detailed page during the next build.

The existing PDF stays at `public/cv/andre-costa-cv.pdf`. Replace that file for future updates; no link changes are needed. CV links open it in a new tab, where it can be downloaded.

To activate the professional photo, add `public/images/andre-costa.webp` and set `site.photo.available` to `true`. The photo area is hidden while it is unavailable, including when an enabled image fails to load.

All three published projects use real main screenshots with contain/center positioning. Secondary images are loaded only on their detail pages. 3D Product Experience uses the supplied JavaScript, Three.js, Blender, HTML and CSS stack and live demo.

Still to fill: descriptions for IoT and Online Store, and repository URLs for Online Store and World Cup Manager. No unconfirmed content is added for these projects.

Animations respect reduced motion. Mobile menus support Escape, outside clicks, native keyboard navigation and focus states.

## Files in this update

Created:

- `src/pages/HomePage.tsx`, `AboutPage.tsx`, `ProjectsPage.tsx`, `ProjectDetailPage.tsx`, `NotFoundPage.tsx`.
- `src/components/Experience.tsx`, `KeySkills.tsx`, `ProfilePhoto.tsx`, `ProjectLinks.tsx`, `ProjectMedia.tsx`, `GalleryImage.tsx`.
- `src/data/profile.ts`, `src/data/pages.ts`.
- `src/lib/urls.ts`, `src/lib/metadata.ts`, `src/entry-server.tsx`.
- `scripts/prerender.mjs`, `scripts/check-pages.mjs`.

Updated:

- `src/App.tsx`, `src/main.tsx`, `src/index.css`.
- `src/components/Header.tsx`, `Hero.tsx`, `About.tsx`, `Projects.tsx`, `ProjectCard.tsx`, `CvButton.tsx`, `Footer.tsx`, `Skills.tsx`.
- `src/data/site.ts`, `src/data/projects.ts`, `src/types/project.ts`.
- `index.html`, `package.json`, `vite.config.ts`, `eslint.config.js`, `README.md`.

No dependencies were added. The existing CV PDF and screenshot files were preserved. The generated `dist/` output includes six route documents, assets, the PDF, `404.html` and `.nojekyll`.

## Modern project-led homepage update

The homepage now uses an editorial two-line name, explicit Front-End/React positioning and two prioritized actions. `HeroProjectsShowcase` reuses the real Eldritch Horror and Deskentra assets in lightweight linked frames; the screenshots are contained in full, with overlap at frame edges only. The first image has high fetch priority. No generated imagery, animation dependencies or new packages were used.

Home order: Hero → technology strip → selected projects → short profile → experience → skills → CV → contact. Featured cards prioritize images and short summaries; the full technical descriptions remain on the detail pages. The 3D project now uses its real screenshot. The real profile photo appears only on About.

### Publication

Every project has an explicit `published` flag. IoT Smart Home Platform, Online Store and World Cup Manager remain in `projects.ts` as drafts. `publishedProjects` is shared by the cards, hero, route resolver, related links, prerender, structured data and sitemap. Set `published: true` only after confirming the public description, technologies and usable project links. Drafts are never rendered into public HTML.

### Search and social metadata

All public pages keep unique titles, descriptions and author metadata. Open Graph and Twitter metadata share one generator for the prerender and browser entry. Home and About use ProfilePage/Person with confirmed skills and educational affiliation (without claiming completion of the current degree). Project details use Schema.org SoftwareSourceCode, which describes the source repositories without inventing application ratings, usage or pricing. The project index uses CollectionPage/ItemList.

Set the real deployment URL in `site.url` or through `VITE_SITE_URL` before the production build. The URL must include the repository subpath when applicable. This enables canonical, `og:url`, absolute screenshot social images and a populated sitemap. For example, set `VITE_SITE_URL` to your actual published address and `VITE_BASE_PATH` to the matching repository path.

The build always emits `dist/sitemap.xml` and `dist/robots.txt`. While the public address is unknown, the sitemap deliberately has no URL entries and robots has no Sitemap directive; it is not yet ready for search-engine submission. Rebuild with the actual URL to include every generated public page and the absolute Sitemap directive. No hostnames or publication dates are invented. The 404 page is excluded and marked noindex.

### Files in this visual/SEO update

Created: `src/components/HeroProjectsShowcase.tsx`.

Updated:

- `src/components/Hero.tsx`, `About.tsx`, `Experience.tsx`, `CvSection.tsx`, `ProfilePhoto.tsx`, `Projects.tsx`, `ProjectCard.tsx`, `ProjectLinks.tsx`, `ProjectMedia.tsx`.
- `src/pages/HomePage.tsx`, `src/pages/ProjectDetailPage.tsx`.
- `src/data/projects.ts`, `src/data/pages.ts`, `src/data/site.ts`, `src/types/project.ts`.
- `src/App.tsx`, `src/index.css`, `src/lib/metadata.ts`, `src/entry-server.tsx`.
- `scripts/prerender.mjs`, `scripts/check-pages.mjs`, `README.md`.

Further supplied content: confirmed descriptions and links for the three draft projects; actual deployment URL. The real portrait and both 3D Product Experience screenshots are integrated.


## Profile, navigation and CV portrait refinement

The hero retains its project showcase and uses the positioning “Software Developer / Front-End focused. Full-Stack capable.” Its supporting copy is: “I build interactive interfaces, full-stack applications and complex software systems.” React, TypeScript, .NET and C# remain explicit in the skills and profile. CadSolid uses 2026 – Present on Home and Feb 2026 – Present on About, with CAM support, CNC programming and C# post-processors as the confirmed responsibilities.

A small AI & Development row inside the existing Technology Stack lists AI-assisted Development, LLM workflows, RAG and Vision/OCR. About contains one short paragraph describing their use for analysis, debugging, testing, documentation and research. There is no separate AI homepage section or product branding. Person structured data uses the same confirmed capabilities.

`PageSectionNav.tsx` is reused on About and all three project details only. At 1280px and above it occupies the outer gutter with a minimal sticky list; smaller viewports use native details/summary. Real anchor links are prerendered, the disclosure works without JavaScript, and IntersectionObserver updates aria-current without scroll listeners or URL changes. Only existing sections are linked; projects without a gallery have no Gallery item. Stack and Links point to the existing groups in the project header. The global scroll padding plus a small anchor margin keeps the sticky header clear. Reduced motion remains respected.

The real portrait was extracted from the embedded image in `public/cv/andre-costa-cv.pdf`, at its original 308 × 410 resolution, and saved as `public/images/andre-costa.webp` (approximately 12 KB). It is displayed only in About's profile, with intrinsic dimensions, preserved proportions and no retouching. The PDF was not modified. The central LinkedIn URL is now `https://www.linkedin.com/in/andre-costa-/` and is reused by Hero, Contact, Footer and structured data.

Created: `src/components/PageSectionNav.tsx`, `public/images/andre-costa.webp`.

Updated: `src/components/Hero.tsx`, `About.tsx`, `Experience.tsx`, `Skills.tsx`, `ProfilePhoto.tsx`, `Footer.tsx`; `src/pages/AboutPage.tsx`, `ProjectDetailPage.tsx`; `src/data/profile.ts`, `site.ts`, `pages.ts`; `src/index.css`; `scripts/check-pages.mjs`; `README.md`.

No dependencies were added. Validation includes fragment target existence, unique IDs, navigation scope, corrected LinkedIn links, the portrait dimensions and the additional confirmed profile capabilities.

## Final content consistency

Deskentra explicitly describes its React/TypeScript frontend and C#/.NET backend. Its Engineering section presents four data-driven architecture groups: Frontend (React, TypeScript, Vite), Backend (C#, .NET, REST API), Data (PostgreSQL, EF Core), and Authentication (JWT). The shared project data also feeds metadata and structured data.

3D Product Experience describes the confirmed turntable controls, animations, materials and audio within an e-commerce-style interface. Its JavaScript, Three.js, Blender, HTML and CSS stack is unchanged. Both real PNG screenshots are integrated without modifications: `public/images/projects/3D Product Experience.png` (1893 × 900) and `public/images/projects/3D Product Experience_1.png` (1849 × 884). The second is the principal image on Home, Projects and the detail page, and the existing metadata pipeline uses it when a public site URL is configured. Both appear in the shared gallery with descriptive captions/alt text, contain positioning and lazy loading. The principal image has intrinsic width/height; the gallery reserves its existing aspect ratio. No images were generated or cropped.

LinkedIn contact cards display the centrally configured label `linkedin.com/in/andre-costa`, following the latest explicit correction, while their destination remains `https://www.linkedin.com/in/andre-costa-/`. About retains the original portrait and brings it closer to the profile text. People & languages remains accurate because its section includes soft skills and languages. Routes, contextual navigation, prerender, AI emphasis, PDF, dependencies and project publication order are unchanged.

Previous industrial experience reads 2016 – 2026 on Home and 2016 – Jan 2026 on About, following the confirmed January 2026 departure. CadSolid remains 2026 – Present on Home and Feb 2026 – Present on About, reflecting the February 2026 start without an artificial gap.

Deskentra's detail page presents Role (Full-Stack Developer), Focus (React · .NET · REST API · PostgreSQL) and Status (Live), using the existing architecture block styling. Its Overview explains the design, build and deployment contribution; its existing demo URL receives a highlighted button. Architecture, project description and SEO titles/descriptions are retained.

About begins with the CNC/CAM and precision manufacturing background, explaining the methodical, reliability-focused approach to software. The existing summary then connects this to React/TypeScript frontends, C#/.NET backends, Full-Stack capability and current Computer Engineering studies. The original portrait and discreet AI paragraph are preserved.

Validation: build (including TypeScript), lint and check:pages passed. The six public routes were checked at 320, 375, 768, 1024 and 1440 px without horizontal overflow or broken loaded images. Both real 3D gallery images loaded with contain positioning on desktop and mobile. Keyboard Gallery navigation, active state and compact disclosure closure were verified; no browser warnings or errors were captured. No dependencies, routes, SEO titles/descriptions or public domain configuration were changed.
