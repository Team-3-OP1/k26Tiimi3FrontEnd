import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import type { Product } from "../types/Product";
import "../css/ManufacturerPage.css";

export default function ManufacturerPage() {
  const [manufacturerProducts, setManufacturerProducts] = useState<Product[]>([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchManufacturerProducts() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/valmistaja/${id}/vaatteet`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch manufacturer products");
        }
        const data = (await res.json()) as Product[];
        setManufacturerProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchManufacturerProducts();
  }, [id]);

  const manufacturerName = manufacturerProducts[0]?.manufacturer?.name ?? "Manufacturer";

  return (
    <main className="manufacturer-page">
      <header className="manufacturer-page__header">
        <div>
          <h1 className="manufacturer-page__title">{manufacturerName}</h1>
          <p className="manufacturer-page__subtitle">{manufacturerProducts.length} products</p>
        </div>
        <p className="manufacturer-page__lead">Browse the latest items from {manufacturerName}.</p>
      </header>

      <section aria-live="polite">
        <ul className="manufacturer-page__product-list">
          {manufacturerProducts.map((product) => (
            <li key={product.id} className="manufacturer-page__product-item">
              <div className="manufacturer-page__card-top">
                <h2 className="product-name">{product.name}</h2>
                <div className="product-price">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "EUR",
                  }).format(product.price)}
                </div>
              </div>

              <dl className="product-meta">
                <div>
                  <dt>Type</dt>
                  <dd>{product.type}</dd>
                </div>
                <div>
                  <dt>Color</dt>
                  <dd>{product.color}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{product.size}</dd>
                </div>
              </dl>

              <div className="manufacturer-page__card-actions">
                <Link to={`/products/${product.id}`} className="btn btn--primary">
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
