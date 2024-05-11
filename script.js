

let search_button = document.getElementById("search_button");

search_button.addEventListener('click', function() {

    let city = document.getElementById('textbox').value;


    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b65a5b81ad984ccc91d2c11d02cc3578")
    .then(response => response.json())
    .then(data => {
        
        console.clear();
        console.log(data.name)

        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.main.temp);
        
        console.log(data.sys.country);
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        
        fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=YWF4V0PKH9ZN&format=json&by=position&lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => {   
            console.log(data.formatted);  
        })
        .catch(error => {
            console.error('Error: ', error);
        });
    
       
    })
    .catch(error => {
        console.error('Error: ', error);
    });

});

