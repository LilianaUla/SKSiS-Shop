import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import './Categories.css';

const categories = [
  { name: 'Футболки', path: '/products?cat=tshirts' },
  { name: 'Блокноты', path: '/products?cat=notebooks' },
  { name: 'Кофты', path: '/products?cat=hoodies' },
];

export default function Categories() {
  const { city, changeCity, cities } = useCity();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <nav className="categories">
      <div className="categories__city-wrap" ref={ref}>
        <button className="categories__city" onClick={() => setOpen(!open)} type="button">
          {city.name} <span className="categories__arrow">▾</span>
        </button>

        {open && (
          <ul className="categories__dropdown">
            {cities.map((c) => (
              <li key={c.name}>
                <button
                  type="button"
                  className={`categories__dropdown-item ${c.name === city.name ? 'categories__dropdown-item--active' : ''}`}
                  onClick={() => { changeCity(c.name); setOpen(false); }}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="categories__list">
        {categories.map((c) => (
          <Link key={c.name} to={c.path} className="categories__item">{c.name}</Link>
        ))}
      </div>
    </nav>
  );
}