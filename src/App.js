import React, { Component } from 'react';
import './App.css';
import dalek from './dalek.svg';
import bbc from './bbc.svg';

class App extends Component {
  constructor(props) {
    super(props);
    // Player pos is in x, y form
    this.state = {
      board: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
      playerPos: {x: 1, y: 1},
      playerLocation: {x: 100, y: 100},
      movementCoefficent: 40,
      boardDrawing: [],
      time: 1000,

    };
    this.timer = 0;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playingArea = React.createRef();
  }

  componentDidMount() {
    this.playingArea.current.focus();
  }

  // Check if player can move to a new Postition (no objects there)
  canMove(newX, newY){
    if (this.state.board[newY][newX] === 0){
      return true;
    } else {
      return false;
    }
  }


  // Randomly generate the board
  generateBoard(){
    var width = 20;
    var height = 20;
    var newBoard = new Array(width);
    var drawnBoard = [];

    // Randomly generate the board with blocks to stop dalek in
    for (var x = 0; x<width; x++){
      newBoard[x] = [ ];
      for (var y = 0; y<height; y++){
        if (Math.floor((Math.random() * 10) + 1)=== 4){
          newBoard[x][y] = 1;
          drawnBoard.push(<div style={{width: this.state.movementCoefficent + "px", height: this.state.movementCoefficent + "px",
              left: (100-this.state.movementCoefficent) + y*this.state.movementCoefficent + "px", 
              top: (100-this.state.movementCoefficent) + x*this.state.movementCoefficent + "px", 
              position: "absolute", border: "1px solid #000"}}></div>);
        } else if (Math.floor((Math.random() * 20) + 1)=== 4) {
          // Check if it's a prize square
          newBoard[x][y] = 2;
          drawnBoard.push(<img src={bbc} style={{position: "absolute", width: this.state.movementCoefficent, 
            height: this.state.movementCoefficent, left: (100-this.state.movementCoefficent) + y*this.state.movementCoefficent + "px", 
            top: (100-this.state.movementCoefficent) + x*this.state.movementCoefficent + "px", }}/>);
        } else {
          newBoard[x][y] = 0;
        }
      }
    }
  console.log(newBoard);
  this.setState({board: newBoard, boardDrawing: drawnBoard});
  }
  
  // Todo increment the timer
  startTimer() {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.time - 1;
    this.setState({
      time: seconds
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }

  // TODO add other players

  // Move the player
  handleKeyDown(e) {
    this.setState({test: e.keyCode});
    // Up arrow pressed
    if (e.keyCode === 40) {
      if(this.state.playerPos.y < this.state.board.length -1 && this.canMove(this.state.playerPos.x, this.state.playerPos.y + 1)){
        this.setState({playerPos: {x: this.state.playerPos.x, y: this.state.playerPos.y + 1}, 
          playerLocation: {x: this.state.playerLocation.x, y: this.state.playerLocation.y + this.state.movementCoefficent}});
      }
    } else if (e.keyCode === 38) {
      // Down arrow pressed
      if(this.state.playerPos.y > 0 && this.canMove(this.state.playerPos.x, this.state.playerPos.y - 1)){
        this.setState({playerPos: {x: this.state.playerPos.x, y: this.state.playerPos.y - 1}, 
          playerLocation: {x: this.state.playerLocation.x, y: this.state.playerLocation.y - this.state.movementCoefficent}});
      }
    } else if (e.keyCode === 39) {
      // Right arrow pressed
      if(this.state.playerPos.x < this.state.board[0].length -1 && this.canMove(this.state.playerPos.x + 1, this.state.playerPos.y)){
        this.setState({playerPos: {x: this.state.playerPos.x + 1, y: this.state.playerPos.y}, 
          playerLocation: {x: this.state.playerLocation.x + this.state.movementCoefficent, y: this.state.playerLocation.y}});
      }
    } else if (e.keyCode === 37) {
      // Right arrow pressed
      if(this.state.playerPos.x > 0 && this.canMove(this.state.playerPos.x - 1, this.state.playerPos.y)){
        this.setState({playerPos: {x: this.state.playerPos.x - 1, y: this.state.playerPos.y}, 
          playerLocation: {x: this.state.playerLocation.x - this.state.movementCoefficent, y: this.state.playerLocation.y}});
      }
    }
  }


  render() {
    var game = this;
    return (
      <div ref={this.playingArea} className="App" tabIndex="0" onKeyDown={this.handleKeyDown.bind(game)}>
        <p>Time Left: {this.state.time}</p>
        <button onClick={this.startTimer.bind(game)}>Start</button>
        <button onClick={this.generateBoard.bind(game)}>New Board</button>
        {this.state.boardDrawing}
        <img src={dalek} style={{position: "absolute", width: this.state.movementCoefficent, height: this.state.movementCoefficent, 
        left: this.state.playerLocation.x + "px", top: this.state.playerLocation.y + "px"}}/>
        
      </div>
    );
  }
}

export default App;
