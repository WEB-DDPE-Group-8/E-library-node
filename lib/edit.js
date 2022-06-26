let inp = document.getElementsByTagName("input");
let txt = document.getElementsByTagName("textarea");
let upd_prof = document.getElementsByClassName("upd-prof");

function edit() {
  //   let btn = document.getElementById("edit");

  for (btn of upd_prof) {
    btn.removeAttribute("hidden");
  }

  for (im of inp) {
    im.removeAttribute("readonly");
  }
  txt[0].removeAttribute("readonly");
}

function cancelEdit() {
  for (btn of upd_prof) {
    btn.setAttribute("hidden", false);
  }

  for (im of inp) {
    im.setAttribute("readonly", true);
  }
  txt[0].setAttribute("readonly", true);
}
