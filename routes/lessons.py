from fastapi import APIRouter, HTTPException
from supabase import create_client, Client
import os
from typing import List
from models import Lesson

router = APIRouter()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


@router.get("/{article_id}/lessons", response_model=List[Lesson])
def get_lessons_for_article(article_id: int, limit: int = 20, offset: int = 0):
    article = supabase.table("articles").select("id").eq("id", article_id).single().execute()
    if getattr(article, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")
    if not article.data:
        raise HTTPException(status_code=404, detail="Article not found")

    lessons = (
        supabase.table("lessons")
        .select("id, article_id, title, content, vocabulary, grammar_points, difficulty, estimated_time_minutes, created_at, updated_at")
        .eq("article_id", article_id)
        .order("created_at")
        .range(offset, offset + limit - 1)
        .execute()
    )

    if getattr(lessons, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")

    return lessons.data or []
