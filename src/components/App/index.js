import React, { Component } from 'react'
import Board from '../Board'
import Score from '../Score'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			allWords: ['DICK', 'FUNGAME', 'HELLO', 'WORD', 'LETTER'],
			boardWords: [],
			doneWords: [],
			speed: 3000,
		};
	}


	render() {

		const { score, doneWords, boardWords } = this.state

		return ( 
			<div>
				<Score score={score} doneWords={doneWords.length} />
				<Board boardWords={boardWords} />
			</div>
		);
	}
}

export default App