import { clearDeleteForm, clearForm,  displayPointsOnMap,  showAnnotationsTable } from "./helper"
import { createMap } from "./map";
import { deleteAnnotation, previewAnnotation, submitAnnotation, updateAnnotation } from "./service"

export const deleteAnnotationLister = async(map) => {
    const data = {
        annotation: document.getElementById("annotation1").value,
        lat: document.getElementById("lat1").value,
        long: document.getElementById("lon1").value,
    }
    await deleteAnnotation(data);
    clearDeleteForm();
    await createMap();
}

export const updateAnnotationListner = async() => {
    const data = {
        annotation: document.getElementById("annotation").value,
        lat: document.getElementById("lat").value,
        long: document.getElementById("lon").value,
    }
    await updateAnnotation(data);
    clearForm();
    await createMap()
}

export const submitAnnotationListner = async() => {
    const data = {
        annotation: document.getElementById("annotation").value,
        lat: document.getElementById("lat").value,
        long: document.getElementById("lon").value,
    }
    await submitAnnotation(data);
    clearForm();
    await createMap()
}

export const previewAnnotationListener = async() => {
    const annotationsData = await previewAnnotation();
    showAnnotationsTable( annotationsData);
}
