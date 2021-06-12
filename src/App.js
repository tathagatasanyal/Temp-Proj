import React, {useState} from 'react';

const api = {
  key :"1bdfef518e711c91e3f63d9b420334c5",
  base :"https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const Search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res =>res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
      });
    }
  }
  console.log(weather);
  const datebuilder=(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septembar",
                    "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day   = days[d.getDay()]
    let date  = d.getDate();
    let month = months[d.getMonth()];
    let year  = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
<div class ={(typeof weather.main != ("undefined"))? ((weather.main.temp < 16 )? 'App cold' : 'App') : 'App'} >
 
    <main>
    <div class="search-box"> 
    <input type="text" 
           class = "search-bar"
           placeholder="Search.."
           onChange={e => setQuery(e.target.value)}
           value={query}
           onKeyPress={Search}
           /> 
    </div>
    {(typeof weather.main != "undefined") ? (
      <div class= "content"> 
      <div class="location-box">
      <div class="location">{weather.name}, {weather.sys.country}</div>
      <div class="date">{datebuilder(new Date())}</div>
      <div class="weather-box">
        <div class="temperature">{Math.round(weather.main.temp)}°C</div>
        <div class="weather">{weather.weather[0].main}</div>
      </div>
      </div>
     </div>
  ) : ('')}
  </main>
</div>
  );
  
}
export default App ; 