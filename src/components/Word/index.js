import React, {Component} from 'react'
import styled from 'styled-components'

const WordWrapper = styled.span`
	padding: 10px 20px;
	border: 2px solid #d9d9d9;
	color: #d9d9d9;
	text-transform: uppercase;
	border-radius: 5px;
	text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
	letter-spacing: 3px;

	&:first-child > span:nth-child(-n+${props => props.correctLetters}) {
		color: white;
		font-weight: 700;
	}
`

class Word extends Component {

	render() {
		const { word, correctLetters } = this.props

		return (
			<WordWrapper correctLetters={correctLetters}>
				{
					word.split('').map( (letter, i) => <span key={i}>{letter}</span>)
				}
			</WordWrapper>
		)
	}
}

export default Word