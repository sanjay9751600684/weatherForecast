
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import hum from './humidity.jpg'
import pre from './pressure.jpg'


function App() {
  
  const [city, setCity] = useState('coimbatore');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = '546b8e7bc2e42c8c92a2572386d39b0a'; // change this to your api key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  const getData = () => {
    axios.get(url)
      .then(res => setWeatherData(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData();
    document.getElementById("weatherInput").focus();
  }, [])

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = () => {
    getData();
  }

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      getData();
    }
  };

  const name = weatherData ? weatherData.name : '';
  const country = weatherData ? weatherData.sys.country : '';
  const humidity = weatherData ? weatherData.main.humidity : '';
  const pressure = weatherData ? weatherData.main.pressure : '';
  const temp = weatherData ? weatherData.main.temp : '';
  const weather = weatherData ? weatherData.weather[0].description : '';
  const iconcode = weatherData ? weatherData.weather[0].icon : '#';

  const d = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return (
    <div className="App">
     
      <header className="App-header">
      
    
      
        <div className="results" style={styles.results}>
        <div className="weather">
        <h4>React weather </h4>
          <input id="weatherInput" type="text" pattern="[A-Za-z]" name="city" placeholde="city name" 
            onChange={handleChange}
            onKeyPress={handleKeypress}
          /><br/><br/>
          <button onClick={handleSubmit}>Search</button>
        </div><br/>
          <div style={{ fontSize: 30 }}>{name}, {country}</div><br/><br/>

          <div style={{float:'left', color: 'white', fontSize: 18 }}>{days[d.getDay()]}, {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</div><br/>

          <div style={{ float:'left', fontSize: 54, fontWeight: 'bold' }}>{Math.round(temp)}&deg; C</div>
<div style={{float:"right"}}>
<div style={{ textTransform: 'capitalize',  }}>{weather}</div>
<br/>
          <img src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />
          </div>
          <br/>
         
          <div style={{marginLeft:"0"}}>
           <br/><br/>  <br/><br/>  
          <div>Pressure : {pressure} hPa</div><br/>
          <img src={pre}  alt="pressure" width={40} />
          </div>
        <div style={{marginRight:'0'}}>
         
         <div>Humidity : {humidity}%</div><br/>
          <img src={hum}  alt="Humidity" width={40} />
         </div></div>
      </header>

    </div>
  );
}

const styles = {
  results: {
    
    padding: '2rem',
    
    margin: '1rem',
   
  }
}

export default App;