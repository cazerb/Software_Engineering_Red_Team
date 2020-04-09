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

// Get rooms to display
function getRooms() {
  var handler = "roomHandler/query";

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var roomID = result[i].roomID;
        var number = result[i].roomNumber;
        var capacity = result[i].capacity;

        addRoom(roomID, number, capacity);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}
