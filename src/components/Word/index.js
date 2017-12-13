import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
	0% {
		transform: translateY(-100px);
	}
	50% {
		border-color: #d9d9d9;
	}
	80% {
		border-color: red;
	}
	100% {
		transform: translateY(100vh);
		border-color: red;
	}
`

const WordWrapper = styled.span`
	padding: 10px 20px;
	border: 2px solid #d9d9d9;
	color: #d9d9d9;
	text-transform: uppercase;
	border-radius: 5px;
	text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
	letter-spacing: 3px;
	position: absolute;
	left: ${(props) => props.posX}px;
	transform: translateY(-100px);

	animation: ${animation} ${(props) => props.fallingSpeed}ms linear;

	&:first-child > span:nth-child(-n+${(props) => props.correctLetters}) {
		color: #3DE000;
		font-weight: 700;
	}
`

class Word extends Component {
	constructor(props) {
		super(props)
		this.state = {
			alive: true
		}
		this.timeout = null
	}

	componentDidMount() {
		this.countDown()
	}

	componentWillUnmount() {
		clearTimeout(this.timeout)
	}

	countDown() {
		const { fallingSpeed, gameOver } = this.props

		this.timeout = setTimeout(() => {
			this.setState({ alive: false }, () => {
				gameOver()
			})
		}, fallingSpeed)
	}

	render() {
		const { word, correctLetters, fallingSpeed } = this.props

		return this.state.alive
			? (
				<WordWrapper fallingSpeed={fallingSpeed} posX={word.posX} correctLetters={correctLetters}>
					{
						word.word.split('').map( (letter) => <span key={`${word}-${letter}`}>{letter}</span>)
					}
				</WordWrapper>
			)
			: null
	}
}

export default Word