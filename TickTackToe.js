function createPlayer (name, mark) {
    let wins = 0;
    let playerName = name;

    const getWins = () => wins;

    const addWin = () => wins++;

    const resetWins = () => wins = 0;

    return { playerName, mark, getWins, addWin, resetWins };
}

let player1 = createPlayer("Player 1", "x");

let player2 = createPlayer("Player 2", "o");

const gameBoard = (function (){
    var A1 = "";
    var A2 = "";
    var A3 = "";
    var B1 = "";
    var B2 = "";
    var B3 = "";
    var C1 = "";
    var C2 = "";
    var C3 = "";

    const checkForWin = function(){
        if(
            gameBoard.A1 === player1.mark && gameBoard.A1 === gameBoard.A2 && gameBoard.A1 === gameBoard.A3 ||
            gameBoard.A1 === player1.mark && gameBoard.A1 === gameBoard.B2 && gameBoard.A1 === gameBoard.C3 ||
            gameBoard.A1 === player1.mark && gameBoard.A1 === gameBoard.B1 && gameBoard.A1 === gameBoard.C1 ||
            gameBoard.B1 === player1.mark && gameBoard.B1 === gameBoard.B2 && gameBoard.B1 === gameBoard.B3 ||
            gameBoard.C1 === player1.mark && gameBoard.C1 === gameBoard.B2 && gameBoard.C1 === gameBoard.A3 ||
            gameBoard.C1 === player1.mark && gameBoard.C1 === gameBoard.C2 && gameBoard.C1 === gameBoard.C3 ||
            gameBoard.A2 === player1.mark && gameBoard.A2 === gameBoard.B2 && gameBoard.A2 === gameBoard.C2 ||
            gameBoard.A3 === player1.mark && gameBoard.A3 === gameBoard.B3 && gameBoard.A3 === gameBoard.C3 
            ){
            player1.addWin();
            screenController.displayWinModal();
        }
        else if(
            gameBoard.A1 === player2.mark && gameBoard.A1 === gameBoard.A2 && gameBoard.A1 === gameBoard.A3 ||
            gameBoard.A1 === player2.mark && gameBoard.A1 === gameBoard.B2 && gameBoard.A1 === gameBoard.C3 ||
            gameBoard.A1 === player2.mark && gameBoard.A1 === gameBoard.B1 && gameBoard.A1 === gameBoard.C1 ||
            gameBoard.B1 === player2.mark && gameBoard.B1 === gameBoard.B2 && gameBoard.B1 === gameBoard.B3 ||
            gameBoard.C1 === player2.mark && gameBoard.C1 === gameBoard.B2 && gameBoard.C1 === gameBoard.A3 ||
            gameBoard.C1 === player2.mark && gameBoard.C1 === gameBoard.C2 && gameBoard.C1 === gameBoard.C3 ||
            gameBoard.A2 === player2.mark && gameBoard.A2 === gameBoard.B2 && gameBoard.A2 === gameBoard.C2 ||
            gameBoard.A3 === player2.mark && gameBoard.A3 === gameBoard.B3 && gameBoard.A3 === gameBoard.C3 
            ){
            player2.addWin();
            screenController.displayWinModal();
        }
        else if(
            gameBoard.A1 !== "" && gameBoard.A2 !== "" && gameBoard.A3 !== "" &&
            gameBoard.B1 !== "" && gameBoard.B2 !== "" && gameBoard.B3 !== "" &&
            gameBoard.C1 !== "" && gameBoard.C2 !== "" && gameBoard.C3 !== ""
        ){
            screenController.displayDrawModal();
        }
        else{
            gameController.changePlayer();
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
        document.querySelectorAll(".board-cell").forEach((element) => element.textContent = "");
    }

    return { markCell, checkForWin, wipeBoard };
})();

const gameController = (function(){

    let currentPlayer = player1;

    const changePlayer = function(){
        if(currentPlayer === player1){
            currentPlayer = player2;
        }
        else{
            currentPlayer = player1;
        }
        screenController.displayChangeTurn();
    }

    const getCurrentPlayer = () => currentPlayer;

    const newGame = function(){
        gameBoard.wipeBoard();
        player1.resetWins();
        player2.resetWins();
        currentPlayer = player1;
        document.getElementById("right-panel").style.display = "none";
        document.getElementById("board-container").style.display = "none";
        document.getElementById("start-menu").style.display = "grid";
        document.getElementById("start-menu-form").reset();
        document.getElementById("win-dialog").close();
    }

    return { newGame, changePlayer, getCurrentPlayer }
})();

const screenController = (function(){
    //Event listener for the gameboard cells.
    document.getElementById("board-container").addEventListener("click", function(event){
        event.target.textContent = gameController.getCurrentPlayer().mark;
        gameBoard.markCell(event.target.id, gameController.getCurrentPlayer().mark);
    });

    //Method function to display text to indicate whose turn it is.
    const displayChangeTurn = () => document.getElementById("info-display").textContent = `${gameController.getCurrentPlayer().playerName}'s turn.`;

    //New Game button which brings up the New Game form.
    document.getElementById("new-game").addEventListener("click", gameController.newGame);

    //New Round button which closes the win/draw modal and clears the board for another round.
    document.getElementById("new-round").addEventListener("click", function(){
        gameBoard.wipeBoard();
        gameController.changePlayer();
        displayChangeTurn();
        document.getElementById("win-dialog").close();
    });

    //Start Game button within the New Game form, which on click hides the form and displays the gameboard.
    document.getElementById("start-game").addEventListener("click", function(){
        player1.playerName = document.getElementById("player1-name").value;
        player2.playerName = document.getElementById("player2-name").value;
        document.getElementById("start-menu").style.display = "none";
        document.getElementById("board-container").style.display = "grid";
        document.getElementById("right-panel").style.display = "block";
        displayChangeTurn();
    });

    const displayWinModal = function() {
        document.getElementById("win-dialog").showModal();
        document.getElementById("win-announcement").textContent = `${gameController.getCurrentPlayer().playerName} wins!`;
        document.getElementById("player1-wins").textContent = `${player1.playerName} wins: ${player1.getWins()}`;
        document.getElementById("player2-wins").textContent = `${player2.playerName} wins: ${player2.getWins()}`;
    }

    const displayDrawModal = function() {
        document.getElementById("win-dialog").showModal();
        document.getElementById("win-announcement").textContent = "It's a draw!"
        document.getElementById("player1-wins").textContent = `${player1.playerName} wins: ${player1.getWins()}`;
        document.getElementById("player2-wins").textContent = `${player2.playerName} wins: ${player2.getWins()}`;
    }

    return { displayChangeTurn, displayWinModal, displayDrawModal }
})();

//Initialise the board
gameBoard.wipeBoard();