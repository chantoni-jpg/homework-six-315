var ingredCounter = 3;
var instructCounter = 3;

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function addIngred(e) {
  ingredCounter++;
  $("#ingredients").append(
    `<input id="ind${ingredCounter}" type="text" placeholder="Ingredient #${ingredCounter}">`
  );
}
function addInstr(e) {
  instructCounter++;
  $("#instructions").append(
    `<input id="ind${instructCounter}" type="text" placeholder="Instruction #${instructCounter}">`
  );
}

function initFirebase() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("connected");
      $("#log-out").css("display", "inline-block");
      $(".button").css("display", "none");
      $(".loggedIn").css("display", "inline-block");
    } else {
      console.log("user is not there");
      $("#log-out").css("display", "none");
      $(".button").css("display", "inline-block");
      $(".loggedIn").css("display", "none");
    }
  });
}

function loadBrowse() {
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes.PIZZA);

    $.each(recipes.PIZZA, function (index, recipe) {
      console.log("recipe " + recipe.recipeName);
      $("#pizza").append(
        `<div class="title"><h3>${recipe.recipeName}</h3></div>
        <div class="description"><p>${recipe.recipeDescription}</p></div>
            <div class="time"><img src="images/time.svg"width="23" height="24">${recipe.time}</div>
            <div class="servings"><img src="images/servings.svg"width="23" height="24">${recipe.servings}</div>`
      );
    });
  });
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes.CHICKEN);

    $.each(recipes.CHICKEN, function (index, recipe) {
      console.log("recipe " + recipe.recipeName);
      $("#chicken").append(
        `<div class="title"><h3>${recipe.recipeName}</h3></div>
        <div class="description"><p>${recipe.recipeDescription}</p></div>
            <div class="time"><img src="images/time.svg"width="23" height="24">${recipe.time}</div>
            <div class="servings"><img src="images/servings.svg"width="23" height="24">${recipe.servings}</div>`
      );
    });
  });
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes.CHOWMEIN);

    $.each(recipes.CHOWMEIN, function (index, recipe) {
      console.log("recipe " + recipe.recipeName);
      $("#chow").append(
        `<div class="title"><h3>${recipe.recipeName}</h3></div>
        <div class="description"><p>${recipe.recipeDescription}</p></div>
            <div class="time"><img src="images/time.svg"width="23" height="24">${recipe.time}</div>
            <div class="servings"><img src="images/servings.svg"width="23" height="24">${recipe.servings}</div>`
      );
    });
  });
  $.getJSON("data/data.json", function (recipes) {
    console.log(recipes.BURGER);

    $.each(recipes.BURGER, function (index, recipe) {
      console.log("recipe " + recipe.recipeName);
      $("#burger").append(
        `<div class="title"><h3>${recipe.recipeName}</h3></div>
        <div class="description"><p>${recipe.recipeDescription}</p></div>
            <div class="time"><img src="images/time.svg"width="23" height="24">${recipe.time}</div>
            <div class="servings"><img src="images/servings.svg"width="23" height="24">${recipe.servings}</div>`
      );
    });
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
    loadBrowse();
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

function deleteData() {
  var elem = document.getElementById("pizza");
  var pizza = document.getElementById("pizzaImage");
  var deleteBtn = document.getElementById("delete");
  var edit = document.getElementById("edit");
  var view = document.getElementById("view");
  elem.remove();
  pizza.remove();
  deleteBtn.remove();
  edit.remove();
  view.remove();
}

$(document).ready(function () {
  openNav();
  closeNav();
  initListen();
  try {
    let app = firebase.app();
    initFirebase();
  } catch {
    console.log(e);
    console.log(errorMessage);
  }
});
