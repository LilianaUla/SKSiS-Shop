import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { items, remove, changeQty, total } = useCart();

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Корзина' },
      ]} />
      <h1 className="page__title">Корзина</h1>

      {items.length === 0 && (
        <p className="page__text">Корзина пуста. Добавьте товары из каталога.</p>
      )}

      {items.map((item) => (
        <div key={`${item.id}-${item.size}`} className="cart__item">
          <div className="cart__image">
            <img src={item.image} alt={item.title} />
          </div>

          <div className="cart__info">
            <h3 className="cart__title">{item.title}</h3>
            <p className="cart__size">Размер: {item.size || 's'}</p>
            <div className="cart__icons">
              <button className="cart__del" onClick={() => remove(item.id, item.size)}>🗑</button>
            </div>
          </div>

          <div className="cart__right">
            <p className="cart__price">{item.price} ₽</p>
            <div className="cart__counter">
              <button onClick={() => changeQty(item.id, item.size, item.qty - 1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => changeQty(item.id, item.size, item.qty + 1)}>+</button>
            </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart__footer">
          <p className="cart__total">Итого: <strong>{total} ₽</strong></p>
          <Link to="/checkout" className="cart__checkout">Перейти к оформлению</Link>
        </div>
      )}
    </section>
  );
}