# ENGINEERING REFLECTION

### 1. What assumptions did you make?

* No Backend Infrastructure: Assumed that a full backend server/database was not required for this assignment, so all data was from an API and managed successfully utilizing client-side state management and localStorage for session persistence and assignments.

* Modern Browser Environment: Assumed users are running modern browsers capable of supporting advanced CSS Grid/Flexbox layouts, Lucide SVG rendering, and React 18/19 ecosystem tooling.

* Single Student Profile: Assumed a generalized student role where user identity can be simulated dynamically via local storage login inputs.

### 2. What was the hardest part?
* Coming up with a design, since I had to do it very fast so i could start developing as soon as possible

### 3. If you had another week, what would you improve?
* Complex Transitions: Since i only had around 2 days, i had to focus on responsiveness and accesibility more than fancy designs

* Simple backend: Since im also interested in fullstack development, I would have made a small database using prisma schema for a more complete user experience.

### 4. What would you refactor first?
* Extract the inline JSON parsing and state filtering logic from the dashboard assignment widgets into custom React hooks to keep UI components cleaner and decouple data fetching logic from the presentation layer.

### 5. What AI tools (if any) did you use, and how did they help?
* I collaborated with an AI to rapidly prototype UI layouts using Tailwind CSS utility classes, refactor component structures into modular sub-components to reduce code duplication ("div soup").

### 6. What did you deliberately choose not to build, and why?
* Real Backend & Authentication Servers: Deliberately omitted building an actual Node/Express backend with JWT handling, because the primary evaluation focus was on frontend architecture, component design, form handling with Zod, and UI responsiveness.



# Product Improvement Challenge (For scaling to 50,000 students)
If LearnGround were scaled to support 50,000 active students, here are three improvements i would make:

### 1. Virtualized List Rendering & Pagination

Rendering hundreds of courses or assignments simultaneously in standard DOM lists can cause performance bottlenecks and memory overhead as data grows it would work better to integrate windowing libraries (like TanStack Virtual) for long lists and implement server-side pagination or infinite scrolling queries for the course catalog and task lists. CONS: Introduces minor UI complexity during initial scroll calculations and reduces the simplicity of raw client-side array filters.

### 2. Global State Caching & Optimistic Updates

As database read/writes spike, relying on simple local storage states will lead to stale data and sync conflicts across student sessions. I could use TanStack React Query’s built-in background refetching, intelligent cache invalidation, and optimistic mutations so user interactions feel instantaneous, even if it requires a robust network API layer and careful handling of cache rollback states if mutations fail.

### 3. Role-Based Access Control & Edge Security

A larger student body brings diverse permission tiers like students, professors, adminis requiring secure boundaries. It would be necessary to upgrade route guards to validate signed JWT tokens or secure session cookies stored via HTTP-only flags rather than raw localStorage.
Adds authentication middleware overhead and requires handling token refresh lifecycles on the frontend client but it gives security to each user.