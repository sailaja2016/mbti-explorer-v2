# 🧠 MBTI Explorer

A full-stack personality assessment web application that helps users discover their MBTI personality type, explore career compatibility, and understand their personality through the Enneagram system.

**Live Demo**: Coming soon 
**GitHub**: [sailaja2016/mbti-explorer-v2](https://github.com/sailaja2016/mbti-explorer-v2)

---

## ✨ Features

### 🎯 MBTI Personality Test
- **60-question assessment** based on Myers-Briggs Type Indicator
- Intelligent heuristic scoring system
- Instant results with detailed personality profiles
- Learn about all 16 personality types
- Understand MBTI dimensions: Mind (I/E), Energy (S/N), Nature (T/F), Tactics (J/P)

### 💼 Career Competency Test  
- **30-question assessment** to discover ideal careers
- 5 career profiles: Analyst, Creator, People Person, Strategist, Technician
- Personalized career recommendations
- Ideal work environment insights
- Skills to highlight for each profile

### 🔮 Enneagram Personality System
- **30-question assessment** exploring 9 Enneagram types
- Deep personality insights for each type
- Strengths, growth areas, and development tips
- Relationship compatibility analysis
- Career guidance by type

### 🤖 Mello - Personality Assistant Chatbot
- **2,000+ Q&A pairs** covering MBTI, careers, relationships, and growth
- Smart keyword matching for instant answers
- Personalized guidance based on your type
- No API costs - runs completely offline
- Answers questions about:
  - Understanding MBTI
  - All 16 personality type descriptions
  - Career fit and work environments
  - Relationship compatibility
  - Population statistics and rare types
  - Type complications and growth areas

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite 4** - Fast build tool
- **React Router 6** - Navigation
- **CSS3** - Styling (no external UI libraries)

### Backend
- **Flask** - REST API server
- **Flask-CORS** - Cross-origin requests
- **Python 3.8+** - Backend language

### Deployment
- **Vercel** - Frontend hosting(soon)
- **Render** - Backend hosting(soon)

---

## 📁 Project Structure
```
mbti-explorer-v2/
├── frontend/ # React + Vite frontend
│ ├── public/
│ │ ├── personality_content.json # 16 type detailed info
│ │ ├── career_content.json # Career profiles
│ │ ├── enneagram_content.json # Enneagram types
│ │ ├── mello_knowledge_base.json # Chatbot Q&A (2000+ pairs)
│ │ ├── images/ # Type images
│ │ └── *.jpg # Background images
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Home.jsx # Homepage
│ │ │ ├── Quiz.jsx # MBTI test (60Q)
│ │ │ ├── Results.jsx # MBTI results
│ │ │ ├── Career.jsx # Career test (30Q)
│ │ │ ├── CareerResults.jsx # Career results
│ │ │ ├── Enneagram.jsx # Enneagram test (30Q)
│ │ │ ├── EnneagramResults.jsx # Enneagram results
│ │ │ ├── AllTypes.jsx # All 16 types
│ │ │ ├── TypeDetail.jsx # Individual type details
│ │ │ ├── About.jsx # About page
│ │ ├── components/
│ │ │ ├── Navbar.jsx # Navigation
│ │ │ ├── ChatBot.jsx # Mello chatbot
│ │ ├── styles/ # CSS for each component
│ │ ├── App.jsx # Main app with routes
│ │ └── main.jsx # Entry point
│ ├── package.json
│ └── vite.config.js
│
├── backend/ # Flask REST API
│ ├── app.py # Main Flask app
│ ├── personality_data.json # Type descriptions
│ ├── questions_mbti.json # 60 MBTI questions
│ ├── requirements.txt # Python dependencies
│ └── models/ # Trained ML models (optional)
│
├── ml_training/ # ML model training
│ └── train_models.py # Model training script
│
└── README.md # This file
```
---

## 🚀 Quick Start
### Prerequisites
- Node.js 16+
- Python 3.8+
- Git

### Installation
**1. Clone the repository:**
```bash
git clone https://github.com/sailaja2016/mbti-explorer-v2.git
cd mbti-explorer-v2
```

**2. Setup Frontend:**
```bash
cd frontend
npm install
```

**3. Setup Backend:**
```bash
cd ../backend
pip install -r requirements.txt
```

### Running Locally
**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

Open `http://localhost:3000` in your browser!

---

## 📊 API Endpoints

| Method |         Endpoint          |        Description           |
|--------|---------------------------|------------------------------|
| GET    | `/api/health`             | Health check                 |
| GET    | `/api/questions`          | Get 60 MBTI questions        |
| POST   | `/api/predict`            | Get MBTI type from answers   |
| GET    | `/api/all-types`          | Get all 16 personality types |
| GET    | `/api/personality/<type>` | Get details for one type     |
| POST   | `/api/chatbot`            | Chat with Mello              |

---

## 🎯 How It Works

### MBTI Test
1. **Questions**: 60 carefully chosen questions across 4 dimensions
2. **Scoring**: Heuristic-based scoring system
   - Questions grouped into 4 dimensions (15 each)
   - Averages calculated for each dimension
   - Results compared to neutral point (3)
3. **Results**: 4-letter type (e.g., INFJ) with percentages and detailed profile

### Career Test
1. **30 Questions** on work preferences, skills, and environment
2. **5 Career Profiles**: Analyst, Creator, People Person, Strategist, Technician
3. **Personalized Recommendations**: Ideal careers, skills, work environment

### Enneagram Test
1. **30 Questions** exploring 9 personality archetypes
2. **9 Types**: From Reformer to Peacemaker
3. **Detailed Insights**: Strengths, weaknesses, relationships, growth

### Mello Chatbot
- **2,000+ Q&A pairs** indexed by keywords
- Flexible keyword matching algorithm
- Covers all aspects of MBTI, careers, and personality
- Completely offline - no API required!

---

## 🌟 Key Features

✅ **No Authentication Required** - Start testing instantly  
✅ **Offline First** - Chatbot works without external APIs  
✅ **Dark Purple Theme** - Modern, beautiful UI  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Type Compatibility Analysis** - Understand relationship dynamics  
✅ **2000+ Chatbot Responses** - Comprehensive personality knowledge base  
✅ **Comprehensive Content** - Detailed profiles for all 16 types + 9 Enneagram types  

---

## 📈 Future Enhancements

- [ ] User authentication & saved results
- [ ] ML-based type prediction with more accuracy
- [ ] Type compatibility matching
- [ ] Personality growth tracking over time
- [ ] Integration with job platforms for career recommendations
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

## 📝 ALL RIGHTS RESERVED

---

## 👩‍💻 Author

**K. Sailaja**  
4-1 B.Tech Project | Computer Science Graduate | AI/ML Enthusiast 
[GitHub](https://github.com/sailaja2016) | [LinkedIn](https://www.linkedin.com/in/sailaja-kandikatla-7b316836a/)

---

**Give this project a ⭐ if you found it helpful!**
