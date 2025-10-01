Netflix Clone 🎬

A fully responsive Netflix UI clone built with React, Vite, and Tailwind CSS.
This project demonstrates expertise in modern frontend development, component-based architecture, responsive design, and reusable, scalable React components. It replicates Netflix’s interface and core functionality while showcasing clean code, modular design, and smooth user experience.

🚀 Features

Pixel-Perfect UI: Faithful recreation of Netflix’s clean, modern design

Fully Responsive: Optimized for desktop, tablet, and mobile devices

Mock Authentication: Multi-step sign-up and sign-in flows with form validation

Dynamic Content Rows: Horizontal scrolling carousels with hover effects

Hero Banner: Featured content with gradient overlays and interactive action buttons

Reusable Components: Modular, scalable React components for maintainable code

Fast Development: Powered by Vite for lightning-fast development and builds

Tailwind CSS: Utility-first styling ensures consistency and rapid UI iteration

🛠️ Technology Stack

Frontend: React 18, Vite

Styling: Tailwind CSS, PostCSS

Routing: React Router DOM

State Management: React useState

Build Tools: Vite, PostCSS

📁 Project Structure
netflix-clone/
├── src/
│   ├── components/      # Reusable, modular components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ContentRow.jsx
│   │   ├── MovieCard.jsx
│   │   ├── Modal.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page-level components
│   │   ├── GetStarted.jsx
│   │   ├── SignUp.jsx
│   │   └── Browse.jsx
│   ├── data/
│   │   └── mockData.js  # Mock content
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js

📌 Pages & Features
GetStarted (/)

Hero section with email input and CTA

Feature highlights: TV, Download, Watch Everywhere, Kids

FAQ accordion & promotional sections

SignUp (/signup)

3-step registration:

Choose plan benefits

Enter email & password

Select subscription plan

Browse (/browse)

Hero banner with featured content

Multiple horizontal content rows

Interactive movie cards with hover effects

Detail modal with cast, genre, and description

🔧 Components

Navbar: Adaptive for landing and browse pages

Hero: Large banner with interactive buttons

ContentRow: Scrollable content rows with navigation arrows

MovieCard: Hover effects, quick actions, and dynamic styling

Modal: Detailed content view

Footer: Links, social media, and site info

✅ Key Highlights

Protected routes (browse requires authentication)

“My List” functionality

Smooth animations & transitions

Netflix-authentic UI/UX

Fully modular, maintainable code

📝 Notes

Educational/demo project using mock data and placeholder images

No copyrighted Netflix assets are included

🌟 Future Enhancements

Integrate real backend (Firebase / Node.js) for authentication & database

Add trailer playback & personalized user lists

Implement dark/light mode toggle

📦 Setup

Prerequisites: Node.js v18+ & npm/yarn
