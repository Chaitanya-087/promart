import { Product } from "../_models";
import { CATEGORIES } from "./categories";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Apples",
    price: 100,
    description: "500g",
    imageUrl: "https://th.bing.com/th?id=OIP.nKkm0wnm9J-Ko2rny3mAzAHaIo&w=231&h=269&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    category: CATEGORIES[0],
  },
  {
    id: 2,
    name: "Potatoes",
    price: 200,
    description: "1Kg",
    imageUrl: "https://www.nutritionadvance.com/wp-content/uploads/2018/01/small-baby-potatoes.jpg",
    category: CATEGORIES[1],
  },
  {
    id: 3,
    name: "oranges",
    price: 300,
    description: "1kg",
    imageUrl: "https://th.bing.com/th/id/OIP.CinMGnQyPZj-n8tPAoqBUwHaEw?w=312&h=199&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: CATEGORIES[0],
  },
  {
    id: 4,
    name: "Mushrooms",
    price: 200,
    description: "1Kg",
    imageUrl: "https://www.nutritionadvance.com/wp-content/uploads/2018/01/healthy-champignon-mushrooms.jpg",
    category: CATEGORIES[1],
  },
  {
    id: 5,
    name: "Kiwi",
    price: 300,
    description: "2kg",
    imageUrl: "https://th.bing.com/th/id/OIP.htrXsMCrH4Wo2KcXIROXkAHaFh?w=235&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: CATEGORIES[0],
  },
];
