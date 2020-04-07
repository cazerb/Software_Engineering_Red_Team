// Display rooms on page load
getRooms();

// Room Items
var roomItems = document.getElementsByClassName("room-item");
var i;
for (i = 0; i < roomItems.length; i++) {
  var div = document.createElement("DIV");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  div.className = "room-item-options";
  span.className = "close";
  span.appendChild(txt);
  div.appendChild(span);

  roomItems[i].appendChild(div);
}

// Close Room Item On Click
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var optionsDiv = this.parentElement;
    var roomItemDiv = optionsDiv.parentElement;
    deleteRoom(roomItemDiv);
  };
}

function openForm() {
  document.getElementById("roomForm").style.display = "block";
}

function closeForm() {
  document.getElementById("room-input").value = "";
  document.getElementById("capacity-input").value = "";
  document.getElementById("roomForm").style.display = "none";
}

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
    roomNumber: infoDiv.getElementsByClassName("room-number")[0].innerHTML.split(": ")[1],
    capacity: infoDiv.getElementsByClassName("room-capacity")[0].innerHTML.split(": ")[1],
  }

  sendPostRequest(jsonOBJ, "roomHandler/delete")
}

// Get rooms to display
function getRooms() {
  var handler = "roomHandler/query";

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var number = result[i].roomNumber;
        var capacity = result[i].capacity;

        addRoom(number, capacity);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function addRoom(number, capacity) {
  // Create div to hold new room item
  var roomDiv = document.createElement("div");
  roomDiv.classList.add("room-item");

  // Create div to hold new room info
  var div = document.createElement("div");
  div.classList.add("room-item-info");

  // Create Room Number Info
  var roomText = document.createTextNode("Room #: " + number);
  var roomNumber = document.createElement("h3");
  roomNumber.classList.add("room-number");
  roomNumber.appendChild(roomText);

  // Create Room Capacity Info
  var capacityText = document.createTextNode("Capacity: " + capacity);
  var roomCapacity = document.createElement("p");
  roomCapacity.classList.add("room-capacity");
  roomCapacity.appendChild(capacityText);

  // Append details to room info div
  div.appendChild(roomNumber);
  div.appendChild(roomCapacity);

  // Create room options div
  var optionsDiv = document.createElement("DIV");
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "room-item-options";
  span.className = "close";
  span.appendChild(txt);
  optionsDiv.appendChild(span);

  roomDiv.appendChild(div);
  roomDiv.appendChild(optionsDiv);

  document.getElementById("room-list").appendChild(roomDiv);

  // Add Close on click
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var roomItemDiv = optionsDiv.parentElement;
      deleteRoom(roomItemDiv);
    };
  }
  closeForm();
}
