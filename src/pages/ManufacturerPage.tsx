import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Product } from "../types/Product";
import "../css/ManufacturerPage.css";
import { fetchManufacturerProducts } from "../api/items";

export default function ManufacturerPage() {
  const [manufacturerProducts, setManufacturerProducts] = useState<Product[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    fetchManufacturerProducts(Number(id))
      .then((data) => {
        setManufacturerProducts(data);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });

  const manufacturerName =
    manufacturerProducts[0]?.manufacturer?.name ?? "Manufacturer";

  if (loading) {
    return (
      <main className="manufacturer-page manufacturer-page--state">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="manufacturer-page manufacturer-page--state">
        <p>Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="manufacturer-page">
      <header className="manufacturer-page__header">
        <div>
          <h1 className="manufacturer-page__title">{manufacturerName}</h1>
          <p className="manufacturer-page__subtitle">
            {manufacturerProducts.length} products
          </p>
        </div>
        <p className="manufacturer-page__lead">
          Browse the latest items from {manufacturerName}.
        </p>
      </header>

      <section aria-live="polite">
        <ul className="manufacturer-page__product-list">
          {manufacturerProducts.map((product) => (
            <li key={product.id} className="manufacturer-page__product-item">
              <div className="manufacturer-page__card-top">
                <h2 className="product-name">{product.name}</h2>
                <div className="product-price">
                  {currencyFormatter.format(product.price)}
                </div>
              </div>

              <dl className="product-meta">
                <div>
                  <dt>Type</dt>
                  <dd>{product.type.name}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{product.size}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
