/**
 ******************************************************************
 *** POST REQUESTS & OTHER FORM FUNCTIONALITIES FOR SESSIONS UI ***
 ******************************************************************
 */

/**
 * FUNCTION
 * Post request to submit form to database
 */
function submitSession() {
  // Get selected presenterID
  var presenterSelect = document.getElementById("presenter-select");
  var presenterID =
    presenterSelect.options[presenterSelect.selectedIndex].value;

  // Get selected roomID
  var roomSelect = document.getElementById("room-select");
  var roomID = roomSelect.options[roomSelect.selectedIndex].value;

  // Pack in JSON object
  var jsonOBJ = {
    sessionName: document.getElementById("session-input").value,
    startTime: document.getElementById("start-time").value,
    endTime: document.getElementById("end-time").value,
    presenterID: presenterID,
    roomID: roomID,
  };

  sendPostRequest(jsonOBJ, "/sessionHandler/insert");
}

/**
 * FUNCTION
 * Post request to delete item from database
 */
function deleteSession(sessionDiv) {
  sessionDiv.style.display = "none";
  var infoDiv = sessionDiv.getElementsByClassName("session-item-info")[0].id;
  console.log(infoDiv);

  var jsonOBJ = {
    sessionID: infoDiv,
  };

  sendPostRequest(jsonOBJ, "sessionHandler/delete");
}

/**
 * FUNCTION
 * Post request to edit/update session
 */
function editSession() {
  // Get selected presenterID
  var presenterSelect = document.getElementById("presenter-edit");
  var presenterID =
    presenterSelect.options[presenterSelect.selectedIndex].value;

  // Get selected roomID
  var roomSelect = document.getElementById("room-edit");
  var roomID = roomSelect.options[roomSelect.selectedIndex].value;

  // Pack in JSON object
  var jsonOBJ = {
    sessionID: document.getElementById("id-edit").value,
    sessionName: document.getElementById("session-edit").value,
    startTime: document.getElementById("start-edit").value,
    endTime: document.getElementById("end-edit").value,
    presenterID: presenterID,
    roomID: roomID,
  };

  sendPostRequest(jsonOBJ, "/sessionHandler/update");
}