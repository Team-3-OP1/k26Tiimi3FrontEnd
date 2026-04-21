import type { Product } from "./types/Product";
import { fetchProducts } from "./api/items";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Type: {product.type}</p>
            <p>Color: {product.color}</p>
            <p>Size: {product.size}</p>
            <p>Price: ${product.price}</p>
            <p>Manufacturer: {product.manufacturer}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
