//Define our global variables//
const clockInterval = 500
const weatherInterval = 600000
let currentHour = 0

//Listen for the window load event and trigger our functions//
window.addEventListener('load', () => {
  weather()
  clock()
})

//Weather//
function weather() {
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  )
  const temperatureDegree = document.querySelector('.celsius-degree')
  const locationTimeZone = document.querySelector('.location-timezone')
  const API_KEY = `383a2273389075863a163b208a0b6911` //token or key

  //getCurrent method on geolocation object
  return navigator.geolocation.getCurrentPosition((position) => {
    if (position) {
      const { longitude, latitude } = position.coords
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      fetch(api)
        .then((data) => data.json()) //json parser
        .then((res) => {
          const temperature = res.main.temp
          const temperatureCelsius = temperature - 273.15
          const country =
            res.sys.country === 'GB' ? 'Great Britain' : res.sys.country
          temperatureDescription.textContent = res.weather[0].description
          temperatureDegree.textContent = `${temperatureCelsius.toFixed(2)}`
          locationTimeZone.textContent = `${res.name}, ${country}`
        })
    }
  })
}
//Digital Clock//

function clock() {
  let hours = document.querySelector('#hour')
  let minutes = document.querySelector('#minutes')
  let seconds = document.querySelector('#seconds')

  return setInterval(() => {
    setClock(hours, minutes, seconds)
  }, clockInterval)
}

// function setClock(hours, minutes, seconds) {
//   let h = new Date().getHours()
//   let m = new Date().getMinutes()
//   let s = new Date().getSeconds()

//   hours.textContent = h
//   minutes.textContent = m
//   seconds.textContent = s
// }

function setClock(hours, minutes, seconds) {
  let [hour, minute, second] = new Date().toLocaleTimeString().split(':')
  currentHour = hour

  hours.textContent = hour
  minutes.textContent = minute
  seconds.textContent = second
}
//To Do List//
const addToDoButton = document.querySelector('#addToDo')
const toDoContainer = document.querySelector('#toDoContainer')
const inputField = document.querySelector('#inputField')

const addToList = () => {
  const paragraph = document.createElement('p')
  paragraph.classList.add('paragraph-styling')
  paragraph.innerText = inputField.value
  toDoContainer.appendChild(paragraph)
  inputField.value = ''
  inputField.focus()
  paragraph.addEventListener('click', () => {
    paragraph.style.textDecoration = 'line-through'
  })
}
inputField.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    addToList()
  }
})

addToDoButton.addEventListener('click', addToList)
