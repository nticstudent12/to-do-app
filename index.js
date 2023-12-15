const input = document.getElementById("input-box");
const button = document.getElementById("button")
const list = document.getElementById("list");
//  events using arow fuction
button.onclick = ()=> {
    if (input.value === "") {
        alert("Please enter a task");
    } else {
        let li= document.createElement("li");
        li.innerHTML = input.value;
        //the append is inportant
        list.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    
    }
    input.value = "";  // this make the input clrar after add somme task
    savingdata();
    
}


list.addEventListener("click", function (e) {
    
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        savingdata();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        savingdata();
    }
}, false);

function savingdata() {
    localStorage.setItem("data", list.innerHTML);
}

function show() {
    list.innerHTML=localStorage.getItem("data");
}
show();