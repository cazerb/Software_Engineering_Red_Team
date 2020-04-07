function sendPostRequest(jsonOBJ,handler) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', handler, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === 4 && this.status === 200) {
            // Request finished. Do processing here.
        }
    }
    xhr.send(JSON.stringify(jsonOBJ));
}