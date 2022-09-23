// Global Variables
var loadeddata;
var rack_hit = "rack1";
var section_hit = "section1";

function rack_dis() {
  // Referencing to table based on rack number and section number
  var messagesRef = firebase
    .database()
    .ref("seconddata/" + rack_hit + "/" + section_hit);
  messagesRef.on(
    "value",
    function (snapshot) {
      // Total filtered data will be stored in loadeddata variable
      loadeddata = snapshot.val();

      // Creating multiple cards based loadeddata
      let tab1 = "";
      for (let r in loadeddata) {
        tab1 += `<div class="card" style="width: 18rem;">
            <img class="card-img-top" height="161px" width="286px" src="${loadeddata[r].ImageUrl}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${loadeddata[r].Name}</h5>
          <p class="card-text">${loadeddata[r].Description}</p>
          <button onclick="seemore('${r}')" class="btn btn-primary">See More</button>
          </div>
        </div>`;
      }
      // Displaying in html in paragraph tag with ID "dispay-data"
      document.getElementById("dispay-data").innerHTML = tab1;
    },
    function (error) {
      console.log("Error: " + error.code);
    }
  );
}
// See more function to Alert card data
function seemore(val) {
  let alert_val = "";
  alert_val =
    "Name : " +
    loadeddata[val].Name +
    "<br />" +
    "Brand : " +
    loadeddata[val].Brand +
    "<br />" +
    "Rating : " +
    loadeddata[val].Rating +
    "<br />" +
    "Price : " +
    loadeddata[val].Price +
    "<br />" +
    "Height : " +
    loadeddata[val].Height +
    "<br />" +
    "Width : " +
    loadeddata[val].Width +
    "<br />" +
    "Rack Number : " +
    loadeddata[val].Rack +
    "<br />" +
    "Section : " +
    loadeddata[val].Section +
    "<br />" +
    "Status : " +
    loadeddata[val].Status +
    "<br />" +
    "Color : " +
    loadeddata[val].Color +
    "<br />" +
    "Description : " +
    loadeddata[val].Description +
    "<br />";
  //  alert(alert_val);
  $(document).ready(function () {
    // document.getElementById("#exampleModal").innerHTML = alert_val;
    $("h5").html(loadeddata[val].Name);
    $("h6").html(alert_val);
    $("#exampleModal").modal("show");
  });
}

// Rack navigating/changing
function rack_change(val) {
  rack_hit = val;
  rack_dis();
}

// Section navigating/changing
function sec_change(val) {
  section_hit = val;
  rack_dis();
}

function createuser() {
  var email = "myemail@email.com";
  var password = "mypassword";

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });
}

function signin() {
  var email = "myemail@email.com";
  var password = "mypassword";

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password).then((userCredential) => {
      alert(email+" Thanks for Signin!!!!");
      location.reload();
    })
    .catch(function (error) {
      console.log(error.code);
      console.log(error.message);
    });
    // location.reload();
  
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
       alert("Logged out!");
       location.reload();
      },
      function (error) {
        console.log(error.code);
        console.log(error.message);
      }
    );
}
