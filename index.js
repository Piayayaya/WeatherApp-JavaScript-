const weatherForm = document.querySelector(".weatherForm");
const inputCity = document.querySelector(".inputCity");
const apiKey = "bd5e378503939ddaee76f12ad7a97608";
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = inputCity.value;
    const weatherData = await getWeatherInfo(city);
    displayWeatherInfo(weatherData);

});

function displayWeatherInfo(weatherData){
    card.textContent = "";
    card.style.display = "flex";

    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = weatherData;
    
    const displayCity = document.createElement("h2");
    const displayTemp = document.createElement("p");
    const displayHumidity = document.createElement("p");
    const displayDesc = document.createElement("p");
    const displayEmoji = document.createElement("p");

    displayCity.classList.add("displayCity");
    displayTemp.classList.add("displayTemp");
    displayHumidity.classList.add("displayHumidity");
    displayDesc.classList.add("displayDesc");
    displayEmoji.classList.add("displayEmoji");

    displayCity.textContent = city;
    displayTemp.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)} ºF`;
    displayHumidity.textContent = `Humidity: ${humidity}%`;
    displayDesc.textContent = description;
    displayEmoji.textContent = displayWeatherEmoji(id);
    
    card.appendChild(displayCity);
    card.appendChild(displayTemp);
    card.appendChild(displayHumidity);
    card.appendChild(displayEmoji);
    card.appendChild(displayDesc);
}
async function getWeatherInfo(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            displayErrorMessage("City not Found!");
        }
        return await response.json();
    }
    catch(error){
        displayErrorMessage("Failed to fetch data!");
    } 
}

function displayErrorMessage(message){
    card.textContent = "";
    card.style.display = "flex";

    const displayError = document.createElement("p");
    displayError.classList.add("displayError");
    displayError.textContent = message;

    card.appendChild(displayError);
}

function displayWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌦️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 701 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌤️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🤔";
    }
}