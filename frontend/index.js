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
  // console.log(e.coordinate);
  var div = document.querySelector(".form");
  if (div.style.display != "none") 
  {  
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
  }
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
  document.getElementById("lon").value = '';
  document.getElementById("lat").value = '';
  document.getElementById("annot").value = '';
}

document.getElementsByClassName('preview_btn')[0].addEventListener('click',preview_annotation);

async function preview_annotation(){
  const get_annotations = await fetch('http://localhost:3000/geolocation',{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });
  const annotations_data = await get_annotations.json();
  // $("#annotations_table").empty();
  // table.deleteRow(i+1);
 
  var table = document.getElementById("annotations_table");
  table.innerHTML = "<tr><td>Latittude</td><td>Longitude</td><td>Annotation</td></tr>"
  for(var i=0; i<annotations_data.length;i++){
    console.log(annotations_data[i].lat);
    console.log(annotations_data[i].long);
    console.log(annotations_data[i].annotation);
    
 
    // table.innerHTML = null
    console.log(table.length);
    var row = table.insertRow(i+1);
    var lat_cell = row.insertCell(0);
    var long_cell = row.insertCell(1);
    var annotation_cell = row.insertCell(2);
    lat_cell.innerHTML = annotations_data[i].lat;
    long_cell.innerHTML = annotations_data[i].long;
    annotation_cell.innerHTML = annotations_data[i].annotation;

    var layer = new olLayer.Vector({
      source: new olSource.Vector({
          features: [
              new Feature({
                  geometry: new Point(fromLonLat([annotations_data[i].long,annotations_data[i].lat]))
              })
          ]
      })
    });
    // console.log(fromLonLat([annotations_data[i].long,annotations_data[i].lat]));
    map.addLayer(layer);
  }
}

document.querySelector(".preview_btn").addEventListener("click", function() {change_block(".preview_page") });
document.querySelector(".add_btn").addEventListener("click", function() {change_block(".form") });
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

window.onload = () => {
  change_block(".home_page");
}
