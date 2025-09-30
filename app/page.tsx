import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">News2Lang</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform news articles into interactive language learning lessons and quizzes. 
            Learn languages through real-world content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/lessons" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Lessons
            </Link>
            <Link 
              href="/articles" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              View Articles
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">📰 News Articles</h3>
              <p className="text-gray-600">
                Access a curated collection of news articles from various sources, 
                perfect for language learning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">📚 Interactive Lessons</h3>
              <p className="text-gray-600">
                Transform articles into structured lessons with vocabulary, 
                grammar explanations, and comprehension exercises.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">🧠 Smart Quizzes</h3>
              <p className="text-gray-600">
                Test your understanding with AI-generated quizzes that adapt 
                to your learning progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

