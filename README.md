<div align="center">
  <br />
  <img src="/src/assets/Logo.png" width="80" height="80" style="border-radius: 24px;" alt="LearnGround logo" />
  
  <h1 style="font-size: 3rem; font-weight: 900; margin-top: 16px; background: linear-gradient(to right, rgba(200, 214, 217, 1), #589fecff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
    LearnGround
  </h1>
  
  <p style="font-size: 1.2rem; color: #4b5563; max-width: 600px; margin: 8px auto 24px auto; line-height: 1.6;">
    LearnGround is a playful, responsive student portal web application built with React, TypeScript, and Vite. It provides students with a centralized dashboard to manage their academic courses, track assignments, and view real-time progress.
  </p>
  
  <p>
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat-round&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-round&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-round&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-round&logo=vercel&logoColor=white" alt="Vercel" />
</p>

  <br />
</div>

## Decisions
* **Client-Side Authentication:** Leveraged `localStorage` to simulate session persistence (`learnGround_auth`) and dynamic username injection (`learnGround_userName`) without requiring a backend server.
* **Component Architecture ("Div Soup" Refactoring):** Extracted heavy UI elements into modular sub-components (such as `CourseCard`) to keep markup clean, maintainable, and readable.
* **Declarative Route Guards:** Implemented custom React Router protection to secure private views and automatically redirect users based on authentication status.
* **Form Validation:** Integrated React Hook Form combined with Zod schemas to guarantee strict input validation with immediate, animated error states.

## Assumptions
* **No Backend Infrastructure:** Assumed a mock frontend environment where local data structures and `localStorage` suffice for demonstration and portfolio presentation.
* **Modern Viewports:** Assumed evergreen browsers supporting modern CSS Grid, Flexbox layouts, and SVG rendering (Lucide icons).
* **Unified Student Profile:** Assumed a generalized user workflow where personal details (like display names) are derived or saved dynamically from mock login entries.

## Improvements
* **Responsive Layout Enhancements:** Fixed mobile-view bottlenecks by introducing mobile-first flexbox stacking (like responsive footers, side-by-side header layouts).
* **Dashboard Widgets:** Added a dedicated assignment tracker widget to surface tasks due within the week filtered by completion status.
* **Accessibility Polish:** Added native `autoComplete` tags to form inputs to clear browser console warnings and integrate seamlessly with password managers.

## Tech Stack
* **Core:** React, TypeScript, Vite
* **Routing:** React Router DOM
* **State Management & Data Fetching:** TanStack React Query
* **Form Validation:** React Hook Form, Zod
* **Styling:** Tailwind CSS, Lucide React Icons

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
  ```bash
   npm run dev
   ```
