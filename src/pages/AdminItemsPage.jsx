import { useState, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import products from '../data/products';
import './AdminItemsPage.css';

export default function AdminItemsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const limit = 10;

  const filtered = useMemo(() => {
    let list = [...products];
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (category) list = list.filter((p) => p.category === category);

    list.sort((a, b) => {
      const va = a[sort];
      const vb = b[sort];
      if (typeof va === 'string') {
        return order === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return order === 'asc' ? va - vb : vb - va;
    });
    return list;
  }, [search, category, sort, order]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const pageItems = filtered.slice((page - 1) * limit, page * limit);

  const handleSort = (field) => {
    if (sort === field) setOrder(order === 'asc' ? 'desc' : 'asc');
    else { setSort(field); setOrder('asc'); }
    setPage(1);
  };

  const sortIcon = (field) => (sort === field ? (order === 'asc' ? ' ↑' : ' ↓') : '');

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: 'Админка — товары' },
      ]} />

      <h1 className="page__title">Товары из базы данных</h1>

      <div className="table-filters">
        <input
          type="text"
          placeholder="Поиск по названию…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="table-filters__input"
        />
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="table-filters__select"
        >
          <option value="">Все категории</option>
          <option value="tshirts">Футболки</option>
          <option value="notebooks">Блокноты</option>
          <option value="hoodies">Кофты</option>
        </select>
      </div>

      {pageItems.length === 0 && <p className="state">Ничего не найдено</p>}

      {pageItems.length > 0 && (
        <>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>ID{sortIcon('id')}</th>
                  <th onClick={() => handleSort('title')}>Название{sortIcon('title')}</th>
                  <th>Категория</th>
                  <th onClick={() => handleSort('price')}>Цена{sortIcon('price')}</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p) => (
                  <tr key={p.id}>
                    <td data-label="ID">{p.id}</td>
                    <td data-label="Название">{p.title}</td>
                    <td data-label="Категория">{p.categoryName}</td>
                    <td data-label="Цена">{p.price} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>← Назад</button>
            <span>Страница {page} из {pages} · всего {total}</span>
            <button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>Вперёд →</button>
          </div>
        </>
      )}
    </section>
  );
}