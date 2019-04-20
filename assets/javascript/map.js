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

    //Array of cities//

let cityPositionsArr = [
    { city: 'Naples, Italy', lat: 40.85, lng: 14.26 },
    { city: 'Dubai, United arab Emirates', lat: 25.20, lng: 55.27 },
    { city: 'Cebu', lat: 10.31, lng: 123.88 },
    { city: 'Shanghai, China', lat: 31.23, lng: 121.47 },
    { city: 'Manchester, United Kingdom', lat: 53.48, lng: 2.24 },
    { city: 'Casablanca, Morocco', lat: 33.57, lng: 7.58 },
    { city: 'New Orleans, Louisiana', lat: 29.95, lng: -90.07 },
    { city: 'Granada', lat: 37.17, lng: -3.59 },
    { city: 'Phoenix', lat: 33.44, lng: -112.07 },
    { city: 'Goa', lat: 15.29, lng: 74.12 },
]

cityPositionsArr.forEach((city) => {
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(city.lat, city.lng),
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    })
});

    google.maps.event.addListener(marker,'click',function() {
        map.setZoom(9);
        map.setCenter(marker.getPosition());
      });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);