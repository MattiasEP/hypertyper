import React from 'react'
import styled from 'styled-components'

const ScoreWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	padding: 20px;
	z-index: 1; /* Put above <Board> */

	> p {
		text-align: left;
		padding: 0;
		margin: 0;
		color: #d9d9d9;
		text-transform: uppercase;
		text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
	}
`

const Score = () => {
	const { score, doneWords, level } = this.props

	return (
		<ScoreWrapper>
			<p>SCORE: {score}</p>
			<p>WORDS DONE: {doneWords}</p>
			<p>LEVEL: {level}</p>
		</ScoreWrapper>
	)
}

export default Score