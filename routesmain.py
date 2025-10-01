from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import articles, lessons, quizzes

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


app.include_router(articles.router, prefix="/articles", tags=["articles"])
app.include_router(lessons.router, prefix="/lessons", tags=["lessons"])
app.include_router(quizzes.router, prefix="/quizzes", tags=["quizzes"])
