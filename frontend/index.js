import 'ol/ol.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import * as olLayer from  'ol/layer';
import * as olSource from 'ol/source';
import {Point} from 'ol/geom';
import OSM from 'ol/source/OSM';
import * as olCoordinate from 'ol/coordinate';
import {toLonLat,fromLonLat} from 'ol/proj';

const map = new Map({
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

map.on('click',function(e){
  var layer = new olLayer.Vector({
    source: new olSource.Vector({
        features: [
            new Feature({
                geometry: new Point(e.coordinate)
            })
        ]
    })
});
map.addLayer(layer);

document.getElementById("lon").value = Math.round(toLonLat(e.coordinate)[0]*10000)/10000;
document.getElementById("lat").value = Math.round(toLonLat(e.coordinate)[1]*10000)/10000;
})

document.getElementById("save").addEventListener("click", submitAnnotation); 

async function submitAnnotation(){
  var long = document.getElementById("lon").value;
  var lat = document.getElementById("lat").value;
  var annot = document.getElementById("annot").value;

  // hit backend api
  const rawResponse = await fetch('http://localhost:3000/geolocation', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({lat: Math.round(lat*10000)/10000, long: Math.round(long*10000)/10000, annotation: annot})
  });
  const content = await rawResponse.json();
  alert('Submitted Successfully');
}

document.querySelector(".preview_btn").addEventListener("click", function() {change_block(".preview_page") });
document.querySelector(".add_btn").addEventListener("click", function() {change_block(".form") });
// document.querySelector(".delete_btn").addEventListener("click", function() {change_block(".form") });
document.querySelector(".edit_btn").addEventListener("click", function() {change_block(".form") });

function change_block(class_name)
{
  document.querySelector(".home_page").style.display = "None";
  document.querySelector(".preview_page").style.display = "None";
  document.querySelector(".form").style.display = "None";
  
  var div = document.querySelector(class_name);
  if (div.style.display != "none") 
  {  
      div.style.display = "none";  
  }  
  else
  {  
      div.style.display = "block";  
  }  
}

// // document.querySelector(".preview_btn").addEventListener("click", function() {change_block(".preview") });
// // document.querySelector(".add_btn").addEventListener("click", function() {change_block(".form") });
// // document.querySelector(".edit_btn").addEventListener("click", function() {change_block(".edit") });
// // document.querySelector(".delete_btn").addEventListener("click", function() {change_block(".delete") });

// function change_block(id){
//   // document.querySelector(".preview").style.display = "None";
//   // document.querySelector(".form").style.display = "None";
//   // document.querySelector(".edit").style.display = "None";
//   // document.querySelector(".delete").style.display = "None";

//   document.querySelector(id).style.display = "block";

// }
window.onload = () => {
  change_block(".home_page");
}
