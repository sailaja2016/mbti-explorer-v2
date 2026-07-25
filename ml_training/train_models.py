import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import os

print("=" * 60)
print("MBTI MODEL TRAINING (Text-Based)")
print("=" * 60)

# Load dataset
print("\n[1/5] Loading MBTI dataset...")
df = pd.read_csv('MBTI 500.csv')
print(f"✓ Dataset loaded: {df.shape[0]} rows")
print(f"  Columns: {list(df.columns)}")

# Check columns (LOWERCASE!)
if 'type' not in df.columns:
    print("ERROR: 'type' column not found!")
    print(f"Available columns: {list(df.columns)}")
    exit()

if 'posts' not in df.columns:
    print("ERROR: 'posts' column not found!")
    print(f"Available columns: {list(df.columns)}")
    exit()

# Rename to uppercase for consistency
df.rename(columns={'type': 'Type', 'posts': 'posts'}, inplace=True)

# Create binary labels
print("\n[2/5] Creating binary trait labels...")
df['Mind'] = df['Type'].str[0].map({'E': 1, 'I': 0})
df['Energy'] = df['Type'].str[1].map({'S': 0, 'N': 1})
df['Nature'] = df['Type'].str[2].map({'T': 1, 'F': 0})
df['Tactics'] = df['Type'].str[3].map({'J': 1, 'P': 0})
print("✓ Trait labels created")

# Convert text to numerical features using TF-IDF
print("\n[3/5] Converting text to numerical features (TF-IDF)...")
vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
X = vectorizer.fit_transform(df['posts']).toarray()
print(f"✓ Features created: {X.shape[1]} TF-IDF features")

# Split data
print("\n[4/5] Splitting data (80-20 train-test)...")
X_train, X_test, y_mind_train, y_mind_test = train_test_split(
    X, df['Mind'], test_size=0.2, random_state=42
)
_, _, y_energy_train, y_energy_test = train_test_split(
    X, df['Energy'], test_size=0.2, random_state=42
)
_, _, y_nature_train, y_nature_test = train_test_split(
    X, df['Nature'], test_size=0.2, random_state=42
)
_, _, y_tactics_train, y_tactics_test = train_test_split(
    X, df['Tactics'], test_size=0.2, random_state=42
)
print(f"✓ Train size: {X_train.shape[0]}, Test size: {X_test.shape[0]}")

# Train models
print("\n[5/5] Training 4 Logistic Regression models...")
print("-" * 60)

print("\nTraining Model 1: Mind (Introversion vs Extraversion)")
model_mind = LogisticRegression(max_iter=1000, random_state=42)
model_mind.fit(X_train, y_mind_train)
y_mind_pred = model_mind.predict(X_test)
mind_accuracy = accuracy_score(y_mind_test, y_mind_pred)
print(f"✓ Accuracy: {mind_accuracy:.4f} ({mind_accuracy*100:.2f}%)")

print("\nTraining Model 2: Energy (Sensing vs Intuition)")
model_energy = LogisticRegression(max_iter=1000, random_state=42)
model_energy.fit(X_train, y_energy_train)
y_energy_pred = model_energy.predict(X_test)
energy_accuracy = accuracy_score(y_energy_test, y_energy_pred)
print(f"✓ Accuracy: {energy_accuracy:.4f} ({energy_accuracy*100:.2f}%)")

print("\nTraining Model 3: Nature (Thinking vs Feeling)")
model_nature = LogisticRegression(max_iter=1000, random_state=42)
model_nature.fit(X_train, y_nature_train)
y_nature_pred = model_nature.predict(X_test)
nature_accuracy = accuracy_score(y_nature_test, y_nature_pred)
print(f"✓ Accuracy: {nature_accuracy:.4f} ({nature_accuracy*100:.2f}%)")

print("\nTraining Model 4: Tactics (Judging vs Perceiving)")
model_tactics = LogisticRegression(max_iter=1000, random_state=42)
model_tactics.fit(X_train, y_tactics_train)
y_tactics_pred = model_tactics.predict(X_test)
tactics_accuracy = accuracy_score(y_tactics_test, y_tactics_pred)
print(f"✓ Accuracy: {tactics_accuracy:.4f} ({tactics_accuracy*100:.2f}%)")

# Save models
print("\n" + "=" * 60)
print("SAVING MODELS & VECTORIZER")
print("=" * 60)

os.makedirs('../backend/models', exist_ok=True)

joblib.dump(model_mind, '../backend/models/model_mind.pkl')
joblib.dump(model_energy, '../backend/models/model_energy.pkl')
joblib.dump(model_nature, '../backend/models/model_nature.pkl')
joblib.dump(model_tactics, '../backend/models/model_tactics.pkl')
joblib.dump(vectorizer, '../backend/models/vectorizer.pkl')

print("\n✅ ALL MODELS SAVED SUCCESSFULLY!")
print("\nFiles created:")
print("  ✓ ../backend/models/model_mind.pkl")
print("  ✓ ../backend/models/model_energy.pkl")
print("  ✓ ../backend/models/model_nature.pkl")
print("  ✓ ../backend/models/model_tactics.pkl")
print("  ✓ ../backend/models/vectorizer.pkl")

avg_accuracy = (mind_accuracy + energy_accuracy + nature_accuracy + tactics_accuracy) / 4
print("\n" + "=" * 60)
print(f"AVERAGE ACCURACY: {avg_accuracy:.4f} ({avg_accuracy*100:.2f}%)")
print("=" * 60)
print("\n🎉 Training complete! Models ready for deployment.")