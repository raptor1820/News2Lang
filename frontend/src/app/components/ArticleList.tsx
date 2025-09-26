//render list, take care od empty state

//two cases: empty, found list
import { Article } from "../type";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = ({ article }: { article: Article[] }) => {
  if (article.length === 0) {
    return (
      <div className="text-cenetr py-12">
        <h2 className="text-2xl fonr-semibold text-gray-700">
          No Articles Found
        </h2>
        <p className="text-gray-500 mt-3">
          {" "}
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {article.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
