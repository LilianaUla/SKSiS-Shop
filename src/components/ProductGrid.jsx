import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import products from '../data/products';
import './ProductGrid.css';

export default function ProductGrid() {
  const featured = [products[0], products[1], products[10], products[20]];

  return (
    <section className="grid">
      {featured.map((p) => (
        <Link key={p.id} to={`/product/${p.id}`} className="grid__link">
          <ProductCard id={p.id} title={p.title} price={p.price} image={p.image} />
        </Link>
      ))}
    </section>
  );
}