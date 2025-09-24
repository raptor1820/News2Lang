from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from enum import Enum

class DifficultyLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class ArticleCreate(BaseModel):
    title: str
    content: str
    source_url: str
    language: str = "english"
    difficulty: DifficultyLevel = DifficultyLevel.INTERMEDIATE

class Article(ArticleCreate):
    id: int  # Changed from str to int
    created_at: datetime
    updated_at: Optional[datetime] = None
    processed: bool = False

    class Config:
        from_attributes = True