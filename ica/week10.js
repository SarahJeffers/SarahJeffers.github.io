const updateButton = document.getElementById("updateButton");
const popupButton = document.getElementById("popupButton");

updateButton.addEventListener('click', runFunction);
popupButton.addEventListener('click', runPopupFunction);

function runFunction() {
    const name = prompt("Please enter a name");
    document.getElementById("name").textContent = "My name is " + name;
}

function runPopupFunction() {
    alert("Have a nice day!");
}