// Display sessions on page load
getSessions();
loadPresenterDropdown();
loadRoomDropdown();

// Session Items
var sessionItems = document.getElementsByClassName("session-item");
for (var i = 0; i < sessionItems.length; i++) {
  var div = document.createElement("DIV");
  
  var edit = document.createElement("p");
  var editText = document.createTextNode("EDIT");

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  div.className = "session-item-options";
  edit.className = "edit";
  span.className = "close";

  edit.appendChild(editText);
  span.appendChild(txt);
  div.appendChild(edit);
  div.appendChild(span);

  sessionItems[i].appendChild(div);
}

// Close Session Item On Click
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var optionsDiv = this.parentElement;
    var sessionItemDiv = optionsDiv.parentElement;
    deleteSession(sessionItemDiv);
  };
}

function loadPresenterDropdown() {
  var handler = "/presenterHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var select = document.getElementById("presenter-select");
        var presenterID = result[i].presenterID;
        var name = result[i].name;

        select.options[select.options.length] = new Option(name, presenterID);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function loadRoomDropdown() {
  var handler = "/roomHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var select = document.getElementById("room-select");
        var roomID = result[i].roomID;
        var roomNumber = result[i].roomNumber;

        select.options[select.options.length] = new Option(roomNumber, roomID);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function openForm() {
  document.getElementById("sessionForm").style.display = "block";
}

function closeForm() {
  document.getElementById("presenter-select").selectedIndex = 0;
  document.getElementById("room-select").selectedIndex = 0;
  document.getElementById("session-input").value = "";
  document.getElementById("start-time").value = "";
  document.getElementById("end-time").value = "";
  document.getElementById("sessionForm").style.display = "none";
}

// Session Form
function submitSession() {
  // Get selected presenterID
  var presenterSelect = document.getElementById("presenter-select");
  var presenterID = presenterSelect.options[presenterSelect.selectedIndex].value;

  // Get selected roomID
  var roomSelect = document.getElementById("room-select");
  var roomID = roomSelect.options[roomSelect.selectedIndex].value;

  // Pack in JSON object
  var jsonOBJ = {
    sessionName: document.getElementById("session-input").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    presenterID: presenterID,
    roomID: roomID
  }

  sendPostRequest(jsonOBJ,"/sessionHandler/insert");
}

// Deletes a presenter
function deleteSession(sessionDiv) {
  sessionDiv.style.display = "none";
  var infoDiv = sessionDiv.getElementsByClassName("session-item-info")[0];

  var jsonOBJ = {
    sessionName: infoDiv.getElementsByClassName("session-name")[0].innerHTML,
  }

  sendPostRequest(jsonOBJ, "sessionHandler/delete");
}

// Get presenters to display
function getSessions() {
  var handler = "/sessionHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var sessionID = result[i].sessionID;
        var sessionName = result[i].sessionName;
        var startTime = result[i].startTime;
        var endTime = result[i].endTime;
        var roomID = result[i].roomID;
        var presenterID = result[i].presenterID;

        createSessionDiv(sessionID, sessionName);
        addSessionTime(sessionID, startTime, endTime);
        addSessionPresenter(sessionID, presenterID);
        addSessionRoom(sessionID, roomID);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function createSessionDiv(sessionID, sessionName) {
  // Create div to hold new session item
  var sessionDiv = document.createElement("div");
  sessionDiv.classList.add("session-item");

  // Create div to hold new session info
  var sessionInfo = document.createElement("div");
  sessionInfo.id = sessionID;
  sessionInfo.classList.add("session-item-info");

  // Create Count Session Info
  var sessionText = document.createTextNode(sessionName);
  var session = document.createElement("h3");
  session.classList.add("session-name");
  session.appendChild(sessionText);

  // Append Info to div
  sessionInfo.appendChild(session);

  // Create Count options div  
  var optionsDiv = document.createElement("DIV");
  var edit = document.createElement("p");
  var editText = document.createTextNode("EDIT");
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "session-item-options";
  edit.className = "edit";
  span.className = "close";

  edit.appendChild(editText);
  span.appendChild(txt);
  optionsDiv.appendChild(edit);
  optionsDiv.appendChild(span);

  sessionDiv.appendChild(sessionInfo);
  sessionDiv.appendChild(optionsDiv);

  document.getElementById("session-list").appendChild(sessionDiv);

  // Add Close on click
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var optionsDiv = this.parentElement;
      var sessionItemDiv = optionsDiv.parentElement;
      deleteSession(sessionItemDiv);
    };
  }
}

function addSessionTime(sessionID, startTime, endTime) {
  // Create Session Time Info
  var sessionTime = document.createElement("p");

  if (startTime === "00:00:00" && endTime === "00:00:00") {
    var timeText = document.createTextNode("No Time Set");
    sessionTime.classList.add("null-text");
  }
  else {
    var timeText = document.createTextNode(
      "Time: " + startTime + " - " + endTime
    );
  }
  sessionTime.appendChild(timeText);
  sessionInfoDiv = document.getElementById(sessionID).appendChild(sessionTime);
}

function addSessionPresenter(sessionID, presenterID) {
  var handler = "/presenterHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);
      var presenterName = presenterID;

      for (var i = 0; i < result.length; i++) {
        if (result[i].presenterID == presenterID) {
          presenterName = result[i].name;
          break;
        }
      }

      // Create Session Presenter Info
      var selectedPresenter = document.createTextNode(presenterName);
      var presenter = document.createElement("p");
      if (presenterName === null) {
        selectedPresenter = document.createTextNode("No Presenter Set");
        presenter.classList.add("null-text");
      }
      presenter.appendChild(selectedPresenter);

      sessionInfoDiv = document.getElementById(sessionID).appendChild(presenter);
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function addSessionRoom(sessionID, roomID) {
  var handler = "/roomHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);
      var roomNumber = null;

      for (var i = 0; i < result.length; i++) {
        if (result[i].roomID == roomID) {
          roomNumber = result[i].roomNumber;
          break;
        }
      }

      // Create Session Room Info
      var selectedRoom = document.createTextNode("Room #: " + roomNumber);
      var room = document.createElement("p");
      if (roomNumber === null) {
        selectedRoom = document.createTextNode("No Room Set");
        room.classList.add("null-text");
      }
      room.appendChild(selectedRoom);
      sessionInfoDiv = document.getElementById(sessionID).appendChild(room);
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}