import os
import json
from typing import Dict, List, Tuple
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_lesson_from_article(
    article_title: str,
    article_content: str,
    difficulty: str,
    language: str = "english"
) -> Tuple[Dict, Dict]:
    """
    Generate a lesson and quiz from an article using OpenAI's GPT.
    
    Returns:
        Tuple of (lesson_data, quiz_data)
    """
    
    # System prompt for lesson generation
    system_prompt = f"""You are an expert language teacher creating lessons from news articles.
Your task is to analyze the article and create:
1. A comprehensive lesson with vocabulary, explanations, and cultural notes
2. A quiz to test comprehension

The target difficulty level is: {difficulty}
The language being taught is: {language}"""

    # User prompt with the article
    user_prompt = f"""Please analyze this article and create a language learning lesson:

Title: {article_title}
Content: {article_content}

Create a lesson that includes:
1. **Vocabulary items** (10-15 words/phrases): For each item provide:
   - word: the word or phrase
   - definition: clear definition
   - example: example sentence using the word in context
   - translation: translation if applicable

2. **Grammar points** (3-5 key grammar concepts used in the article)

3. **Cultural notes** (2-4 cultural insights or context)

4. **Explanations** (key concepts or background information needed to understand the article)

Also create a quiz with 5-7 multiple choice questions that test:
- Vocabulary comprehension
- Content understanding
- Grammar application
- Cultural awareness

Return your response in the following JSON format:
{{
  "lesson": {{
    "title": "Lesson title based on article",
    "content": "A comprehensive summary/overview of the article adapted for language learning",
    "vocabulary": [
      {{
        "word": "example word",
        "definition": "definition of the word",
        "example": "example sentence",
        "translation": "translation if applicable"
      }}
    ],
    "grammar_points": [
      "Grammar point 1: explanation",
      "Grammar point 2: explanation"
    ],
    "cultural_notes": [
      "Cultural note 1",
      "Cultural note 2"
    ],
    "estimated_time_minutes": 30
  }},
  "quiz": {{
    "title": "Quiz title",
    "questions": [
      {{
        "question": "Question text",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct_answer": 0,
        "explanation": "Why this is the correct answer"
      }}
    ]
  }}
}}

Ensure the content is appropriate for {difficulty} level learners."""

    try:
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-turbo-preview",  # or "gpt-3.5-turbo" for faster/cheaper
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        # Parse the response
        result = json.loads(response.choices[0].message.content)
        
        lesson_data = result.get("lesson", {})
        quiz_data = result.get("quiz", {})
        
        return lesson_data, quiz_data
        
    except Exception as e:
        raise Exception(f"Error calling OpenAI API: {str(e)}")


def estimate_difficulty_from_content(content: str) -> str:
    """
    Optional: Use LLM to estimate difficulty level of content.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert at assessing language difficulty. Classify the following text as 'beginner', 'intermediate', or 'advanced'."
                },
                {
                    "role": "user",
                    "content": f"Classify the difficulty of this text:\n\n{content[:1000]}"  # First 1000 chars
                }
            ],
            temperature=0.3
        )
        
        difficulty = response.choices[0].message.content.strip().lower()
        if difficulty in ["beginner", "intermediate", "advanced"]:
            return difficulty
        return "intermediate"  # default
        
    except Exception:
        return "intermediate"  # default fallback
