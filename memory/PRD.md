# PyrunAi Website Redesign - PRD

## Original Problem Statement
Recreate pyrunai.com with better UI/UX, modernized design, improved navigation, responsive layout, clear CTAs, and brand consistency using existing logo color palette. Hero slider matching original site's 3-slide design. Calendar-based consultation booking. Project showcases on service pages.

## User Personas
- Enterprise CTOs/Decision Makers, Startup Founders, Business Owners needing AI/data/web solutions

## Core Requirements
- Hybrid page structure (landing page + separate detail pages)
- Light & clean theme with navy (#1A365B) and green (#70E252) brand accents
- SendGrid email integration (info@pyrunai.com)
- Case Studies section, Calendar booking, Project galleries

## Architecture
- **Frontend**: React 19 + Tailwind CSS + Framer Motion + Lucide React
- **Backend**: FastAPI + MongoDB + SendGrid
- **Fonts**: Outfit (headings), Inter (body), JetBrains Mono (accents)

## What's Been Implemented

### Iteration 1 - Core Pages
- [x] 5-page website (Home, Services, Case Studies, About, Contact)
- [x] Floating glassmorphism navbar, navy footer, FAQ accordion, SendGrid integration

### Iteration 2 - Enhanced UI/UX
- [x] Animated counters, tech ticker, bento service cards, Featured Work gallery
- [x] Services: video modal + 3 projects per service with images/metrics/links
- [x] Calendar booking: 2-step flow, 30-min slots, animated success state
- [x] Dark hero sections on all sub-pages

### Iteration 3 - Hero Slider (matching original pyrunai.com)
- [x] 3 full-bleed dark hero slides: Power BI, Web Dev, AI/ML
- [x] Each slide: background image + dark overlay + green tag + white heading + gray description + 2 CTAs
- [x] Prev/next navigation arrows, clickable slide indicators (green active pill)
- [x] Auto-rotation every 6 seconds with smooth crossfade
- [x] Text re-animates on each slide change (fade + slide up)
- [x] Mobile responsive with readable text at 375px

## Testing Results (Iteration 3)
- Backend: 100% | Frontend: 100% | Hero Slider: 100% | Calendar Booking: 100% | Mobile: 100%

## Prioritized Backlog
### P1 - Add SendGrid API key, replace placeholder images with actual portfolio, add real YouTube videos
### P2 - SEO meta tags, Blog/Resources page, Client logos carousel, 404 page
### P3 - Live chat, Careers page, Cookie consent, Google Analytics
