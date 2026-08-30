# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## Personal Portfolio Website

### React.js Implementation

---

# 1. Introduction

## 1.1 Purpose

This document defines the technical and functional requirements for developing the personal portfolio website of **M. Azmi Al Fadillah**.

The website will be implemented using **React.js** and will serve as a professional portfolio for frontend and web development job applications.

---

# 2. Technology Requirements

## 2.1 Frontend Framework

Use:

> React.js
> Tailwind css

The application must use reusable React components.

---

## 2.2 Build Tool

Use:

> Vite

Recommended setup:

```text
React
JavaScript or TypeScript
Vite
```

If TypeScript is used, use it consistently throughout the project.

---

## 2.3 Styling

Preferred:

> Tailwind CSS

Use Tailwind CSS for:

* Layout
* Responsive design
* Typography
* Spacing
* Component styling
* Responsive breakpoints

Do not mix multiple CSS frameworks.

Custom CSS may be used where necessary for special effects or animations.

---

## 2.4 Routing

Use:

> React Router

Routing should support:

```text
/
 /projects
 /projects/:slug
```

If a single-page portfolio is preferred for the main navigation, section anchors may be used while project details use dedicated routes.

---

## 2.5 Icons

Use one consistent icon library.

Recommended:

> Lucide React

Do not mix multiple icon libraries unnecessarily.

---

# 3. Project Architecture

Recommended structure:

```text
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   │
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   │
│   │   ├── Icon/
│   │   │   └── Icon.jsx
│   │   │
│   │   ├── Badge/
│   │   │   └── Badge.jsx
│   │   │
│   │   ├── Container/
│   │   │   └── Container.jsx
│   │   │
│   │   ├── SectionTitle/
│   │   │   └── SectionTitle.jsx
│   │   │
│   │   ├── Image/
│   │   │   └── Image.jsx
│   │   │
│   │   ├── Link/
│   │   │   └── Link.jsx
│   │   │
│   │   └── Text/
│   │       └── Text.jsx
│   │
│   ├── molecules/
│   │   ├── SocialLinks/
│   │   │   └── SocialLinks.jsx
│   │   │
│   │   ├── ProjectMeta/
│   │   │   └── ProjectMeta.jsx
│   │   │
│   │   ├── TechStack/
│   │   │   └── TechStack.jsx
│   │   │
│   │   ├── ProjectActions/
│   │   │   └── ProjectActions.jsx
│   │   │
│   │   ├── SkillGroup/
│   │   │   └── SkillGroup.jsx
│   │   │
│   │   ├── ExperienceItem/
│   │   │   └── ExperienceItem.jsx
│   │   │
│   │   └── EducationItem/
│   │       └── EducationItem.jsx
│   │
│   ├── organisms/
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── Hero/
│   │   │   └── Hero.jsx
│   │   │
│   │   ├── About/
│   │   │   └── About.jsx
│   │   │
│   │   ├── Skills/
│   │   │   └── Skills.jsx
│   │   │
│   │   ├── Projects/
│   │   │   └── Projects.jsx
│   │   │
│   │   ├── Experience/
│   │   │   └── Experience.jsx
│   │   │
│   │   ├── Education/
│   │   │   └── Education.jsx
│   │   │
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   │
│   │   └── Footer/
│   │       └── Footer.jsx
│   │
│   └── templates/
│       ├── MainLayout/
│       │   └── MainLayout.jsx
│       │
│       └── ProjectLayout/
│           └── ProjectLayout.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   └── ProjectDetail.jsx
│
├── data/
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   └── education.js
│
├── hooks/
│   ├── useScrollSpy.js
│   ├── useMediaQuery.js
│   └── useReducedMotion.js
│
├── utils/
│   ├── cn.js
│   ├── formatDate.js
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── index.css
```

If TypeScript is used:

```text
.ts
.tsx
```

should be used consistently.

---

# 4. Data Architecture

Project content must not be hardcoded directly inside UI components.

Use structured project data.

Example:

```js
{
  id: 1,
  slug: "waste-bank-information-system",
  title: "Waste Bank Information System",
  category: "Web Application",
  description: "...",
  longDescription: "...",
  technologies: [
    "React.js",
    "Node.js",
    "Express.js",
    "MySQL"
  ],
  features: [
    "Authentication",
    "Customer Management",
    "Reporting",
    "VIKOR Ranking"
  ],
  image: "...",
  screenshots: [],
  github: "...",
  demo: "...",
  featured: true
}
```

