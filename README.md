# Netflix Clone 🎬

A fully responsive Netflix clone built with React, Vite, and Tailwind CSS. This project recreates the **complete Netflix experience** including subscription plans, payment processing, and content browsing - exactly like the real Netflix!

## ✨ Features

### 🎨 **Complete Netflix Experience**
- Pixel-perfect UI that faithfully replicates Netflix's design and layout
- Full subscription flow with plan selection and mock payment processing
- Authentication system with protected routes and session management
- Subscription management with cancel/reactivate functionality

### 📱 **Fully Responsive Design**
- Works seamlessly across desktop, tablet, and mobile devices
- Mobile-optimized subscription plans and payment forms
- Responsive navigation and content grids

### 💳 **Subscription & Payment System**
- **3 Subscription Tiers**: Basic ($6.99), Standard ($15.49), Premium ($22.99)
- **Multiple Payment Methods**: Credit Card, PayPal, Gift Card
- **Instant Activation**: No complex forms - just select and activate
- **Subscription Management**: View, modify, and cancel subscriptions

### 🎞️ **Content Browsing**
- Dynamic movie rows with horizontal scrolling carousels
- Hero banner with featured content and action buttons
- Interactive movie cards with hover effects and quick actions
- Content detail modals with cast/genre information

### 🔐 **Authentication & Security**
- Complete sign-up and sign-in flow with form validation
- Protected routes (browse page requires active subscription)
- Persistent authentication across browser sessions
- Secure logout with session cleanup

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing and navigation
- **Lucide React** - Beautiful icons and UI elements
- **Context API** - State management for subscription data

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jenidevops/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start with the landing page and explore the full subscription flow!

### 🌐 Live Demo
Visit the live demo: [Netflix Clone Demo](https://jenidevops.github.io/netflix-clone/)

## 📁 Project Structure
```
netflix-clone/
├── src/
│   ├── components/              # Reusable components
│   │   ├── Navbar.jsx           # Navigation with user dropdown
│   │   ├── Hero.jsx             # Hero banner section
│   │   ├── ContentRow.jsx       # Horizontal scrolling content
│   │   ├── MovieCard.jsx        # Individual movie/show cards
│   │   ├── Modal.jsx            # Content detail modal
│   │   ├── Footer.jsx           # Footer component
│   │   ├── ProtectedRoute.jsx   # Route protection component
│   │   └── SubscriptionManager.jsx # Subscription management UI
│   ├── pages/                   # Page components
│   │   ├── GetStarted.jsx       # Landing/welcome page
│   │   ├── SignUp.jsx           # User registration
│   │   ├── SubscriptionPlans.jsx # Plan selection page
│   │   ├── PaymentMethod.jsx    # Payment method selection
│   │   ├── PaymentConfirmation.jsx # Success confirmation
│   │   └── Browse.jsx           # Main content browsing
│   ├── context/                 # State management
│   │   └── SubscriptionContext.jsx # Subscription state
│   ├── data/
│   │   └── mockData.js          # Mock content data
│   ├── images/                  # Static assets
│   ├── App.jsx                  # Main app with routing
│   └── main.jsx                 # Application entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
## 🎯 How to Use

### 🚪 **Complete User Journey**

1. **Landing Page** (`/`) 
   - Welcome page with Netflix branding
   - Email capture and call-to-action

2. **Sign Up** (`/signup`)
   - Enter email and create password
   - Automatic redirect to subscription plans

3. **Choose Your Plan** (`/subscription-plans`)
   - Compare Basic, Standard, and Premium plans
   - Mobile-friendly cards and desktop comparison table
   - Select plan and continue to payment

4. **Payment Method** (`/payment-method`)
   - Choose from Credit Card, PayPal, or Gift Card
   - Click "Activate Membership" for instant access

5. **Welcome & Confirmation** (`/payment-confirmation`)
   - Subscription activated successfully
   - Auto-redirect to main browsing experience

6. **Browse Content** (`/browse`)
   - Full Netflix-style interface
   - Multiple content categories
   - Movie/show details and trailers
   - Subscription management in user menu

### 🎮 **Interactive Features**

- **My List**: Add/remove content from personal watchlist
- **Content Details**: Click any movie for detailed modal
- **Subscription Management**: Access via profile dropdown
- **Responsive Navigation**: Adapts to different screen sizes
- **Search & Categories**: Browse by genre and trending content

## ✅ **What's Included**

### Pages & Routes
- ✅ Landing page with email capture
- ✅ Sign-up flow with validation
- ✅ Subscription plan comparison (3 tiers)
- ✅ Payment method selection
- ✅ Confirmation & welcome page
- ✅ Protected main browsing interface
- ✅ Subscription management modal

### Components & Features
- ✅ Netflix-authentic design system
- ✅ Responsive layout (mobile/desktop)
- ✅ Protected route authentication
- ✅ Persistent session management
- ✅ Context-based state management
- ✅ Form validation and error handling
- ✅ Loading states and transitions
- ✅ Mock payment processing


## 🎨 **Demo Screenshots**

### Subscription Flow
- **Plan Selection**: Netflix-style plan comparison with features
- **Payment Methods**: Credit card, PayPal, and gift card options  
- **Confirmation**: Welcome page with subscription details

### Content Browsing
- **Hero Section**: Featured content with play/info buttons
- **Content Rows**: Horizontal scrolling by category
- **Movie Details**: Rich modal with cast and genre information
- **Subscription Management**: Full account management interface

## 📝 **Notes**

- **Demo Purpose**: This project is for educational/portfolio demonstration only
- **Mock Data**: Uses placeholder content and images (no copyrighted Netflix assets)
- **Instant Access**: Payment forms are simplified for demo - just select method to activate
- **Persistent State**: Subscription and authentication data saved in localStorage
- **No Real Payments**: All payment processing is completely mocked

## 🌟 **Future Enhancements**

- 🔗 **Real Backend Integration**: Firebase/Node.js for authentication and database
- 📺 **Video Playback**: Integrate actual video streaming capabilities  
- 🎯 **Personalization**: AI-powered content recommendations
- 🌙 **Theme Support**: Dark/light mode toggle
- 📱 **Mobile App**: React Native version
- 🔄 **Real-time Updates**: WebSocket for live content updates
- 💸 **Payment Integration**: Stripe/PayPal for actual payments
- 🌍 **Multi-language**: Internationalization support

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- Netflix for the UI/UX inspiration
- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Vite for the lightning-fast development experience

---

**⭐ If you found this project helpful, please give it a star!** ⭐
