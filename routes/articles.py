import os
from fastapi import APIRouter, HTTPException
from typing import List
from supabase import create_client, Client

from .schemas import Article, ArticleCreate

router = APIRouter()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)


@router.get("/", response_model=List[Article])
def list_articles(limit: int = 20, offset: int = 0):

    res = (
        supabase.table("articles")
        .select("id, title, content, source_url, language, difficulty, created_at, updated_at, processed")
        .order("created_at", desc=True)
        .range(offset, offset + limit - 1)
        .execute()
    )

    if getattr(res, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")

    return res.data or []


@router.get("/{id}", response_model=Article)
def get_article(id: int):


    result = (
        supabase.table("articles")
        .select("id, title, content, source_url, language, difficulty, created_at, updated_at, processed")
        .eq("id", id)
        .single()
        .execute()
    )

    if getattr(result, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")

    if not result.data:
        raise HTTPException(status_code=404, detail="Article not found")

    return result.data


@router.post("/", response_model=Article)
def create_article(article: ArticleCreate):

    result = (
        supabase.table("articles")
        .insert(article.dict())
        .execute()
    )

    if getattr(result, "error", None):
        raise HTTPException(status_code=502, detail="Upstream data error")

    return result.data[0]
