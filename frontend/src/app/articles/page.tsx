//this will be the main page

export default async function ArticlesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {" "}
          Choose Your Lesson
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {" "}
          Select a news article to begin your journey!!
        </p>
      </div>
    </main>
  );
}
