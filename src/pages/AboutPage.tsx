import "../css/AboutPage.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-intro">
        <h1 className="about-page__title">About Us</h1>
        <p className="about-page__description">Company details at a glance.</p>
      </section>

      <section className="about-company" aria-label="Company details">
        <article className="about-card">
          <h2>Company Information</h2>
          <dl className="about-details">
            <div>
              <dt>Owners</dt>
              <dd>Team 3</dd>
            </div>
            <div>
              <dt>Founded</dt>
              <dd>2025</dd>
            </div>
            <div>
              <dt>Business ID</dt>
              <dd>1234567-8</dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
