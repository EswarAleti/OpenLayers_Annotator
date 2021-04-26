import { hideAll, showAnnotationsTable } from "../helper";
import { previewAnnotation } from "../service";

export const addButtonEventListener = () => {
  changeBlock(".form");
  document.getElementById("save").innerHTML = "Save";
  document.getElementById("reset").style.display = "block";
  document.querySelector(".form").setAttribute("type", "ADD");
};

export const editButtonEventListener = () => {
  changeBlock(".form");
  document.getElementById("save").innerHTML = "Save";
  document.getElementById("reset").style.display = "block";
  document.querySelector(".form").setAttribute("type", "EDIT");
};

export const deleteButtonEventListener = () => {
  changeBlock(".form");
  document.getElementById("save").innerHTML = "Delete";
  document.getElementById("reset").style.display = "none";
  document.querySelector(".form").setAttribute("type", "DELETE");
};

export const previewButtonEventListener = async () => {
  changeBlock(".preview_page");
  const annotationsData = await previewAnnotation();
  showAnnotationsTable(annotationsData);
};

function changeBlock(class_name) {
  hideAll();
  var div = document.querySelector(class_name);
  div.style.display = div.style.display != "none" ? "none" : "block";
}
