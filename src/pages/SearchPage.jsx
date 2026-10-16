import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './SearchPage.css';

export default function SearchPage() {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();

  const results = query
    ? products.filter((p) => p.title.toLowerCase().includes(query))
    : [];

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Поиск' },
      ]} />
      <h1 className="page__title">Поиск</h1>

      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Что ищем? Например, футболка"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {!query && <p className="page__text">Начните вводить название товара.</p>}

      {query && results.length === 0 && (
        <p className="page__text">По запросу «{q}» ничего не найдено.</p>
      )}

      {results.length > 0 && (
        <div className="page__grid">
          {results.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="page__card-link">
              <ProductCard id={p.id} title={p.title} price={`${p.price} ₽`} image={p.image} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}