// Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js';
// addToCart('bread', 4);
// console.log(price, totalQuantity);

console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('bread', 5);

// console.log(ShoppingCart.totalPrice);

import add, { cart } from './shoppingCart.js'; //default export
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); // cart no est'a vacio, quiere decir que la variable cart no es una copia, es el mismo objeto.
