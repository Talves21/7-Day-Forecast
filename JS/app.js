let date = document.querySelector('.date');
let message = document.querySelector('.message');
let coordinates = document.querySelector('.location');
let temperature = document.querySelector('.temperature');
let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let long;
let lat;
let currLocation;
let currWeather;

date.innerText = `Today's Date: ${month}/${day}/${year}`;

let days = document.querySelector('.days');
days.style.display = 'none';

let forecastBtn = document.querySelector('.forecast');

let findMe = async () => {
    let success = (position) => {
        message.textContent = 'success'
        let {latitude, longitude} = position.coords;
        lat = latitude;
        long = longitude;
        locationData();
    };

    let error = () => {

    }

    navigator.geolocation.getCurrentPosition(success, error);
}

async function locationData() {
    await fetch(`https://api.weather.gov/points/${lat},${long}`)
        .then(res => res.json())
        .then(data => {
            currLocation = data;
            coordinates.innerText = `Location: ${lat.toFixed(2)}, ${long.toFixed(2)}`
            console.log(currLocation);
        })
}

async function forecastData () {
    await fetch(`https://api.weather.gov/gridpoints/AKQ/${currLocation.gridX},${currLocation.gridY}/forecast?units=us`)
        .then(res => res.json)
        .then(data => {
            currWeather = data;
            console.log(currWeather);
    })
}

forecastBtn.addEventListener('click', async () => {
    days.style.display = 'block';
    findMe();
})



