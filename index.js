let p1button = document.getElementById("p1")
let p2button = document.getElementById("p2")

let modal = document.querySelector(".modal")
let backdrop = document.getElementById("backdrop")

let modalCancel = document.getElementById("modal-cancel")
let modalConfirm = document.getElementById("modal-confirm")

let form = document.querySelector("form")
let input = document.getElementById("name")

let errormsg  = document.getElementById("errormsg");
let field = document.getElementById("field")
let pname;let player;let id;

let start = document.getElementById("start-game")
let startErr = document.getElementById("start-err")

let turnind = document.querySelector("#field p span")
let gamecells = document.querySelectorAll("#game-board li")
let activeplayer = 0;
let currentRound = 0;

let gameover = document.querySelector("#field article")

const players = [
    {
        name : "1",
        symbol : 'X'},
    {
        name : "2",
        symbol : 'O' 
    }
];

const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function openmodal(){
    modal.style.display = "block"
    backdrop.style.display = "block"
}

function closeoverlay(){
    input.value = ""
    modal.style.display = "none"
    backdrop.style.display = "none"
}

function checkname(event){
    event.preventDefault();
    const formData = new FormData(event.target) 
    const enteredname = formData.get("name").trim()
    
    if (enteredname.length == 0){
        input.style.borderColor = 'red'
        errormsg.style.display = "block"
    }
    else{
        pname.textContent = enteredname
        closeoverlay()
    }
    players[id-1].name = enteredname

} 

function changename(event){
        input.style.borderColor = 'gray'
        errormsg.style.display = "none"

        let clickedbutton = event.target
        player = clickedbutton.parentElement;
        pname = player.children[1];
        id = +clickedbutton.dataset.pid
        openmodal()

        form.addEventListener("submit",checkname)

}

p1button.addEventListener("click", changename)
p2button.addEventListener("click", changename)

modalCancel.addEventListener("click", closeoverlay)
