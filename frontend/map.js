import 'ol/ol.css';
import {Map, View, Feature, Overlay} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat} from 'ol/proj';
import { nearestAnnotation, previewAnnotation } from './service';
import { createPointOnMap, displayPointsOnMap, fillForm, fillDeleteForm, fillFormWithNearest } from './helper';

export const createMap = async() => {
  document.getElementById("map").innerHTML=""
  const overlay = getOverlay();
  const map = getMap(overlay)
  map.on('click',async function(e){
      if(document.querySelector(".preview_page").style.display == "block"){
        showPopUp(e,overlay);
      }
      const form  = document.querySelector(".form")
      const formType = form.getAttribute("type")
      if(formType == "ADD") {
          createPointOnMap(map, e.coordinate)
          fillForm(e.coordinate);
      }
      if(formType=="EDIT"){
        fillFormWithNearest(e.coordinate)
      }
 
      // fillAddForm(e.coordinate)
      console.log(form)
      // if (document.querySelector(".form").style.display == "block") {
      //   else{
      //     createPointOnMap(map, e.coordinate)
      //     fillAddForm(e.coordinate);
      //   } 
      // }
      // if(document.querySelector(".delete_form").style.display == "block")
      // {
      //   fillDeleteForm(e.coordinate)
      // }
    })
  const annotationsData = await previewAnnotation();
  displayPointsOnMap(map, annotationsData)
  return map
}

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