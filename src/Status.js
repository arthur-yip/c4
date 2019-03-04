import React from 'react';
import './Status.css';
import { Red } from './constants';

const Status = ({ currentPlayer, winner, newGame }) => (
    <div className="status">
        <div className="box">
            <p className="boxTitle">
                { winner === undefined ? 'NEXT:' : 'WINNER:' }
            </p>
            <div className={
                winner === undefined ?
                    (currentPlayer === Red ? 'boxedRed' : 'boxedYellow') :
                    winner === Red ? 'boxedRed' : 'boxedYellow' } />
        </div>
        <button onClick={newGame} className="newGameButton">NEW GAME</button>
    </div>
);

export default Status;