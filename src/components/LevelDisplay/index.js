import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

const animation = keyframes`
	from {
		opacity: .8;
		transform: scale(0);
	}
	to {
		opacity: 0;
		transform: scale(15);
	}
`

const LevelLabel = styled.span`
	z-index: 1000;
	text-transform: uppercase;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	font-size: 1.6rem;
	animation: ${animation} 700ms forwards ease-out;
`


class LevelDisplay extends Component {

	render() {
		const { level } = this.props
		
		return (
			<LevelLabel>Level { level }</LevelLabel>
		);
	}
}

export default LevelDisplay