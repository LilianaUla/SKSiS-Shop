import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCity } from '../context/CityContext';
import { getProductById } from '../data/products';
import './ProductPage.css';

function deliveryDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [tab, setTab] = useState('desc');
  const { add } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const { city } = useCity();

  if (!product) {
    return (
      <section className="page">
        <Breadcrumbs items={[
          { label: 'Главная', to: '/' },
          { label: 'Товар не найден' },
        ]} />
        <h1 className="page__title">Товар не найден</h1>
        <Link to="/products" className="page__link">← Все товары</Link>
      </section>
    );
  }

  const fav = isFavorite(product.id);

  const handleAdd = () => {
    console.log('Товар перед добавлением:', product);
    add({ id: product.id, title: product.title, price: product.price, image: product.image });
  };

  const handleFav = () => {
    toggle({ id: product.id, title: product.title, price: product.price, image: product.image });
  };

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: product.categoryName, to: `/products?cat=${product.category}` },
        { label: product.title },
      ]} />

      <div className="product">
        <div className="product__image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product__info">
          <h1 className="product__title">{product.title}</h1>
          <p className="product__price">{product.price} ₽</p>

          <div className="product__actions">
            <button className="product__btn" onClick={handleAdd}>Добавить в корзину</button>
            <button
              className={`product__fav ${fav ? 'product__fav--active' : ''}`}
              onClick={handleFav}
            >
              {fav ? '❤️' : '♡'}
            </button>
          </div>

          <div className="product__delivery">
            <h3 className="product__subtitle">Доставка</h3>
            <p className="product__text">Город доставки: <strong>{city.name}</strong></p>

            <div className="product__delivery-item">
              <p className="product__date">{deliveryDate(city.days)}</p>
              <p className="product__text">ПВЗ СДЭК, {city.pickup} ₽</p>
              <p className="product__hint">Отслеживайте в приложении СДЭК</p>
            </div>

            <div className="product__delivery-item">
              <p className="product__date">{deliveryDate(city.days)}</p>
              <p className="product__text">Курьер СДЭК, {city.courier} ₽</p>
              <p className="product__hint">Отслеживайте в приложении СДЭК</p>
            </div>
          </div>
        </div>
      </div>

      <div className="product__tabs">
        <button
          className={`product__tab ${tab === 'desc' ? 'product__tab--active' : ''}`}
          onClick={() => setTab('desc')}
        >
          Описание товара
        </button>
        <button
          className={`product__tab ${tab === 'reviews' ? 'product__tab--active' : ''}`}
          onClick={() => setTab('reviews')}
        >
          Отзывы
        </button>
      </div>

      <div className="product__tab-content">
        {tab === 'desc' && <p className="page__text">Хлопок 100%, принт «СКСиС+». Размеры S, M, L, XL.</p>}
        {tab === 'reviews' && <p className="page__text">Отзывов пока нет.</p>}
      </div>
    </section>
  );
}