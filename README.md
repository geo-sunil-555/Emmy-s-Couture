# Emmy's Couture

Bespoke luxury fashion e-commerce experience — a digital atelier built with React, Vite, GSAP-driven scroll storytelling, and Supabase.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?logo=greensock&logoColor=black)

## Overview

Emmy's Couture is a full-stack luxury fashion storefront designed to feel like walking into a couture atelier rather than browsing a typical online store. It combines cinematic scroll-based storytelling with a complete e-commerce flow — product discovery, cart, checkout, appointment booking, and a bespoke order builder — backed by Supabase for auth, data, and admin management.

## ✨ Features

- **Editorial entry experience** — gated welcome portal before entering the main site
- **Scroll-driven storytelling** — smooth scrolling (Lenis) synced with pinned, animated sections (GSAP + ScrollTrigger)
- **Horizontal collection gallery** and curated runway lookbook
- **Product catalog** with quick-view modals and detailed product cards
- **Cart & checkout flow** with a slide-out cart drawer
- **Appointment booking** for private consultations
- **Atelier Customizer** — bespoke/made-to-order product configuration
- **AI Stylist Chat** — in-site assistant for styling guidance
- **Authentication** — customer sign-up/login and a user inbox for order/appointment updates
- **Admin Portal** — protected dashboard for managing products, orders, and appointments
- **Toast notification system** for real-time UI feedback

## 🛠 Tech Stack

| Layer            | Technology                                   |
|-------------------|-----------------------------------------------|
| Frontend          | React 18, Vite                                |
| Animation         | GSAP + ScrollTrigger, Lenis (smooth scroll)   |
| Backend / Database| Supabase (PostgreSQL, Auth)                   |
| Icons             | Lucide React                                  |
| Extras            | Canvas Confetti                               |

## 📁 Project Structure

```
Emmy's couture/
├── src/
│   ├── components/       # UI components (Navbar, Hero, Cart, Admin, etc.)
│   ├── context/          # ShopContext — global cart/auth/UI state
│   ├── data/             # Static product, atelier & lookbook data
│   ├── lib/               # Supabase client setup
│   ├── App.jsx
│   └── main.jsx
├── public/                # Static assets & images
├── supabase_schema.sql    # Database schema
├── vite.config.js
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A [Supabase](https://supabase.com) project

### Installation

```bash
# Clone the repo
git clone https://github.com/<your-username>/emmys-couture.git
cd emmys-couture

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and add your Supabase credentials:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

### Database Setup

Run `supabase_schema.sql` in your Supabase project's SQL editor to set up the required tables.

### Run Locally

```bash
npm run dev
```

The app runs at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

## 📸 Screenshots

_Add screenshots or a demo GIF here._

## 📄 License

This project is private/unlicensed unless otherwise specified by the author.

## 🙋 Author

Built by [Your Name] — feel free to reach out or connect!
