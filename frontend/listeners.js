import { clearDeleteForm, clearForm,  showAnnotationsTable } from "./helper"
import { deleteAnnotation, previewAnnotation, submitAnnotation, updateAnnotation } from "./service"

export const deleteAnnotationLister = (map) => async() => {
    const data = {
        annotation: document.getElementById("annotation1").value,
        lat: document.getElementById("lat1").value,
        long: document.getElementById("lon1").value,
    }
    await deleteAnnotation(data);
    clearDeleteForm();
    previewAnnotationListener(map);
}

export const updateAnnotationListner = async() => {
    const data = {
        annotation: document.getElementById("annotation").value,
        lat: document.getElementById("lat").value,
        long: document.getElementById("lon").value,
    }
    await updateAnnotation(data);
    clearForm();
}

export const submitAnnotationListner = async() => {
    const data = {
        annotation: document.getElementById("annotation").value,
        lat: document.getElementById("lat").value,
        long: document.getElementById("lon").value,
    }
    await submitAnnotation(data);
    clearForm();
}

export const previewAnnotationListener = (map) => async() => {
    const annotationsData = await previewAnnotation();
    showAnnotationsTable(map, annotationsData);
}