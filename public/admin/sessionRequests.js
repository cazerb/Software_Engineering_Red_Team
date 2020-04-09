/**
 ******************************************************************
 *** POST REQUESTS & OTHER FORM FUNCTIONALITIES FOR SESSIONS UI ***
 ******************************************************************
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
  document.getElementById("presenter-select").selectedIndex = 0;
  document.getElementById("room-select").selectedIndex = 0;
  document.getElementById("session-input").value = "";
  document.getElementById("start-time").value = "";
  document.getElementById("end-time").value = "";
  document.getElementById("sessionForm").style.display = "none";
}

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
  var infoDiv = sessionDiv.getElementsByClassName("session-item-info")[0];

  var jsonOBJ = {
    sessionName: infoDiv.getElementsByClassName("session-name")[0].innerHTML,
  };

  sendPostRequest(jsonOBJ, "sessionHandler/delete");
}
