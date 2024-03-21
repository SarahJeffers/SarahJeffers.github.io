const button = document.querySelector("button");
button.addEventListener('click', runFunction);

function runFunction() {
    const name = prompt("Please enter a name");
    button.textContent = "My name is" + name;
}

const popupButton = document.querySelector("popupButton");
popupButton.addEventListener('click', runPopupFunction);

function runPopupFunction() {
    alert("Have a nice day!");
}