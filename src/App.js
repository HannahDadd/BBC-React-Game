import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Player pos is in x, y form
    this.state = {
      board: [[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
      playerPos: {x: 1, y: 1},
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
    if (e.keyCode === 38) {
      if(this.state.playerPos.y < this.state.board.length -1 && this.canMove(this.state.playerPos.x, this.state.playerPos.y + 1)){
        this.setState({playerPos: {x: this.state.playerPos.x, y: this.state.playerPos.y + 1}});
      }
    } else if (e.keyCode === 40) {
      // Down arrow pressed
      if(this.state.playerPos.y > 0 && this.canMove(this.state.playerPos.x, this.state.playerPos.y - 1)){
        this.setState({playerPos: {x: this.state.playerPos.x, y: this.state.playerPos.y - 1}});
      }
    } else if (e.keyCode === 39) {
      // Right arrow pressed
      if(this.state.playerPos.x < this.state.board[0].length -1 && this.canMove(this.state.playerPos.x + 1, this.state.playerPos.y)){
        this.setState({playerPos: {x: this.state.playerPos.x + 1, y: this.state.playerPos.y}});
      }
    } else if (e.keyCode === 37) {
      // Right arrow pressed
      if(this.state.playerPos.x > 0 && this.canMove(this.state.playerPos.x - 1, this.state.playerPos.y)){
        this.setState({playerPos: {x: this.state.playerPos.x - 1, y: this.state.playerPos.y}});
      }
    }
  }


  render() {
    return (
      <div ref={this.playingArea} className="App" tabIndex="0" onKeyDown={this.handleKeyDown}>
        <p>player x: {this.state.playerPos.x} player y: {this.state.playerPos.y} {}</p>
        <p>{this.state.test}</p>
      </div>
    );
  }
}

export default App;
