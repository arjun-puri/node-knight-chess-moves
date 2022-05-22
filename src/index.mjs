import chalk from "chalk";
import readline from 'readline';

/**
 * @function renderChessboard
 * render the chessboard onto the console.
 * @param {Array} chessBoard 
 */
function renderChessboard(chessBoard) {
    chessBoard.forEach((row, i1) => {
        const rowDisp = row.map((square, i2) => {
            if(square === null) {
                // even
                if((i1 + 1) % 2 === 0) {
                    return (i2 + 1) % 2 !== 0 ? chalk.bgGray.white('   ') : chalk.bgWhite.black('   ');
                } else {
                    // odd
                    return (i2 + 1) % 2 !== 0 ? chalk.bgWhite.black('   ') : chalk.bgGray.white('   ');
                }
            } else {
                return square;
            }
        })
        console.log(rowDisp.join(''));
    })
}

/**
 * @function markValidPositions
 * mark valid moves on the chessboard.
 * @param {Array} chessBoard 
 * @param {Array} starting position of knight
 * @param {Array} possibleMoves for a knight (moveset)
 * @returns 
 */
function markValidPositions(chessBoard, starting, possibleMoves) {
    const moves = possibleMoves.map(pos => {
        let xValid = false, yValid = false;
        if(starting[0] + pos[0] >= 0 && starting[0] + pos[0] < 8) xValid = true;
        if(starting[1] + pos[1] >= 0 && starting[1] + pos[1] < 8) yValid = true;
        return xValid && yValid ? [starting[0] + pos[0], starting[1] + pos[1]] : [false];
    }).filter(move => move[0] !== false);

    console.log(moves);

    moves.forEach(validMove => {
        chessBoard[validMove[0]][validMove[1]] = chalk.bgYellow.black(' X ');
    });
    chessBoard[starting[0]][starting[1]] = chalk.bgRed.white(' @ ');

    return chessBoard;
}

(function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // create chessboard
    const chessBoard = [];
    for(let i = 0; i<8; i++) {
        chessBoard.push([]);
        for(let j=0; j<8; j++) {
            chessBoard[i].push(null);
        }
    }
    renderChessboard(chessBoard);

    // possible moves for a knight relative to x,y currently
    const possibleMoves = [
        [-2, -1], [-2, 1], [2, -1], [2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]
    ]

    rl.question('What is the starting position of knight? (write in the format 0,7 where 0 is x and 7 is y): ', ans => {
        return new Promise((resolve, reject) => {
            rl.close();
            let xValid = false, yValid = false;
            const start = ans.split(',').map(coor => parseInt(coor));
            if(start[0] >= 0 && start[0] < 8) xValid = true;
            if(start[1] >= 0 && start[1] < 8) yValid = true;
            if(xValid && yValid) {
                renderChessboard(markValidPositions(chessBoard, start, possibleMoves));
                resolve(true);
            } else{
                console.log('Incorrect position, please type in a valid position in the format -> x,y');
                resolve(false);
            }            
        })
    });
    
})();
