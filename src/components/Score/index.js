import React, {Component} from 'react'
import styled from 'styled-components'

const ScoreWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    font-size: 36px;
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