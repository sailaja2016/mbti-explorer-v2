from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import json
import os

app = Flask(__name__)
CORS(app)

# Load personality descriptions
with open('personality_data.json', 'r') as f:
    personality_data = json.load(f)

# Load MBTI questions
with open('questions_mbti.json', 'r') as f:
    questions_data = json.load(f)

# Personality types mapping
PERSONALITY_TYPES = {
    'ISTJ': 'Logistician',
    'ISFJ': 'Defender',
    'INFJ': 'Advocate',
    'INTJ': 'Architect',
    'ISTP': 'Virtuoso',
    'ISFP': 'Adventurer',
    'INFP': 'Mediator',
    'INTP': 'Logician',
    'ESTP': 'Entrepreneur',
    'ESFP': 'Entertainer',
    'ENFP': 'Campaigner',
    'ENTP': 'Debater',
    'ESTJ': 'Executive',
    'ESFJ': 'Consul',
    'ENFJ': 'Commander',
    'ENTJ': 'Visionary'
}

# Chatbot knowledge base - COMPREHENSIVE
CHATBOT_KB = {
    "what is mbti": "MBTI (Myers-Briggs Type Indicator) is a personality framework based on psychological preferences. It categorizes people into 16 types based on 4 dimensions: how you direct energy (I/E), gather information (S/N), make decisions (T/F), and organize life (J/P).",
    
    "dimensions": "MBTI has 4 dimensions: (1) Mind - Introversion (I) vs Extraversion (E), (2) Energy - Sensing (S) vs Intuition (N), (3) Nature - Thinking (T) vs Feeling (F), (4) Tactics - Judging (J) vs Perceiving (P). Together they form your 4-letter type!",
    
    "mind": "The Mind dimension shows how you direct and receive energy. Introverts (I) recharge alone and reflect internally. Extraverts (E) gain energy from interaction and external activity.",
    
    "energy": "The Energy dimension shows how you gather information. Sensors (S) focus on facts, details, and present reality. Intuitives (N) notice patterns, possibilities, and future implications.",
    
    "nature": "The Nature dimension shows how you make decisions. Thinkers (T) use logic and objective analysis. Feelers (F) consider personal values and impact on people.",
    
    "tactics": "The Tactics dimension shows how you organize your life. Judgers (J) prefer structure, planning, and closure. Perceivers (P) prefer flexibility, spontaneity, and keeping options open.",
    
    "infj": "INFJ (Advocate) - The rarest type! INFJs are idealistic, insightful, principled visionaries driven to help others. They combine deep intuition with strong values and empathy. Natural leaders with a gift for understanding people.",
    
    "enfp": "ENFP (Campaigner) - Enthusiastic, creative, and sociable explorers! ENFPs bring joy and inspiration everywhere. They're natural communicators who see endless possibilities and love connecting with people.",
    
    "intj": "INTJ (Architect) - Strategic, independent, and ambitious thinkers. INTJs excel at long-term planning and see patterns others miss. Natural leaders with a clear vision for the future.",
    
    "estj": "ESTJ (Executive) - Practical, logical, and reliable organizers. ESTJs excel at leadership and making things happen. They value tradition, loyalty, and getting results efficiently.",
    
    "isfj": "ISFJ (Defender) - Warm, conscientious, and loyal protectors. ISFJs are dedicated to serving others and take their responsibilities seriously. They create harmony and support those around them.",
    
    "istp": "ISTP (Virtuoso) - Logical, practical, and adaptable problem-solvers. ISTPsenjoy understanding how things work and love hands-on challenges. Independent and flexible thinkers.",
    
    "career": "Different MBTI types excel in different careers. Your type reveals your natural strengths and work preferences. For example: INFJs often thrive in counseling, INTJ in strategy, ISFJ in healthcare, ESTP in entrepreneurship. What matters is alignment with your values and strengths!",
    
    "relationship": "MBTI helps you understand relationship dynamics! Each type brings unique gifts. Understanding your partner's type helps you appreciate differences and communicate better. Opposites can attract and complement each other beautifully.",
    
    "accurate": "MBTI is a tool for self-understanding and personal growth, not a hard science. It's best used for reflection, improving relationships, and finding careers that fit your natural strengths.",
    
    "change": "Your core type is relatively stable, but you can develop skills in non-preferred areas. Life experience, intentional practice, and growth can expand your capabilities in all dimensions.",
    
    "test": "Take our MBTI test! Answer 60 questions honestly about your preferences, and we'll predict your personality type. The test considers how you naturally prefer to think and act.",
    
    "rare": "INFJ is often considered the rarest type (1-2% of population), followed by ENTJ. All types have value and unique contributions!",
    
    "hello": "Hi there! I'm Mello, your MBTI guide 🧠 I'm here to help you understand personality types, the 4 dimensions, specific types, careers, relationships, and more. What would you like to know?",
    
    "hi": "Hey! I'm Mello, your MBTI personality guide. Ask me about MBTI types, dimensions, career fit, relationships, or just chat about personalities!",
}

