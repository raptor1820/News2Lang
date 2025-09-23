from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from .article import DifficultyLevel

class Question(BaseModel):
    question: str
    options: List[str]
    correct_answer: int  # index of correct option
    explanation: Optional[str] = None

class QuizCreate(BaseModel):
    lesson_id: int  # Changed from str to int
    title: str
    questions: List[Question]
    difficulty: DifficultyLevel

class Quiz(QuizCreate):
    id: int  # Changed from str to int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True