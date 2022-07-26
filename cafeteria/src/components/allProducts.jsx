let allProducts = [
  {
    name: "Tostadas con huevo",
    price: 3000,
    category: 'Desayuno',
    status: "bf",
  },
  {
    name: "Plato del día",
    price: 6000,
    category: 'Almuerzo',
    status: "lunch",
  },
  {
    name: "Expreso",
    price: 2000,
    category: 'Cafés',
    status: "always",
  },
  {
    name: "Sandwich vegano",
    price: 4000,
    category: 'Sandwiches',
    status: "lunch",
  },
  {
    name: "Moca",
    price: 2500,
    category: 'Cafés',
    status: "always",
  },
]

export function getProducts() {
  return allProducts;
}
