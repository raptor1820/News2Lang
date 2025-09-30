# News2Lang

A language learning platform that transforms news articles into interactive lessons and quizzes.

## Frontend Setup & Running (Next.js)

### Prerequisites
- **Node.js 18+** (recommended: use the latest LTS version)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── articles/          # Articles page
│   ├── lessons/           # Lessons page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   └── Navigation.tsx     # Navigation component
├── backend/               # Python FastAPI backend
├── scraper/               # Python web scraper
└── package.json           # Node.js dependencies
```

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
- **Interactive Docs**: http://localhost:8000/docsp

### Troubleshooting

**If you get pydantic-core compilation errors:**
- You're probably using Python from MSYS2 or another distribution - for some reason there is a rust compilation error with versions 3.11+
- Install Python 3.10 from python.org and use `py -3.10 -m venv .venv`
- The issue is that non-Windows Python installations don't have pre-compiled wheels

**Environment variables not found:**
- Make sure `.env` file exists in the backend folder
- Check that SUPABASE_URL and SUPABASE_KEY are set correctly

### Running python scraper to add data to Supabase:

1 **Install the following packages**

```bash
   import requests
   from bs4 import BeautifulSoup
   import re
   import json
   import time
   import os
   from supabase import create_client, Client
```

2 **Run python file**

```bash
   python scrape.py
```

3 **When prompted, enter URL of the site you want to scrape**

