const clockH2 = document.querySelector("#clock");

function setClock(){
    const date = new Date();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    clockH2.innerText = `${hours}:${minutes}:${seconds}`;
}

setClock();
setInterval(setClock, 1000);

