//MAP
var mymap = L.map("map", {
  center: [20.5937, 78.9629],
  zoom: 6,
  zoomControl: false,
});

//BASEMAPS
var osm = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright" target = "_blank">OpenStreetMap</a> contributors',
}).addTo(mymap);

var popup = L.popup();

//Function For PopUp Starts
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);

  // json function Starts
  $(document).ready(function () {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        e.latlng.lat +
        "&lon=" +
        e.latlng.lng +
        "&appid=10efafa3d34702fc48cbf90f1411caea",
      dataType: "json",
      success: function (data) {
        // storing json data in variables
        weatherstationname = data.name; // Name of Weatherstation
        lon = data.coord.lon; // lon WGS84
        lat = data.coord.lat; // lat WGS84
        temp = data.main.temp; // Kelvin
        airpres = data.main.pressure; // hPa
        hum = data.main.humidity; // %
        tempmin = data.main.temp_min; // Kelvin
        tempmax = data.main.temp_max; // Kelvin
        desc = data.weather[0].description; // Weatherdescription
        icon = data.weather[0].icon; // ID of weathericon
        // stored json data

        // recalculating values Starts
        var icon_html = "http://openweathermap.org/img/w/" + icon + ".png";
        var temp_cels = Math.round((temp - 273) * 100) / 100; // Converting Kelvin to Celsius
        // recalculating values Ends

        //Popup with content Starts
        var size = 2;
        popup.setContent(
          "<u><b>WEATHER DATA:</b></u><br>" +
            "<img src=" +
            icon_html +
            "><br>" +
            "<b>NAME:" +
            weatherstationname +
            "</b>" +
            "<br><b>TEMPERATURE: " +
            temp_cels +
            "°C" +
            "</b>" +
            "<br>Clouds:" +
            desc +
            "<br>Air Pressure: " +
            airpres +
            " hPa<br>Humidity: " +
            hum +
            "%"
        );
        //Popup with content Ends
      },
      error: function () {
        alert("error receiving wind data from openweathermap");
      },
    });
  });
  //json function Ends
}
//Function For PopUP Ends

mymap.on("click", onMapClick);
