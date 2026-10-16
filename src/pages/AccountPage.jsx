import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import LoginPage from './LoginPage';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './AccountPage.css';

export default function AccountPage() {
  const { user, logout, loading } = useAuth();
  const { count } = useCart();
  const { items: favorites } = useFavorites();
  const [tab, setTab] = useState('profile');

  if (loading) {
    return (
      <section className="page">
        <h1 className="page__title">Личный кабинет</h1>
        <p className="page__text">Загрузка…</p>
      </section>
    );
  }

  if (!user) return <LoginPage />;

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Личный кабинет' },
      ]} />

      <h1 className="page__title">Личный кабинет</h1>

      <div className="account">
        <aside className="account__menu">
          <button
            className={`account__menu-item ${tab === 'profile' ? 'account__menu-item--active' : ''}`}
            onClick={() => setTab('profile')}
          >
            Профиль
          </button>
          <button
            className={`account__menu-item ${tab === 'orders' ? 'account__menu-item--active' : ''}`}
            onClick={() => setTab('orders')}
          >
            Мои заказы
          </button>
          <button
            className={`account__menu-item ${tab === 'favorites' ? 'account__menu-item--active' : ''}`}
            onClick={() => setTab('favorites')}
          >
            Избранное {favorites.length > 0 && `(${favorites.length})`}
          </button>
          <button className="account__menu-item" onClick={() => { logout(); setTab('profile'); }}>
            Выйти
          </button>
        </aside>

        <div className="account__content">
          {tab === 'profile' && (
            <>
              <div className="account__head">
                <div className="account__avatar"></div>
                <div>
                  <p className="account__name">{user.name}</p>
                  <p className="account__email">{user.email}</p>
                  {user.phone && <p className="account__email">{user.phone}</p>}
                </div>
              </div>

              <div className="account__card">
                <h3 className="account__card-title">Личные данные</h3>

                <label className="account__label">
                  <span>Фамилия и имя</span>
                  <input type="text" className="account__input" defaultValue={user.name} disabled />
                </label>

                <label className="account__label">
                  <span>Телефон</span>
                  <input type="tel" className="account__input" defaultValue={user.phone || ''} disabled />
                </label>

                <label className="account__label">
                  <span>Почта</span>
                  <input type="email" className="account__input" defaultValue={user.email} disabled />
                </label>
              </div>
            </>
          )}

          {tab === 'orders' && (
            <div className="account__empty">
              <h3 className="account__card-title">Мои заказы</h3>
              <p className="account__text">Заказы сохраняются в браузере.</p>
              <p className="account__text">В корзине сейчас: <strong>{count}</strong> товар(ов).</p>
              <Link to="/products" className="account__link">Перейти в каталог</Link>
            </div>
          )}

          {tab === 'favorites' && (
            <div className="account__empty">
              <h3 className="account__card-title">Избранное</h3>
              <p className="account__text">У вас {favorites.length} товар(ов) в избранном.</p>
              <Link to="/favorites" className="account__link">Открыть избранное</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}