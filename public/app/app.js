$(document).ready(function () {
  initListeners();
  try {
    let app = firebase.app();
    initFirebase();
    listeners();
  } catch {
    console.log(e);
    console.log(errorMessage);
  }
});

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
      $(".pName").css("display", "block");
    } else {
      console.log("user is not there");
      $(".pName").css("display", "none");
    }
  });
}

function createUser() {
  let password = $("#password").val();
  let email = $("#email").val();

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
  let password = $("#password").val();
  let email = $("#email").val();
  let fName = $("#password").val();
  let lName = "An";
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
