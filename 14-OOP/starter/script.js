'use strict';

/* const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Nunca crear metodos de esta manera, usar prototipos. Habria creado una copia del metodo para cada objeto.
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);

console.log(jonas);

// 1. New {} is created
// 2. function is called, this={}
// 3. {} linked to prototype
// 4.  function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(jonas instanceof Person); // true

Person.hey = function () {
  console.log('Hey there');
};

Person.hey();

//jonas.hey(); //script.js:34 Uncaught TypeError: jonas.hey is not a function

//  Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();

console.log(jonas.__proto__); //{calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (firstName, birthYear)
// [[Prototype]]: Object

console.log(Person.prototype.isPrototypeOf(jonas)); // true

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda); //Person {firstName: 'Jonas', birthYear: 1991}
console.log(jonas.species, matilda.species); //Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); //false

console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); //null

const arr = [4, 6, 6, 7, 2, 5, 3, 7, 7];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); //true

// Podemos anadir metodos al prototipo, pero no se recomienda anadir a los.
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

////////////////// 213. ES6 Classes ////////////

// class expression
//const PersonCl = class {};

// class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to .prototpe property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a propoerty that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there');
    //console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);

// console.log(jessica);

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

////////// Setters & Getters 

const walter = new PersonCl('Walter Cown', 1965);

PersonCl.hey();

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

//console.log(account.latest);

account.latest = 50;
//console.log(account.movements);

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // Una manera manual de crear el objeto
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Le asignamos un prototype manualmente
const steven = Object.create(PersonProto);

console.log(steven);

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); //true

//Otra manera de crear el objeto (init)
const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

////////////////////////////////////
///////// Inheritance Between "Classes": Constructor Functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); // Esta es la manera de "heredar"
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);
//Student.prototype = Person.prototype; De esta manera lo que haremos sera asignar el mismmo prototypo(Person), en vez de heredarlo

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');

console.log(mike);
mike.introduce();
mike.calcAge(); //metodo ehredado de Person

console.log(mike.__proto__); // Student
console.log(mike.__proto__.__proto__); // Person
console.dir(Student.prototype.constructor); // dira uqe el constructor es person, pero realmente es student

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student); //true
console.log(mike instanceof Person); //true
console.log(mike instanceof Object); //true

 ////////// ////////////////
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');

martha.introduce();
martha.calcAge();

////// Herencia en class object.create 

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');

jay.introduce();
jay.calcAge(); */

// Public fields
// Private fields
// Public methods
// Private methods

class Account {
  // Public fields. No estara creado en el prototypo. Sera instanciadas.
  locale = navigator.language;
  _movementsPublic = [];

  // Private fields. No estara creado en el prototypo. Sera instanciadas.
  #movementsPrivate = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    //Protected property. Es convencion, no lo hace protegido
    //this._movements = []; // Podemos meter  en el constructor toda la info que queramos.
    //this.locale = navigator.language;

    console.log(`Thanks for openning an account, ${owner}`);
  }

  // Esto seria lo mas parecido a una API (public interface)

  getMovements() {
    return this.#movementsPrivate;
  }

  deposit(val) {
    this.#movementsPrivate.push(val);
    return this;
  }
  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log('Helper');
  }

  // Private Methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

//acc1.movements.push(250); // No mola acceder a los datos de esta manera
///acc1.movements.push(-250);
acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoan(1000);
//acc1.approveLoan(10000); // No deberia poder acceder al metodo
//acc1.#approveLoan(10000); //SyntaxError: Private field '#approveLoan' must be declared in an enclosing class

console.log(acc1.getMovements()); // A nivel de codigo esta seria la manera de acceder a los movimietnos, no directametne a la varaiable

console.log(acc1);
//console.log(acc1.#pin); // SyntaxError: Private field '#pin' must be declared in an enclosing class

// console.log(acc1.#movementPrivate); //No funciona... en Google Chrome

Account.helper(); //Metodo estatico, static

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000); //Da error porque deposit no devuelve nada. Hay que poner un return en aquellos meotodos que queramos encadenar.
