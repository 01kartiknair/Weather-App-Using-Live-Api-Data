const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
  const query= req.body.cityName;
  const apiKey = "e22c6150c964d5eb4a1b1de807e1d65d"
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode); //printing the status of our response from the external server
    //we use the response.on function to get a hold of the data from the response
    response.on("data", function(data){
      const weatherData = JSON.parse(data); //parsing the data from JSON to a javascript object
      console.log(weatherData);
      // console.log(data);
      const temp = weatherData.main.temp; //tapping into the data from the json
      const weatherDescription = weatherData.weather[0].description; //similar as above
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp);
      console.log(weatherDescription);
      res.write("<p>The weather is currently " + weatherDescription + "</p>")
      res.write("<h1>The temperature in "+ query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL +">")
      res.send();
    })
  })
})





app.listen(3000, function (){
  console.log("Server is running on port 3000");
})
