# Portfolio Website

A modern, interactive portfolio website built with React, Vite, and Tailwind CSS featuring a unique "liquid glass" aesthetic, dynamic animations, and smooth user experience.

🌐 **Live Site**: [https://vishal9-9.github.io](https://vishal9-9.github.io)

## Features

- 🎨 **Glassmorphism Design** - Modern liquid glass aesthetic with dynamic blur effects
- ✨ **Smooth Animations** - Framer Motion powered transitions and interactions
- 🎵 **Interactive Elements** - Lofi music player, sound effects, and 3D tilt effects
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🚀 **Performance Optimized** - Built with Vite for lightning-fast loading
- 🎯 **Project Showcases** - Interactive project cards with browser/mobile frame mockups

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vishal9-9/vishal9-9.github.io.git
cd vishal9-9.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the site locally.

### Building for Production

```bash
# Build the project
npm run build
```

The optimized production files will be in the `/docs` folder.

## Deployment

This site is deployed on GitHub Pages from the `main` branch using the `/docs` folder.

**To deploy updates:**

```bash
npm run build
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages will automatically redeploy from the `/docs` folder.

## Project Structure

```
portfolio-site/
├── src/
│   ├── components/     # React components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── data/           # Portfolio data (resume.json)
│   └── App.jsx         # Main app component
├── docs/               # Production build (deployed to GitHub Pages)
├── public/             # Static assets
└── vite.config.js      # Vite configuration
```

## License

All rights reserved. This portfolio is for personal use only.

---

Built with ❤️ by Vishal
