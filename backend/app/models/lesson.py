from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from .article import DifficultyLevel

class LessonCreate(BaseModel):
    article_id: int  # Changed from str to int
    title: str
    content: str
    vocabulary: List[dict]  # [{word: str, definition: str, example: str}]
    grammar_points: List[str]
    difficulty: DifficultyLevel
    estimated_time_minutes: int

class Lesson(LessonCreate):
    id: int  # Changed from str to int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True