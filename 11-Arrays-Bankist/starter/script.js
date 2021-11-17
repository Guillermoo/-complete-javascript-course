'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€.</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

calcDisplayBalance(account1.movements);

//Modifica el objeto acc(que es una variable global)
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};
calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE
console.log(arr.slice(2)); //c,d,e
console.log(arr.slice(2, 4)); //c,d
console.log(arr.slice(-2)); //e
console.log(arr.slice(1, -2)); //b,c
console.log(arr.slice()); //a,b,c,d,e
console.log([...arr]); //a,b,c,d,e

//SPLICE
//console.log(arr.splice(2)); //elimina c,d,e y deja el arr con el resto.
arr.splice(-1); // elimina e, y deja a,b,c,d en arr
console.log(arr); //a,b,c,d
arr.splice(1, 2); //elimina b y c y deja a,d (habiendo quitado ya e.)

console.log(arr); //a,d

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); //Y modifica el array
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters); //a,b,c,d,e,f,g,h,i,j
console.log(...arr, ...arr2); // No modifica arrays

// JOIN
console.log(letters.join(' - ')); //a - b - c - d - e - f - g - h - i - j
*/

/*const arr = [23,11,64];
console.log(arr[0]);
console.log(arr.at(0)); // Es lo mismo que [0]

// getting the last array element
console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
*/

/*
//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('---------');

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
*/

/*
//Maps
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); //USD: United States dollar
});

// Sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); //EUR: EUR, key  y value es lo mismo.
});
*/

const eurToUsd = 1.1;

/*
//------------------------ MAP ---------------

Map devuelve un nuevo array, no modifica el array inicial
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

// Con arrow function lo petas, es lo mimso que lo anterior
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

//Esto mismo es lo que hace map, pero es mas lioso.
const movementsUDSfor = [];
for (const mov of movements) movementsUDSfor.push(mov * eurToUsd);
console.log(movementsUDSfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

const user = 'Steven Thomas Williams'; //username: stw

//Modifica el objeto acc(que es una variable global)
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsername(accounts);

console.log(accounts);
*/
/*
// --------------- FILTER ----------------------- 
// ¡¡MAGIA!!
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

// Lo mismo que con filter. A parte de ser mas engorroso, filter es una fución  y por lo tanto permite anidar métodos.
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

console.log(depositsFor);

const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);
*/

//console.log(movements);

/*
// ---------------------  REDUCE -------------------------
// acumulator -> SNOWBALL
// Se devuelve el acc mas la suma
const balance = movements.reduce((acc, cur) => acc + cur, 0); //0 es el valor al que se empieza
console.log(balance);

// Lo mismo pero usando for of
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
*/
/*
// Maximum value
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(maxValue);
*/

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);
