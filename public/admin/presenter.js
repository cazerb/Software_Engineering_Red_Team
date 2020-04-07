// Display Presenters on page load
getPresenters();

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
  close[i].onclick = function () {
    var optionsDiv = this.parentElement;
    var presenterItemDiv = optionsDiv.parentElement;
    deletePresenter(presenterItemDiv);
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

// Submit presenter information to DB
function submitPresenter() {
  var jsonOBJ = {
    name: document.getElementById("name-input").value,
    email: document.getElementById("email-input").value,
    phone: document.getElementById("phone-input").value,
  };

  sendPostRequest(jsonOBJ, "/presenterHandler/insert");
}

// Deletes a presenter
function deletePresenter(presenterDiv) {
  presenterDiv.style.display = "none";
  var infoDiv = presenterDiv.getElementsByClassName("presenter-item-info")[0];

  var jsonOBJ = {
    name: infoDiv.getElementsByClassName("presenter-name")[0].innerHTML,
    email: infoDiv.getElementsByClassName("presenter-email")[0].innerHTML,
    phone: infoDiv.getElementsByClassName("presenter-phone")[0].innerHTML,
  }

  sendPostRequest(jsonOBJ, "presenterHandler/delete")
}

// Get presenters to display
function getPresenters() {
  var handler = "/presenterHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var name = result[i].name;
        var email = result[i].email;
        var phone = result[i].phone;

        addPresenter(name, email, phone);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}

function addPresenter(name, email, phone) {
  // Create div to hold new presenter item
  var presenterDiv = document.createElement("div");
  presenterDiv.classList.add("presenter-item");

  // Create div to hold new room info
  var div = document.createElement("div");
  div.classList.add("presenter-item-info");

  // Create Presenter Name Info
  var nameText = document.createTextNode(name);
  var presenterName = document.createElement("h3");
  presenterName.classList.add("presenter-name");
  presenterName.appendChild(nameText);

  // Create Presenter Email Info
  var emailText = document.createTextNode(email);
  var presenterEmail = document.createElement("p");
  presenterEmail.classList.add("presenter-email");
  presenterEmail.appendChild(emailText);

  var phoneText = document.createTextNode(phone);
  var presenterPhone = document.createElement("p");
  presenterPhone.classList.add("presenter-phone");
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
    close[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var presenterItemDiv = optionsDiv.parentElement;
      deletePresenter(presenterItemDiv);
    };
  }
  closeForm();
}
