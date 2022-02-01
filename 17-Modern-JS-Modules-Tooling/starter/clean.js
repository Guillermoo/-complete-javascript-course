'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

budget[0].value = 10000; // Se puede porque es un nivel inferior
//budget[9] = 'jonas'; // No deja

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

//spendingLimits.jay = 200;
console.log(spendingLimits); //Cannot add property jay, object is not extensible

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Version no recomendada
/* const addExpense = function (
  value,
  description,
  user = 'jonas'
) {
  //   if (!user) user = 'jonas';
  user = user.toLowerCase();

  //   let lim;
  //   if (spendingLimits[user]) {
  //     lim = spendingLimits[user];
  //   } else {
  //     lim = 0;
  //   }

  //   const limit = spendingLimits[user] ? spendingLimits[user] : 0;

  //Esta version es muy cool pero no me aclaro.
  //   const limit = spendingLimits?.[user] ?? 0;

  if (value <= getLimit(user)) {
    // budget.push({ value: -value, description: description, user: user });
    budget.push({ value: -value, description, user });
  }
};
 */

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10000, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  110,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 100, 'Stuff', 'Jay');

//
const checkExpenses = (state, limits) =>
  state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });

// for (const entry of newBudget3) {
//   let lim;

//   if (entry.value < -getLimit(limit, entry.user)) entry.flag = 'limit';
// }

/* const checkExpenses = function (state, limits) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });

  // for (const entry of newBudget3) {
  //   let lim;

  //   if (entry.value < -getLimit(limit, entry.user)) entry.flag = 'limit';
  // }
}; */

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

//Versi'on no cool
/* const checkExpenses = function () {
  for (const entry of budget) {
    let lim;
    // if (spendingLimits[entry.user]) {
    //   lim = spendingLimits[entry.user];
    // } else {
    //   lim = 0;
    // }

    // const limit = spendingLimits?.[entry.user] ?? 0;

    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
  }
}; 
checkExpenses();
*/

// Impure functions because console.log
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  console.log(bigExpenses);
};

/* const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) {
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';

    // if (entry.value <= -bigLimit) {
    //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
    // }
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
}; */

logBigExpenses(finalBudget, 500);
