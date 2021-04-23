export const deleteAnnotation = async(data) =>{
    return await fetch('http://localhost:3000/geolocation', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({lat: data.lat, long: data.long, annotation: data.annotation})
    });
}

export const nearestAnnotation = async(lat,long) => {
    const url = 'http://localhost:3000/nearest'+'?lat='+lat+'&long='+long;
    const result = await fetch(url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });
    // console.log(result.json())
    return await result.json();
}

export const updateAnnotation = async(data) => {
    const rawResponse = await fetch('http://localhost:3000/geolocation', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({lat: data.lat, long: data.long, annotation: data.annotation})
    });
    return await rawResponse.json();
}

export const submitAnnotation = async(data) => {
    if(data.lat!=0 && data.long!=0){
        const rawResponse = await fetch('http://localhost:3000/geolocation', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          return await rawResponse.json();
    }
}

export const previewAnnotation = async() => {
    var search_input = document.getElementById("searchInput").value;
    document.getElementById("searchInput").value = '';
    const result = await fetch('http://localhost:3000/geolocation'+'?annotation='+search_input,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    });
    return await result.json();
}