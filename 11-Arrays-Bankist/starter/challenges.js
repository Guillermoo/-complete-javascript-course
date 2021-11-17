'use strict';

/*

Working With Arrays 
Coding Challenge #1 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old. 
Your tasks: 

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things: 
    1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters) 
    2. Create an array with both Julia's (corrected) and Kate's data 
    3. For each remaining dog, log to the console whether it's an adult ("Dog 🐶 number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy ") 
    4. Run the function for both test datasets 
    
    Test data: 
        § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] 
        § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4] Hints: Use tools from all lectures in this section so far 😉 
        
    GOOD LUCK 😀*/
/*
//1
let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];
//2
// let dogsJulia = [9, 16, 6, 8, 3];
// let dogsKate = [10, 5, 6, 1, 4];

const checkDogs = function (julia, kate) {
  //-----------------(1)-----------
  const juliaCats = julia.slice(0, 1).concat(julia.slice(-2));

  julia.splice(3, 2);
  julia.splice(0, 1);

  console.log('Julia:' + julia);
  console.log('JuliaCats: ' + juliaCats);
  console.log('Kate: ' + kate);
  /*
  // Solución curso
  const dogsJuliaCorrected = julia.slice(); //Shallow copy
  dogsJuliaCorrected.splice(0, 1);------- FIN SAMSUNG
  dogsJuliaCorrected.splice(-2);

  //dogsJulia.slice(1,3);
  console.log(dogsJuliaCorrected);
  */
/*
  //---------------(2)---------------
  const juliaAndKate = julia.concat(kate);
  console.log('Julia & Kate: ' + juliaAndKate);

  //--------------_(3)----------
  juliaAndKate.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy `);
    }
  });
};

checkDogs(dogsJulia, dogsKate);
*/

/*
Coding Challenge #2 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study. 
Your tasks: 
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order: 
  1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4 
  2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old) 
  3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉) 
  4. Run the function for both test datasets 
Test data: 
  § Data 1: [5, 2, 4, 1, 15, 8, 3] 
  § Data 2: [16, 6, 10, 5, 6, 1, 4] 
  
GOOD LUCK 😀*/
/*
const dogAges = [5, 2, 4, 1, 15, 8, 3];
//const ages = [16, 6, 10, 5, 6, 1, 4];

// ----------------- (1)
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));

  console.log(`Dogs Age in Human Age: ${humanAges}`);
  // ---------------- (2) -------------
  const onlyAdults = humanAges.filter(function (dog) {
    return dog >= 18;
  });
  console.log(`Only adult dogs: ${onlyAdults}`);

  // -------------------- (3) ----------------
  const calcAvg =
    onlyAdults.reduce((acc, dog,i,arr) => acc + dog / arr.length, 0); //arr es el array que le llega

  console.log(`Average humang age: ${calcAvg}`);
};
const humanAges = calcAverageHumanAge(dogAges);
*/

/*Coding Challenge #3 

Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining! 
Test data: 
  § Data 1: [5, 2, 4, 1, 15, 8, 3] 
  § Data 2: [16, 6, 10, 5, 6, 1, 4] 
  GOOD LUCK 😀 */

const av1 = [5, 2, 4, 1, 15, 8, 3];
const av2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(dog => dog >= 18)
    .reduce((acc, dog, i, arr) => acc + dog / arr.length, 0); //arr es el array que le llega

console.log(calcAverageHumanAgeArrow(av1));
console.log(calcAverageHumanAgeArrow(av2));
