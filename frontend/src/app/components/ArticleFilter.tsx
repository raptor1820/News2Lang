//this file helps create some filter: search, filter input,. ..
//create search function and dropdown languae fnc
"use client";

import { useRouter } from "next/router";
import { Language } from "../type";
import { usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const ArticleFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  //wait for 300ms to type
  const handleSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (language) {
      params.set("lang", language);
    } else {
      params.delete("lang");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

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
