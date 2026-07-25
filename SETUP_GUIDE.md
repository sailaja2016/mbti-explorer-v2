# MBTI Explorer - Complete Setup Guide

Follow these steps to get MBTI Explorer running locally and deploy to production.

## Phase 1: Local Development Setup

### 1.1 Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 1.2 ML Model Training

```bash
# Navigate to ml_training
cd ml_training

# Download MBTI dataset from Kaggle
# https://www.kaggle.com/datasets/zeyadkhalid/mbti-personality-types-500-dataset
# Save as: mbti_dataset.csv in this directory

# Open Jupyter notebook
jupyter notebook MBTI_Model_Training.ipynb

# Run all cells to train and save models
# This creates: ../backend/models/*.pkl files
```

**Models created:**
- `model_mind.pkl`
- `model_energy.pkl`
- `model_nature.pkl`
- `model_tactics.pkl`
- `scaler.pkl`

### 1.3 Start Backend

```bash
cd backend
python app.py

# You should see:
# * Running on http://localhost:5000
```

### 1.4 Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# You should see:
# ➜  Local:   http://localhost:3000/
```

### 1.5 Test Locally

1. Open http://localhost:3000
2. Click "Start MBTI Test"
3. Answer 60 questions
4. View your personality results!

---

## Phase 2: Deployment

### Option A: Deploy to Vercel (Frontend) + Render (Backend)

#### Backend Deployment (Render)

1. **Create Render account** at https://render.com

2. **Prepare backend**
   ```bash
   # Ensure requirements.txt is updated
   pip freeze > requirements.txt
   ```

3. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Create Render Service**
   - Go to https://dashboard.render.com
   - Click "Create +"
   - Select "Web Service"
   - Connect GitHub repo
   - Configure:
     - **Name:** mbti-explorer-api
     - **Environment:** Python
     - **Build Command:** `pip install -r requirements.txt`
     - **Start Command:** `gunicorn app:app`
     - **Python Version:** 3.9 or higher

5. **Note Backend URL** (e.g., https://mbti-explorer-api.onrender.com)

#### Frontend Deployment (Vercel)

1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Option 1: Drag-drop to Vercel**
   - Go to https://vercel.com
   - Drag `dist/` folder
   - Set environment variable:
     ```
     VITE_API_URL=https://your-backend-url.com
     ```

3. **Option 2: GitHub Integration**
   - Push code to GitHub
   - Connect repo to Vercel
   - Set build settings:
     - **Framework:** Vite
     - **Build Command:** `cd frontend && npm run build`
     - **Output Directory:** `frontend/dist`
   - Add environment variables:
     - `VITE_API_URL=https://your-backend-url.com`

4. **Note Frontend URL** (e.g., https://mbti-explorer.vercel.app)

#### Update CORS (Backend)

Update `backend/app.py`:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-vercel-url.vercel.app"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})
```

Redeploy backend.

---

### Option B: Deploy to Railway (Both Frontend + Backend)

1. **Create Railway account** at https://railway.app

2. **Connect GitHub**
   - Create monorepo structure (optional)
   - Connect to Railway

3. **Configure Backend Service**
   - Service type: Python
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`

4. **Configure Frontend Service**
   - Service type: Node
   - Build command: `cd frontend && npm run build`
   - Start command: `npm run start` (install serve first)

5. **Configure environment variables** for both services

---

## Phase 3: Testing Deployment

### Test Backend
```bash
curl https://your-backend-url.com/api/health
# Should return: {"status": "healthy", "models_loaded": true}
```

### Test Frontend
1. Visit https://your-frontend-url.com
2. Take the MBTI test
3. Verify results display correctly

---

## Phase 4: Important Configuration

### Update Backend URL in Frontend

If using Vercel environment variables:

In `frontend/src/main.jsx` or API service:
```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_URL
})
```

### Update vercel.json

```json
{
  "env": {
    "VITE_API_URL": "@api-url"
  }
}
```

### Update vite.config.js for Production

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

---

## Troubleshooting

### Backend Issues

**Models not loading:**
- Ensure ML training notebook was run
- Check `backend/models/` directory exists
- Verify all 5 .pkl files are present

**Port 5000 already in use:**
```bash
# Kill process
lsof -ti:5000 | xargs kill -9

# Or use different port
python app.py --port 5001
```

### Frontend Issues

**CORS errors:**
- Check backend CORS configuration
- Verify backend URL in frontend config
- Ensure backend is running

**API calls failing:**
- Check network tab in DevTools
- Verify backend is deployed
- Check environment variables

### Deployment Issues

**Build fails on Vercel:**
- Ensure `frontend/package.json` exists
- Check build logs
- Verify all dependencies listed

**Render app crashes:**
- Check logs in Render dashboard
- Verify gunicorn is installed
- Check Python version compatibility

---

## Performance Optimization

### Frontend
- Build is already optimized with Vite
- Lazy load components if needed
- Images are handled via CSS (no extra optimization needed)

### Backend
- Models load once on startup
- Predictions are fast (<100ms)
- Use gunicorn with workers for production

---

## Security Checklist

- [ ] Update CORS to only allow your domain
- [ ] Use environment variables for API URLs
- [ ] Never commit .env files
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Validate input on backend
- [ ] Rate limit API endpoints (future enhancement)

---

## Next Steps (Optional Enhancements)

1. Add database to save user results
2. Implement user authentication
3. Add LinkedIn integration
4. Create admin dashboard
5. Add more personality tests
6. Implement caching for personality data
7. Add analytics

---

## Support Commands

```bash
# Check backend health
curl http://localhost:5000/api/health

# Test prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"answers": [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]}'

# Check frontend build size
cd frontend && npm run build && du -sh dist/
```

---

**You're all set! 🚀**

For detailed documentation, see:
- `backend/README.md` - API documentation
- `frontend/README.md` - React setup
- `ml_training/README.md` - ML model details
