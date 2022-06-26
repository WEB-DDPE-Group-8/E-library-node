
var booklist = [["adjklfg"],[1,"Atomic Habits: Tiny Changes, Remarkable Results"]]
var booklist = {
    number:1,
    name: ["Atomic Habits","Mindset"]
}

var div = document.getElementById("book")
var p = document.getElementById("p1") 

var para = document.createElement("p");
var node = document.createTextNode("This is a new paragraph.");

para.appendChild(node);
div.appendChild(para);
var rem = document.getElementById("p1");
rem.remove();



var test = "Atomic Habits"

for( i in booklist.name)
{
if(test == booklist.name[i])
{
console.log(booklist.name[i])
}
}