start.addEventListener('click', startgame)

function startgame(){
    resetgame()

    if (players[0].name === "" || players[1].name === ""){
        startErr.style.display = "block"
        return
    }
    startErr.style.display = "none"
    field.style.display = 'block'

    start.firstElementChild.setAttribute("href","#game-board")

    turnind.textContent = players[activeplayer].name 

    for(let i of gamecells){
        i.addEventListener('click',clicked)
    }

}


function clicked(event){
    event.target.textContent = players[activeplayer].symbol
    event.target.classList.add("disabled")
    event.target.removeEventListener('click',clicked)
    let row = event.target.dataset.row
    let col = event.target.dataset.col

    updateGameData(row-1, col-1)
    switchplayer()
    currentRound++;
    const winner = checkforGameOver()
    
    if (winner != 0){
        endGame(winner)
    }

}

function switchplayer(){
    if (activeplayer === 1){
        activeplayer = 0;
    }
    else{
        activeplayer = 1;
    }
    turnind.textContent = players[activeplayer].name 
}

function updateGameData(row, col){
    gameData[row][col] = activeplayer+1;
}


function checkforGameOver(){
    for (let i = 0; i<3; i++){
        if (gameData[i][0] >0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]){
                return gameData[i][0];
            }
    }

    for (let i = 0; i<3; i++){
        if (gameData[0][i] >0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[1][i] === gameData[2][i]){
                return gameData[0][i];
            }
    }

    if(
        gameData[0][0] >0 &&
        gameData[0][0] === gameData[1][1] &&
        gameData[2][2] === gameData[1][1]
    ){
        return gameData[0][0];
    }
    if(
        gameData[2][0] >0 &&
        gameData[2][0] === gameData[1][1] &&
        gameData[1][1] === gameData[0][2]
    ){
        return gameData[1][1];
    }

    if(currentRound === 9){
        return -1;
    }
    return 0;
}


function endGame(winnerID){
    gameover.style.display = "block"
    if (winnerID>0){
        for(let i of gamecells){
            i.removeEventListener('click',clicked)
        }
        gameover.firstElementChild.firstElementChild.textContent = players[winnerID-1].name
        return ;
    }else{
        gameover.firstElementChild.textContent = "It's a Draw!"
    }

}

function resetgame(){
    activeplayer = 0;
    currentRound = 0;
    gameover.style.display = "none"
    gameover.firstElementChild.innerHTML = "You won <span></span>"
    console.log(gameover)
    for(let i=0;i<3; i++){
        for(let j=0; j<3;j++){
            gameData[i][j]=0;
        }
    }
    for(let i of gamecells){
        i.textContent = ""
        i.classList.remove("disabled")
    }

}