export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">News Articles</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Browse and explore news articles that have been transformed into language learning content.
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Article Title Example</h3>
              <p className="text-sm text-gray-600">Source: Example News</p>
              <p className="text-sm text-gray-500">Difficulty: Intermediate</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-900">Another Article Title</h3>
              <p className="text-sm text-gray-600">Source: Another News</p>
              <p className="text-sm text-gray-500">Difficulty: Beginner</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
