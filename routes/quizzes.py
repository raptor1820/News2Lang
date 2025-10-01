from fastapi import APIRouter, HTTPException
from supabase import create_client, Client
import os
from typing import List
from models import Quiz

router = APIRouter()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


@router.get("/{lesson_id}/quizzes", response_model=List[Quiz])
def get_quizzes_for_lesson(lesson_id: int, limit: int = 20, offset: int = 0):
    lesson = supabase.table("lessons").select("id").eq("id", lesson_id).single().execute()
    if getattr(lesson, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")
    if not lesson.data:
        raise HTTPException(status_code=404, detail="Lesson not found")

    quizzes = (
        supabase.table("quizzes")
        .select("id, lesson_id, title, questions, difficulty, created_at, updated_at")
        .eq("lesson_id", lesson_id)
        .order("created_at")
        .range(offset, offset + limit - 1)
        .execute()
    )

    if getattr(quizzes, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")

    return quizzes.data or []


@router.get("/quizzes/{quiz_id}", response_model=Quiz)
def get_quiz(quiz_id: int):
    quiz = (
        supabase.table("quizzes")
        .select("id, lesson_id, title, questions, difficulty, created_at, updated_at")
        .eq("id", quiz_id)
        .single()
        .execute()
    )

    if getattr(quiz, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")
    if not quiz.data:
        raise HTTPException(status_code=404, detail="Quiz not found")

    return quiz.data
