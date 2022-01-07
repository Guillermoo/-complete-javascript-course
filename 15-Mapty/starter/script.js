'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10); //Creamos un id en funcion de la hora para ahorrarnos generarlo con una libreria

  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; /// in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // Haria de public interface
  //   click() {
  //     this.clicks++;
  //   }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, ditance, duration, cadence) {
    super(coords, ditance, duration);
    this.cadence = cadence;

    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, ditance, duration, elevationGain) {
    super(coords, ditance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycle1 = new Cycling([39, -12], 27, 95, 523);

//////////////////////////////////////
// APPLICATION ARCHITECTURA

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const controls = document.querySelector('.workout__controls');

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;
  #editMode;
  #markers = [];
  #tabToEdit;

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkOut.bind(this)); // Bind: Queremos que se apunte a App, no a form

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener(
      'click',
      this._handleClickWorkout.bind(this)
    );
  }

  //Get position by gps
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // si no hacemos bind no podra acceder a las variables de App
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  // Al iniciar la app
  _loadMap(position) {
    const coords = [position.coords['latitude'], position.coords['longitude']];

    // map('map') es el id del div
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr./hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Hacemos click en cualquierpunto
    this.#map.on('click', this._showForm.bind(this));

    //Get all localStorage workouts and print on map
    this.#workouts.forEach(work => {
      this._renderWorkoutMaker(work);
    });
  }

  // _showForm(mapE) {
  //   this.#mapEvent = mapE;
  //   form.classList.remove('hidden');
  //   inputDistance.focus();
  // }

  // To enhance the selected tab
  _handleWorkOutList(list, id) {
    list.forEach(l => {
      if (l.tagName === 'LI') {
        l.classList.remove('workout__selected');
        // If we pick up the workout
        if (l.dataset.id === id && this.#editMode)
          l.classList.add('workout__selected');
      }
    });
  }

  //mapE corresponde al workout tab, work es el objeto workout
  _showForm(mapE, work) {
    this.#mapEvent = mapE;

    // Mostramos el form
    form.classList.remove('hidden');
    inputDistance.focus();

    //Edit mode.
    if (work) {
      this.#editMode = true;

      //const { lat, lng } = work.coords;

      //Le ponemos al form el valor del workout que queremo editar
      form.setAttribute('data-id', work.id);

      //Activar elemento que vamos a editar
      this._handleWorkOutList(
        mapE.target.parentNode.parentNode.parentNode.parentNode.childNodes,
        work.id
      );

      this.#mapEvent.latlng = work.coords;
      inputDistance.value = work.distance;
      inputDuration.value = work.duration;

      if (work.type !== inputType.value) this._toggleElevationField();

      if (work.type === 'running') {
        inputType.value = 'running';
        inputCadence.value = work.cadence;
      }
      if (work.type === 'cycling') {
        inputType.value = 'cycling';
        inputElevation.value = work.elevationGain;
      }
    } else {
      //Estamos creando un objeto
      this.#editMode = false;
      this._clearForm();

      //We clean the list
      this._handleWorkOutList(containerWorkouts.childNodes, 1);
    }
  }

  _clearForm() {
    //Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.dataset.id = '';

    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _hideForm() {
    //Empty inputs

    form.style.display = 'none';
    form.classList.add('hidden');

    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _editWorkout(e, distance, duration, value) {
    const workoutEl = e.target;

    const workoutToEdit = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    //this._showFormToEdit(this, workout);

    if (!workoutEl) return;
    if (!workoutToEdit) return;

    this.#workouts.forEach(wrk => {
      if (wrk.id === workoutEl.dataset.id) {
        wrk.coords = this.#mapEvent.latlng;
        workoutEl.distance = wrk.distance = distance;
        workoutEl.duration = wrk.duration = duration;
        wrk.type === 'running'
          ? (workoutEl.cadence = wrk.cadence = value)
          : (workoutEl.elevationGain = wrk.elevationGain = value);
      }
    });

    this._setLocalStorage();

    this._clearForm();
    this._hideForm();
    this._renderWorkoutList(workoutToEdit);
  }

  _newWorkOut(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value; // value es una propiedad que hemos puesto en el html
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    const { lat, lng } = this.#mapEvent.latlng;

    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid

      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');
      if (this.#editMode) {
        this._editWorkout(e, distance, duration, cadence);
        return;
      }
      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration);
      if (this.#editMode) {
        this._editWorkout(e, distance, duration, elevation);
        return;
      }
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMaker(workout);

    // Render workout on list
    this._renderWorkoutList(workout);

    //Clear input fields
    this._clearForm();
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMaker(workout) {
    const marker = L.marker(workout.coords, { riseOnHover: true })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    this.#markers.push(marker);
    workout.markerId = marker._leaflet_id;
  }

  // If editMode add  tab and remove old one.
  _renderWorkoutList(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <div class="workout__title--container">
              
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__controls">
          <i class="far fa-edit" data-type ='edit' data-id="${workout.id}"></i>
          <i class="far fa-trash-alt" data-type ='delete'></i>
        </div>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
      </div>
      `;

    if (workout.type === 'running')
      html += `
    <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.pace.toFixed(1)}</span>
        <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>`;

    if (workout.type === 'cycling')
      html += `
    <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
    </div>
    </li>
          `;

    if (this.#editMode) {
      this.#tabToEdit.insertAdjacentHTML('afterend', html);
      this.#tabToEdit.remove();
      return;
    }
    form.insertAdjacentHTML('afterend', html);
  }

  //When we click on a workout already created
  _handleClickWorkout(e) {
    const workoutEl = e.target.closest('.workout');
    if (!workoutEl) return;
    this.#tabToEdit = workoutEl;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    if (!workout) return;

    this._moveToPopup(e);

    if (e.target.classList.contains('fa-edit')) {
      this.#editMode = true;
      this._showForm(e, workout);
    }
    if (e.target.classList.contains('fa-trash-alt')) {
      this.#editMode = false;
      this._deleteWorkout(workout);
    }
  }

  // Remove from list, marker and object on localstorage
  _deleteWorkout(workout) {
    this.#markers.forEach(mark => {
      if (mark._leaflet_id === workout.markerId) {
        this.#map.removeLayer(mark);
        this.#tabToEdit.remove();
        this.#workouts.splice(this.#workouts.indexOf(workout), 1);
        this._setLocalStorage();

        this._hideForm();
      }
    });
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // Using the public interface
    //workout.click(); // Al pasar a json y luego a objeto se pierde al herencia. Al reiniciar no heredara la funcion click()
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    //console.log(data); // Al pasar a json y luego a objeto se pierde al herencia. Al reiniciar no heredara la funcion click()

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => this._renderWorkoutList(work, 'create'));
  }

  // Si quisieramos eliminar lo almacenado
  reset() {
    localStorage.removeItem('workouts');
    location.reload(); //Recarga la pagina
  }
}

const app = new App();
