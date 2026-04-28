import "../css/HomePage.css";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <h1 className="home-page__title">Welcome to the Product Catalog</h1>
        <p className="home-page__description">
          Explore our dog product selection and discover clothes, food, toys,
          and everyday essentials curated with care.
        </p>
      </section>

      <section className="home-highlights" aria-label="Store highlights">
        <article className="home-highlight-card">
          <h2>Quality First</h2>
          <p>
            We focus on durable and practical products that make daily life
            easier for both pets and owners.
          </p>
        </article>
        <article className="home-highlight-card">
          <h2>Fast Browsing</h2>
          <p>
            Find what you need quickly with clear product details and clean,
            readable cards.
          </p>
        </article>
        <article className="home-highlight-card">
          <h2>Trusted Makers</h2>
          <p>
            We work with manufacturers that put comfort, safety, and quality at
            the center of their products.
          </p>
        </article>
      </section>
    </main>
  );
}
