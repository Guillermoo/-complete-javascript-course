'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  console.log(data);
  const html = `
          <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${
                Object.values(data.languages)[0]
              }</p>
              <p class="country__row"><span>💰</span>${
                Object.values(data.currencies)[0].name
              }</p>
              </div>
              </article>
              `;
  countriesContainer.insertAdjacentHTML('beforeend', html);

  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

/* const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); //destructuring
    console.log(data);
    const html = `
        <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
            </article>
            `;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    //countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa'); */

/*
const getCountryDataAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); //destructuring
    console.log(data);

    //Render Country 1
    renderCountry(data);

    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

//getCountryDataAndNeighbour('portugal');
getCountryDataAndNeighbour('usa');
 */

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v2/name/${country}`);
//     request.send();}

//////////// PROMISES FUNCTIONS //////////////////////

// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// // Es lo mismo que lo anterior, pero en plan reducido.
const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      //data es lo que vuelve el anterior then
      renderCountry(data[0]);
      const neighbour = data[0].borders;
      if (!neighbour) throw new Error('No neighbour found');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        'Country neighbourg not found'
      );
    })

    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      //este catch es como el handle en el then, pero global. Para cuando est'an encadeandos.
      console.error(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      // Siempre se ejecutara pase lo que pase(error o no)
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

//En esta version hay mucho codigo duplicado con los response, la version de arriba es la optimizada
// const getCountryDataSinOpt = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(`Country not found. ${response.status}`); // el error lo recogera el catch. Si no hubiese nada definido saldria msg por defecto.

//         return response.json();
//       }
//       //  err => alert(err) // catch the error, handle errror
//     )
//     .then(data => {
//       //data es lo que vuelve el anterior then
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`);
//       //return 23;
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found. ${response.status}`); // el error lo recogera el catch. Si no hubiese nada definido saldria msg por defecto.

//       return response.json();
//     }) // response esl oque devuelve el anterior then (fetch(neighbour))
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       //este catch es como el handle en el then, pero global. Para cuando est'an encadeandos.
//       console.error(`${err}`);
//       renderError(`Something went wrong ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       // SIempre se ejecutara pase lo que pase(error o no)
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

//getCountryData('portugal');

//////////////// The event loop //////////////////
//////////////////////////////////////////////
// console.log('Test start');

// setTimeout(() => console.log('0 sec timer'), 0);

// Promise.resolve('Resolver promise 1').then(res => console.log(res));

// Promise.resolve('Resolver promise 2').then(res => {
//   for (let i = 0; i < 10000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end');

//La microtask se ejecuta primero y el resto tiene que esperar. Por eso se ejecuta antes las promises que el setTimeout
//Test start
// script.js:228 Test end
// script.js:222 Resolver promise 1
// script.js:226 Resolver promise 2
// script.js:220 0 sec timer;
/////////////  Create promises ////////////////////////////
///////////////////////////////////////////////////
// Manejar errores
/* const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happenning');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WIN '); //Esto es lo que devolvera el primer then.
    } else {
      reject(new Error('You lost your money')); // En el catch saldra en el error
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    // No ponemos reject porqeu el temporizador nunca va a fallar
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    // Todo el codigoq ue uqeramos tras 2 seg
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    // Todo el codigoq ue uqeramos tras 2 seg
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    // Todo el codigoq ue uqeramos tras 2 seg
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

Promise.resolve('asdc').then(x => console.log(x));
Promise.reject(new Error('Problem')).catch(x => console.log(x));

// Lo que se ejecutra del c'odigo anterior.

// Lottery draw is happenning
// script.js:278 asdc
// script.js:279 Error: Problem at script.js:279
// script.js:262 1 second passed
// script.js:250 You WIN
// script.js:267 2 second passed
// script.js:272 3 second passed
// script.js:276 4 second passed
 */

///////////// Promisifying Geolocatio API ////////////
//////////////////////////////////////////////////

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// console.log('Getting position'); // Se ejecutara antes que el getCurrentPosition

//1
const whereAmI = function () {
  getPosition()
    .then(pos => {
      console.log(pos.coords);
      const { latitude: lat, longitude: lng } = pos.coords;

      //      const { lat = latitude, lng = longitude } = pos.coords;
      console.log(lat, lng);
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      //console.log(response.json());
      if (response.status === 403)
        throw new Error(`Too many request, Status code: ${response.status}`);
      if (response.type === 'error')
        throw new Error(
          `Houston tenemos un problema, Status code: ${response.status}`
        );
      return response.json();
    })
    .then(data => {
      if (!data) throw new Error(`No encontramos nada: ${response.status}`);

      //3
      const msg = `
      Your are in ${data.city}, ${data.country}
      `;
      console.log(msg);
      // console.log(data.country);

      getCountryData(data.country);
      //getCountryData(data.country);
      //renderCountry(data);

      // console.log(msg);
    })
    //4
    .catch(err => console.error('Error catch: ', err.message));

  //   console.log(getCountry.json());
};

btn.addEventListener('click', whereAmI);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // Esta es la manera sin acortar
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position), // devolvera la posicion en el then
    //   err => reject(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));
