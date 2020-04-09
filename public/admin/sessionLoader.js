/**
 *******************************************************************
 *** All JavaScript that deals with loading data for Sessions UI ***
 *******************************************************************
 */

// Display sessions on page load
getSessions();
loadPresenterDropdown();
loadRoomDropdown();
loadOptionsMenu();

/**
 * FUNCTION
 * Loads in menu options for each session item displayed
 */
function loadOptionsMenu() {
  var sessionItems = document.getElementsByClassName("session-item");

  // Add option menu for each session item
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
    close[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var sessionItemDiv = optionsDiv.parentElement;
      deleteSession(sessionItemDiv);
    };
  }
}

/**
 * FUNCTION
 * Loads in presenters for session dropdown
 */
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

/**
 * FUNCTION
 * Loads in rooms for session dropdown
 */
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

/**
 * FUNCTION
 * Loads in all sessions from database
 */
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
