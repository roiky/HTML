
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
    //this.easyLoc = `${this.location.x}${this.location.y}`
    this.isAlive = true;
}

ChessPiece.prototype.setLocation = function (_newX, _newY) {
    if(!allColumns.includes(_newX) || _newY < 1 || _newY > 8) {
        console.log("out of board - illegal move!");
        return;
    }
    
    if(!this.isValidMove(_newX, _newY)) {
        console.log(`illegal move!`);
        return;
    }

    const targetPiece = isTherePiece(board,_newX, _newY);
    if(targetPiece && targetPiece.color !== this.color){
        targetPiece.isAlive = false;
        board.pieces = board.pieces.filter(function(pieces){
            return pieces.isAlive;
        })
    }

    console.log(`${this.color} ${this.type} moved from ${this.easyLoc()} to ${_newX}${_newY}`)
    this.location = {x: _newX, y:_newY};
}

ChessPiece.prototype.easyLoc = function(){
    return `${this.location.x}${this.location.y}`;
}

ChessPiece.prototype.isValidMove = function(_newX, _newY){
    if(!this.isAlive){
        console.log(`this piece is dead!`)
        return false;
    }

    if(this.type !== "pawn"){
        console.log(`support only pawn move for now`)
        return false;
    }

    const currentX = this.location.x;
    const currentY = this.location.y;
    let yDirection, startRow;

    if(this.color === "white"){
        yDirection = 1;
        startRow = 2;
    } 
    else{
        yDirection = -1;
        startRow = 7;
    }

    //first check - the player already have a piece there?
    const targetPiece = isTherePiece(board,_newX, _newY);
    if(targetPiece && targetPiece.color === this.color){
        console.log(`you already have a piece at ${_newX}${_newY}!`);
        return false;
    }

    //first pawn move - can move 2 steps forward
    if(currentY === startRow && _newX === currentX && _newY === currentY +(2*yDirection)){
        if(!isTherePiece(board,_newX,_newY) && !isTherePiece(board,_newX,currentY + yDirection)){
            return true;
        }
    } 

    //regular step - move 1 step forward
    if(_newX === currentX && _newY === currentY + yDirection){
        if(!isTherePiece(board, _newX, _newY)){
            return true;
        }
    }

    //pawn can eat
    if(Math.abs(allColumns.indexOf(currentX) - allColumns.indexOf(_newX)) === 1 && _newY === currentY + yDirection){
//        const targetPiece = isTherePiece(board, _newX, _newY);
        if(targetPiece && targetPiece.color !== this.color){
            return true;
        }
    }

    return false;
}

function isTherePiece(boardObj,x,y){
    if(typeof boardObj !== 'object') return;

    const piece = boardObj.pieces.find(function(item){
        return item.location.x === x && item.location.y === y;
    })

    if (!piece) return false;
    return piece;
}

// function isTherePiece(boardObj,pos){
//     if(typeof boardObj !== 'object') return;
//     const piece = boardObj.pieces.find(function(item){
//         return item.easyLoc() === pos;
//     })

//     if (!piece) return false;
//     return piece;
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 16 total pieces =>  8 pawns, 2 rooks, 2 knights, 2 bishops, 1 queen, 1 king

for (let index = 0; index < allColumns.length; index++) {

    const newWhiteOtherPiece = new ChessPiece(otherPositions[index], "white",allColumns[index],1);
    const newWhitePawn = new ChessPiece("pawn","white",allColumns[index],2);

    const newBlackOtherPiece = new ChessPiece(otherPositions[index], "black",allColumns[index],8);
    const newBlackPawn = new ChessPiece("pawn","black",allColumns[index],7);
    board.pieces.push(newWhitePawn, newWhiteOtherPiece, newBlackPawn, newBlackOtherPiece);
        
}

const pieceToMove = board.pieces[0];
console.log(pieceToMove)
console.log(pieceToMove.location);


// if(pieceToMove.isValidMove("A", 3)){
//     pieceToMove.setLocation("A",3);
// }

pieceToMove.setLocation("A",4);

console.log(pieceToMove.location);

console.log(pieceToMove.easyLoc());
//console.log(board)