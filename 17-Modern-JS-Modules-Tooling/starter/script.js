// Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js';
// addToCart('bread', 4);
// console.log(price, totalQuantity);

/* console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';

// ShoppingCart.addToCart('bread', 5);

// console.log(ShoppingCart.totalPrice);

import add, { cart } from './shoppingCart.js'; //default export
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart); // cart no est'a vacio, quiere decir que la variable cart no es una copia, es el mismo objeto.

// console.log('Start Fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('Something');
// Aunque es await el consolelog Something no se ejecutara hasta que se cargue todo el data.

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost); // Nos devovlera un promise, lo siguiente lo soluciona

//Lo soluciona pero no es la mejor opcion
//lastPost.then(last => console.log(last));

//Esta es la mejor opcion
const lastPost2 = await getLastPost();
console.log(lastPost2);
// Conclusion, mejor no usar el await fuera de un async */

import add, { cart } from './shoppingCart.js'; //default export
add('pizza', 2);
add('bread', 5);
add('apples', 4);

// ----------- Patron module ----------------
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantiy = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantiy,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);

console.log(ShoppingCart2.shippingCost); // undefined, no se puede acceder porque la funcion no permite. Cosas de los enclousures

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 3 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;

// console.log(stateClone);

// console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

//import 'core-js/stable';
