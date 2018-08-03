import React, { Component } from 'react';

//remember in redux
//we had to "connect" the props and state
//here we just pass the context again
import AppContext from "../context";

class Weather extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {weatherData =>( 
            <div className="weather">
            <p className="title">{weatherData[0]} | {weatherData[2]}</p>
            <p className="time">{weatherData[7]}</p>          
              <div className="conditions">
                <img className="icon" src={weatherData[29]} />
                <p>{weatherData[28]}</p>
                <p>{weatherData[10]} °C</p>
                <p>{weatherData[11]} °F</p>
              </div>   
               <p className="powered">Powered by Context API &amp; Apixu API.</p>

            </div>
       )
       }
      </AppContext.Consumer>  
    );
  }
}

export default Weather;
