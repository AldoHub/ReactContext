import React, { Component } from 'react';

//import the component
import Weather from "./components/weather";

//import axios
import axios from "axios";

//this is the context, a kind of store similar to redux
//allows you to send data to other components
//lets see the file
import AppContext from "./context";


class App extends Component {
  //defined a little state
  constructor(){
    super();
    this.state = {
      name: "",
      response: []
    }
  }

  // function that fetches the weather conditions
  // this is the axios call to the weather API Apixu
  searchWeather(){
    //we check the state, if its undefined or an empty string
    if(this.state.name == "" || this.state.name == undefined){
      //we pass a value as a default
      let city = "zurich";
      //we make the call
      axios.get("https://api.apixu.com/v1/current.json?<APIXU_KEY>q=" + city)
      .then(response => {
      
        //get the location data
        //here we get the data and process the objects
        //the response is a set of nested objects
        let arr = [];
        for (var key in response.data.location) {
          arr.push(response.data.location[key]);
        }
        //get the current data
        let arr2 = [];
        for (var key2 in response.data.current) {
           arr2.push(response.data.current[key2]);
        
        } 
       
        //get the actual conditions
        let arr3 = [];
        for (var key3 in response.data.current.condition) {
          arr3.push(response.data.current.condition[key3]);
        }
  
        //create a variable to store the concat array
        let concatArray = arr.concat(arr2);
        //finally concat the third array
        let finalConcat = concatArray.concat(arr3); 
         
       //at the end we concat the array and pass it like the state
       //the this.state.response 
        this.setState({
         response: finalConcat
        })
        console.log(this.state.response);
      })
      .catch(err => {
        console.log(err);
      });
    }else{
      //we do the same here, but in this case
      //we pass the state.name which will be defined here
      axios.get("https://api.apixu.com/v1/current.json?key=56bf64d79e664a1f861184944183103&q=" + this.state.name)
      .then(response => {
      
        //get the location data
        let arr = [];
        for (var key in response.data.location) {
          arr.push(response.data.location[key]);
        }
        //get the current data
        let arr2 = [];
        for (var key2 in response.data.current) {
           arr2.push(response.data.current[key2]);
        
        } 
       
        //get the actual conditions
        let arr3 = [];
        for (var key3 in response.data.current.condition) {
          arr3.push(response.data.current.condition[key3]);
        }
  
        //create a variable to store the concat array
        let concatArray = arr.concat(arr2);
        //finally concat the third array
        let finalConcat = concatArray.concat(arr3); 
  
        this.setState({
         response: finalConcat
        })
        console.log(this.state.response);
      })
      .catch(err => {
        console.log(err);
      });
    }
    
  }
  
  //make the call to the service
  componentDidMount= () =>{
    this.searchWeather();
  }
  
  //get the value
  getCityName = (e) =>{
    //once the user starts typing
    //we add that to the state
    //thats why we have it defined in the API call
    
    //set the value to the state
    let value = e.target.value
    this.setState({
      name : value
    })
    
  }

  search = (e) =>{
    //this is the trigger
    //to make the API call
    //here we already got all the state props defined
    e.preventDefault();
    this.searchWeather();
  }
  

  render() {
    return (
    
      <div className="App">
         <form>
           <input type="text" onChange={this.getCityName} placeholder="Type your city name" />
           <input type="submit" onClick={this.search} value="Search" />
         </form>
       
         <AppContext.Provider value={this.state.response}> 
         
          <Weather /> 
         </AppContext.Provider> 
      </div>
     
    );
  }
}

export default App;
