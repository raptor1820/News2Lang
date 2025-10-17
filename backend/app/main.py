from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from datetime import datetime

from .database import get_supabase_client
from .models import Article, ArticleCreate, Lesson, LessonCreate, Quiz, QuizCreate, Question
from .llm_service import generate_lesson_from_article

app = FastAPI(title="News2Lang API", version="1.0.0")

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = get_supabase_client()

@app.get("/")
async def root():
    return {"message": "News2Lang API is running!"}

# Article endpoints
@app.post("/articles/", response_model=Article)
async def create_article(article: ArticleCreate):
    try:
        article_data = article.model_dump()
        # Remove UUID generation - let Supabase auto-increment the ID
        article_data["created_at"] = datetime.utcnow().isoformat()
        article_data["processed"] = False

        result = supabase.table("articles").insert(article_data).execute()
        return Article(**result.data[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/articles/", response_model=List[Article])
async def get_articles():
    try:
        result = supabase.table("articles").select("*").execute()
        return [Article(**article) for article in result.data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/articles/{article_id}", response_model=Article)
async def get_article(article_id: int):  # Changed from str to int
    try:
        result = supabase.table("articles").select("*").eq("id", article_id).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Article not found")
        return Article(**result.data[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Lesson endpoints
@app.post("/lessons/", response_model=Lesson)
async def create_lesson(lesson: LessonCreate):
    try:
        lesson_data = lesson.model_dump()
        # Remove UUID generation - let Supabase auto-increment the ID
        lesson_data["created_at"] = datetime.utcnow().isoformat()

        result = supabase.table("lessons").insert(lesson_data).execute()
        return Lesson(**result.data[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/lessons/", response_model=List[Lesson])
async def get_lessons():
    try:
        result = supabase.table("lessons").select("*").execute()
        return [Lesson(**lesson) for lesson in result.data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/articles/{article_id}/lessons", response_model=List[Lesson])
async def get_lessons_by_article(article_id: int):  # Changed from str to int
    try:
        result = supabase.table("lessons").select("*").eq("article_id", article_id).execute()
        return [Lesson(**lesson) for lesson in result.data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Quiz endpoints
@app.post("/quizzes/", response_model=Quiz)
async def create_quiz(quiz: QuizCreate):
    try:
        quiz_data = quiz.model_dump()
        # Remove UUID generation - let Supabase auto-increment the ID
        quiz_data["created_at"] = datetime.utcnow().isoformat()

        result = supabase.table("quizzes").insert(quiz_data).execute()
        return Quiz(**result.data[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/quizzes/", response_model=List[Quiz])
async def get_quizzes():
    try:
        result = supabase.table("quizzes").select("*").execute()
        return [Quiz(**quiz) for quiz in result.data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/lessons/{lesson_id}/quizzes", response_model=List[Quiz])
async def get_quizzes_by_lesson(lesson_id: int):  # Changed from str to int
    try:
        result = supabase.table("quizzes").select("*").eq("lesson_id", lesson_id).execute()
        return [Quiz(**quiz) for quiz in result.data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# AI-Powered Lesson Generator endpoint
@app.post("/articles/{article_id}/generate-lesson", response_model=Dict)
async def generate_lesson_for_article(article_id: int):
    """
    Generate an AI-powered lesson and quiz from an article.
    This endpoint:
    1. Fetches the article from the database
    2. Sends it to the LLM (OpenAI) for processing
    3. Stores the generated lesson in the Lesson table
    4. Stores the generated quiz in the Quiz table
    5. Marks the article as processed
    6. Returns the lesson and quiz data
    """
    try:
        # 1. Fetch the article
        article_result = supabase.table("articles").select("*").eq("id", article_id).execute()
        if not article_result.data:
            raise HTTPException(status_code=404, detail="Article not found")
        
        article_data = article_result.data[0]
        article = Article(**article_data)
        
        # Check if already processed
        if article.processed:
            # Return existing lesson and quiz
            lesson_result = supabase.table("lessons").select("*").eq("article_id", article_id).execute()
            if lesson_result.data:
                lesson = Lesson(**lesson_result.data[0])
                quiz_result = supabase.table("quizzes").select("*").eq("lesson_id", lesson.id).execute()
                quiz = Quiz(**quiz_result.data[0]) if quiz_result.data else None
                return {
                    "message": "Lesson already exists for this article",
                    "lesson": lesson,
                    "quiz": quiz
                }
        
        # 2. Generate lesson and quiz using LLM
        try:
            lesson_data, quiz_data = generate_lesson_from_article(
                article_title=article.title,
                article_content=article.content,
                difficulty=article.difficulty,
                language=article.language
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error generating lesson: {str(e)}")
        
        # 3. Store the lesson in Supabase
        lesson_create = LessonCreate(
            article_id=article_id,
            title=lesson_data.get("title", f"Lesson: {article.title}"),
            content=lesson_data.get("content", ""),
            vocabulary=lesson_data.get("vocabulary", []),
            grammar_points=lesson_data.get("grammar_points", []),
            cultural_notes=lesson_data.get("cultural_notes", []),
            difficulty=article.difficulty,
            estimated_time_minutes=lesson_data.get("estimated_time_minutes", 30)
        )
        
        lesson_insert = lesson_create.model_dump()
        lesson_insert["created_at"] = datetime.utcnow().isoformat()
        
        lesson_result = supabase.table("lessons").insert(lesson_insert).execute()
        created_lesson = Lesson(**lesson_result.data[0])
        
        # 4. Store the quiz in Supabase
        quiz_questions = []
        for q in quiz_data.get("questions", []):
            quiz_questions.append(Question(
                question=q.get("question", ""),
                options=q.get("options", []),
                correct_answer=q.get("correct_answer", 0),
                explanation=q.get("explanation", "")
            ))
        
        quiz_create = QuizCreate(
            lesson_id=created_lesson.id,
            title=quiz_data.get("title", f"Quiz: {article.title}"),
            questions=quiz_questions,
            difficulty=article.difficulty
        )
        
        quiz_insert = quiz_create.model_dump()
        quiz_insert["created_at"] = datetime.utcnow().isoformat()
        
        quiz_result = supabase.table("quizzes").insert(quiz_insert).execute()
        created_quiz = Quiz(**quiz_result.data[0])
        
        # 5. Mark article as processed
        supabase.table("articles").update({
            "processed": True,
            "updated_at": datetime.utcnow().isoformat()
        }).eq("id", article_id).execute()
        
        # 6. Return success response
        return {
            "message": "Lesson and quiz generated successfully",
            "article_id": article_id,
            "lesson": created_lesson,
            "quiz": created_quiz
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")