import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import './Page.css';

export default function OrderSuccessPage() {
  return (
    <section className="page page__center">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Заказ оформлен' },
      ]} />
      <h1 className="page__title">Спасибо за заказ!</h1>
      <p className="page__text">Мы свяжемся с вами в ближайшее время.</p>
      <Link to="/" className="page__link">← На главную</Link>
    </section>
  );
}