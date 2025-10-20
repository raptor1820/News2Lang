//this will be the main page

import { Suspense } from "react";
import { ArticleFilter } from "../components/ArticleFilter";
import { LoadingSpinner } from "../loading/LoadingSpinner";
import { ArticleList } from "../components/ArticleList";
import { Language } from "../type";
import { getArticles } from "../lib/api";

interface ArticlesPageProps {
  searchParams?: {
    search?: string;
    lang?: Language;
  };
}
export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const articles = await getArticles();
  const searchTerm = searchParams?.search?.toLowerCase() || "";
  const selectedLang = searchParams?.lang || "";
  const filteredArticles = articles
    .filter((article) => {
      if (selectedLang) {
        return article.language === selectedLang;
      }
      return true;
    })
    .filter((article) => {
      if (searchTerm) {
        return (
          article.title.toLowerCase().includes(searchTerm) ||
          article.preview.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {" "}
          Choose Your Lesson
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {" "}
          Select a news article to begin your language journey!!
        </p>
      </div>

      <ArticleFilter />

      <Suspense fallback={<LoadingSpinner />}>
        <ArticleList articles={filteredArticles} />
      </Suspense>
    </main>
  );
}
