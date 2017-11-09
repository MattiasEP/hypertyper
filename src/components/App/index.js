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
			correctLetters: 0
		}

		this.handleKeyDown = this.handleKeyDown.bind(this)

	}
	
	componentDidMount() {
		this.setTimer()

		document.addEventListener('keydown', this.handleKeyDown)
	}
	
	addWord() {
		const allWordsTemp = [...this.state.allWords]
		const randomWord = allWordsTemp.splice(Math.floor( Math.random() * allWordsTemp.length ), 1)[0]
		
		this.setState({
			allWords: allWordsTemp,
			boardWords: [...this.state.boardWords, randomWord]
		})
	}

	setTimer() {
		const timer = setInterval( () => {
			
			if(this.state.allWords.length < 1) {
				clearInterval(timer)
			} else {
				this.addWord()
			}

		}, 1000 )
	}

	handleKeyDown(e) {
		const activeWord = this.state.boardWords[0]

		if(this.state.boardWords.length > 0) {
			if( e.key.toLowerCase() === activeWord[this.state.correctLetters].toLowerCase() ) {
				this.setState({
					correctLetters: this.state.correctLetters + 1
				})

				if(this.state.correctLetters === activeWord.length) {
					const boardWordsTemp = [...this.state.boardWords].slice(1)

					this.setState({
						correctLetters: 0,
						boardWords: boardWordsTemp,
						doneWords: [...this.state.doneWords, activeWord]
					})

					this.updateScore(activeWord)
				}
			}
		}
	}

	updateScore(word) {
		this.setState({
			score: this.state.score + (word.length * 1) // * 100?
		})
	}

	render() {

		const { score, doneWords, boardWords, correctLetters } = this.state

		return ( 
			<div>
				<Score score={score} doneWords={doneWords.length} />
				<Board correctLetters={correctLetters} words={boardWords} />
			</div>
		);
	}
}

export default App