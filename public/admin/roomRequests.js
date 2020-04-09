// Submit Room Form
function submitRoom() {
  var jsonOBJ = {
    roomNumber: document.getElementById("room-input").value,
    capacity: document.getElementById("capacity-input").value,
  };

  sendPostRequest(jsonOBJ, "/roomHandler/insert");
}

// Deletes a room
function deleteRoom(roomDiv) {
  roomDiv.style.display = "none";
  var infoDiv = roomDiv.getElementsByClassName("room-item-info")[0];

  var jsonOBJ = {
    roomNumber: infoDiv
      .getElementsByClassName("room-number")[0]
      .innerHTML.split("#: ")[1],
  };

  sendPostRequest(jsonOBJ, "roomHandler/delete");
}

function editRoom() {
    // Pack in JSON object
    var jsonOBJ = {
      roomID: document.getElementById("id-edit").value,
      roomNumber: document.getElementById("room-edit").value,
      capacity: document.getElementById("capacity-edit").value,
    };
  
    sendPostRequest(jsonOBJ, "/roomHandler/update");
  }
