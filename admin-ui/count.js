// Count Items
var countItems = document.getElementsByClassName("count-item");
var i;
for (i = 0; i < countItems.length; i++) {
  var div = document.createElement("DIV");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  div.className = "count-item-options";
  span.className = "close";
  span.appendChild(txt);
  div.appendChild(span);

  countItems[i].appendChild(div);
}

// Close Count Item On Click
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var optionsDiv = this.parentElement;
    var countItemDiv = optionsDiv.parentElement;
    countItemDiv.style.display = "none";
  };
}

// Count Form
function openForm() {
  document.getElementById("countForm").style.display = "block";
}

function closeForm() {
  document.getElementById("session-select").selectedIndex = 0;
  document.getElementById("starting-input").value = "";
  document.getElementById("middle-input").value = "";
  document.getElementById("end-input").value = "";
  document.getElementById("countForm").style.display = "none";
}

function addCount() {
  // Create div to hold new count item
  var countDiv = document.createElement("div");
  countDiv.classList.add("count-item");

  // Create div to hold new count info
  var countInfo = document.createElement("div");
  countInfo.classList.add("count-item-info");

  // Create Count Session Info
  var sessionSelect = document.getElementById("session-select");
  var selectedSession = sessionSelect.options[sessionSelect.selectedIndex].text;
  var sessionText = document.createTextNode(selectedSession);
  var session = document.createElement("h3");
  session.appendChild(sessionText);

  // Create Starting Count Info
  var startingInput = document.getElementById("starting-input").value;
  var startingText = document.createTextNode(
    "Starting Count: " + startingInput
  );
  var startingCount = document.createElement("p");
  startingCount.appendChild(startingText);

  // Create Middle Count Info
  var middleInput = document.getElementById("middle-input").value;
  var middleText = document.createTextNode("Middle Count: " + middleInput);
  var middleCount = document.createElement("p");
  middleCount.appendChild(middleText);

  // Create End Count Info
  var endInput = document.getElementById("end-input").value;
  var endText = document.createTextNode("End Count: " + endInput);
  var endCount = document.createElement("p");
  endCount.appendChild(endText);

  // Append Info to div
  countInfo.appendChild(session);
  countInfo.appendChild(startingCount);
  countInfo.appendChild(middleCount);
  countInfo.appendChild(endCount);

  // Create Count options div
  var optionsDiv = document.createElement("DIV");
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "count-item-options";
  span.className = "close";
  span.appendChild(txt);
  optionsDiv.appendChild(span);

  countDiv.appendChild(countInfo);
  countDiv.appendChild(optionsDiv);

  document.getElementById("count-list").appendChild(countDiv);

  // Add Close on click
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var optionsDiv = this.parentElement;
      var countItemDiv = optionsDiv.parentElement;
      countItemDiv.style.display = "none";
    };
  }

  closeForm();
}
