
// Hides the Retirement Info on the main page
$(".user-info").hide();

// Array of cities
let cityPositionsArr = [
    { city: 'NaplesFL', lat: 26.14, lng: -81.79, info: 'Retire in Naples' },
    { city: 'Arenal', lat: 10.46, lng: -84.70, info: 'Retire in Arenal' },
    { city: 'Cebu', lat: 10.31, lng: 123.88, info: 'Retire in Cebu' },
    { city: 'Cuenca', lat: -2.90, lng: -79.00, info: 'Retire in Cuenca' },
    { city: 'Ubud', lat: -8.50, lng: 115.26, info: 'Retire in Ubud' },
    { city: 'Krabi', lat: 8.08, lng: 98.90, info: 'Retire in Krabi' },
    { city: 'CittaDiCastello', lat: 43.46, lng: 12.24, info: 'Retire in Citta Di Castello' },
    { city: 'Granada', lat: 37.17, lng: -3.59, info: 'Retire in Granade' },
    { city: 'Phoenix', lat: 33.44, lng: -112.07, info: 'Retire in Pheonix' },
    { city: 'Goa', lat: 15.29, lng: 74.12, info: 'Retire in Goa' },
]


// The latitude and longitude of your business / place
var position = [9.08, 8.67];

function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position[0], position[1]);

    var mapOptions = {
        zoom: 3, // initialize zoom level - the max value is 21
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        center: latLng
    };

    map = new google.maps.Map(document.getElementById('googlemaps'),
        mapOptions);
   
    cityPositionsArr.forEach((city) => {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(city.lat, city.lng),
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        })
    });

    $("#submit-btn").on("click", function() {
        // Hides the box on the main page
        $(".col-md-6").hide();
        // Shows the Retirement Info on the main page
        $(".user-info").show();
    });

    // google.maps.event.addListener(marker,'click',function() {
    //     map.setZoom(9);
    //     map.setCenter(marker.getPosition());
    //     contentString = "<div><h1>Hello!</h1></div>"; 
    //     infowindow = new google.maps.InfoWindow({
    //         content: contentString
    //       });
    //     infowindow.open(map, marker);
    //   });
}
// ******** For future release ********
// $("#submit-btn").on("click", function() {
//     // Prevents the page from reloading on click
//     event.preventDefault();
//     // Hides the box on the main page
//     $(".col-md-6").hide();
//     // Hides the globe image from the main page
//     $("#globe-icon").hide();
//     // Getting the index of the options in dropdown
//     var selectIndex = $("#city-select")[0].selectedIndex;
//     // 
//     var selectedCity = cityPositionsArr[selectIndex];
//     console.log(selectedCity);
//     // Getting latitude and longitude coordinates of the location selected
//     marker = new google.maps.Marker({
//         position: new google.maps.LatLng(selectedCity.lat, selectedCity.lng),
//         map: map,
//         draggable: false,
//         animation: google.maps.Animation.DROP
//     })
//     // Zooms in and centers the map on set location
//     map.setZoom(9);
//     map.setCenter(marker.getPosition());
//     // Defines what is going to be displayed on the modal that pops up
//     contentString = '<div style="color: black">' + selectedCity.info + '</div>'; 
//     console.log(contentString);
//     // Activates the info window to appear on click
//     infowindow = new google.maps.InfoWindow({
//         content: contentString
//     });
//     infowindow.open(map, marker);
// });

 // Getting the index of the options in dropdown
    var selectIndex = $("#city-select")[0].selectedIndex;
    // 
    var selectedCity = cityPositionsArr[selectIndex];
    console.log(selectedCity);
    // Getting latitude and longitude coordinates of the location selected
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(selectedCity.lat, selectedCity.lng),
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });

google.maps.event.addDomListener(window, 'load', showGoogleMaps);