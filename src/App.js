import React, { Component } from 'react';
import './App.css';
import dalek from './dalek.svg';

class App extends Component {
  constructor(props) {
    super(props);
    // Player pos is in x, y form
    this.state = {
      board: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
      playerPos: {x: 1, y: 1},
      playerLocation: {x: 100, y: 100},
      movementCoefficent: 40,
      test: ""
    };
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

  // TODO Randomly generate the board

  // TODO Randomly place the prizes
  
  // Todo increment the timer

  // TODO add other players

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
    var board = [];
    var i, j;
    // Loop through each square in the board
    for ( i = 0; i<this.state.board.length; i++){
        for ( j = 0; j<this.state.board[0].length; j++){
            if (this.state.board[i][j] === 1){
              board.push(<div style={{width: this.state.movementCoefficent + "px", height: this.state.movementCoefficent + "px",
                top: (100-this.state.movementCoefficent) + i *this.state.movementCoefficent + "px", 
                left: (100-this.state.movementCoefficent) + j*this.state.movementCoefficent + "px", 
                position: "absolute", border: "1px solid #000"}}></div>);
            }
        }
    }
    return (
      <div ref={this.playingArea} className="App" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <p>player x: {this.state.playerPos.x} player y: {this.state.playerPos.y} {}</p>
        <p>{this.state.test}</p>
        {board}
        <img src={dalek} style={{position: "absolute", width: this.state.movementCoefficent, height: this.state.movementCoefficent, left: this.state.playerLocation.x + "px", top: this.state.playerLocation.y + "px"}}/>
      </div>
    );
  }
}

export default App;
