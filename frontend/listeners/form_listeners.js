import { clearForm } from "../helper";
import { createMap } from "../map";
import {
  deleteAnnotation,
  submitAnnotation,
  updateAnnotation,
} from "../service";

const deleteAnnotationLister = async () => {
  const data = getFormData();
  await deleteAnnotation(data);
};

const updateAnnotationListner = async () => {
  const data = getFormData();
  await updateAnnotation(data);
  clearForm();
};

const submitAnnotationListner = async () => {
  const data = getFormData();
  await submitAnnotation(data);
  clearForm();
};

const getFormData = () => {
  return {
    annotation: document.getElementById("annotation").value,
    lat: document.getElementById("lat").value,
    long: document.getElementById("lon").value,
  };
};

export const saveListener = async () => {
  const type = document.querySelector(".form").getAttribute("type");
  if (type == "EDIT") {
    await updateAnnotationListner();
  } else if (type == "ADD") {
    await submitAnnotationListner();
  } else if (type == "DELETE") {
    await deleteAnnotationLister();
  }
  await createMap();
  clearForm();
};
