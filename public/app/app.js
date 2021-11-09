function initListeners() {
  let displayCount = 0;

  $(".fa-bars").click(function () {
    if (displayCount == 0) {
      $(".mobile-links").css("display", "flex");
      displayCount = 1;
    } else {
      $(".mobile-links").css("display", "none");
      displayCount = 0;
    }
  });
}
function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected");
      $("#log-out").css("display", "inline-block");
      $(".button").css("display", "none");
    } else {
      console.log("user is not there");
      $("#log-out").css("display", "none");
      $(".button").css("display", "inline-block");
    }
  });
}

function createUser(e) {
  let password = $("#signPassword").val();
  let email = $("#signEmail").val();
  let fName = $("#fname").val();
  let lName = $("#lname").val();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
}

function login() {
  console.log("Login!");
  let password = $("#password").val();
  let email = $("#email").val();
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("signed in");
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
}

function listeners() {
  $("button").click(function (e) {
    e.preventDefault();
    let btnID = e.currentTarget.id;
    if (btnID == "signup") {
      createUser();
    } else if (btnID == "login") {
      login();
    }
  });
}
function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#/", "");

  if (pageID == "") {
    navToPage("home");
  } else {
    navToPage(pageID);
  }
}

function navToPage(pageName) {
  $.get(`pages/${pageName}/${pageName}.html`, function (data) {
    console.log(data);
    $("#app").html(data);
  });
}
function initListen() {
  $(window).on("hashchange", route);
  route();
}
$(document).ready(function () {
  initListeners();
  initListen();
  try {
    let app = firebase.app();
    initFirebase();
  } catch {
    console.log(e);
    console.log(errorMessage);
  }
});
