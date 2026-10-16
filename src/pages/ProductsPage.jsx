import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import products from '../data/products';
import './Page.css';

export default function ProductsPage() {
  const [params] = useSearchParams();
  const cat = params.get('cat') || '';

  const list = cat ? products.filter((p) => p.category === cat) : products;

  const title =
    cat === 'tshirts' ? 'Футболки' :
    cat === 'notebooks' ? 'Блокноты' :
    cat === 'hoodies' ? 'Кофты' :
    'Все товары';

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: title },
      ]} />
      <h1 className="page__title">{title}</h1>
      <div className="page__grid">
        {list.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="page__card-link">
            <ProductCard id={p.id} title={p.title} price={`${p.price} ₽`} image={p.image} />
          </Link>
        ))}
      </div>
    </section>
  );
}