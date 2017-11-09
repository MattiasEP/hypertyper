import React, { Component } from 'react'
import styled from 'styled-components'

const BoardWrapper = styled.div`
    width: 1000px;
    height: 100vh;
    background-color: red;
`

class Board extends Component {

    render() {
        return (
            <BoardWrapper>
                hej
            </BoardWrapper>
        )        
    }
}

export default Board