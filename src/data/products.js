import tshirt1 from '../assets/products/tshirt-1.jpg';
import tshirt2 from '../assets/products/tshirt-2.jpg';
import notebook from '../assets/products/notebook.jpg';
import hoodie from '../assets/products/hoodie.jpg';

const tshirtNames = [
  'Футболка СКСиС', 'Футболка oversize', 'Футболка белая',
  'Футболка чёрная', 'Футболка с принтом', 'Футболка базовая',
  'Футболка поло', 'Футболка с логотипом', 'Футболка с карманом',
  'Футболка хлопок',
];
const notebookNames = [
  'Блокнот А5', 'Блокнот А4', 'Блокнот в клетку',
  'Блокнот в линейку', 'Блокнот на пружине', 'Блокнот кожаный',
  'Блокнот с закладкой', 'Блокнот в точку', 'Блокнот мини',
  'Блокнот подарочный',
];
const hoodieNames = [
  'Кофта с капюшоном', 'Кофта oversize', 'Кофта на молнии',
  'Кофта серая', 'Кофта чёрная', 'Кофта с принтом',
  'Кофта тёплая', 'Кофта с карманом', 'Кофта базовая',
  'Кофта спортивная',
];

const products = [];

tshirtNames.forEach((title, i) => {
  products.push({
    id: i + 1,
    title,
    price: 1500 + i * 100,
    image: i % 2 === 0 ? tshirt1 : tshirt2,
    category: 'tshirts',
    categoryName: 'Футболки',
  });
});

notebookNames.forEach((title, i) => {
  products.push({
    id: 11 + i,
    title,
    price: 300 + i * 50,
    image: notebook,
    category: 'notebooks',
    categoryName: 'Блокноты',
  });
});

hoodieNames.forEach((title, i) => {
  products.push({
    id: 21 + i,
    title,
    price: 2500 + i * 150,
    image: hoodie,
    category: 'hoodies',
    categoryName: 'Кофты',
  });
});

export default products;

export function getProductById(id) {
  return products.find((p) => p.id === Number(id)) || null;
}