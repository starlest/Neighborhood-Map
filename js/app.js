var initialLocations = [
    {
        title: 'Ion Orchard',
        position: {lat: 1.313472, lng: 103.831670}
    },
    {
        title: 'Esplanade Singapore',
        position: {lat: 1.289836, lng: 103.856417}
    },
    {
        title: 'Sentosa',
        position: {lat: 1.250466, lng: 103.830388}
    },
    {
        title: 'Marina Bay Sands',
        position: {lat: 1.283213, lng: 103.860309}
    },
    {
        title: 'Singapore Zoo',
        position: {lat: 1.404346, lng: 103.793022}
    }
];

var Location = function (data) {
    this.title = ko.observable(data.title);
    this.position = data.position;
    this.marker = new google.maps.Marker({
        map: map,
        position: this.position,
        title: this.title()
    });

    var self = this;

    this.marker.addListener('click', function () {
        toggleBounce(self.marker);
        showInfo(self.marker);
    });
};

function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    // Timeout after one bounce
    setTimeout(function () {
        marker.setAnimation(null);
    }, 700);
}

var infowindow;

function showInfo(marker) {
    var contentString = '';
    // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='
        + marker.title + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function () {
        contentString = 'Failed to get wikipedia resources';
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    }, 6000);

    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function (response) {

            var articleList = response[2];
            if (!articleList) {
                contentString = 'Data is not available.';
            }
            else {
                for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                    contentString += articleStr;
                }
            }

            clearTimeout(wikiRequestTimeout);
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        }
    });
}

var ViewModel = function () {
    var self = this;

    this.locationList = ko.observableArray([]);
    this.filter = ko.observable('');

    initialLocations.forEach(function (locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    this.filteredLocations = ko.computed(function () {
        return ko.utils.arrayFilter(self.locationList(), function (location) {
            if (self.filter().length === 0 ||
                location.title().toLowerCase().includes(self.filter().toLowerCase())) {
                location.marker.setVisible(true);
                return true;
            } else {
                location.marker.setVisible(false);
                return false;
            }
        });
    });

    this.showLocation = function (clickedLocation) {
        toggleBounce(clickedLocation.marker);
        showInfo(clickedLocation.marker);
    };
};

/**
 * Initialize Google Maps.
 **/

function initMap() {
    var singapore = new google.maps.LatLng(1.379943, 103.806161);
    map = new google.maps.Map(document.getElementsByClassName('map')[0], {
        center: singapore,
        zoom: 10
    });
    infowindow = new google.maps.InfoWindow();
    ko.applyBindings(new ViewModel());
}

function googleError() {
    $('.map').text('Failed to load Google Maps.');
}


