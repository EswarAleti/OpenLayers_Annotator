import "ol/ol.css";
import { Map, View, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat, toLonLat } from "ol/proj";
import { nearestAnnotation, previewAnnotation } from "./service";
import {
  createPointOnMap,
  displayPointsOnMap,
  fillForm,
  fillFormWithNearest,
} from "./helper";

export const createMap = async () => {
  document.getElementById("map").innerHTML = "";
  const overlay = getOverlay();
  const map = getMap(overlay);
  map.on("click", async function (e) {
    const form = document.querySelector(".form");
    const formType = form.getAttribute("type");
    if (formType == "ADD") {
      createPointOnMap(map, e.coordinate);
      fillForm(e.coordinate);
    } else if (formType == "EDIT" || formType == "DELETE") {
      fillFormWithNearest(e.coordinate);
    } else {
      showPopUp(e, overlay);
    }
  });
  const annotationsData = await previewAnnotation();
  displayPointsOnMap(map, annotationsData);
  return map;
};

export const getMap = (overlay) => {
  return new Map({
    overlays: [overlay],
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: fromLonLat([79.4192, 13.6288]),
      zoom: 12,
    }),
  });
};

export const getOverlay = () => {
  var container = document.getElementById("popup");
  return new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
};

export const showPopUp = async (e, overlay) => {
  var closer = document.getElementById("popup-closer");
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };

  const data = await nearestAnnotation(
    toLonLat(e.coordinate)[1],
    toLonLat(e.coordinate)[0]
  );
  document.getElementById("popup-content").innerHTML = data.annotation;
  overlay.setPosition(e.coordinate);
};
