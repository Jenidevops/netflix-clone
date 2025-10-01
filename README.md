Netflix Clone 🎬

A fully responsive Netflix clone built with React, Vite, and Tailwind CSS. This project recreates the look, feel, and core functionality of Netflix’s UI while serving as a hands-on practice in modern frontend development.

✨ Features

🎨 Pixel-Perfect UI – Faithfully replicates Netflix’s clean design and layout.

📱 Fully Responsive – Works seamlessly across desktop, tablet, and mobile devices.

🔐 Mock Authentication – Includes sign-up and sign-in pages with form validation.

🎞️ Dynamic Movie Rows – Horizontal scrolling carousels with posters and hover effects.

🖼️ Hero Banner – Featured content with gradient overlay and action buttons.

🧩 Reusable Components – Built with modular, scalable React components.

⚡ Fast Development – Powered by Vite for blazing-fast dev server and builds.

🎨 Tailwind CSS – Utility-first styling for clean, consistent UI.

🛠️ Tech Stack

React 18

Vite

Tailwind CSS

React Router DOM

🚀 Getting Started
Prerequisites

Node.js (v18 or later)

npm or yarn

📁 Project Structure:
netflix-clone/
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Hero.jsx        # Hero banner section
│   │   ├── ContentRow.jsx  # Horizontal scrolling row
│   │   ├── MovieCard.jsx   # Individual movie/show card
│   │   ├── Modal.jsx       # Content detail modal
│   │   └── Footer.jsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── GetStarted.jsx  # Landing page
│   │   ├── SignUp.jsx      # Sign up flow (3 steps)
│   │   └── Browse.jsx      # Main browse page
│   ├── data/
│   │   └── mockData.js     # Mock content data
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
🎯 Key Features:
Pages:

GetStarted Page (/) - Landing page with:

Hero section with email input
Feature sections (TV, Download, Watch Everywhere, Kids)
FAQ accordion
Call-to-action sections


SignUp Page (/signup) - 3-step registration:

Step 1: Choose plan benefits
Step 2: Email & password
Step 3: Select subscription plan


Browse Page (/browse) - Main content page:

Hero banner with featured content
Multiple content rows by category
Interactive movie cards
Detail modal


Components:

Navbar: Adaptive navbar (simple for landing, full for browse)
Hero: Large banner with play/info buttons
ContentRow: Horizontal scrolling with arrows
MovieCard: Hover effects, quick actions
Modal: Detailed view with cast/genre info
Footer: Links and social media

Features:

✅ React Router for navigation
✅ Protected routes (browse requires auth)
✅ State management with useState
✅ My List functionality
✅ Responsive design
✅ Smooth animations
✅ Netflix-authentic UI


📸 Screenshots

(Add screenshots of your clone here — homepage, sign-in page, responsive views)

📝 Notes

This project is for educational/demo purposes only. It uses mock data and placeholder images. No copyrighted Netflix assets are included.

🌟 Future Improvements

Integrate a real backend (Firebase/Node.js) for authentication and database.

Add trailer playback and personalized user lists.

Implement dark/light theme toggles.
