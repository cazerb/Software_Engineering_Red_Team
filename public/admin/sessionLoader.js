/*******************************************************************
 *******************************************************************
 *** All JavaScript that deals with loading data for Sessions UI ***
 *******************************************************************
 *******************************************************************/

// Display sessions on page load
getSessions();
loadPresenterDropdown("presenter-select");
loadPresenterDropdown("presenter-edit");
loadRoomDropdown("room-select");
loadRoomDropdown("room-edit");

/**
 * FUNCTION
 * Loads in presenters for session dropdown
 */
function loadPresenterDropdown(dropdown) {
  var handler = "/presenterHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var select = document.getElementById(dropdown);
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
function loadRoomDropdown(dropdown) {
  var handler = "/roomHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var select = document.getElementById(dropdown);
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
