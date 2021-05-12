import * as olLayer from "ol/layer";
import * as olSource from "ol/source";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { toLonLat, fromLonLat } from "ol/proj";
import { nearestAnnotation } from "./service";

export const clearForm = () => {
  document.getElementById("lon").value = "";
  document.getElementById("lat").value = "";
  document.getElementById("annotation").value = "";
};

export const fillForm = (coordinate) => {
  var lat = toLonLat(coordinate)[1]; //Math.round(toLonLat(coordinate)[1] * 10000) / 10000;
  var long = toLonLat(coordinate)[0]; //Math.round(toLonLat(coordinate)[0] * 10000) / 10000;
  document.getElementById("lon").value = long;
  document.getElementById("lat").value = lat;
};

export const fillFormWithNearest = async (coordinate) => {
  const data = await nearestAnnotation(
    toLonLat(coordinate)[1],
    toLonLat(coordinate)[0]
  );
  document.getElementById("lon").value = data.long;
  document.getElementById("lat").value = data.lat;
  document.getElementById("annotation").value = data.annotation;
};

export const showAnnotationsTable = (annotationsData) => {
  var table = document.getElementById("annotations_table");
  table.innerHTML =
    "<tr><thead><td>Latittude</td><td>Longitude</td><td>Annotation</td></thead></tr>";
  for (var i = 0; i < annotationsData.length; i++) {
    var row = table.insertRow(i + 1);
    var lat_cell = row.insertCell(0);
    var long_cell = row.insertCell(1);
    var annotation_cell = row.insertCell(2);
    lat_cell.innerHTML = annotationsData[i].lat;
    long_cell.innerHTML = annotationsData[i].long;
    annotation_cell.innerHTML = annotationsData[i].annotation;
  }
};

export const displayPointsOnMap = (map, annotationsData) => {
  for (var i = 0; i < annotationsData.length; i++) {
    createPointOnMap(
      map,
      fromLonLat([annotationsData[i].long, annotationsData[i].lat])
    );
  }
};

export const createPointOnMap = (map, coordinate) => {
  var layer = new olLayer.Vector({
    source: new olSource.Vector({
      features: [
        new Feature({
          geometry: new Point(coordinate),
        }),
      ],
    }),
  });
  map.addLayer(layer);
};

export const hideAll = () => {
  clearForm();
  document.querySelector(".home_page").style.display = "None";
  document.querySelector(".preview_page").style.display = "None";
  document.querySelector(".form").style.display = "None";
};

export const changeBlock = (class_name) => {
  hideAll();
  var div = document.querySelector(class_name);
  div.style.display = div.style.display != "none" ? "none" : "block";
};
