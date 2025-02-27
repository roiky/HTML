
const otherPositions = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
const allColumns = ["A", "B", "C", "D", "E", "F", "G", "H"];

const board = {
    pieces: []
};

function ChessPiece(_type, _color, _xpos, _ypos){
    this.id = `${_type}-${_color}-${Date.now() + Math.ceil(Math.random() * 9999)}`
    this.type = _type;
    this.color = _color;
    this.location = {x: _xpos, y: _ypos};
    this.isAlive = true;
}

ChessPiece.prototype.setLocation = function (_newX, _newY) {
    if(!allColumns.includes(_newX) || _newY < 1 || _newY > 8) return console.log("illigal move!");
    this.location = {x: _newX, y:_newY};
}
// 16 total pieces =>  8 pawns, 2 rooks, 2 knights, 2 bishops, 1 queen, 1 king



for (let index = 0; index < 8; index++) {

    const newWhiteOtherPiece = new ChessPiece(otherPositions[index], "white",allColumns[index],1);
    const newWhitePawn = new ChessPiece("pawn","white",allColumns[index],2);

    const newBlackOtherPiece = new ChessPiece(otherPositions[index], "black",allColumns[index],8);
    const newBlackPawn = new ChessPiece("pawn","black",allColumns[index],7);
    board.pieces.push(newWhitePawn, newWhiteOtherPiece, newBlackPawn, newBlackOtherPiece);
        
}

const pieceToMove = board.pieces[2];
console.log(pieceToMove.location);

pieceToMove.setLocation("A",6);

console.log(pieceToMove.location);
//console.log(board)