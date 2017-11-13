import React, { Component } from 'react'
import Board from '../Board'
import Score from '../Score'
import LevelDisplay from '../LevelDisplay'

import { words } from '../../words'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			score: 1,
			allWords: [],
			boardWords: [],
			doneWords: [],
			speed: 3000,
			correctLetters: 0,
			level: 1,
			levelHasChanged: true,
			fallingSpeed: 10000,
			wordsBetweenLevels: 5
		}

		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.wordIntervalId = null
	}
	
	componentDidMount() {
		// Set allWords to the long array and when done, run setTimer
		this.setState({
			allWords: words
		}, () => {
			this.setWordInterval()
		})

		document.addEventListener('keydown', this.handleKeyDown)		
	}
	
	setWordInterval() {
		// Set this.timer
		this.wordIntervalId = setInterval( () => {
			// Clear the timer if we're out of words othereise add new word
			if(this.state.allWords.length < 1) {
				clearInterval(this.state.wordIntervalId)
			} else {
				this.addWord()
			}

		}, this.state.speed )

	}

	addWord() {
		// Spread all the words to a new const
		const allWordsTemp = [...this.state.allWords]

		// Return a random word drom allWordsTemp and also splice (remove) from it
		const randomWord = allWordsTemp.splice(Math.floor( Math.random() * allWordsTemp.length ), 1)[0]
		
		// Set the new state with the new words
		this.setState({
			allWords: allWordsTemp,
			boardWords: [...this.state.boardWords, { word: randomWord, posX: Math.floor( Math.random() * 1000 ) }]
		})

		// Set a timer same as the falling word speed (state.fallingSpeed)
		// to game over and reset it when word is complete in checkLevel()
		
		// setTimeout( () => {
		// 	this.gameOver()
		// }, this.state.fallingSpeed )
	}


	handleKeyDown(e) {
		
		// If there are words to type
		if(this.state.boardWords.length > 0) {
			
			// This is the current word to type (the first in the array)
			const activeWord = this.state.boardWords[0].word

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

	gameOver() {
		alert('game over!')
	}

	checkLevel() {
		// For every [state.wordsBetweenLevels] words in doneWords array
		// This is in with other words when we level up by one
		if(this.state.doneWords.length % this.state.wordsBetweenLevels === 0) {
			
			this.setState({
				speed: this.state.speed - 200,
				level: this.state.level + 1,
				levelHasChanged: true,
				fallingSpeed: this.state.fallingSpeed - 20
			}, () => {
				clearInterval(this.wordIntervalId)
				this.setWordInterval()
			})
		} else {
			this.state.levelHasChanged === true && this.setState({ levelHasChanged: false })
		}
	}

	render() {
		// Destructure from state
		const {
			score,
			doneWords,
			boardWords,
			correctLetters,
			level,
			levelHasChanged,
			fallingSpeed
		} = this.state

		return (
			<div>
				{ levelHasChanged && <LevelDisplay level={level} /> }
				<Score score={score} doneWords={doneWords.length} level={level}/>
				<Board fallingSpeed={fallingSpeed} correctLetters={correctLetters} words={boardWords} />
			</div>
		)
	}
}

export default App