The same pattern should be used for skills and experience.

---

# 5. Functional Requirements

## FR-01 Navigation

The system shall provide navigation to:

* Home
* About
* Skills
* Projects
* Experience
* Education
* Contact

Desktop navigation should be visible in the header.

Mobile navigation should use a responsive menu.

---

## FR-02 Smooth Navigation

Clicking a navigation item should smoothly navigate to the corresponding section when using the single-page layout.

The current active section should have a visible navigation state.

---

## FR-03 Hero CTA

The Hero section must provide:

* View Projects
* Download CV

View Projects must navigate to the Projects section.

Download CV must trigger the CV file download.

---

## FR-04 Social Links

Provide functional links to:

* GitHub
* LinkedIn
* Email

Links must open correctly.

External links should use appropriate security attributes where necessary.

---

## FR-05 Project Listing

The Projects section shall render projects dynamically from structured project data.

Each project must display:

* Title
* Description
* Category
* Technologies
* Image
* Demo link
* GitHub link

---

## FR-06 Featured Projects

Projects marked:

```js
featured: true
```

must be displayed in the Featured Projects section.

---

## FR-07 Project Details

Users must be able to open detailed project information.

The detail page must display:

* Project title
* Overview
* Problem
* Solution
* Features
* Technology stack
* Challenges
* Solutions
* Result
* Screenshots
* GitHub
* Live Demo

---

## FR-08 Project Filtering

If multiple project categories exist, provide optional filtering.

Example:

```text
All
Frontend
Web Application
Full Stack
```

Filtering should update the displayed projects without reloading the page.

Do not implement filtering if there are too few projects for it to provide actual value.

---

## FR-09 Skills

Skills must be rendered from structured data.

Example:

```js
{
  category: "Frontend",
  skills: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "Next.js",
    "Tailwind CSS"
  ]
}
```

---

## FR-10 Experience

Experience items must be rendered from structured data.

Each item should support:

* Position
* Organization / context
* Period
* Description
* Responsibilities

---

## FR-11 Contact

The contact section must provide:

* Email
* GitHub
* LinkedIn
* CV

The email link should use:

```text
mailto:
```

---

# 6. UI Requirements

## UI-01 Navbar

Navbar requirements:

* Sticky positioning
* Responsive
* Clear active state
* Mobile menu
* Smooth transition

Desktop:

```text
Logo / Name     About Skills Projects Experience Contact
```

Mobile:

```text
Logo / Name                     Menu
```

---

# 7. Hero UI

Hero should use a strong visual hierarchy.

Recommended structure:

```text
Small introduction
        ↓
Name
        ↓
Role
        ↓
Short description
        ↓
CTA buttons
        ↓
Social links
```

Do not center every element by default.

Use an asymmetric or balanced editorial layout where appropriate.

---

# 8. Project Card UI

Each ProjectCard must contain:

```text
Project Image
Project Category
Project Title
Description
Technology badges

View Details
GitHub
Live Demo
```

Hover behavior:

* Slight elevation
* Image movement
* Subtle border/shadow transition
* CTA emphasis

Do not create excessive motion.

---

# 9. Project Detail UI

Project detail page should prioritize content.

Recommended layout:

```text
Back to Projects

Project Title
Category
Description

Project Preview

Overview
Problem
Solution

Features
Technology

Challenges
Solutions

Screenshots

Links
GitHub | Live Demo
```

The project detail page should look like a developer case study rather than a marketing landing page.

---

# 10. Animation Requirements

Use subtle animation.

Recommended animation types:

* Fade
* Slide
* Scale
* Hover translation
* Image reveal
* Navigation transition

Animation duration:

```text
150ms - 400ms
```

Do not animate large page elements continuously.

Avoid:

* Infinite floating objects
* Excessive parallax
* Cursor-following effects
* Particle systems
* Excessive blur animation

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 11. Responsive Requirements

Support at minimum:

```text
375px
390px
430px
768px
1024px
1280px
1440px
```

Requirements:

* No horizontal overflow
* No clipped content
* Navigation must remain usable
* Images must scale correctly
* Buttons must remain accessible
* Text must remain readable
* Cards must adapt to screen width

