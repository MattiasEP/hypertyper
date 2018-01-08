import React from 'react'
import styled from 'styled-components'
import Word from '../Word'

const BoardWrapper = styled.div`
	width: 1000px;
	height: 150vh;
	background-color: #282a36;
	box-shadow: 0 0 20px 6px rgba(0, 0, 0, .3);
	padding: 20px;
	position: relative;
`

const Board = ({ ...props }) => {
	const { words, correctLetters, fallingSpeed, gameOver } = props

	return (
		<BoardWrapper>
			{
				words.map((word) => {
					return (<Word
						gameOver={gameOver}
						fallingSpeed={fallingSpeed}
						correctLetters={correctLetters}
						key={word.word}
						word={word}
					/>)
				})
			}
		</BoardWrapper>
	)        
}

export default Board