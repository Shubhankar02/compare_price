// src/app/page.tsx
'use client';

import React, {useState} from 'react';
import SearchBar from "@/app/components/searchBar";
import SearchResults from "@/app/components/searchResults";
import '../app/globals.css';
import Loader from "@/app/components/loader"; // Import a Loader component

interface Result {
  title: string;
  price: string;
  link: string;
  image: string;
}

export default function Home() {
  const [amazonResults, setAmazonResults] = useState<Result[]>([]);
  const [flipkartResults, setFlipkartResults] = useState<Result[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setLoading(true); // Start loading
    setShowResults(false);

    // Fetch Amazon data
    const amazonResponse = await fetch('/api/amazon-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query}),
    });
    const amazonData = await amazonResponse.json();
    setAmazonResults(amazonData.results);

    // Fetch Flipkart data
    const flipkartResponse = await fetch('/api/flipkart-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({query}),
    });
    const flipkartData = await flipkartResponse.json();
    setFlipkartResults(flipkartData.results);

    const endTime = Date.now();
    setShowResults(true);
    setLoading(false);
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <SearchBar onSearch={handleSearch}/>
        {loading && <Loader/>}
        {showResults && (
            <SearchResults amazonResults={amazonResults} flipkartResults={flipkartResults}/>
        )}
      </div>
  );
}
