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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //El método slice nos permite crear una copia del array, asi no modificamos el array que estamos iterando
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

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

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display summary
  calcDisplaySummary(acc);
  // Display balance
  calcDisplayBalance(acc);
};

let currentAccount;

// Event Handler
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  //El interrogante era para evaluar si existía el valor
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

/**--------------- 159 -----------  */

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  //console.log(amount, receiverAcc);

  inputTransferAmount.value = inputTransferTo.valued = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log(receiverAcc);
    updateUI(currentAccount);
  }
});

/* -------------160 -----------*/

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === Number(currentAccount.pin)
  ) {
    const index = accounts.findIndex(
      // con indexOf ahcemos algo parecido, pero le podemos meter una función.
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    labelWelcome.textContent = `Log in to get started`;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);

    inputLoanAmount.value = '';
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

//Ejemplo de array para trabajar
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
/*
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
*/

/**----------- 157 ---------------- */

/*const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
// Devuelve un único valor, en este caso el primer elmto que cumple esa función
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
/**------------------ 158 ---------------- */
/*
let currentAccount;

// Event Handler
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  //El interrogante era para evaluar si existía el valor
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Clear Input Fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance
    calcDisplayBalance(currentAccount.movements);

    // Display summary
    calcDisplaySummary(currentAccount);
  }
});
*/

/** ------------------- 161 ------------- */
/*
console.log(movements.includes(-130)); // Sólo devuelve true si el valor coincide en el array

// -------- SOME -----
// Con SOME podemos hace cualquier tipo de condición
const anyDepostis = movements.some(mov => mov > 5000);
// Esto es lo que hace includes
const anyDepostis2 = movements.some(mov => (mov = -130));

// ------- EVERY -----
console.log(account4.movements.every(mov => mov > 0)); //La ucenta tiene todos positivos

// Separate callback
const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/** ---------------- 162 ------------ */
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //Sólo entrará al primer nivel, (6) [Array(2), 3, 4, Array(2), 7, 8]
console.log(arrDeep.flat(2)); //Así si; (8) [1, 2, 3, 4, 5, 6, 7, 8]

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);

const AllMovements = accountMovements.flat();
console.log(AllMovements);

const overalBalance = AllMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// Mejor si anidamos toda esa operación en una sola función
const overalBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance2);

// O aun mejor. Aunque sólo hace flat a un nivel. Si hace falt amas mejor separar. flat(2)
const overalBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance3);
*/

/** ------------------------- 163 ----------------- */
/*
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); //(4) ['Adam', 'Jonas', 'Martha', 'Zach']
console.log(owners); // Ojo que modifica el array //(4) ['Adam', 'Jonas', 'Martha', 'Zach']

//Numbers
console.log(movements);
console.log(movements.sort()); // Sólo ordena strings, no números: (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

// return < 0; A,B
// return > 0; B,A
movements.sort((a, b) => {
  if (a > b) return 1; //switch order 450 > -400 -> cambiar orden -400,450
  if (b > a) return -1; // keep order
});

console.log(movements);

// LO mismo que antes pero en modo chungo
movements.sort((a, b) => a - b);
console.log(movements);

//Nos dice si el listado está ordenado
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});*/

/** ------------------ 164 --------------- */
/*
const arr = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7); //(7) [empty × 7]
console.log(x);

console.log(x.map(() => 5)); // No se rellenan los elmtos

//console.log(x.fill(1)); //[1, 1, 1, 1, 1, 1, 1]

//Si ya hay datos metidos no hace nada.
console.log(x.fill(1, 3, 5));

arr.fill(23, 2, 6); //(8) [1, 2, 23, 23, 23, 23, 7]
console.log(arr);

// Array.from. Para rellenar de manera manual el array en vez de New Array y x.fill
const y = Array.from({ length: 7 }, () => 1);
console.log(y); //(7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); //(7) [1, 2, 3, 4, 5, 6, 7]

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  // Otra manera de crear el array con los valores, pero mejor la otra manera
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];

  console.log(movementsUI2);
});
*/

/** --------------- 166 ----------------- */

// Array methods Practice
/*
// const bankDepositSum = accounts.map(acc => acc.movements).flat();
// const bankDepositSum = accounts.flatMap(acc => acc.movements);
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2. Count hwo many depostivs with at least 1000€

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000);
s

// Otra manera de hacerlo.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

//Ojo que no usamos count++. Explicacion
let a = 10;
console.log(a++); // 10. ++ devuelve el valor anterior a incrementarlo
console.log(a); // 11
//Una soución sería
console.log(++a); // 12. ++ devuelve el valor anterior a incrementarlo

console.log(numDeposits1000);

// 3.
//Create an object with the withdraw an deposit

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      //cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // Otra manera mas cool de hacerlo
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// Create a simple function to convert string to title case
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase); //Volvemos a llamar a la funcion porque si una frase empieza con una excepción no la capitalizará.
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/
