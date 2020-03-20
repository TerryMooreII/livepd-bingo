import { Component, h, State, Host } from '@stencil/core';
import crimes from '../../services/calls';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false
})
export class AppHome {
  @State() isWinner = false;
  @State() board = [];

  bingo = 'BINGO';
  crimes = [];

  wins = [
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29],
    [5, 10, 15, 20, 25],
    [6, 11, 16, 21, 26],
    [7, 12, 17, 22, 27],
    [8, 13, 18, 23, 28],
    [9, 14, 19, 24, 29],
    [5, 11, 17, 23, 29],
    [9, 13, 17, 21, 25]
  ];

  componentWillLoad() {
    this.fillBoard();
  }

  fillBoard() {
    this.crimes = [...crimes];
    this.board = Array(30).fill('').map(() => this.getSquare());
  }

  getSquare() {
    const i = Math.floor(Math.random() * this.crimes.length);
    return this.crimes.splice(i, 1);
  }

  winnerCheck() {
    this.isWinner = this.wins
      .some(w => 
        w.every(idx => 
          document.getElementById(`square-${idx}`)
            .classList.contains('selected')
        )
      )
    this.isWinner && console.log('You win');
  }

  handleClick(idx) {
    if (idx === 17) return;
    const el = document.getElementById(`square-${idx}`);
    // @ts-ignore
    el.classList.contains('selected') 
      ? el.classList.remove('selected')
      : el.classList.add('selected')

     this.winnerCheck();
  }

  playAgain() {
    this.board.forEach((_, idx) => idx !== 17 && document.getElementById(`square-${idx}`).classList.remove('selected'));
    this.isWinner = false;
    this.fillBoard();
  }

  render() {
    return (
      <Host>
        <div class="board">
        {this.isWinner && <div class="winner">
          <h2>YOU WIN!!</h2>
          <a href="#" onClick={() => this.playAgain()}>Play again?</a>
        </div>}
          {
            this.board.map((s, idx) => 
            (<div key={idx} id={`square-${idx}`} class={`${idx < 5 ? 'header' : 'square'} ${idx === 17 ? 'selected' : ''}`} onClick={() => this.handleClick(idx)}>
              {
                idx < 5 
                  ? this.bingo[idx] 
                  : idx === 17 
                    ? 'Dan Makes a Joke \r\n FREE Space' 
                    : s
              }
          </div>))
          }
        </div>
       
      </Host>
       
    );
  }
}
