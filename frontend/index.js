import {toLonLat} from 'ol/proj';
import { deleteAnnotationLister, previewAnnotationListener, submitAnnotationListner, updateAnnotationListner } from './listeners';
import { nearestAnnotation } from './service';
import { createPointOnMap, fillAddForm, fillDeleteForm, fillEditForm, fillForm, hideAll } from './helper';
import { getMap } from './map';
var set_edit = 0;

const map = getMap()

map.on('click',async function(e){
  var div = document.querySelector(".form");
  if (div.style.display == "block") {
    if(set_edit==1){
      fillEditForm(e.coordinate)
    }

    else{
      createPointOnMap(map, e.coordinate)
      fillAddForm(e.coordinate);
    } 
  }

  div = document.querySelector(".delete_form");
  if(div.style.display == "block")
  {
    fillDeleteForm(e.coordinate)
  }
})

document.getElementsByClassName('preview_btn')[0].addEventListener('click',previewAnnotationListener(map));
document.querySelector(".searchButton").addEventListener("click", previewAnnotationListener(map));
document.querySelector(".preview_btn").addEventListener("click", function() {set_edit=0;changeBlock(".preview_page") });
document.querySelector(".add_btn").addEventListener("click", function() {set_edit=0;changeBlock(".form") });
document.querySelector(".edit_btn").addEventListener("click", function() {set_edit=1;changeBlock(".form")});
document.querySelector(".searchButton").addEventListener("click", function() {set_edit=0;changeBlock(".preview_page")});
document.querySelector(".delete_btn").addEventListener("click", function() {set_edit=0;changeBlock(".delete_form")});
document.getElementById("delete").addEventListener("click", deleteAnnotationLister); 

document.getElementById("save").addEventListener("click", function(){
  set_edit==1 ? updateAnnotationListner():submitAnnotationListner();
}); 

function changeBlock(class_name)
{
  hideAll();
  var div = document.querySelector(class_name);
  div.style.display = (div.style.display!="none") ? "none":"block";
}

window.onload = () => {
  changeBlock(".home_page");
}