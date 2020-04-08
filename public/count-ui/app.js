function addCount() {
    
    var jsonOBJ = {
        session: document.getElementById("session-select").value,
        startCount: document.getElementById("start-count").value,
        middleCount: document.getElementById("middle-count").value,
        endCount: document.getElementById("end-count").value,
        passPhrase: document.getElementById("password-input").value
    }

    sendPostRequest(jsonOBJ,"/countHandler/insertCounts");
}
