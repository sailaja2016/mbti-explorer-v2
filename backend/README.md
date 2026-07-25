# MBTI Explorer Backend

Flask-based REST API for MBTI personality prediction with Logistic Regression ML models.

## Features
- 4 independent Logistic Regression models (Mind, Energy, Nature, Tactics)
- MBTI type prediction with trait percentages
- Retrieval-based chatbot for personality Q&A
- 16 personality type descriptions with growth tips

## Tech Stack
- Flask 2.3.3
- scikit-learn 1.3.1
- NumPy / Pandas
- Joblib (for model serialization)

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Training Models

1. Download MBTI dataset from Kaggle:
   ```
   https://www.kaggle.com/datasets/zeyadkhalid/mbti-personality-types-500-dataset
   ```

2. Run Jupyter notebook in `ml_training/`:
   ```
   MBTI_Model_Training.ipynb
   ```
   This trains and saves 4 .pkl models to `backend/models/`

## Running the Backend

```bash
python app.py
```

Server runs on `http://localhost:5000`

## API Endpoints

### GET /api/questions
Returns all 60 MBTI questionnaire questions

### POST /api/predict
Predicts MBTI type based on 60 answers
- Request: `{ "answers": [1-5 scale array] }`
- Response: `{ "type": "INFJ", "title": "Advocate", "traits": {...}, ...}`

### GET /api/personality/<type>
Gets detailed info for a personality type (e.g., `/api/personality/INFJ`)

### GET /api/all-types
Returns all 16 personality types with descriptions

### POST /api/chatbot
Retrieval-based chatbot for personality Q&A
- Request: `{ "message": "what is mbti" }`
- Response: `{ "response": "MBTI is..." }`

### GET /api/health
Health check endpoint

## Models
- `model_mind.pkl` - E/I prediction (Introversion vs Extraversion)
- `model_energy.pkl` - S/N prediction (Sensing vs Intuition)
- `model_nature.pkl` - T/F prediction (Thinking vs Feeling)
- `model_tactics.pkl` - J/P prediction (Judging vs Perceiving)
- `scaler.pkl` - Feature scaler for consistent preprocessing

## Deployment

### Render
1. Create app on render.com
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn app:app`
4. Connect your GitHub repo

### Railway
Similar setup, ensure environment is configured for Python

## Notes
- Models expect 60 numeric features (Likert 1-5 scale)
- Average model accuracy: 70-75% across 4 traits
- Chatbot uses simple keyword matching (extendable with NLP)
