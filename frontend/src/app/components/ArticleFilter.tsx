//this file helps create some filter: search, filter input,. ..
//create search function and dropdown languae fnc
"use client";

import { Language } from "../type";

export const ArticleFilter = () => {
  const handleSearch = (e) => {};
  const handleLanguageChange = () => {};
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        type="text"
        placeholder="Search articles by title..."
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        onChange={handleLanguageChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none foucs:ring-2 foucs:ring-blue-500"
      >
        <option value="">All Language</option>
        {Object.entries(Language).map(([key, value]) => (
          <option key={value} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
