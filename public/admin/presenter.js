// Presenter Items
var presenterItems = document.getElementsByClassName("presenter-item");
var i;
for (i = 0; i < presenterItems.length; i++) {
  var div = document.createElement("DIV");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  div.className = "presenter-item-options";
  span.className = "close";
  span.appendChild(txt);
  div.appendChild(span);

  presenterItems[i].appendChild(div);
}

// Close Presenter Item On Click
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var optionsDiv = this.parentElement;
    var presenterItemDiv = optionsDiv.parentElement;
    presenterItemDiv.style.display = "none";
  };
}

// Presenter Form
function openForm() {
  document.getElementById("presenterForm").style.display = "block";
}

function closeForm() {
  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("presenterForm").style.display = "none";
}

function addPresenter() {
  // Create div to hold new presenter item
  var presenterDiv = document.createElement("div");
  presenterDiv.classList.add("presenter-item");

  // Create div to hold new room info
  var div = document.createElement("div");
  div.classList.add("presenter-item-info");

  // Create Presenter Name Info
  var nameInput = document.getElementById("name-input").value;
  var nameText = document.createTextNode("Name: " + nameInput);
  var presenterName = document.createElement("h3");
  presenterName.appendChild(nameText);

  // Create Presenter Email Info
  var emailInput = document.getElementById("email-input").value;
  var emailText = document.createTextNode("Email: " + emailInput);
  var presenterEmail = document.createElement("p");
  presenterEmail.appendChild(emailText);

  var phoneInput = document.getElementById("phone-input").value;
  var phoneText = document.createTextNode("Phone: " + phoneInput);
  var presenterPhone = document.createElement("p");
  presenterPhone.appendChild(phoneText);

  // Append details to div
  div.appendChild(presenterName);
  div.appendChild(presenterEmail);
  div.appendChild(presenterPhone);

  // Create room options div
  var optionsDiv = document.createElement("DIV");
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");

  optionsDiv.className = "presenter-item-options";
  span.className = "close";
  span.appendChild(txt);
  optionsDiv.appendChild(span);

  presenterDiv.appendChild(div);
  presenterDiv.appendChild(optionsDiv);

  document.getElementById("presenter-list").appendChild(presenterDiv);

  // Add Close on click
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var optionsDiv = this.parentElement;
      var presenterItemDiv = optionsDiv.parentElement;
      presenterItemDiv.style.display = "none";
    };
  }
  closeForm();
}
