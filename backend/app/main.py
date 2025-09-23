from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime

from .database import get_supabase_client
from .models import Article, ArticleCreate, Lesson, LessonCreate, Quiz, QuizCreate

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