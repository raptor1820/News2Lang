export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Language Lessons</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lesson 1: Technology News</h3>
            <p className="text-gray-600 mb-4">
              Learn vocabulary and grammar through technology-related news articles.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Beginner</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Start Lesson
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lesson 2: Business News</h3>
            <p className="text-gray-600 mb-4">
              Explore business terminology and formal language structures.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Intermediate</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Start Lesson
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lesson 3: Science News</h3>
            <p className="text-gray-600 mb-4">
              Master scientific vocabulary and complex sentence structures.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Advanced</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Start Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

