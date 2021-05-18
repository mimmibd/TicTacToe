import React, { useState } from 'react';
import Board from './Board';
import '../styles/game.css';
import {
    calculateWinner
} from '../helpers';


function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);

    const handleClick = (i) => {
        const timeInHistory = history.slice(0, stepNumber + 1);
        const current = timeInHistory[stepNumber];
        const squares = [...current];

        // if user click an occupied square or if game is won, return
        if (winner || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory([...timeInHistory, squares]);
        setStepNumber(timeInHistory.length);
        setXisNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    }

    const renderMoves = () => (
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : 'Go to start';

            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>
                        {destination}
                    </button>
                </li>

            )
        })

    )

    const restartGame = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setXisNext(true);
        
    }

    const isBoardFull = (squares) => {
        for (let i = 0; i < squares.length; i++){
            if(squares[i] == null){
                return false;
            }
        }
        return true;
    }

    const statusModal = (squares) => {
        if (winner || isBoardFull(squares)) {
            return (
                <div className="statusModal">
                    <p>
                        {winner ? 'Winner: ' + winner : 'It\'s a draw!'}
                    </p>

                    <button onClick={restartGame}>
                        Start over
                    </button>
                </div>
            )
        }
    }

    return (
        <>
            <Board squares={history[stepNumber]} onClick={handleClick} />
            <div className="game">
                <p>
                    {winner ? ' ' : 'Next player: ' + (xIsNext ? 'X' : 'O')}
                </p>
                {statusModal(history[stepNumber])}
                {renderMoves()}

            </div>
        </>
    )
}

export default Game;