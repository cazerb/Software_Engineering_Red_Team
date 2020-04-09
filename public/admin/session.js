/**
 **********************************************************************
 *** SESSION CREATION TOOLS & OTHER METHODS RELATING TO SESSIONS UI ***
 **********************************************************************
 */

 /**
 * FUNCTION
 * Opens session add-form
 */
function openForm() {
  document.getElementById("sessionForm").style.display = "block";
}

/**
 * FUNCTION
 * Opens session add-form
 */
function closeForm() {
  document.getElementById("session-input").value = "";
  document.getElementById("start-time").value = "";
  document.getElementById("end-time").value = "";
  document.getElementById("presenter-select").selectedIndex = 0;
  document.getElementById("room-select").selectedIndex = 0;
  document.getElementById("sessionForm").style.display = "none";
}

function openEdit(sessionDiv) {
  // Update values
  document.getElementById("session-edit").value = sessionDiv.firstElementChild.innerHTML;
  document.getElementById("id-edit").value = sessionDiv.id;

  // document.getElementById("end-edit").value = "";
  // document.getElementById("presenter-edit").selectedIndex = 0;
  // document.getElementById("room-edit").selectedIndex = 0;

  // Open form
  document.getElementById("sessionEditForm").style.display = "block";

  // Disable add session buttion
  var addButton = document.getElementById("add-session");
  addButton.disabled = true;
  addButton.classList.toggle("disabled");
}

function closeEdit() {
  // Update values
  document.getElementById("session-edit").value = "";
  document.getElementById("start-edit").value = "";
  document.getElementById("end-edit").value = "";
  document.getElementById("presenter-edit").selectedIndex = 0;
  document.getElementById("room-edit").selectedIndex = 0;
  document.getElementById("sessionEditForm").style.display = "none";

  // Check add session button
  var addButton = document.getElementById("add-session");
  if (addButton.disabled === true) {
    addButton.disabled = false;
    addButton.classList.toggle("disabled");
  }
}

function createSessionDiv(sessionID, sessionName) {
  // Create div to hold new session item
  var sessionDiv = document.createElement("div");
  sessionDiv.classList.add("session-item");
  sessionDiv.classList.add("entry-item");

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
  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var optionsDiv = this.parentElement;
      var sessionItemDiv = optionsDiv.parentElement;
      deleteSession(sessionItemDiv);
    };
  }

  // Edit Session Item On Click
  var editButton = document.getElementsByClassName("edit");
  for (var i = 0; i < editButton.length; i++) {
    editButton[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var sessionItemDiv = optionsDiv.parentElement;
      var sessionDiv = sessionItemDiv.firstElementChild;
      openEdit(sessionDiv);
    };
  }
}

function addSessionTime(sessionID, startTime, endTime) {
  // Create Session Time Info
  var sessionTime = document.createElement("p");

  if ((startTime === "00:00:00" || startTime === null) && (endTime === "00:00:00" || endTime === null)) {
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