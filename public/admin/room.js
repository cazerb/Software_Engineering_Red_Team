function openForm() {
  document.getElementById("roomForm").style.display = "block";
}

function closeForm() {
  document.getElementById("room-input").value = "";
  document.getElementById("capacity-input").value = "";
  document.getElementById("roomForm").style.display = "none";
}

function openEdit(roomDiv) {
  // Update values
  var currentRoom = String(roomDiv.firstElementChild.innerHTML);
  currentRoom = currentRoom.split("#: ")[1];
  document.getElementById("room-edit").value = currentRoom;

  var currentCapacity = String(roomDiv.getElementsByClassName("room-capacity")[0].innerHTML);
  currentCapacity = currentCapacity.split(": ")[1];
  document.getElementById("capacity-edit").value = currentCapacity;
  document.getElementById("id-edit").value = roomDiv.id;

  // Open form
  document.getElementById("roomEditForm").style.display = "block";

  // Disable add session buttion
  var addButton = document.getElementById("add-room");
  addButton.disabled = true;
  addButton.classList.toggle("disabled");
}

function closeEdit() {
  // Update values
  document.getElementById("room-edit").value = "";
  document.getElementById("capacity-edit").value = "";
  document.getElementById("roomEditForm").style.display = "none";

  // Check add session button
  var addButton = document.getElementById("add-room");
  if (addButton.disabled === true) {
    addButton.disabled = false;
    addButton.classList.toggle("disabled");
  }
}

function addRoom(roomID, number, capacity) {
  // Create div to hold new room item
  var roomDiv = document.createElement("div");
  roomDiv.classList.add("room-item");
  roomDiv.classList.add("entry-item");

  // Create div to hold new room info
  var div = document.createElement("div");
  div.id = roomID;
  div.classList.add("room-item-info");

  // Create Room Number Info
  var roomText = document.createTextNode("Room #: " + number);
  var roomNumber = document.createElement("h3");
  roomNumber.classList.add("room-number");
  roomNumber.appendChild(roomText);

  // Create Room Capacity Info
  var capacityText = document.createTextNode("Capacity: " + capacity);
  var roomCapacity = document.createElement("p");
  if (capacity === null) {
    capacityText = document.createTextNode("No Capacity Set");
    roomCapacity.classList.add("null-text");
  }
  roomCapacity.classList.add("room-capacity");
  roomCapacity.appendChild(capacityText);

  // Append details to room info div
  div.appendChild(roomNumber);
  div.appendChild(roomCapacity);

  // Create room options div
  var optionsDiv = document.createElement("DIV");
  var edit = document.createElement("p");
  var editText = document.createTextNode("EDIT");
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "room-item-options";
  edit.className = "edit";
  span.className = "close";

  edit.appendChild(editText);
  span.appendChild(txt);
  optionsDiv.appendChild(edit);
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

  // Edit Room Item On Click
  var editButton = document.getElementsByClassName("edit");
  for (var i = 0; i < editButton.length; i++) {
    editButton[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var roomItemDiv = optionsDiv.parentElement;
      var roomDiv = roomItemDiv.firstElementChild;
      openEdit(roomDiv);
    };
  }
}
