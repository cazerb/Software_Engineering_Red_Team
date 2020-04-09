// Load session dropdown
loadSessionsDropdown();

function loadSessionsDropdown() {
  var handler = "/sessionHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var select = document.getElementById("session-select");
        var sessionID = result[i].sessionID;
        var sessionName = result[i].sessionName;

        select.options[select.options.length] = new Option(sessionName, sessionID);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function addCount() {
    var countSelect = document.getElementById("count-select");
    var countTime = countSelect.options[countSelect.selectedIndex].value;

    var sessionSelect = document.getElementById("session-select");
    var sessionID = sessionSelect.options[sessionSelect.selectedIndex].value;

  var jsonOBJ = {
    sessionID: sessionID,
    countTime: countTime,
    count: document.getElementById("count").value,
    passPhrase: document.getElementById("password-input").value,
  };

  sendPostRequest(jsonOBJ, "/countHandler/insertCounts");
}
