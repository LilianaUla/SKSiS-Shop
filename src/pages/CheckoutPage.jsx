import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { useCity } from '../context/CityContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { city } = useCity();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    delivery: 'pickup',
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const deliveryPrice = form.delivery === 'courier' ? city.courier : city.pickup;
  const grandTotal = total + (items.length ? deliveryPrice : 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orders = JSON.parse(localStorage.getItem('local_orders') || '[]');
    orders.push({
      id: Date.now(),
      date: new Date().toISOString(),
      items,
      form,
      city: city.name,
      deliveryPrice,
      grandTotal,
    });
    localStorage.setItem('local_orders', JSON.stringify(orders));

    clear();
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <section className="page">
        <Breadcrumbs items={[
          { label: 'Главная', to: '/' },
          { label: 'Оформление' },
        ]} />
        <h1 className="page__title">Оформление заказа</h1>
        <p className="page__text">Корзина пуста.</p>
        <Link to="/products" className="page__link">← В каталог</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Корзина', to: '/cart' },
        { label: 'Оформление' },
      ]} />

      <h1 className="page__title">Оформление заказа</h1>

      <div className="checkout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <label className="checkout__label">
            <span>ФИО</span>
            <input type="text" className="checkout__input" value={form.name} onChange={handleChange('name')} required />
          </label>

          <label className="checkout__label">
            <span>Телефон</span>
            <input type="tel" className="checkout__input" value={form.phone} onChange={handleChange('phone')} required />
          </label>

          <label className="checkout__label">
            <span>Адрес (город {city.name})</span>
            <input type="text" className="checkout__input" value={form.address} onChange={handleChange('address')} required />
          </label>

          <fieldset className="checkout__fieldset">
            <legend className="checkout__legend">Способ доставки</legend>

            <label className="checkout__radio">
              <input type="radio" name="delivery" value="pickup" checked={form.delivery === 'pickup'} onChange={handleChange('delivery')} />
              ПВЗ СДЭК — {city.pickup} ₽
            </label>

            <label className="checkout__radio">
              <input type="radio" name="delivery" value="courier" checked={form.delivery === 'courier'} onChange={handleChange('delivery')} />
              Курьер СДЭК — {city.courier} ₽
            </label>
          </fieldset>

          <button className="checkout__btn" type="submit">Подтвердить заказ</button>
        </form>

        <aside className="checkout__summary">
          <h3 className="checkout__summary-title">Ваш заказ</h3>

          <ul className="checkout__items">
            {items.map((i) => (
              <li key={`${i.id}-${i.size}`} className="checkout__item">
                <span>{i.title} × {i.qty}</span>
                <span>{i.price * i.qty} ₽</span>
              </li>
            ))}
          </ul>

          <div className="checkout__row"><span>Товары</span><span>{total} ₽</span></div>
          <div className="checkout__row"><span>Доставка</span><span>{deliveryPrice} ₽</span></div>
          <div className="checkout__row checkout__row--total"><span>Итого</span><span>{grandTotal} ₽</span></div>
        </aside>
      </div>
    </section>
  );
}