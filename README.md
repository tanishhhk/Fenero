# Fenero - Capital Advisory Platform

![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Status](https://img.shields.io/badge/status-Production-green.svg)
![Node](https://img.shields.io/badge/node-v22.19.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-v18+-blue.svg)

**Fenero** is a comprehensive Capital Advisory LLP platform offering professional financial services including Debt Syndication, Debt Resolution, Investment Banking, and Virtual CFO services for businesses seeking financial optimization and growth.

## About Fenero

Fenero connects businesses with optimal banking solutions, specializing in:

- **Debt Syndication** - Facilitating debt arrangements from ₹1 crore to ₹50 crore
- **Debt Resolution** - Strategic solutions for financial restructuring
- **Investment Banking** - IPO management, strategy, and advisory
- **Virtual CFO Services** - Balance sheet optimization and financial planning
- **Banking Advisory** - Connecting clients with banks offering the best interest rates and terms

### Target Audience

Primary focus on firms and organizations seeking debt syndication between ₹5-50 crores, with capabilities to handle smaller transactions (₹1-5 crores) for growing businesses.

## Features

- **Intelligent Bank Matching** - Algorithm-based recommendations for optimal loan products
- **Multi-Service Dashboard** - Unified interface for all financial advisory services
- **Client Portal** - Secure registration and service request management
- **Automated Notifications** - Real-time email updates for registrations and inquiries
- **Financial Analysis Tools** - Balance sheet optimization and profitability escalation insights
- **IPO Strategy Module** - Comprehensive IPO planning and management advisory

## Tech Stack

### Frontend
- **React** (v18+) - Modern UI framework
- **Vite** - Lightning-fast build tool and dev server
- **JavaScript/JSX** - Component development
- **CSS3** - Custom styling and animations
- **React Router** - Client-side routing

### Infrastructure
- **Vercel** - Current deployment platform
- **AWS** - Planned production infrastructure
- **RESTful API** - Backend communication

## Prerequisites

Before running this project, ensure you have:

- **Node.js** v22.19.0 or higher
- **npm** or **yarn** package manager

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tanishhhk/fenero.git
cd fenero
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory (use `.env.example` as template):

```env
# API Configuration
VITE_API_URL=your-api-endpoint-here

# Add other configuration as needed
```

**Important:** Never commit your `.env` file. It contains sensitive configuration.

### 4. Start Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
fenero/
├── src/                       # Frontend React source
│   ├── components/           # Reusable UI components
│   │   ├── landing/         # Landing page components
│   │   └── services/        # Service-specific components
│   │       ├── AdminDashboard.jsx
│   │       ├── AuthPage.jsx
│   │       ├── Footer.jsx
│   │       ├── Navbar.jsx
│   │       └── SmoothScroll.jsx
│   ├── config/              # Configuration files
│   ├── pages/               # Page components
│   ├── styles/              # CSS/styling files
│   ├── assets/              # Images, fonts, icons
│   ├── App.jsx              # Root component
│   ├── App.css              # Global styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Base styles
├── public/                   # Static public assets
├── node_modules/            # Node dependencies (not in git)
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Node dependencies & scripts
├── package-lock.json       # Locked dependency versions
├── vite.config.js          # Vite bundler configuration
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## Deployment

### Current Deployment
- **Platform:** Vercel
- **URL:** https://fenero.vercel.app/

### Planned Production Deployment
- **Platform:** AWS / Alternative hosting
- **Domain:** To be configured post-domain purchase
- **Timeline:** Within 1 week

### Build Commands

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

## Security & Privacy

- All sensitive credentials are stored in environment variables
- Secure API communication with backend services
- Regular security audits and updates
- Industry-standard encryption for data transmission

**Note:** This codebase is for **display and portfolio purposes only**. It is not intended for direct usage or modification by third parties.

## License & Copyright

**Copyright © 2025 Fenero Capital Advisory LLP. All Rights Reserved.**

This project is **proprietary software**. The source code is made available for:
- Portfolio demonstration
- Technical evaluation
- Educational reference

### Restrictions:
- ❌ No commercial use
- ❌ No redistribution
- ❌ No modifications for deployment
- ❌ No contributions accepted

Unauthorized use, reproduction, or distribution of this code may result in legal action.

## Contact

**Fenero Capital Advisory LLP**

- **Website:** [Coming Soon - Post Domain Purchase]
- **Email:** fenerocapitaladvisory@gmail.com
- **Services:** Debt Syndication | Debt Resolution | Investment Banking | Virtual CFO
- **Location:** Noida, India

---

## Roadmap

- [x] Core platform development
- [x] User registration and notification system
- [x] Service request management
- [x] Responsive UI/UX design
- [ ] Custom domain integration
- [ ] AWS production deployment
- [ ] Enhanced analytics dashboard
- [ ] Client portal with document management
- [ ] Advanced loan matching algorithms
- [ ] Mobile application

## Notes for Developers

This repository represents a **production business application**. While the code is public for demonstration:

1. **Environment Setup:** Requires proper `.env` configuration with API endpoints
2. **Frontend Only:** This repository showcases the client-side application
3. **Backend Services:** Integrated with proprietary backend services (not included)
4. **Domain Migration:** Update all API endpoints post-domain purchase

## Acknowledgments

Built with modern web technologies to deliver professional financial advisory services. This platform represents the technical infrastructure of a registered Capital Advisory LLP.

---

**For business inquiries and services, please contact Fenero Capital Advisory LLP directly.**