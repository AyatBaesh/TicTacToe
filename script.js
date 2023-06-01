const Gameboard = (() => {
    const board = ['','','','','','','','',''];
    let isOccupied = false;
    const getField = (id) => {
        return board[id];
    }
    const getBoard = () => board;
    const updateField =  (index, marker) => {
        if(board[index] != ''){
            console.log(`field is occupied`);
            isOccupied = true;
            for(let i = 0; i < board.length; i++){
                console.log(board[i])
            }
            return;
        }
        if(index > board.length || index < 0){
            console.log('index value incorrect');
            console.log(`index = ${index}`);
            isOccupied = false;
            return;
        }
        board[index] = marker;
        return;
    }
    const reset = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = '';
        }
    }
    return {getField, getBoard, updateField, reset}
})();
const Player = (name, marker) => {
    this.name = name;
    this.marker = marker;
    const getName = () => name;
    const getMarker = () => marker;
    return {getMarker, getName};
}
const GameOver = (board) => {
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]];
    const checkWin = () =>{
        for(let i = 0;  i < winConditions.length; i++){
            const [id1,id2,id3] = winConditions[i];
            const marker1 = board[id1]; 
            const marker2 = board[id2];
            const marker3 = board[id3];

            if(marker1 != '' && marker1 === marker2 && marker2 === marker3){
                return true;
            }
        }
        return false;
    }
    return {checkWin};
   
}

const GameFlow = (() => {
    let fields = document.querySelectorAll('.field');
    let winner = document.querySelector('#winnerName');
    let winnerName ='';
    const playerX = Player("Player X", "X");
    const playerO = Player("Player O", "O");
    let round = 1;
    let isOver = false;
    
    const updateGameBoard = () => {
        for(let i = 0; i < fields.length; i++){
            fields[i].textContent = Gameboard.getField(i);
        }
    }
    const getCurrentPlayerMarker = () => {
    return round % 2 === 1 ? playerX.getMarker() : playerO.getMarker();
  };
  const playRound = (fieldId) => {
    Gameboard.updateField(fieldId, getCurrentPlayerMarker());
    updateGameBoard();
  }

    fields.forEach((field) => {
        field.addEventListener('click', (event) => {
            if(event.target.textContent != ''){
                return;
            }
            if(!isOver){
                winner.textContent = 'has won';
                document.querySelector('.gameover').style.display = 'none';

            }
            if(round >= 5){
                console.log('round is 5 or bigger')
                if(GameOver(Gameboard.getBoard()).checkWin()){
                    isOver = true;
                    if(isOver){
                        console.log('Game is over');
                        if(playerX.marker === getCurrentPlayerMarker()){
                            winnerName = playerO.getName();
                        }else{
                            winnerName = playerX.getName();
                        }
                        
                        winner.textContent = winnerName + ' ' + winner.textContent ;
                        document.querySelector('.gameover').style.display = 'block';
                        Gameboard.reset();
                        round = 1;
                        isOver = false;
                    }
                    console.log(`isOver: ${isOver}`);
                    return;
                }else if(round >= 9){
                    winner.textContent = 'Draw!' ;
                    document.querySelector('.gameover').style.display = 'block';
                    Gameboard.reset();
                    round = 1;
                    isOver = false;
                    return;
                }

            }
            
            console.log(`field id: ${field.id}, round:${round}, event target id: ${parseInt(event.target.id)}`)
            playRound(parseInt(event.target.id), getCurrentPlayerMarker());
            round++;    
            updateGameBoard();

        })
    })


}
)();