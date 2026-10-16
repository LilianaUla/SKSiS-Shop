import { createContext, useContext, useState, useEffect } from 'react';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const USERS_KEY = 'local_users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const loading = false;

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const register = async ({ email, password, name, phone = '' }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.some((u) => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const newUser = { id: Date.now(), email, password, name, phone };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const fakeToken = 'local-' + Date.now();
    localStorage.setItem(TOKEN_KEY, fakeToken);
    setToken(fakeToken);
    setUser({ id: newUser.id, email, name, phone });
    return newUser;
  };

  const login = async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error('Неверный email или пароль');

    const fakeToken = 'local-' + Date.now();
    localStorage.setItem(TOKEN_KEY, fakeToken);
    setToken(fakeToken);
    setUser({ id: found.id, email: found.email, name: found.name, phone: found.phone });
    return found;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}