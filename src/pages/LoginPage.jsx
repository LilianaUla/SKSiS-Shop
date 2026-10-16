import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ email: form.email, password: form.password, name: form.name, phone: form.phone });
      }
      navigate('/account');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page">
      <Breadcrumbs items={[
        { label: 'Главная', to: '/' },
        { label: mode === 'login' ? 'Вход' : 'Регистрация' },
      ]} />

      <h1 className="page__title">{mode === 'login' ? 'Войти' : 'Регистрация'}</h1>

      <div className="login">
        <form className="login__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <label className="login__label">
                <span>Имя</span>
                <input type="text" className="login__input" value={form.name} onChange={handleChange('name')} required />
              </label>
              <label className="login__label">
                <span>Телефон</span>
                <input type="tel" className="login__input" value={form.phone} onChange={handleChange('phone')} />
              </label>
            </>
          )}

          <label className="login__label">
            <span>Email</span>
            <input type="email" className="login__input" value={form.email} onChange={handleChange('email')} required />
          </label>

          <label className="login__label">
            <span>Пароль</span>
            <input type="password" className="login__input" value={form.password} onChange={handleChange('password')} required minLength={4} />
          </label>

          {error && <p className="login__error">{error}</p>}

          <button className="login__btn" type="submit" disabled={submitting}>
            {submitting ? 'Отправка…' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <p className="login__switch">
          {mode === 'login' ? (
            <>Нет аккаунта? <button type="button" className="login__switch-btn" onClick={() => { setMode('register'); setError(null); }}>Зарегистрироваться</button></>
          ) : (
            <>Уже есть аккаунт? <button type="button" className="login__switch-btn" onClick={() => { setMode('login'); setError(null); }}>Войти</button></>
          )}
        </p>
      </div>
    </section>
  );
}