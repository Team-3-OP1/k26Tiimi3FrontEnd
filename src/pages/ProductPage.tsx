import type { Product } from "../types/Product";
import { fetchProducts } from "../api/items";
import { useEffect, useState } from "react";
import "../css/ProductPage.css";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="product-page product-page--state">
        <p className="product-page__eyebrow">Catalog</p>
        <h1 className="product-page__title">Products</h1>
        <p className="product-page__message">Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-page product-page--state">
        <p className="product-page__eyebrow">Catalog</p>
        <h1 className="product-page__title">Products</h1>
        <p className="product-page__message product-page__message--error">
          Error: {error}
        </p>
      </main>
    );
  }

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <main className="product-page">
      <header className="product-page__header">
        <div>
          <p className="product-page__eyebrow">Catalog</p>
          <h1 className="product-page__title">Products</h1>
          <p className="product-page__summary">
            A quick overview of the current product list.
          </p>
        </div>
        <div className="product-page__count">
          <span>{products.length}</span>
          <p>items</p>
        </div>
      </header>

      <ul className="product-grid">
        {products.map((product) => (
          <li className="product-card" key={product.id}>
            <div className="product-card__top">
              <h2>{product.name}</h2>
              <span className="product-card__price">
                {currencyFormatter.format(product.price)}
              </span>
            </div>

            <dl className="product-card__details">
              <div>
                <dt>Type</dt>
                <dd>{product.type.name}</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd>{product.size}</dd>
              </div>
              <div>
                <dt>Manufacturer</dt>
                <a href={`/manufacturers/${product.manufacturer.id}/products`}>
                  {product.manufacturer.name}
                </a>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </main>
  );
}
