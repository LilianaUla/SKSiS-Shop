import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { count } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__left">
          <NavLink to="/" className="header__logo" onClick={close}>
            <img src={logo} alt="SKSiS-Shop" />
          </NavLink>
          <NavLink to="/about" className="header__link" onClick={close}>О нас</NavLink>
        </div>

        <button
          className={`header__burger ${open ? 'header__burger--open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`header__nav ${open ? 'header__nav--open' : ''}`}>
          <NavLink to="/search" className="header__nav-item" onClick={close}>
            <span className="header__icon">🔍</span>
            <span>Поиск</span>
          </NavLink>
          <NavLink to="/favorites" className="header__nav-item" onClick={close}>
            <span className="header__icon">♡</span>
            <span>Избранное</span>
          </NavLink>
          <NavLink to="/account" className="header__nav-item" onClick={close}>
            <span className="header__icon">👤</span>
            <span>Войти</span>
          </NavLink>
          <NavLink to="/cart" className="header__nav-item" onClick={close}>
            <span className="header__icon">🛍</span>
            <span>Корзина{count > 0 ? ` (${count})` : ''}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}