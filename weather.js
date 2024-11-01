const {response} = require('express');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));



 app.get('/',(req,res)=>{

  res.sendFile(__dirname+"/index.html");
});

app.post('/',(req,res)=>{
console.log(req.body.Cityname);
const query = req.body.Cityname
const apiId ='f6040f4ca4698b670988bb067184d299'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiId}&units=metric`

https.get(url,(response) => {
        // console.log(response.statusCode);
        response.on('data',(data) => {
        const Weatherdata = JSON.parse(data);
        console.log( Weatherdata);
        const temp =  Weatherdata.main.temp;
        // const description = Weatherdata.Weather[0].description;
         console.log(temp);

        //  res.write("weather description is"+description)

          
    })
    res.write("Temp of your city"+query+temp+"degree celsius");
     res.send("Let us check our server")
})
});
const port = 4000
app.listen(port, () => console.log('Example app is listening on port 4000 ${port}.'));

