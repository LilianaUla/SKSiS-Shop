import Breadcrumbs from '../components/Breadcrumbs';
import aboutImage from '../assets/about.png';
import './AboutPage.css';

const features = [
  {
    title: 'Уникальные принты',
    text: 'Каждый дизайн — авторская работа наших иллюстраторов. Такого принта вы не найдёте в масс-маркете — тиражи ограничены и обновляются каждый сезон.',
  },
  {
    title: 'Качественные материалы',
    text: 'Используем плотный хлопок 100% (180 г/м²) и футер с начёсом для кофт. Ткань не скатывается, не растягивается и сохраняет цвет после стирок.',
  },
  {
    title: 'Стойкая печать',
    text: 'Печатаем методом DTF и шелкографии — рисунок не трескается, не выцветает и выдерживает более 50 стирок при 40°C.',
  },
  {
    title: 'Практичность в любых условиях',
    text: 'Вещи одинаково удобны в городе, в поездке и на учёбе. Крой продуман так, чтобы не стеснять движения и подходить под любой образ.',
  },
];

export default function AboutPage() {
  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'О нас' },
      ]} />

      <h1 className="page__title">SKSiS_Shop это</h1>

      <div className="about">
        <div className="about__image">
          <img src={aboutImage} alt="SKSiS-Shop" />
        </div>

        <div className="about__features">
          {features.map((f) => (
            <div key={f.title} className="about__feature">
              <h3 className="about__feature-title">{f.title}</h3>
              <p className="about__feature-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}