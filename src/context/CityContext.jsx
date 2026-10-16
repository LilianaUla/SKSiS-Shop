import { createContext, useContext, useState, useEffect } from 'react';

export const CITIES = [
  { name: 'Сыктывкар', courier: 500, pickup: 200, days: 1 },
  { name: 'Ухта', courier: 600, pickup: 250, days: 2 },
  { name: 'Воркута', courier: 900, pickup: 350, days: 4 },
  { name: 'Печора', courier: 750, pickup: 300, days: 3 },
  { name: 'Инта', courier: 850, pickup: 320, days: 4 },
  { name: 'Сосногорск', courier: 550, pickup: 220, days: 2 },
  { name: 'Усинск', courier: 800, pickup: 300, days: 3 },
];

const CityContext = createContext(null);

export function CityProvider({ children }) {
  const [city, setCity] = useState(() => {
    try {
      const saved = localStorage.getItem('city');
      return saved ? JSON.parse(saved) : CITIES[0];
    } catch {
      return CITIES[0];
    }
  });

  useEffect(() => {
    localStorage.setItem('city', JSON.stringify(city));
  }, [city]);

  const changeCity = (name) => {
    const found = CITIES.find((c) => c.name === name);
    if (found) setCity(found);
  };

  return (
    <CityContext.Provider value={{ city, changeCity, cities: CITIES }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}