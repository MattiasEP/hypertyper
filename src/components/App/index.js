import React, { Component } from 'react'
import Board from '../Board'
import Score from '../Score'

import { words } from '../../words'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			score: 0,
			allWords: [],
			boardWords: [],
			doneWords: [],
			speed: 3000,
			correctLetters: 0,
			level: 1
		}

		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.timerId = null
	}
	
	componentDidMount() {
		// Set allWords to the long array and when done, run setTimer
		this.setState({
			allWords: words
		}, () => {
			this.setTimer()
		})

		document.addEventListener('keydown', this.handleKeyDown)		
	}
	
	setTimer(speed = this.state.speed) {

		// If we run setTimer with a new speed then clear the timer
		// and make a new one but with the new speed
		if(speed !== this.state.speed) {
			clearInterval(this.timerId)
		}

		this.timerId = setInterval( () => {
			// Stop the timer if we're out of words othereise add new word
			if(this.state.allWords.length < 1) {
				clearInterval(this.state.timerId)
			} else {
				this.addWord()
			}

		}, speed )

	}

	addWord() {
		// Spread all the words to a new const
		const allWordsTemp = [...this.state.allWords]

		// Return a random word drom allWordsTemp and also splice (remove) from it
		const randomWord = allWordsTemp.splice(Math.floor( Math.random() * allWordsTemp.length ), 1)[0]
		
		// Set the new state with the new words
		this.setState({
			allWords: allWordsTemp,
			boardWords: [...this.state.boardWords, randomWord]
		})
	}


	handleKeyDown(e) {
		// This is the current word to type (the first in the array)
		const activeWord = this.state.boardWords[0]

		// If there are words to type
		if(this.state.boardWords.length > 0) {
			// If you typed the first letter
			if( e.key.toLowerCase() === activeWord[this.state.correctLetters].toLowerCase() ) {
				this.setState({
					// Add one to correctLetters
					correctLetters: this.state.correctLetters + 1
				})

				// If you're done typing a word
				if(this.state.correctLetters === activeWord.length) {
					// Remove that word from the array and store in a new one
					const boardWordsTemp = [...this.state.boardWords].slice(1)

					// Reset the corectLetters counter, the sliced boardWords and add to doneWords
					this.setState({
						correctLetters: 0,
						boardWords: boardWordsTemp,
						doneWords: [...this.state.doneWords, activeWord]
					})

					this.updateScore(activeWord)
					this.checkLevel()
				}
			}
		}
	}

	updateScore(word) {
		// Update the score. This function may be more complex later on
		this.setState({
			score: this.state.score + (word.length * 1) // * 100?
		})
	}

	checkLevel() {
		// For every 5 words in doneWords array
		if(this.state.doneWords.length % 5 === 0) {

			// Set a new timer with reduced speed
			this.setTimer(this.state.speed - 100)

			this.setState({
				speed: this.state.speed = this.state.speed - 100,
				level: this.state.level + 1
			})
			

		}
	}

	render() {
		// Destructure from state
		const { score, doneWords, boardWords, correctLetters, level } = this.state

		return ( 
			<div>
				<Score score={score} doneWords={doneWords.length} level={level}/>
				<Board correctLetters={correctLetters} words={boardWords} />
			</div>
		)
	}
}

export default App