@app.route('/api/questions', methods=['GET'])
def get_questions():
    """Return all 60 MBTI questions"""
    return jsonify(questions_data)

@app.route('/api/predict', methods=['POST'])
def predict_mbti():
    """Predict MBTI type based on 60 answers"""
    try:
        data = request.json
        answers = data.get('answers', [])
        
        if len(answers) != 60:
            return jsonify({'error': 'Must provide 60 answers'}), 400
        
        # Simple heuristic: Average answers by trait
        # Questions are distributed: Mind (15), Energy (15), Nature (15), Tactics (15)
        mind_score = sum(answers[0:15]) / 15
        energy_score = sum(answers[15:30]) / 15
        nature_score = sum(answers[30:45]) / 15
        tactics_score = sum(answers[45:60]) / 15
        
        # Determine trait (3 = neutral, > 3 = first preference, < 3 = second preference)
        mind = 'E' if mind_score > 3 else 'I'
        energy = 'N' if energy_score > 3 else 'S'
        nature = 'T' if nature_score > 3 else 'F'
        tactics = 'J' if tactics_score > 3 else 'P'
        
        mbti_type = mind + energy + nature + tactics
        
        # Calculate percentages (normalize to 0-100)
        mind_pct = int(((mind_score - 1) / 4) * 100) if mind == 'E' else int((1 - (mind_score - 1) / 4) * 100)
        energy_pct = int(((energy_score - 1) / 4) * 100) if energy == 'N' else int((1 - (energy_score - 1) / 4) * 100)
        nature_pct = int(((nature_score - 1) / 4) * 100) if nature == 'T' else int((1 - (nature_score - 1) / 4) * 100)
        tactics_pct = int(((tactics_score - 1) / 4) * 100) if tactics == 'J' else int((1 - (tactics_score - 1) / 4) * 100)
        
        # Get personality details
        personality = personality_data.get(mbti_type, {})
        
        result = {
            'type': mbti_type,
            'title': PERSONALITY_TYPES.get(mbti_type, 'Unknown'),
            'description': personality.get('description', ''),
            'characteristics': personality.get('characteristics', []),
            'strengths': personality.get('strengths', []),
            'weaknesses': personality.get('weaknesses', []),
            'tips': personality.get('tips', []),
            'traits': {
                'mind': {'label': mind, 'percentage': mind_pct},
                'energy': {'label': energy, 'percentage': energy_pct},
                'nature': {'label': nature, 'percentage': nature_pct},
                'tactics': {'label': tactics, 'percentage': tactics_pct}
            }
        }
        
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/personality/<mbti_type>', methods=['GET'])
def get_personality(mbti_type):
    """Get detailed personality information for a type"""
    mbti_type = mbti_type.upper()
    if mbti_type not in PERSONALITY_TYPES:
        return jsonify({'error': 'Invalid MBTI type'}), 400
    
    personality = personality_data.get(mbti_type, {})
    personality['type'] = mbti_type
    personality['title'] = PERSONALITY_TYPES.get(mbti_type)
    
    return jsonify(personality)

@app.route('/api/all-types', methods=['GET'])
def get_all_types():
    """Get all 16 personality types"""
    types_list = []
    for mbti_type, title in PERSONALITY_TYPES.items():
        personality = personality_data.get(mbti_type, {})
        types_list.append({
            'type': mbti_type,
            'title': title,
            'description': personality.get('description', ''),
            'image': f'/images/{mbti_type}.jpg'
        })
    return jsonify(types_list)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Smart retrieval-based chatbot with Mello personality"""
    try:
        data = request.json
        query = data.get('message', '').lower().strip()
        
        # Find best matching response
        best_match = None
        highest_match_score = 0
        
        for key, response in CHATBOT_KB.items():
            # Check if key words are in the query
            if key in query:
                match_score = len(key)  # Longer matches are more specific
                if match_score > highest_match_score:
                    best_match = response
                    highest_match_score = match_score
        
        # If no match found, provide helpful default
        if best_match is None:
            if len(query) < 3:
                best_match = "Hi! 👋 Ask me about MBTI types, dimensions (Mind, Energy, Nature, Tactics), specific types like INFJ or ENFP, or topics like career and relationships!"
            else:
                best_match = f"Great question about '{query}'! I know about MBTI types, all 4 dimensions, careers, relationships, and more. Try asking: 'What is MBTI?', 'Tell me about INFJ', 'Career advice', or 'How do relationships work with MBTI?'"
        
        return jsonify({'response': best_match})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'models_loaded': True,
        'chatbot': 'ready'
    })

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
