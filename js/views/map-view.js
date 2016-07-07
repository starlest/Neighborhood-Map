var map;

$(function () {
    setTimeout(function () {
        if (!window.google || !window.google.maps) {
            $('.map').text("Failed to load Google Maps.");
        }
    }, 5000);
});

function initMap() {
    map = new google.maps.Map(document.getElementsByClassName("map")[0], {
        center: {lat: 0, lng: 0},
        zoom: 2
    });
}
