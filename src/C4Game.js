import React, { Component } from 'react';
import Status from './Status';
import Board from './Board';
import { BoardHeight, Red, Yellow, FourRed, FourYellow } from './constants';
import { isInfixOf, shift } from './utils';
import { throws } from 'assert';
import './C4Game.css';

class C4Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPlayer: Red,
            board: [[], [], [], [], [], [], []],
            winner: undefined
        };
        this.newGame = this.newGame.bind(this);
        this.dropOn = this.dropOn.bind(this);
    }
    newGame() {
        this.setState({
            currentPlayer: Red,
            board: [[], [], [], [], [], [], []],
            winner: undefined
        });
    }
    dropOn(col) {
        if(this.state.winner !== undefined) {
            return;
        }

        if(this.state.board[col].length < BoardHeight) {
            this.state.board[col].push(this.state.currentPlayer);
            this.setState({
                currentPlayer: this.state.currentPlayer === Red ? Yellow : Red,
                board: this.state.board
            });
            this.winCheck();
        }
    }
    winCheck() {
        let boardStrings = this.getBoardStrings();

        // col check
        boardStrings.forEach((col) => {
            if(isInfixOf(col, FourRed)) {
                this.setState({ winner: Red });
                return;
            }
            else if(isInfixOf(col, FourYellow)) {
                this.setState({ winner: Yellow });
                return;
            }
        });

        // row check
        let tBoardStrings = this.transposeStrings(boardStrings);
        tBoardStrings.forEach((col) => {
            if(isInfixOf(col, FourRed)) {
                this.setState({ winner: Red });
                return;
            }
            else if(isInfixOf(col, FourYellow)) {
                this.setState({ winner: Yellow });
                return;
            }
        });

        // diagonal check
        let downStrings = this.transposeStrings(boardStrings.map((s, index) => shift(s + '000000', index)));
        let upStrings = this.transposeStrings(boardStrings.map((s, index) => shift(s + '000000', -index)));
        downStrings.concat(upStrings).forEach((col) => {
            if(isInfixOf(col, FourRed)) {
                this.setState({ winner: Red });
                return;
            }
            else if(isInfixOf(col, FourYellow)) {
                this.setState({ winner: Yellow });
                return;
            }
        });
    }
    getBoardStrings() {
        return this.state.board.map((col) => {
            let s = '';
            for(let i = 0; i < BoardHeight; i++) {
                s += col[i] === undefined ? '0' : col[i]
            }
            return s;
        })
    }
    transposeStrings(ss) {
        let ts = []
        for (let i = 0; i < ss[0].length; i++) {
            let t = '';
            ss.forEach((s) => {
                t += s[i];
            });
            ts.push(t);
        }
        return ts;
    }
    render() {
        return (
            <div className="c4GameWrapper">
                <div className="c4Game">
                    <Board
                        board={this.state.board}
                        gameEnded={this.state.winner !== undefined}
                        dropOn={this.dropOn} />
                    <Status
                        currentPlayer={this.state.currentPlayer}
                        winner={this.state.winner}
                        newGame={this.newGame} />
                </div>
            </div>
        );
    }
}

export default C4Game;
