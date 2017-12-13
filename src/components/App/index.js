import React, { Component } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import Board from '../Board'
import Score from '../Score'
import LevelDisplay from '../LevelDisplay'


import words from '../../words'

const GameOver = styled.div`
	width: 100vw;
	height: 100vh;
	background: ##2e3d5a;
	display: flex;
	justify-content: center;
	align-items: center;

	> div {
		text-align: center;
		opacity: .5;
		cursor: pointer;
		transition: opacity .2s;

		&:hover {
			opacity: 1;
		}

		> h1 {
			font-size: 6rem;
			margin: 1rem 0;
			color: #d9d9d9;
			text-transform: uppercase;
			letter-spacing: 7px;
			text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
		}

		> span {
			font-size: 12rem;
			color: white;
		}
	}
`

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
			level: 1,
			levelHasChanged: true,
			fallingSpeed: 10000,
			wordsBetweenLevels: 5,
			gameOver: false
		}

		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.gameOver = this.gameOver.bind(this)
		this.restartGame = this.restartGame.bind(this)

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
		// Set the timer (defined in constructor)
		this.wordIntervalId = setInterval( () => {
			// Clear the timer if we're out of words othereise add new word
			if(this.state.allWords.length < 1) {
				clearInterval(this.wordIntervalId)
			} else {
				this.addWord()
			}
		}, this.state.speed )
	}

	addWord() {
		// Spread all the words to a new const
		const allWordsTemp = [...this.state.allWords]

		// Return a random word drom allWordsTemp and also splice (remove) from it
		const randomWord = allWordsTemp
			.splice(Math.floor( Math.random() * allWordsTemp.length ), 1)[0]

		// Set the new state with the new words
		this.setState({
			allWords: allWordsTemp,
			boardWords: [
				...this.state.boardWords,
				{
					word: randomWord,
					posX: this.calcWordPos(randomWord.length)
				}
			]
		})
	}

	calcWordPos(wordLength) {
		// There are 19px per letter, 20px padding on each side and 2px border on each side
		const wordWidth = (wordLength * 19) + 44
		const padding = 20
		const fromPos = 1000 - (wordWidth + padding)
		const toPos = 0 + padding

		return Math.floor( (Math.random() * ( (fromPos - toPos) + 1 )) + toPos )
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
		clearInterval(this.wordIntervalId)

		this.setState({
			gameOver: true
		})
	}

	restartGame() {
		this.setState({
			score: 0,
			allWords: words,
			boardWords: [],
			doneWords: [],
			speed: 3000,
			correctLetters: 0,
			level: 1,
			levelHasChanged: true,
			fallingSpeed: 10000,
			gameOver: false
		}, () => {
			this.setWordInterval()
		})
	}

	checkLevel() {
		// For every [state.wordsBetweenLevels] words in doneWords array
		// In other words when we level up by one
		if(this.state.doneWords.length % this.state.wordsBetweenLevels === 0) {
			this.setState({
				// Decrease word between every new word spawn
				speed: this.state.speed - 200,

				// Increase the level by 1
				level: this.state.level + 1,

				// The level has changed (beeing used to show level up message)
				levelHasChanged: true,

				// Decrease the words falling speed by 20
				fallingSpeed: this.state.fallingSpeed - 20
			}, () => {
				// Clear the interval
				clearInterval(this.wordIntervalId)

				// Start putting out words again
				this.setWordInterval()
			})
		} else {
			// If we didn't level up set the levelHasChanged to false again
			this.state.levelHasChanged && this.setState({ levelHasChanged: false })
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
			fallingSpeed,
			gameOver
		} = this.state

		return gameOver
			? (
				<div>
					<GameOver>
						<div onClick={this.restartGame}>
							<h1>Game Over!</h1>
							<span role="img" aria-label="Game Over">😵</span>
						</div>

					</GameOver>
					
					<Score score={score} doneWords={doneWords.length} level={level} />
				</div>
			)
			: (
				<div>
					{ levelHasChanged && <LevelDisplay level={level} /> }
					<Score score={score} doneWords={doneWords.length} level={level} />
					<Board
						gameOver={this.gameOver}
						fallingSpeed={fallingSpeed}
						correctLetters={correctLetters}
						words={boardWords}
					/>
				</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		defaultWords: state.words.defaultWords
	}
}

export default connect(mapStateToProps)(App)