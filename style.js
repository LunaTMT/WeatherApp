// Replace 'YOUR_API_KEY' with your actual API key
var API_KEY = 'YOUR_API_KEY';

// Replace 'CITY_NAME' with the name of the city you want to get the time for
var cityName = 'Chelmsford';

// Construct the URL for geocoding API request
var geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${API_KEY}`;

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
