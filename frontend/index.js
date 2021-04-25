import { deleteAnnotationLister, previewAnnotationListener, submitAnnotationListner, updateAnnotationListner } from './listeners';
import { clearForm, hideAll } from './helper';
import { createMap,} from './map';

var set_edit = 0;

const map = createMap()

document.querySelector(".preview_btn").addEventListener("click",
  function() {set_edit=0;changeBlock(".preview_page") 
});

document.querySelector(".add_btn").addEventListener("click", 
 function() {
   changeBlock(".form")
   document.querySelector(".form").setAttribute('type','ADD');
 }
);

document.querySelector(".edit_btn").addEventListener("click", function() {
  changeBlock(".form")
  document.querySelector(".form").setAttribute('type','EDIT');
});

document.querySelector(".delete_btn").addEventListener("click", function() {
  changeBlock(".form")
});

document.querySelector(".searchButton").addEventListener("click", function() {set_edit=0;changeBlock(".preview_page")});

document.getElementsByClassName("preview_btn")[0].addEventListener("click",async function() {
  await previewAnnotationListener(map)
});
document.querySelector(".searchButton").addEventListener("click", function() {previewAnnotationListener(map)});
// document.getElementById("delete").addEventListener("click", function() {deleteAnnotationLister(map)});
document.getElementById("reset").addEventListener("click", function() {clearForm()}); 
document.getElementById("save").addEventListener("click", function(){
  const type = document.querySelector(".form").getAttribute("type")
  type == "EDIT" ? updateAnnotationListner():submitAnnotationListner();
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