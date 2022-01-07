'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Tabber component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Page navigation
//console.log(document.documentElement);
//console.log(document.head);
//console.log(document.body);
/*
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and instering element
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookied for improved funcionatliy and analytics.';
message.innerHTML =
  'We use cookied for improved funcionatliy and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//header.prepend(message);
//header.append(message.cloneNode(true)); // SI queremos que haya dos message
header.append(message);

//header.before(message);
//header.after(message);

// Delete element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // No duelve nada poruqe no se ha fijado por js (inline)
console.log(message.style.backgroundColor); //rgb(187, 187, 187)

console.log(getComputedStyle(message).color); //Para obtener valores del css

message.style.height = getComputedStyle(message).height + 40 + 'px'; // No pasa nada porque lo convierte a String

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'; // Se asignaria el valor por js

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //Bankist logo
logo.alt = 'Beautifil minimalist logo';

console.log(logo.src); //http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png
console.log(logo.className); //nav__logo

// Non-standard
console.log(logo.designer); //undefined (al no ser estandard no lo detecta)
console.log(logo.getAttribute('designer')); // Jonas (lo he puesto yo a mano)

logo.setAttribute('company', 'Bankinst'); //En el html metera company='Bankist'

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/#

console.log(link.getAttribute('href')); // #

// Data attributes
console.log(logo.dataset.versionNumber); //para pillar el data-version-number

// Classes
logo.classList.add('c'); // class="nav__logo c"
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use it!!!, quitar'a todas las clases ya puestas
//logo.className = 'jonas'; // class="jonas" , quita el "nav_logo c"
*/

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // target es btnScrollTo

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrooling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  //  window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////
// Page navigation

// De esta manera se creara el codigo para cada nav__link
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Event delegation: Seleccionamos el nodo padre y cribamos
// 1. Add evnet listener to common parent element
// 2. Determine what element origiante the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/* const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! Your are reading the heading :D');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // Con temporizador

// h1.onmouseenter = function (e) {
//   alert('onmouse: Great! Your are reading the heading :D');
// }; //Esta manera es mas rococo
 */

/** 191 */

/* const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 244)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  //e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINKS', e.target, e.currentTarget); //target es nav__link, currentTarget es nav__links
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  //true //Si ponemos true el doom va de abajo a arriba: nav->link->links, solo catching, con false o por defecto hace catching, boobling y el doom es de arriba a abajo.
);
 */
/*
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); //NodeList(2) [span.highlight, span.highlight]
console.log(h1.childNodes); //NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.children); // HTMLCollection(3) [span.highlight, br, span.highlight]

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)'; // El h1 mismamente

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); // Recoger todos los hijos del padre

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
}); //Despliega los elementos que hay en el header (hijos del padre de h1), y si no es el mimso h1 los reduce.
*/

//Tabbed component
//Esta es la manera NO optima.
//tabs.forEach(t => t.addEventListener('click', () => console.log('TAB')));

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); //Se selecciona de esta manaera porque si no pillamos el span cuando pinchamos en el <span>numero<span>.

  // Guard Clause
  if (!clicked) return; //Si no hay nada clickado sale del evento

  // Remove active tab, and add Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // Si usamos bind se pasa el valor
    });

    logo.style.opacity = this;
  }
};

// De esta manera no funciona porque el eventlistener espera una funcion como segundo parametro y no un valor (que es lo que devuelve handleHover).
// nav.addEventListener('mouseover', handleHover(e,0.5));

// De esta manera se podria hacer y se soluciona
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
//});

// Esta seria la version pro. Passing "argument" into handler,
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/// //
////////////////Sticky navigation

// Este evento usa mucha memoria, mejor no usar
// const initialCoords = section1.getBoundingClientRect();
// //console.log(window.scrollY);
// window.addEventListener('scroll', function () {
//   console.log(initialCoords.top);
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigataion: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptons = {
//   root: null,
//   threshold: [0, 0.2], //Saltara cuando section1 este a 0 o a 20% del top
// };

// const observer = new IntersectionObserver(obsCallback, obsOptons);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threslhold: 0,
  rootMaring: `-${navHeight}px`,
});

headerObserver.observe(header);

//Reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  //  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target); //Para que deje de observar una vez se ha cargado
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
});

///////////////////////
//////// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threslhold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////
/////// Slider

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  //Prev slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(curSlide);
  };

  init();

  // Event handler
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //////// Key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); // Otra manera de hacerlo
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //destructuring
      goToSlide(slide);
    }
  });
};

slider();

//////
// 202 LifeCycle DOM Events
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page Fully loaded', e);
});
