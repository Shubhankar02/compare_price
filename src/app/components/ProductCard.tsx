// src/app/components/ProductCard.tsx
interface ProductCardProps {
  title: string;
  price: string;
  link: string;
  image: string;
}

export default function ProductCard({ title, price, link, image }: ProductCardProps) {
  return (
      <div className="max-w-sm border rounded-md p-4 shadow-lg flex flex-col items-center">
        <img src={image} alt={title} className="w-48 h-64 object-cover mb-4" />
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-md text-gray-700">{price}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
          View on Site
        </a>
      </div>
  );
}
