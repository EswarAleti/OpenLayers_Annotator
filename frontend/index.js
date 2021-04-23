import Overlay from 'ol/Overlay';
import { deleteAnnotationLister, previewAnnotationListener, submitAnnotationListner, updateAnnotationListner } from './listeners';
import { nearestAnnotation } from './service';
import { createPointOnMap, fillAddForm, fillDeleteForm, fillEditForm, fillForm, hideAll } from './helper';
import { getMap, getOverlay, showPopUp } from './map';
import { toLonLat } from 'ol/proj';
var set_edit = 0;

const overlay = getOverlay();

const map = getMap(overlay)

map.on('click',async function(e){
  if(document.querySelector(".preview_page").style.display == "block"){
    showPopUp(e,overlay);
  }
  
  if (document.querySelector(".form").style.display == "block") {
    if(set_edit==1){
      fillEditForm(e.coordinate)
    }
    else{
      createPointOnMap(map, e.coordinate)
      fillAddForm(e.coordinate);
    } 
  }
  if(document.querySelector(".delete_form").style.display == "block")
  {
    fillDeleteForm(e.coordinate)
  }
})

document.querySelector(".preview_btn").addEventListener("click", function() {set_edit=0;changeBlock(".preview_page") });
document.querySelector(".add_btn").addEventListener("click", function() {set_edit=0;changeBlock(".form") });
document.querySelector(".edit_btn").addEventListener("click", function() {set_edit=1;changeBlock(".form")});
document.querySelector(".searchButton").addEventListener("click", function() {set_edit=0;changeBlock(".preview_page")});
document.querySelector(".delete_btn").addEventListener("click", function() {set_edit=0;changeBlock(".delete_form")});


document.getElementsByClassName('preview_btn')[0].addEventListener('click',previewAnnotationListener(map));
document.querySelector(".searchButton").addEventListener("click", previewAnnotationListener(map));
document.getElementById("delete").addEventListener("click", deleteAnnotationLister(map)); 
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