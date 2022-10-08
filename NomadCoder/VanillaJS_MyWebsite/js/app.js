const loginForm = document.querySelector(".login-form");
const loginGreeting = document.querySelector("#greeting");
const loginInput = loginForm.querySelector("input");

const CLASS_HIDDEN = "hidden"
const DB_KEY_USERNAME = "username"

function greetPhrase(username){
    loginForm.classList.add(CLASS_HIDDEN);
    loginGreeting.innerText = `Hello ${username}`;

}

function onLoginSubmit(event){
    event.preventDefault();
    
    localStorage.setItem("username", loginInput.value);
    const userName = localStorage.getItem(DB_KEY_USERNAME);

    greetPhrase(userName);
}

const db_userName = localStorage.getItem(DB_KEY_USERNAME);

if (db_userName === null){
    loginForm.classList.remove(CLASS_HIDDEN);
    loginForm.addEventListener("submit", onLoginSubmit);
} else{
    greetPhrase(db_userName);
}
    