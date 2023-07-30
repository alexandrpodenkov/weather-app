const tempContainer = document.querySelector('.temp-container');
const errorContainer = document.querySelector('.error-container');
const container = document.querySelector('.container');
const searchButton = document.getElementById('searchButton');
const weatherDetails = document.querySelector('.weather-details');

searchButton.addEventListener('click', getWeather)

async function getWeather(){

    errorContainer.style.display = 'none';
    tempContainer.style.display = 'none';

    const city = document.getElementById('searchInput').value;
    if(city === ''){
        container.style.height = '128px';
        return
        }

    const apiKey = "8212a122e5ab77462a82c40c00007d19";
    const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    const response = await fetch(apiCall);

    const data = await response.json();

        if(data.cod == '404'){
            container.style.height = '385px';
            errorContainer.style.display = 'flex';
            return
            }

            tempContainer.style.display = 'flex';
            container.style.height = '600px';
            

        const cityName = data.name;
        const country = data.sys.country;
        const tempCels = farenheitInCels(data.main.temp);
        const {description, id} = data.weather[0];
        const windSpeed = data.wind.speed;

        
        document.querySelector('.current-temp .temp').innerText = tempCels;
        document.querySelector('.description').innerText = description;
        document.querySelector('.location-response-name').innerText = `${cityName}, ${country}`;
        document.querySelector('.wind-speed').innerText = windSpeed + ' km/h';

        const weatherIcon = document.querySelector('.weather-img');
        if(id >= 200 && id <= 232){
            weatherIcon.src = 'image/storm.svg'
        }else if(id >= 300 && id <= 321 || id >= 500 && id <= 531){
            weatherIcon.src = 'image/rain.svg'
        }else if(id >= 600 && id <= 622){
            weatherIcon.src = 'image/snow.svg'
        }else if(id == 721){
            weatherIcon.src = 'image/haze.svg'
        }else if(id == 800){
            weatherIcon.src = 'image/clear.svg'
        }else if(id >= 801 && id <= 804){
            weatherIcon.src = 'image/cloud.svg'
        }
    }


function farenheitInCels(kelvin){
    return  Math.floor(kelvin - 273,15);
}

