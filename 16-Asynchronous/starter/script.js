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

// Es lo mismo que lo anterior, pero en plan reducido.
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