---

# 12. Accessibility Requirements

Implement:

* Semantic HTML
* Proper heading hierarchy
* Accessible buttons
* Keyboard navigation
* Focus indicators
* Alt text
* Sufficient color contrast
* ARIA labels where required

Do not use clickable `<div>` elements when a semantic button or link is appropriate.

---

# 13. SEO Requirements

Implement:

* Page title
* Meta description
* Open Graph metadata
* Favicon
* Semantic headings
* Descriptive URLs

Default title:

> M. Azmi Al Fadillah | Frontend & Web Developer

Default description:

> Portfolio of M. Azmi Al Fadillah, a frontend and web developer focused on React.js, JavaScript, Next.js, and modern web development.

---

# 14. Performance Requirements

The application should:

* Minimize unnecessary dependencies
* Optimize images
* Lazy-load large images where appropriate
* Avoid unnecessary re-renders
* Use reusable components
* Avoid unnecessary JavaScript
* Avoid excessive animation libraries

Do not install packages unless they solve a real requirement.

---

# 15. Code Quality Requirements

The implementation must:

* Use reusable React components
* Avoid duplicated UI code
* Keep data separate from components
* Use meaningful component names
* Use meaningful variable names
* Avoid unnecessarily complex components
* Avoid excessive prop drilling
* Keep components reasonably small
* Maintain a clean folder structure

Avoid creating a component for every tiny `<div>`.

---

# 16. Error Handling

External links and dynamic content must fail gracefully.

If a project does not have:

* GitHub
* Live Demo
* Screenshots

the UI should hide that element rather than displaying broken buttons.

Images should have fallback behavior.

---

# 17. Security Requirements

Do not expose:

* API keys
* Private credentials
* Authentication secrets
* Private tokens

All external links must be handled safely.

Do not place sensitive information in frontend source code.

---

# 18. Browser Compatibility

The website should work correctly on modern:

* Chrome
* Edge
* Firefox
* Safari

---

# 19. Deployment

The project must be deployable to:

> Vercel

The application must work correctly after production build.

Required verification:

```bash
npm run build
```

No build errors should remain before deployment.

---

# 20. Testing Checklist

Before completion, verify:

### Functional

* [ ] Navbar works
* [ ] Mobile menu works
* [ ] Smooth scrolling works
* [ ] Project cards work
* [ ] Project details work
* [ ] GitHub links work
* [ ] Live demo links work
* [ ] CV download works
* [ ] Email link works
* [ ] LinkedIn works

### Responsive

* [ ] 375px
* [ ] 390px
* [ ] 430px
* [ ] 768px
* [ ] 1024px
* [ ] 1280px
* [ ] 1440px

### Accessibility

* [ ] Keyboard navigation
* [ ] Focus states
* [ ] Alt text
* [ ] Semantic HTML
* [ ] Contrast

### Performance

* [ ] Optimized images
* [ ] No unnecessary libraries
* [ ] No unnecessary animation
* [ ] No console errors

### Code

* [ ] Reusable components
* [ ] Structured project data
* [ ] No duplicated code
* [ ] No unused imports
* [ ] No broken routes

### Production

* [ ] npm run build succeeds
* [ ] Production preview works
* [ ] Vercel deployment works

---

# 21. Definition of Done

The implementation is complete when:

1. React application runs without errors.
2. All required sections are implemented.
3. Project data is separated from UI.
4. Projects are dynamically rendered.
5. Project detail pages work.
6. Responsive behavior works across required breakpoints.
7. Navigation works.
8. CV download works.
9. External links work.
10. Accessibility basics are implemented.
11. SEO metadata exists.
12. No unnecessary dependencies are installed.
13. No console errors remain.
14. Production build succeeds.
15. The final visual design feels intentional and human-designed.
16. The website does not resemble a generic AI-generated portfolio template.

---

# 22. Final Implementation Principle

The implementation should follow this hierarchy:

```text
Functionality
    ↓
Usability
    ↓
Content clarity
    ↓
Visual hierarchy
    ↓
Interaction
    ↓
Decoration
```

Do not sacrifice usability for visual effects.

Do not add features that are not supported by the requirements.

Do not fabricate information.

Build a portfolio that demonstrates the developer's actual ability to build a polished React application.
