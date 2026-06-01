# SAC Website Complete Redesign — Design Document

## 1. Purpose
This document defines the complete redesign of the SAC IISER Kolkata website into a **zero-build, data-driven** platform using plain HTML, CSS, and JavaScript so that non-developer contributors can maintain content easily.

## 2. Goals
- Remove dependency on advanced frontend tooling for day-to-day content updates
- Keep all dynamic content in JSON files editable through GitHub
- Support scalable growth across SAC bodies, clubs, office bearers, and events
- Ensure accessibility, responsiveness, and good performance by default

## 3. Content Being Collected
1. SAC office bearers (name, designation, bio, contact, photo)
2. Per-club general info (description, manifesto, facilities, logo, photos)
3. Per-club people (members, roles, bios, photos, contact)
4. Per-club events and activities (past + upcoming)
5. Additional custom club content

### Current collection snapshot
- **Submitted**: Singularity, GYM, Kabaddi, Rubik, Athletics
- **Pending**: SAC Academics GS, many SAC Sports clubs, SAC Cultural, SAC Food & Hygiene, SAC Hostel

## 4. Information Architecture

### 4.1 Home page
- SAC overview and key highlights
- Embedded public Google Calendar (iframe)
- Featured events section fetched from JSON (GitHub Raw URL)
- SAC bodies + DOSA overview cards
- Placeholder section for SAC articles/resources
- Newsletter/contact CTA

### 4.2 Clubs
- Club directory page with search/filter
- Individual club page templates rendered from JSON
- Club details, office bearers, members, social links, gallery, upcoming events

### 4.3 SAC Bodies
- SAC bodies overview page
- Body-specific pages for description, OBs, clubs under body, updates/events

### 4.4 Positions & Leadership
- Organization-wide directory of all office bearers
- Filtering/search by body, club, role
- Optional organization structure visualization block

### 4.5 Supporting pages
- About SAC
- Events (calendar-focused)
- Articles/resources
- Contact/connect

## 5. Technical Architecture
- **Frontend**: Vanilla HTML + CSS + JS only
- **Data source**: JSON files in repository
- **Live updates**: Fetch JSON through GitHub Raw URLs
- **Caching**: localStorage with schema version + fallback if network fails
- **No framework/router dependency**

## 6. Proposed Repository Structure

```text
SAC_website/
├── index.html
├── pages/
│   ├── clubs/
│   │   ├── index.html
│   │   └── [club-id].html
│   ├── positions/
│   │   ├── index.html
│   │   └── [body-id].html
│   ├── sac-bodies/
│   │   ├── index.html
│   │   └── [body-id].html
│   ├── about.html
│   ├── events.html
│   ├── articles.html
│   └── contact.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── responsive.css
│   └── print.css
├── js/
│   ├── app.js
│   ├── router.js
│   ├── fetcher.js
│   ├── club-renderer.js
│   ├── position-renderer.js
│   ├── event-renderer.js
│   ├── body-renderer.js
│   ├── search.js
│   ├── theme.js
│   ├── navbar.js
│   └── utils.js
├── data/
│   ├── clubs.json
│   ├── positions.json
│   ├── events.json
│   ├── sac-bodies.json
│   ├── articles.json
│   └── config.json
├── assets/
│   ├── logos/
│   ├── photos/
│   │   ├── office-bearers/
│   │   ├── club-photos/
│   │   └── sac-body-photos/
│   ├── icons/
│   └── images/
├── lib/
├── README.md
├── DESIGN_DOC.md
└── DATA_SCHEMA.md
```

## 7. Core Features
1. Smart fetch + cache + fallback
2. Dynamic rendering for clubs, positions, SAC bodies
3. Search/filter for clubs and people
4. Google Calendar embed + featured events feed
5. Dark/light mode toggle
6. Mobile-first and touch-friendly layout

## 8. Accessibility & SEO Baseline
- Semantic structure (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Keyboard navigation and visible focus states
- ARIA labels only where semantic HTML is not sufficient
- Alt text for all meaningful images
- Proper heading hierarchy and metadata (title, description, Open Graph)

## 9. Performance Baseline
- No heavy JS libraries for core rendering
- Native image lazy loading (`loading="lazy"`)
- Optimized images (logos <=100KB, photos <=300KB target)
- Keep JS modules focused and split by page concern

## 10. Implementation Phases

### Phase 1 — Foundation
- Create static page templates
- Create CSS token/layout system
- Create shared JS utilities and fetch module
- Create initial JSON files + schema references

### Phase 2 — Core Pages
- Home page with calendar + featured events
- Club directory + club detail template
- Leadership/positions pages
- SAC body overview + detail templates

### Phase 3 — Feature Completion
- Search/filter experience
- Articles/resources placeholder feed
- Upcoming events highlights
- Contact/newsletter section

### Phase 4 — Polish & QA
- Dark/light theming
- Responsive refinements
- Accessibility audit and fixes
- SEO and metadata checks

## 11. Content Operations Guidelines
- Add club logos to `assets/logos/[club-id].svg|png`
- Add OB images to `assets/photos/office-bearers/[first]-[last].jpg`
- Add club event galleries to `assets/photos/club-photos/[club-id]/`
- Update only JSON for routine content changes

## 12. Success Criteria
- No build tool needed for content updates
- Non-developers can update JSON and publish changes
- Fully responsive and accessible (WCAG AA target)
- Fast loading pages and maintainable structure
- New clubs/people/events can be added with minimal engineering support
