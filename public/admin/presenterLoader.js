// Display Presenters on page load
getPresenters();
loadOptionsMenu();

function loadOptionsMenu() {
  // Presenter Items
  var presenterItems = document.getElementsByClassName("presenter-item");
  for (var i = 0; i < presenterItems.length; i++) {
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
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var optionsDiv = this.parentElement;
      var presenterItemDiv = optionsDiv.parentElement;
      deletePresenter(presenterItemDiv);
    };
  }

  // Edit Session Item On Click
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

// Get presenters to display
function getPresenters() {
  var handler = "/presenterHandler/query";
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      result = JSON.parse(this.response);

      for (var i = 0; i < result.length; i++) {
        var presenterID = result[i].presenterID;
        var name = result[i].name;
        var email = result[i].email;
        var phone = result[i].phone;

        addPresenter(presenterID, name, email, phone);
      }
    }
  };

  xhr.open("GET", handler);
  xhr.send();
}
