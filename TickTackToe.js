function createPlayer (name, mark) {
    let wins = 0;

    const getWins = () => wins;

    const addWin = () => wins++;

    return { name, mark, getWins, addWin };
}

const player1 = createPlayer("playerOne", "x");

const player2 = createPlayer("playerTwo", "o");

const gameBoard = (function (){
    let A1 = "";
    let A2 = "";
    let A3 = "";
    let B1 = "";
    let B2 = "";
    let B3 = "";
    let C1 = "";
    let C2 = "";
    let C3 = "";
    let currentPlayer = player1;

    const changePlayer = () => currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;

    const checkForWin = function(){
        if(
            this.A1 === player1.mark && this.A1 === this.A2 && this.A1 === this.A3 ||
            this.A1 === player1.mark && this.A1 === this.B2 && this.A1 === this.C3 ||
            this.A1 === player1.mark && this.A1 === this.B1 && this.A1 === this.C1 ||
            this.B1 === player1.mark && this.B1 === this.B2 && this.B1 === this.B3 ||
            this.C1 === player1.mark && this.C1 === this.B2 && this.C1 === this.A3 ||
            this.C1 === player1.mark && this.C1 === this.C2 && this.C1 === this.C3 ||
            this.A2 === player1.mark && this.A2 === this.B2 && this.A2 === this.C2 ||
            this.A3 === player1.mark && this.A3 === this.B3 && this.A3 === this.C3 
            ){
        console.log(`${player1.name} wins!`);
        player1.addWin();
        }
        else if(
            this.A1 === player2.mark && this.A1 === this.A2 && this.A1 === this.A3 ||
            this.A1 === player2.mark && this.A1 === this.B2 && this.A1 === this.C3 ||
            this.A1 === player2.mark && this.A1 === this.B1 && this.A1 === this.C1 ||
            this.B1 === player2.mark && this.B1 === this.B2 && this.B1 === this.B3 ||
            this.C1 === player2.mark && this.C1 === this.B2 && this.C1 === this.A3 ||
            this.C1 === player2.mark && this.C1 === this.C2 && this.C1 === this.C3 ||
            this.A2 === player2.mark && this.A2 === this.B2 && this.A2 === this.C2 ||
            this.A3 === player2.mark && this.A3 === this.B3 && this.A3 === this.C3 
            ){
        console.log(`${player2.name} wins!`);
        player2.addWin();
        }
        else if(
            this.A1 !== undefined && this.A2 !== undefined && this.A3 !== undefined &&
            this.B1 !== undefined && this.B2 !== undefined && this.B3 !== undefined &&
            this.C1 !== undefined && this.C2 !== undefined && this.C3 !== undefined
        ){
            console.log("It's a draw!");
            return;
        }
        else{
            changePlayer();
        }
    }

    const markCell = function(cell, mark){
        gameBoard[cell] = mark;
        gameBoard.checkForWin();
    }

    const wipeBoard = function(){
        gameBoard.A1 = "";
        gameBoard.A2 = "";
        gameBoard.A3 = "";
        gameBoard.B1 = "";
        gameBoard.B2 = "";
        gameBoard.B3 = "";
        gameBoard.C1 = "";
        gameBoard.C2 = "";
        gameBoard.C3 = "";
    }

    document.getElementById("board-container").addEventListener("click", function(event){
        event.target.textContent = currentPlayer.mark;
        markCell(event.target.id, currentPlayer.mark);

    });

    return { checkForWin, markCell, wipeBoard };
})();

const gameController = (function(){
    const newGame = () => gameBoard.wipeBoard();


})();