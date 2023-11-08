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

    const 
    
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
            this.A1 !== "" && this.A2 !== "" && this.A3 !== "" &&
            this.B1 !== "" && this.B2 !== "" && this.B3 !== "" &&
            this.C1 !== "" && this.C2 !== "" && this.C3 !== ""
        ){
            console.log("It's a draw!");
        }
    }

    const markCell = function(cell, mark){
        this[cell] = mark;
        this.checkForWin();

    }

    const wipeBoard = function(){
        this.A1 = "";
        this.A2 = "";
        this.A3 = "";
        this.B1 = "";
        this.B2 = "";
        this.B3 = "";
        this.C1 = "";
        this.C2 = "";
        this.C3 = "";
    }

    return { checkForWin, markCell, wipeBoard };
})();

function createPlayer (name, mark) {
    let wins = 0;

    const getWins = () => wins;
    
    const addWin = () => wins++;

    return { name, mark, getWins, addWin };
}

const player1 = createPlayer("playerOne", "x");

const player2 = createPlayer("playerTwo", "o");

const gameController = (function(){
    const newGame = () => gameBoard.wipeBoard();

})();