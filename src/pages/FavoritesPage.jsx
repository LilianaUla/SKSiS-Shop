import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const { add } = useCart();
  const { items, toggle } = useFavorites();

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Избранное' },
      ]} />

      <h1 className="page__title">Избранное</h1>

      {items.length === 0 && (
        <p className="page__text">Здесь пока пусто. Добавьте товары, нажав ♡ в каталоге.</p>
      )}

      <div className="fav-grid">
        {items.map((p) => (
          <article key={p.id} className="fav">
            <Link to={`/product/${p.id}`} className="fav__link">
              <div className="fav__image">
                <img src={p.image} alt={p.title} />
                <button
                  type="button"
                  className="fav__heart"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(p); }}
                >
                  ❤️
                </button>
              </div>
              <h3 className="fav__title">{p.title}</h3>
              <p className="fav__price">{p.price} ₽</p>
            </Link>

            <button className="fav__btn" onClick={() => add({ id: p.id, title: p.title, price: p.price, image: p.image })}>
              Добавить в корзину
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}