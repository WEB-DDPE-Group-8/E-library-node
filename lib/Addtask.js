if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
  console.log("dfbgj");
}

function ready() {
  var publishbtns = document.getElementsByClassName("publishbtn");
  for (var i = 0; i < publishbtns.length; i++) 
  {
    var button = publishbtns[i];
    button.addEventListener("click", publish);
  }
    var rembtns = document.getElementsByClassName("rem");
    for (var i = 0; i < rembtns.length; i++)
    {
      var button = rembtns[i];
      button.addEventListener("click", remove);
    }
  }


window.addEventListener("load", function () {
  var parent = document.getElementById("admin-tasks");

   for ( i of JSON.parse(localStorage.getItem("arrcounter")))
  {   
    console.log(i)
    if(localStorage.getItem(JSON.stringify(i+"pending"))!=null)
    {
    var book =  JSON.parse(localStorage.getItem(JSON.stringify(i+"pending")));
    console.log(book)
    
    var title = document.createTextNode(book.title);
    var bookno = document.createTextNode(book.descindx);
    var auth = document.createTextNode(book.auth);
    var year = document.createTextNode(book.year);
    var cat = document.createTextNode(book.cat);
    var lang = document.createTextNode(book.lang);
    var price = document.createTextNode(book.price);
    var desc = document.createTextNode(book.desc);
    var ele = [bookno,title,  auth, year, cat, lang, price, desc];
    var a = [
      "Book Key",
      "Title",
      "Author",
      "Date of Publish",
      "Genre",
      "Language",
      "Price in $",
      "Description",
    ];

    var div = document.createElement("div");
    var ul = document.createElement("ul");
    for (i in ele) {
      let li = document.createElement("li");
     
      if(a[i]=="Price")
      li.innerHTML = `<br> <br><b>${a[i]}:</b>` + `<br> ${ele[i].textContent + '$'}`;
      else
      li.innerHTML =  `<br> <br><b>${a[i]}:</b>` + `<br> ${ele[i].textContent} ` ;
      li.style.listStyleType = "none";
      ul.appendChild(li);
    }
    ul.style.listStyle = "none";
    div.append(ul);
    var but = document.createElement("button");
    var rem = document.createElement("button");

    but.innerText = "Publish";
    rem.innerText = "Reject"

    but.classList.add("publishbtn");
    rem.classList.add("rem")
    div.classList.add("bookdiv")
    rem.style.background = "red"
    div.id = "appr";
    div.append(but);
    div.append(rem)
    parent.append(div);
    ready();
  }
  }
});

function publish(event) 
{
  var btn = event.target;
  var div = btn.parentElement;


  var key = div.firstChild.firstChild.lastChild;//gets ther key of the book from the UI
  num =JSON.stringify(JSON.parse(key.textContent)+"pending")//sets the name for the pending item
  
  console.log("First child " +num)
  console.log(JSON.parse(localStorage.getItem(num)))
  pending = JSON.parse(localStorage.getItem(num));

  localStorage.setItem(pending.descindx, JSON.stringify(pending));//approves the book
  localStorage.removeItem(num);//remove pending from the local storage
  localStorage.setItem("arrcounter",JSON.stringify([]))//assings the pending array to  empty
  div.innerHTML=``
}

function remove(event)
{
  // gets the whole div containing the book object info
  var btn = event.target;
  var div = btn.parentElement;

  //gets the key for the book to reject 
  var key = div.firstChild.firstChild.lastChild;//gets the key of the book from the UI
  num =JSON.stringify(parseInt(key.data)+"pending")//sets the name for the pending item
  

  console.log(parseInt(key.data))
  pending = JSON.parse(localStorage.getItem(num));

//remove pending object
  localStorage.removeItem(num);//remove pending from the local storage
  
//remove item key from the pendin item list
var arrc = JSON.parse(localStorage.getItem("arrcounter"))
arrc = arrc.filter(function(value){return value!=parseInt(key.data)})
localStorage.setItem("arrcounter",JSON.stringify(arrc))
div.innerHTML=``
}
