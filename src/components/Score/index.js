import React, {Component} from 'react'
import styled from 'styled-components'

const ScoreWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;

    > p {
        padding: 0;
        margin: 0;
        color: #d9d9d9;
        text-transform: uppercase;
        text-shadow: 0 2px 4px rgba(0, 0, 0, .5);
    }
`

class Score extends Component {

    render() {

        const { score, doneWords } = this.props

        return (
            <ScoreWrapper>
                <p>SCORE: {score}</p>
                <p>WORDS DONE: {doneWords}</p>
            </ScoreWrapper>
        )
    }
}

export default Score