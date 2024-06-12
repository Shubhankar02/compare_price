// src/app/components/SearchBar.tsx
import { useState, KeyboardEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (query.trim() !== '') {  // Added check to prevent searching with an empty query
      onSearch(query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Search and Compare Products from Amazon and Flipkart</h1>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}  // Added keyDown event
            placeholder="Search Amazon and Flipkart"
            className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Search
        </button>
      </div>
  );
}
