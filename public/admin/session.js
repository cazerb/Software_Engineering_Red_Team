// Display sessions on page load
getSessions();

// Session Items
var sessionItems = document.getElementsByClassName("session-item");
var i;
for (i = 0; i < sessionItems.length; i++) {
  var div = document.createElement("DIV");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  div.className = "session-item-options";
  span.className = "close";
  span.appendChild(txt);
  div.appendChild(span);

  sessionItems[i].appendChild(div);
}

// Close Session Item On Click
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var optionsDiv = this.parentElement;
    var sessionItemDiv = optionsDiv.parentElement;
    deleteSession(sessionItemDiv);
  };
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
  var jsonOBJ = {
    sessionName: document.getElementById("session-input").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    presenter: document.getElementById("presenter-select").value,
    room: document.getElementById("room-select").value
  }

  sendPostRequest(jsonOBJ,"/sessionHandler/insert");
}

// Deletes a presenter
function deleteSession(sessionDiv) {
  sessionDiv.style.display = "none";
  var infoDiv = sessionDiv.getElementsByClassName("session-item-info")[0];

  var jsonOBJ = {
    name: infoDiv.getElementsByClassName("session-name")[0].innerHTML,
  }

  sendPostRequest(jsonOBJ, "sessionHandler/delete");
}

// Get presenters to display
function getSessions() {
  var handler = "/sessionHandler/query";

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var sessionName = result[i].sessionName;
        var startTime = result[i].startTime;
        var endTime = result[i].endTime;
        var room = result[i].roomID;
        var presenter = result[i].presenterID;

        addSession(sessionName, startTime, endTime, room, presenter);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function addSession(sessionName, startTime, endTime, roomID, presenterID) {
  // Create div to hold new count item
  var sessionDiv = document.createElement("div");
  sessionDiv.classList.add("session-item");

  // Create div to hold new count info
  var sessionInfo = document.createElement("div");
  sessionInfo.classList.add("session-item-info");

  // Create Count Session Info
  var sessionText = document.createTextNode(sessionName);
  var session = document.createElement("h3");
  session.classList.add("session-name");
  session.appendChild(sessionText);

  // Create Session Time Info
  var timeText = document.createTextNode(
    "Time: " + startTime + " - " + endTime
  );
  var sessionTime = document.createElement("p");
  sessionTime.appendChild(timeText);

  // Create Session Presenter Info
  var selectedPresenter = document.createTextNode(presenterID);
  var presenter = document.createElement("p");
  presenter.appendChild(selectedPresenter);

  // Create Session Room Info
  var selectedRoom = document.createTextNode("Room #: " + roomID);
  var room = document.createElement("p");
  room.appendChild(selectedRoom);

  // Append Info to div
  sessionInfo.appendChild(session);
  sessionInfo.appendChild(sessionTime);
  sessionInfo.appendChild(presenter);
  sessionInfo.appendChild(room);

  // Create Count options div
  var optionsDiv = document.createElement("DIV");
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "count-item-options";
  span.className = "close";
  span.appendChild(txt);
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

  closeForm();
}
