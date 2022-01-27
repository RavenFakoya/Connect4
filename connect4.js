/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 const board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for(let y = 0; y < HEIGHT; y++) {
     let rowArray = [];
     for(let x = 0; x < WIDTH; x++) {
       rowArray.push(null);
     } board.push(rowArray)
   } 
   return board;
 }
 
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.getElementById('board');
   // TODO: add comment for this code
   let top = document.createElement("tr"); // create table at the top of the board. This is where the players click
   top.setAttribute("id", "column-top"); // set the id to comlum top
   top.addEventListener("click", handleClick); // add a click event listener. It will run handleClick when clicked.
 
   for (let x = 0; x < WIDTH; x++) {
     let headCell = document.createElement("td"); //crear the cells 
     headCell.setAttribute("id", x); //set the id of the cell to the value of x. (7 cells for a width of 7)
     top.append(headCell); //add the cell to the top table.
   }
   htmlBoard.append(top); //append top to the game board
 
   // TODO: add comment for this code
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr"); // create a new table in HTML
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td"); //create a new cell to append to the row table
       cell.setAttribute("id", `${y}-${x}`); //give the cell an id with the value of y and x
       row.append(cell); //append the cell to the table created at the beginning
     }
     htmlBoard.append(row); // append the row to the game board.
     //This process will continue until y < height, and the inner loop will repeat until x < width.
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   const colArr = []
   for(i = HEIGHT-1; i >= 0; i--) {
     colArr.push(board[i][x])
   }
   let index = colArr.findIndex(v => v == null)
   if (index === -1) return null
   return index
 }
 
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const playerPiece = document.createElement("div");
   playerPiece.classList.add('piece')
   //console.log("Current Player is " + currPlayer)
 
   playerPiece.classList.add(`p${currPlayer}`)
   
   const cell = document.getElementById(`${(HEIGHT-1)-y}-${x}`);
   cell.append(playerPiece);
   //console.log(x,HEIGHT-1-y)
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   alert(msg)
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   let x = +evt.target.id;
  
 
   // get next spot in column (if none, ignore click)
   let y = findSpotForCol(x);
   if (y === null) {
     return;
   }
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
   board[(HEIGHT -1)-y][x] = currPlayer //change the value of board to 1 for p1 or 2 for p2 at the index the piece is placed.
 
   //check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if(board.every(row => row.every(v => typeof(v) === 'number'))) {
     return endGame("It's a tie!");
   }
     
 
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
   //console.log("Current Player is " + currPlayer)
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer //if every cell in board has the current player in it return true.
     );
   } //if y >= 0 and < height, x >= 0 and  width and board[y][x] = current player, return true.
 
   // TODO: read and understand this code. Add comments to help you.
   //Makes an array of cells for all possible winning chances. 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; 
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
     //Puts all possible winning arrays as an arguement for _win() and if anyone of them returns true the statement returns true
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         console.log(horiz) /*|| _win(vert) || _win(diagDR) || _win(diagDL)*/
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 