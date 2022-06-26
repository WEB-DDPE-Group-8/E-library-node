var fname = document.getElementById("fname")
var lname = document.getElementById("lname")
var email = document.getElementById("email")
var mob = document.getElementById("mob")
var sub = document.getElementById("sub")

var usrname = document.getElementById("usrname")

var pass = document.getElementById("pass")
var pass2 = document.getElementById("passwrd")


// var form_action = document.getElementById("form_action")

function rest() {
    if (pass.value == pass2.value) {
        localStorage.setItem("loggedin", usrname.value)
        console.log("last-loggedin:" + usrname.value)
        form_action = document.getElementById("form_action")

        form_action.setAttribute("action", "index.html")
        console.log(form_action)
    } else {
        alert("The two passwords you entered do not match")
    }

}

function test() {
    var check = []
    for (i = 1; i < localStorage.length; i++) {
        check[i] = JSON.parse(localStorage.getItem(i))
    }

    var EmailList = []
    for (i = 1; i < check.length; i++) {
        EmailList[i] = check[i].email;
    }

    if (EmailList.includes(email.value)) {

        console.log(email.value)
        alert(email.value + " already exists")
    } else {
        rest()
    }
}