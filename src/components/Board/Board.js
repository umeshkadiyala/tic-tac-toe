import React, { Component } from 'react';
import Square from '../Square/Square';
import { connect } from 'react-redux';
import { setSquareValueAndChangeActivePlayer, createBoard, setActivePlayer } from '../../redux/index';
import './Board.css';

class Board extends Component {

  componentDidMount() {
    this.props.createBoard();
  }

  render() {
    let { board, onSquareClick, winner, createBoard, activePlayer, selectActivePlayer } = this.props;

    let winnerText = '';
    if (winner === 'draw') {
      winnerText = 'Draw';
    } else if (winner === 'X' || winner === 'O') {
      winnerText = 'Player ' + winner + ' won!';
    }

    return (
      <div className="board-wrapper">
        <div className="winnerText">{winnerText}</div>

        { !winner ?
          (!activePlayer?
            <div>
              <div>Select the human player's shape (X or O) which to go first.</div>
              <button onClick={()=>selectActivePlayer('X')}>X</button>
              <button onClick={()=>selectActivePlayer('O')}>O</button>
            </div>
          :
          <div className="board">

          { board && board.map((value, index) =>
            <Square
              onClick={onSquareClick}
              squareValue={value}
              squareIndex={index}
              key={index}>
            </Square>
          )}


        </div>) :
        <div className="btn-play-again" onClick={() => createBoard()}>Play again</div>
        }
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    board: state.board,
    winner: state.winner,
    activePlayer : state.activePlayer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSquareClick: (squareIndex) => dispatch(setSquareValueAndChangeActivePlayer(squareIndex)),
    createBoard: () => dispatch(createBoard()),
    selectActivePlayer : (playerNumber) => dispatch(setActivePlayer(playerNumber))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
