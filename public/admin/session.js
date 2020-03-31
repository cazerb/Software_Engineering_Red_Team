// Session Items
var sessionItems = document.getElementsByClassName("session-item");
var i;
for (i = 0; i < sessionItems.length; i++) {
  var div = document.createElement("DIV");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  div.className = "session-item-options";
  span.className = "close";
  span.appendChild(txt);
  div.appendChild(span);

  sessionItems[i].appendChild(div);
}

// Close Session Item On Click
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var optionsDiv = this.parentElement;
    var sessionItemDiv = optionsDiv.parentElement;
    sessionItemDiv.style.display = "none";
  };
}

// Session Form
function openForm() {
  document.getElementById("sessionForm").style.display = "block";
}

function closeForm() {
  document.getElementById("presenter-select").selectedIndex = 0;
  document.getElementById("room-select").selectedIndex = 0;
  document.getElementById("session-input").value = "";
  document.getElementById("start-time").value = "";
  document.getElementById("end-time").value = "";
  document.getElementById("sessionForm").style.display = "none";
}

function addSession() {
  // Create div to hold new count item
  var sessionDiv = document.createElement("div");
  sessionDiv.classList.add("session-item");

  // Create div to hold new count info
  var sessionInfo = document.createElement("div");
  sessionInfo.classList.add("session-item-info");

  // Create Count Session Info
  var sessionName = document.getElementById("session-input").value;
  var sessionText = document.createTextNode(sessionName);
  var session = document.createElement("h3");
  session.appendChild(sessionText);

  // Create Session Time Info
  var startTime = document.getElementById("start-time").value;
  var endTime = document.getElementById("end-time").value;
  var timeText = document.createTextNode(
    "Time: " + startTime + " - " + endTime
  );
  var sessionTime = document.createElement("p");
  sessionTime.appendChild(timeText);

  // Create Session Presenter Info
  var presenterSelect = document.getElementById("presenter-select");
  var selectedPresenter =
    presenterSelect.options[presenterSelect.selectedIndex].text;
  var presenterText = document.createTextNode(
    "Presenter: " + selectedPresenter
  );
  var presenter = document.createElement("p");
  presenter.appendChild(presenterText);

  // Create Session Room Info
  var roomSelect = document.getElementById("room-select");
  var selectedRoom = roomSelect.options[roomSelect.selectedIndex].value;
  var roomText = document.createTextNode("Room #: " + selectedRoom);
  var room = document.createElement("p");
  room.appendChild(roomText);

  // Append Info to div
  sessionInfo.appendChild(session);
  sessionInfo.appendChild(sessionTime);
  sessionInfo.appendChild(presenter);
  sessionInfo.appendChild(room);

  // Create Count options div
  var optionsDiv = document.createElement("DIV");
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "count-item-options";
  span.className = "close";
  span.appendChild(txt);
  optionsDiv.appendChild(span);

  sessionDiv.appendChild(sessionInfo);
  sessionDiv.appendChild(optionsDiv);

  document.getElementById("session-list").appendChild(sessionDiv);

  // Add Close on click
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var optionsDiv = this.parentElement;
      var sessionItemDiv = optionsDiv.parentElement;
      sessionItemDiv.style.display = "none";
    };
  }

  closeForm();
}
