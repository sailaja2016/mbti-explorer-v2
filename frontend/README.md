# MBTI Explorer Frontend

Modern React + Vite frontend for personality testing with beautiful UI and responsive design.

## Tech Stack
- React 18
- Vite 4
- React Router DOM 6
- Axios
- CSS3 with modern features

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:3000`

Note: Backend API must be running on `http://localhost:5000` for full functionality.

## Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder.

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx         # Homepage
│   │   ├── Quiz.jsx         # MBTI 60-question test
│   │   ├── Results.jsx      # Personality results
│   │   ├── AllTypes.jsx     # All 16 types grid
│   │   └── TypeDetail.jsx   # Individual type page
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── ChatBot.jsx      # Mello chatbot
│   ├── styles/
│   │   ├── Home.css
│   │   ├── Quiz.css
│   │   ├── Results.css
│   │   ├── AllTypes.css
│   │   ├── TypeDetail.css
│   │   ├── Navbar.css
│   │   └── ChatBot.css
│   ├── App.jsx              # Main app with routing
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Features

- 📝 60-question MBTI test with Likert scale
- 🎯 Real-time personality prediction
- 📊 Beautiful results with trait bars
- 🤖 Mello chatbot for Q&A
- 🎨 Responsive design (mobile, tablet, desktop)
- ⚡ Fast with Vite bundling
- 🔀 Full routing with React Router

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Configure:
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment: Set backend API URL

### GitHub Pages

Not recommended due to SPA routing limitations. Use Vercel or Netlify instead.

## API Integration

Frontend proxies `/api` calls to Flask backend. Ensure Flask runs on port 5000, or update `vite.config.js`:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

## Environment Variables

Create `.env` (optional):
```
VITE_API_URL=https://your-backend-api.com
```

## Performance

- Lazy loading for pages (React Router)
- CSS optimization
- Minimal dependencies
- Vite's fast development server

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Android Chrome 90+)
