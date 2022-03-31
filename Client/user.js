window.addEventListener("load", function () {
  logged = localStorage.getItem("loggedin");
  console.log(logged);
  username = document.getElementById("usrname");

  username.innerHTML = logged; //for the nav bar
  prof_name.innerHTML = logged; //for the name in the profile page
});

//  change button attributes when the right info has been entered
var log = document.getElementById("log");
//  log.setAttribute("background-color","Red");
var val = document.getElementById("val");

// validation button
log.addEventListener("click", function () {
  var email = document.getElementById("email");
  var pass = document.getElementById("pass");

  //  way it is stored in the local storage
  key = email + "," + pass;

  //  console.log("key: " + key)
  //  email = localStorage.getItem("loggedin")
  // var un = email.search(/@gmail.com/i);
  // console.log("un" + un)
  // email = email.value.slice(0,un)

  console.log(email);

  // Iterates and matches login credentials with the stored values
  var valid = []
  for (i = 1; i < localStorage.length; i++) {
    // let bnj = JSON.parse()

    valid[i] = JSON.parse(localStorage.getItem(i));
    console.log(valid[i].email);

  }
    // valid = localStorage.getItem(i)

    if(!valid.includes(email.value))
    {
    console.log("valid login info")
    localStorage.setItem("loggedin", email.value)
    console.log("last-loggedin:" + email.value)

    form_action = document.getElementById("form_action")
    form_action.setAttribute("action", "index.html")
  }
});
