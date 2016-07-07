var initialLocations = [
    {
        title: 'Ion Orchard',
        position: {lat: 1.313472, lon: 103.831670}
    },
    {
        title: 'Esplanade',
        position: {lat: 1.289836, lon: 103.856417}
    },
    {
        title: 'Sentosa',
        position: {lat: 1.250466, lon: 103.830388}
    },
    {
        title: 'Marina Bay Sands',
        position: {lat: 1.283213, lon: 103.860309}
    },
    {
        title: 'Singapore Zoo',
        position: {lat: 1.404346, lon: 103.793022}
    }
];

var Location = function (data) {
    this.title = ko.observable(data.title);
    this.lat = ko.observable(data.position.lat);
    this.lon = ko.observable(data.position.lon);
};

var ViewModel = function () {
    var self = this;

    this.locationList = ko.observableArray([]);
    this.filter = ko.observable("");

    initialLocations.forEach(function(locationItem) {
        self.locationList.push(new Location(locationItem));
    });

    this.filteredLocations = ko.computed(function() {
        return ko.utils.arrayFilter(self.locationList(), function(location) {
            return self.filter().length == 0 ||
                location.title().toLowerCase().includes(self.filter().toLowerCase());
        });
    });
};

ko.applyBindings(new ViewModel());
