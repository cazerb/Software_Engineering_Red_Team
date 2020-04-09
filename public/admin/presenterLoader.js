// Display Presenters on page load
getPresenters();

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
