import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
	from {
		transform: translateY(-100px);
	}
	to {
		transform: translateY(100vh);
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
	left: ${ props => props.posX }px;
	transform: translateY(-100px);

	animation: ${animation} ${props => props.fallingSpeed}ms linear;

	&:first-child > span:nth-child(-n+${props => props.correctLetters}) {
		color: white;
		font-weight: 700;
	}
`

class Word extends Component {
	constructor(props) {
		super(props)

		this.state = {
			timer: this.props.fallingSpeed/1000
		}
	}

	componentDidMount() {
		this.countDown()
		clearInterval(this.timer)
	}

	countDown() {
		setInterval( () => {
			this.setState({
				timer: this.state.timer - 1
			}, () => {
				if(this.state.timer <= 0) {
					this.props.gameOver()
				}
			})
		}, 1000)
	}

	render() {
		const { word, correctLetters, fallingSpeed } = this.props

		return this.state.timer > 0
			? (
				<WordWrapper fallingSpeed={fallingSpeed} posX={word.posX} correctLetters={correctLetters}>
					{
						word.word.split('').map( (letter, i) => <span key={i}>{letter}</span>)
					}
				</WordWrapper>
			)
			: null
	}
}

export default Word