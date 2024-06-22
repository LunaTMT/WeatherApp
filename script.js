class WeatherData {
    constructor() {
        this.cityName = '';
        this.weatherType = '';
        this.weatherIcon = '';
        this.countryCode = '';
        this.flagSrcImg = '';
        this.latitude = '';
        this.longitude = '';
        this.countryName = '';
        this.date = '';
        this.year = '';
        this.month = '';
        this.day = '';
        this.day_name = '';
        this.day_number = '';
        this.time = '';

        this.searchButton = document.getElementById("search_button");
        this.searchButton.addEventListener('click', () => this.fetchData());

        // Hide elements initially
        this.hideElements();
    }

    hideElements() {
        document.getElementById("countryName").classList.add("hidden");
        document.getElementById("flagImage").classList.add("hidden");
        document.getElementById("cityName").classList.add("hidden");
        document.getElementById("weatherIcon").classList.add("hidden");
        document.getElementById("weatherType").classList.add("hidden");
        document.getElementById("date").classList.add("hidden");
        document.getElementById("dayName").classList.add("hidden");
        document.getElementById("time").classList.add("hidden");
    }

    fetchData() {
        let city = document.getElementById('textbox').value;

        this.fetchWeatherData(city)
            .then(() => this.fetchTimezoneData())
            .then(() => this.updateUI())
            .catch(error => {
                console.error('Error: ', error);
            });
    }

    fetchWeatherData(city) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b65a5b81ad984ccc91d2c11d02cc3578&units=metric`)
            .then(response => response.json())
            .then(data => {
                this.cityName = data.name;
                this.weatherType = data.weather[0].main;
                this.weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                this.latitude = data.coord.lat;
                this.longitude = data.coord.lon;
            });
    }

    fetchTimezoneData() {
        return fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=YWF4V0PKH9ZN&format=json&by=position&lat=${this.latitude}&lng=${this.longitude}`)
            .then(response => response.json())
            .then(data => {
                this.countryName = data.countryName;
                this.countryCode = data.countryCode;
                this.flagSrcImg = `https://flagsapi.com/${this.countryCode}/flat/64.png`;

                let d = new Date(data.formatted);
                [this.date, this.time] = data.formatted.split(" ");
                [this.year, this.month, this.day] = this.date.split("-");

                this.time = this.time.slice(0, -3);
                this.day_number = this.dayStringFormat(this.day);
                this.day_name = this.numberToDayName(d.getDay());
                this.month = this.numberToMonthAbbreviation(this.month);
            });
    }

    updateUI() {
        console.clear();

        // Show elements after data is fetched
        document.getElementById("countryName").textContent = this.countryName;
        document.getElementById("flagImage").src = this.flagSrcImg;
        document.getElementById("cityName").textContent = this.cityName;
        document.getElementById("weatherIcon").src = this.weatherIcon;
        document.getElementById("weatherType").textContent = this.weatherType;
        document.getElementById("date").textContent = this.day_number + " " + this.month;
        document.getElementById("dayName").textContent = this.day_name;
        document.getElementById("time").textContent = this.time;

        // Remove the 'hidden' class to show elements
        document.getElementById("countryName").classList.remove("hidden");
        document.getElementById("flagImage").classList.remove("hidden");
        document.getElementById("cityName").classList.remove("hidden");
        document.getElementById("weatherIcon").classList.remove("hidden");
        document.getElementById("weatherType").classList.remove("hidden");
        document.getElementById("date").classList.remove("hidden");
        document.getElementById("dayName").classList.remove("hidden");
        document.getElementById("time").classList.remove("hidden");
    }

    numberToMonthAbbreviation(monthNumber) {
        const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const index = parseInt(monthNumber, 10) - 1;
        return monthAbbreviations[index];
    }

    numberToDayName(dayNumber) {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[dayNumber];
    }

    dayStringFormat(dayNumber) {
        const day = parseInt(dayNumber, 10);
        const suffix = (day % 10 === 1 && day !== 11) ? "st" :
                       (day % 10 === 2 && day !== 12) ? "nd" :
                       (day % 10 === 3 && day !== 13) ? "rd" : "th";
        return dayNumber + suffix;
    }
}

// Instantiate the class to set up the event listener and fetch data
const weatherData = new WeatherData();
