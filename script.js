const Gameboard = (() => {
    const board = ['','','','','','','','',''];
    const setBoard = () => board;
    const updateField =  (index, marker) => {
        if(index > board.length || index < 0 || board[index] != ''){
            console.log('index value incorrect or cell is ocuppied');
            console.log(`index = ${index}`);
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
})();
const Player = (name, marker) => {
    this.name = name;
    this.marker = marker;
    const getName = () => name;
    const getMarker = () => marker;
    return {getMarker, getName};
}
const GameFlow = () => {
    let fields = document.querySelectorAll('.field');
    const playerX = Player("Name", "X");
    const playerO = Player("Name1, O");
    const currentPlayer = playerX;

    fields.forEach((field) => {
        field.addEventListener('click',(e) => {
            getCurrentplayerSign = currentPlayer.getMarker();
            updateFieldWithCurrentPlayerSign = Gameboard.updateField();
            if(currentPlayer === playerX){
                currentplayer = playerO;
            }else{
                currentPlayer = playerX;
            }
        })
    })

}