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

  handleKeyDown(e) {
    this.setState({test: e.keyCode});
    // Up arrow pressed
    if (e.keyCode === 40) {
      if(this.state.playerPos.y < this.state.board.length -1 && this.canMove(this.state.playerPos.x, this.state.playerPos.y + 1)){
        this.setState({playerPos: {x: this.state.playerPos.x, y: this.state.playerPos.y + 1}, 
          playerLocation: {x: this.state.playerLocation.x, y: this.state.playerLocation.y + 100}});
      }
    } else if (e.keyCode === 38) {
      // Down arrow pressed
      if(this.state.playerPos.y > 0 && this.canMove(this.state.playerPos.x, this.state.playerPos.y - 1)){
        this.setState({playerPos: {x: this.state.playerPos.x, y: this.state.playerPos.y - 1}, 
          playerLocation: {x: this.state.playerLocation.x, y: this.state.playerLocation.y - 100}});
      }
    } else if (e.keyCode === 39) {
      // Right arrow pressed
      if(this.state.playerPos.x < this.state.board[0].length -1 && this.canMove(this.state.playerPos.x + 1, this.state.playerPos.y)){
        this.setState({playerPos: {x: this.state.playerPos.x + 1, y: this.state.playerPos.y}, 
          playerLocation: {x: this.state.playerLocation.x + 100, y: this.state.playerLocation.y}});
      }
    } else if (e.keyCode === 37) {
      // Right arrow pressed
      if(this.state.playerPos.x > 0 && this.canMove(this.state.playerPos.x - 1, this.state.playerPos.y)){
        this.setState({playerPos: {x: this.state.playerPos.x - 1, y: this.state.playerPos.y}, 
          playerLocation: {x: this.state.playerLocation.x - 100, y: this.state.playerLocation.y}});
      }
    }
  }


  render() {
    return (
      <div ref={this.playingArea} className="App" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <p>player x: {this.state.playerPos.x} player y: {this.state.playerPos.y} {}</p>
        <p>{this.state.test}</p>
        <img src={dalek} className="App-logo" style={{position: "absolute", left: this.state.playerLocation.x + "px", top: this.state.playerLocation.y + "px"}}/>
      </div>
    );
  }
}

export default App;
