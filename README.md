# News2Lang

A language learning platform that transforms news articles into interactive lessons and quizzes.

## Backend Setup & Running

### Prerequisites
- **Python 3.10** (required to avoid pydantic compilation issues with MSYS2/other Python distributions)
- Supabase account and project

### Installation & Setup

1. **Install Python 3.10**:
   - Download from https://python.org/downloads/
   - Make sure to check "Add Python to PATH"

2. **Clone and navigate to backend**:
   ```bash
   git clone <repository-url>
   cd News2Lang/backend
   ```

3. **Create virtual environment with Python 3.10**:
   ```bash
   # Create venv with Python 3.10 specifically
   py -3.10 -m venv .venv

   # Activate virtual environment
   .venv\Scripts\activate    # Windows
   ```

4. **Install dependencies**:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. **Set up environment variables**:
   Create a `.env` file in the backend directory:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-key-here
   OPENAI_API_KEY=your-openai-api-key-here
   ```

### Running the Server

```bash
# Make sure virtual environment is activated
.venv\Scripts\activate

# Start the FastAPI server
python run.py
```

The API will be available at:
- **API Root**: http://localhost:8000
- **API Test**: http://localhost:8000/articles
- **Interactive Docs**: http://localhost:8000/docs

### Troubleshooting

**If you get pydantic-core compilation errors:**
- You're probably using Python from MSYS2 or another distribution - for some reason there is a rust compilation error with versions 3.11+
- Install Python 3.10 from python.org and use `py -3.10 -m venv .venv`
- The issue is that non-Windows Python installations don't have pre-compiled wheels

**Environment variables not found:**
- Make sure `.env` file exists in the backend folder
- Check that SUPABASE_URL and SUPABASE_KEY are set correctly

## Features

### AI-Powered Lesson Generator

Transform news articles into comprehensive language learning lessons with a single API call.

**Endpoint:** `POST /articles/{article_id}/generate-lesson`

**What it generates:**
- Vocabulary items with definitions, examples, and translations
- Grammar points relevant to the article
- Cultural notes for context
- Interactive quiz questions

**Database Migration Required:**
```sql
ALTER TABLE lessons ADD COLUMN cultural_notes jsonb DEFAULT '[]';
```

See API documentation at http://localhost:8000/docs for full details.
