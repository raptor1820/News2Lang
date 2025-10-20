//display article information
//each card should have: title, content, preview

import Link from "next/link";
import { Language, Article } from "../type";

const languageDisplayName: Record<Language, string> = {
  [Language.Spanish]: "Spanish",
  [Language.French]: "French",
  [Language.German]: "German",
  [Language.Japanese]: "Japanese",
};

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link
      href={`/learn/${article.id}`}
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          {article.title}
        </h3>
        <span className="bg-blue-200 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {languageDisplayName[article.language]}
        </span>
      </div>
      <p className="text-gray-700 line-clamp-2">{article.preview}</p>
    </Link>
  );
};
