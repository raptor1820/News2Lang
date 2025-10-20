from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class ArticleBase(BaseModel):
    id: str                
    title: str             
    summary: str           
    created_at: datetime   


class ArticleDetail(ArticleBase):
    content: str           


class Lesson(BaseModel):
    id: str
    title: str
    body: str
    created_at: Optional[datetime] = None  


class Quiz(BaseModel):
    id: str
    question: str
    choices: List[str]               
    answer: Optional[int] = None     
    created_at: Optional[datetime] = None
