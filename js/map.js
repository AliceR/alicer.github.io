var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

var crs = new L.Proj.CRS('EPSG:4326',
  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs',
  {
    resolutions: [8192, 4096, 2048], // 3 example zoom level resolutions
  }
);

var map = new L.Map('map', {
  //crs: crs,
  layers: Stamen_TonerLite,
  center: new L.LatLng(49.73, 17),
  zoom: 6
});

var landstyle = {
    "color": "#5ce4de",
    "weight": 5,
    "opacity": 0.15,
    "fillOpacity": 0
};

L.geoJson(land, {
    style: landstyle
}).addTo(map);

var icon = L.Icon.extend({
    options: {
        iconSize: [23, 35],
        iconAnchor: [23, 35],
        popupAnchor: [0, -28]
    }
});

var turquoiseicon = new icon({iconUrl: './img/poi.png'}),
    purpleicon = new icon({iconUrl: './img/poi-purple.png'});

function onEachFeature(feature, latlng) {
    if (feature.properties && feature.properties.institution) {
        latlng.bindPopup(
            //TODO: design content of popups
            '<b>' + feature.properties.institution + '</b>' +
            '<p>' + feature.properties.name + ', ' +feature.properties.type + '</p>'
            );
    }
}

function pointToLayer(feature, latlng) {
        if(feature.properties.time == 'current'){
            return L.marker(latlng, {icon: purpleicon });
        } else {
            return L.marker(latlng, {icon: turquoiseicon });
        }
    }

var marker = L.Proj.geoJson(places, {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer 
}).addTo(map);

L.edgeMarker({
    icon: L.icon({
        iconUrl: 'img/edge-arrow-marker.png',
        clickable: true,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
    }),
    rotateIcons: true,
    layerGroup: null
}).addTo(map);

//TODO: make curriculum interactive (zoom to institution on click, for example)