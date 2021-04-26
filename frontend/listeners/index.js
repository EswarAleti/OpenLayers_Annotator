import { changeBlock, clearForm, showAnnotationsTable } from "../helper";
import { previewAnnotation } from "../service";
import { saveListener } from "./form_listeners";
import {
  addButtonEventListener,
  editButtonEventListener,
  previewButtonEventListener,
  deleteButtonEventListener,
} from "./navigation_listeners";

export const allListeners = () => {
  // form listeners
  document
    .querySelector(".preview_btn")
    .addEventListener("click", previewButtonEventListener);
  document
    .querySelector(".add_btn")
    .addEventListener("click", addButtonEventListener);
  document
    .querySelector(".edit_btn")
    .addEventListener("click", editButtonEventListener);
  document
    .querySelector(".delete_btn")
    .addEventListener("click", deleteButtonEventListener);

  document
    .querySelector(".searchButton")
    .addEventListener("click", async () => {
      changeBlock(".preview_page");
      const data = await previewAnnotation();
      showAnnotationsTable(data);
    });

  document.getElementById("reset").addEventListener("click", clearForm);
  document.getElementById("save").addEventListener("click", saveListener);
};
