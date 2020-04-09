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
  };

  sendPostRequest(jsonOBJ, "presenterHandler/delete");
}

function editPresenter() {
    // Pack in JSON object
    var jsonOBJ = {
      presenterID: document.getElementById("id-edit").value,
      name: document.getElementById("name-edit").value,
      email: document.getElementById("email-edit").value,
      phone: document.getElementById("phone-edit").value
    };
  
    sendPostRequest(jsonOBJ, "/presenterHandler/update");
  }