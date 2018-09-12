import { Component, OnInit } from '@angular/core';
import { polygonCenter } from 'geojson-polygon-center';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window["mapboxgl"].accessToken = 'pk.eyJ1IjoidGFsa2FtaW5za3kiLCJhIjoiY2psd3J6dXhzMDJoMzNxcGpram0xeWx0aSJ9.i8QWv90mLdzGcO4XkXRJaQ';
    var map = new window["mapboxgl"].Map({
        container: 'main-map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [32.109333, 34.855499],
        zoom: 1
    });

    map.on('load', function () {
      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': './assets/countries.geojson'
        },
        'layout': {},
        'paint': {
            'fill-color': '#006699',
            'fill-opacity': 0.7
        }
      });

        map.on('click', 'maine', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.ADMIN;
        });

        map.on('mouseenter', 'places', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'places', function () {
            map.getCanvas().style.cursor = '';
        });
    });
  }

}
