import {
  previewAnnotationListener,
  saveListener,
} from "./listeners/form_listeners";
import { changeBlock } from "./helper";
import { createMap } from "./map";
import { allListeners } from "./listeners";

createMap();
allListeners();

window.onload = () => {
  changeBlock(".home_page");
};
