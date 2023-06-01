const Gameboard = (() => {
    const board = ['','','','','','','','',''];
    let isOccupied = false;
    const getField = (id) => {
        return board[id];
    }
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
    return {getField, updateField, reset}
})();
const Player = (name, marker) => {
    this.name = name;
    this.marker = marker;
    const getName = () => name;
    const getMarker = () => marker;
    return {getMarker, getName};
}
const GameFlow = (() => {
    let fields = document.querySelectorAll('.field');
    const playerX = Player("Name", "X");
    const playerO = Player("Name1", "O");
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
            if(isOver){
                console.log('Game is over');
            }
            console.log(`field id: ${field.id}, round:${round}, event target id: ${parseInt(event.target.id)}`)
            playRound(parseInt(event.target.id), getCurrentPlayerMarker());
            round++;    
            updateGameBoard();

        })
    })


}
)();