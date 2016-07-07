var map;

function initMap() {
    map = new google.maps.Map(document.getElementsByClassName("map")[0], {
        center: {lat: 0, lng: 0},
        zoom: 2
    });
}
