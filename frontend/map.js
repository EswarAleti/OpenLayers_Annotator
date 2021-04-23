import 'ol/ol.css';
import {Map, View, Feature, Overlay} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from 'ol/proj';
import { nearestAnnotation } from './service';

export const getMap = (overlay) => {
    return new Map({
        overlays: [overlay],
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat([79.4192,13.6288]),
          zoom: 12
        })
      });
}

export const getOverlay = () => {
  var container = document.getElementById('popup');
  return new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
}

export const showPopUp = async(e,overlay) => {
  var closer = document.getElementById('popup-closer');
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
  
  const data = await nearestAnnotation(toLonLat(e.coordinate)[1],toLonLat(e.coordinate)[0]);
  document.getElementById('popup-content').innerHTML = data.annotation;
  overlay.setPosition(e.coordinate);
}