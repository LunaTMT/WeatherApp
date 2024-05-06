

let search_button = document.getElementById("search_button");

search_button.addEventListener('click', function() {

    let city = document.getElementById('textbox').value;


    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b65a5b81ad984ccc91d2c11d02cc3578")
    .then(response => response.json())
    .then(data => {

        console.log(data.name)

        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.main.temp);
        

        console.log(data.timezone)

        let unix_timestamp = data.dt;
        let timezone_offset = data.timezone;
        
        var date = new Date(unix_timestamp * 1000);
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);
        var local_time = new Date(utc + (timezone_offset * 1000));


        console.log(local_time);



        // Construct the URL for geocoding API request
        var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`;

        // Make a GET request to geocoding API to get latitude and longitude
        fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            // Extract latitude and longitude from the geocoding API response
            var latitude = data.results[0].geometry.location.lat;
            var longitude = data.results[0].geometry.location.lng;

            // Get current timestamp (in seconds)
            var timestamp = Math.floor(Date.now() / 1000);

            // Construct the URL for time zone API request
            var timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${API_KEY}`;

            // Make a GET request to time zone API
            return fetch(timezoneUrl);
        })
        .then(response => response.json())
        .then(data => {
            // Extract timezone information from the time zone API response
            var timezoneId = data.timeZoneId;
            var timezoneName = data.timeZoneName;
            var localTime = new Date((timestamp + data.rawOffset + data.dstOffset) * 1000);

            console.log("Timezone ID:", timezoneId);
            console.log("Timezone Name:", timezoneName);
            console.log("Local Time:", localTime);
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => {
        console.error('Error: ', error);
    });

});




