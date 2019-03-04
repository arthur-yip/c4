import React from 'react';
import { Red, Yellow, BoardWidth, BoardHeight } from './constants';
import './Board.css';

const Board = ({board, gameEnded, dropOn}) => {
    var tBoard = [];
    for(let i = 0; i < BoardWidth; i++) {
        let col = []
        for(let j = 0; j < BoardHeight; j++) {
            col.push(board[i][BoardHeight - j - 1]);
        }
        tBoard.push(col);
    }

    const renderedBoard = tBoard.map((col, colIndex) => {
        return (
            <div className="col" onClick={() => dropOn(colIndex)} key={colIndex}>
                {col.map((space, spaceIndex) => {
                    const cls = space === Red ? 'red' : space === Yellow ? 'yellow' : 'blank';
                    return (<div className={cls} key={colIndex + ',' + spaceIndex} />);
                })}
            </div>
        );
    });

    return (
        <div className={('board' + (gameEnded ? ' gameEnded' : ''))}>
            {renderedBoard}
        </div>
    );
};

export default Board;
