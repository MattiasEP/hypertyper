import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setAudioPlaying } from '../../actions/audioPlayer'

import styled from 'styled-components'

const Player = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.isPlaying ? 'green' : 'red'};
    border: 1px solid black;
    cursor: pointer;
`

class AudioPlayer extends Component {
    constructor(props) {
        super(props)

        this.setPlayer = this.setPlayer.bind(this)
    }

    componentDidUpdate() {
        const a = fetch('./music.mp3').then(b => console.log(b))
    }

    setPlayer() {
        const { dispatch, isPlaying } = this.props
        dispatch( setAudioPlaying(!isPlaying) )
    }

    render() {
        const { isPlaying } = this.props

        return (
            <div>
                <Player onClick={this.setPlayer} isPlaying={isPlaying} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isPlaying: state.audioPlayer.audioIsPlaying
    }
}

export default connect(mapStateToProps)(AudioPlayer)