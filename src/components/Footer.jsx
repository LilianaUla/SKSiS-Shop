import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <h3 className="footer__title">Контакты:</h3>
          <a href="tel:+78001234567" className="footer__link">+7 (800) 123-45-67</a>
          <a href="mailto:hello@sksis-shop.ru" className="footer__link">hello@sksis-shop.ru</a>
          <p className="footer__text">г. Сыктывкар, ул. Ленина, 1</p>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Поддержка</h3>
          <Link to="/about" className="footer__link">О нас</Link>
          <Link to="/cart" className="footer__link">Доставка и оплата</Link>
          <Link to="/about" className="footer__link">Возврат</Link>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Мы в соцсетях</h3>
          <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="footer__link">Telegram</a>
          <a href="https://vk.com/" target="_blank" rel="noopener noreferrer" className="footer__link">VK</a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="footer__link">Instagram</a>
        </div>
      </div>

      <div className="container footer__bottom">
        © 2026 SKSiS-Shop. Все права защищены.
      </div>
    </footer>
  );
}