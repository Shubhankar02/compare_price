// src/app/components/SearchResults.tsx
import ProductCard from './ProductCard';

interface SearchResultsProps {
  amazonResults: any[];
  flipkartResults: any[];
}

export default function SearchResults({ amazonResults, flipkartResults }: SearchResultsProps) {
  return (
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center">Amazon.in Results</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {amazonResults.map((result, index) => (
                <ProductCard key={index} {...result} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center">Flipkart.com Results</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {flipkartResults.map((result, index) => (
                <ProductCard key={index} {...result} />
            ))}
          </div>
        </div>
      </div>
  );
}
