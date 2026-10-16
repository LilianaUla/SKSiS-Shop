import { Link } from 'react-router-dom';
import './Page.css';

export default function NotFoundPage() {
  return (
    <section className="page page__center">
      <h1 className="page__title">404</h1>
      <p className="page__text">Страница не найдена</p>
      <Link to="/" className="page__link">← На главную</Link>
    </section>
  );
}