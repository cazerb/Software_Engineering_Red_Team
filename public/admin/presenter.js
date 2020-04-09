// Presenter Form
function openForm() {
  document.getElementById("presenterForm").style.display = "block";
}

function closeForm() {
  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("phone-input").value = "";
  document.getElementById("presenterForm").style.display = "none";
}

function openEdit(presenterDiv) {
  // Update values
  document.getElementById("name-edit").value = presenterDiv.firstElementChild.innerHTML;
  document.getElementById("email-edit").value = presenterDiv.getElementsByClassName("presenter-email")[0].innerHTML;
  document.getElementById("phone-edit").value = presenterDiv.getElementsByClassName("presenter-phone")[0].innerHTML;
  document.getElementById("id-edit").value = presenterDiv.id;

  // Open form
  document.getElementById("presenterEditForm").style.display = "block";

  // Disable add session button
  var addButton = document.getElementById("add-presenter");
  addButton.disabled = true;
  addButton.classList.toggle("disabled");

  // Disable delete buttons
  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    close[i].disabled = true;
    close[i].classList.toggle("disabled");
  }

  // Disable edit buttons
  var editButton = document.getElementsByClassName("edit");
  for (var i = 0; i < editButton.length; i++) {
    editButton[i].disabled = true;
    editButton[i].classList.toggle("disabled");
  }
}

function closeEdit() {
  // Update values
  document.getElementById("name-edit").value = "";
  document.getElementById("email-edit").value = "";
  document.getElementById("phone-edit").value = "";
  document.getElementById("presenterEditForm").style.display = "none";

  // Check add session button
  var addButton = document.getElementById("add-presenter");
  if (addButton.disabled === true) {
    addButton.disabled = false;
    addButton.classList.toggle("disabled");
  }

  // Enable delete buttons
  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    if (close[i].disabled === true) {
      close[i].disabled = false;
      close[i].classList.toggle("disabled");
    }
  }

  // Enable edit buttons
  var editButton = document.getElementsByClassName("edit");
  for (var i = 0; i < editButton.length; i++) {
    if (editButton[i].disabled === true) {
      editButton[i].disabled = false;
      editButton[i].classList.toggle("disabled");
    }
  }
}

function addPresenter(presenterID, name, email, phone) {
  // Create div to hold new presenter item
  var presenterDiv = document.createElement("div");
  presenterDiv.classList.add("presenter-item");
  presenterDiv.classList.add("entry-item");

  // Create div to hold new room info
  var div = document.createElement("div");
  div.id = presenterID;
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
  if (phone === "null") {
    phoneText = document.createTextNode("No Phone Number");
    presenterPhone.classList.add("null-text");
  }
  presenterPhone.classList.add("presenter-phone");
  presenterPhone.appendChild(phoneText);

  // Append details to div
  div.appendChild(presenterName);
  div.appendChild(presenterEmail);
  div.appendChild(presenterPhone);

  // Create room options div
  var optionsDiv = document.createElement("DIV");
  var edit = document.createElement("button");
  var editText = document.createTextNode("EDIT");
  var span = document.createElement("button");
  var txt = document.createTextNode("DELETE");

  optionsDiv.className = "presenter-item-options";
  edit.className = "edit";
  span.className = "close";

  edit.appendChild(editText);
  span.appendChild(txt);
  optionsDiv.appendChild(edit);
  optionsDiv.appendChild(span);

  presenterDiv.appendChild(div);
  presenterDiv.appendChild(optionsDiv);

  document.getElementById("presenter-list").appendChild(presenterDiv);

  // Add Close on click
  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var presenterItemDiv = optionsDiv.parentElement;
      deletePresenter(presenterItemDiv);
    };
  }

  // Edit Presenter Item On Click
  var editButton = document.getElementsByClassName("edit");
  for (var i = 0; i < editButton.length; i++) {
    editButton[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var presenterItemDiv = optionsDiv.parentElement;
      var presenterDiv = presenterItemDiv.firstElementChild;
      openEdit(presenterDiv);
    };
  }
}
