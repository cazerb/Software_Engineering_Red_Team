// Display rooms on page load
getRooms();

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
