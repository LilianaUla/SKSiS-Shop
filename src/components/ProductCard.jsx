import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './ProductCard.css';

export default function ProductCard({ id, title, price, image }) {
  const { add } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const fav = isFavorite(id);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    add({ id, title, price, image });
  };

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({ id, title, price, image });
  };

  return (
    <article className="card">
      <div className="card__image">
        {image && <img src={image} alt={title} />}
      </div>
      <h3 className="card__title">{title}</h3>
      <p className="card__price">{price}</p>
      <div className="card__actions">
        <button type="button" className="card__btn" onClick={handleAdd}>
          Добавить в корзину
        </button>
        <button
          type="button"
          className={`card__fav ${fav ? 'card__fav--active' : ''}`}
          aria-label="В избранное"
          onClick={handleFav}
        >
          {fav ? '❤️' : '♡'}
        </button>
      </div>
    </article>
  );
}