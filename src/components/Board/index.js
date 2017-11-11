import React, { Component } from 'react'
import Word from '../Word'
import styled from 'styled-components'

const BoardWrapper = styled.div`
	width: 1000px;
	height: 100vh;
	background-color: #282a36;
	box-shadow: 0 0 20px 6px rgba(0, 0, 0, .3);
	padding: 20px;
	position: relative;
`

class Board extends Component {

	render() {
		const { words, correctLetters } = this.props

		return (
			<BoardWrapper>
			{
				words.map( (word) => {
					return <Word correctLetters={correctLetters} key={word.word} word={word} />
				} )
			}
			</BoardWrapper>
		)        
	}
}

export default Board