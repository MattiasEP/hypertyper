const SET_AUDIO_PLAYING = 'SET_AUDIO_PLAYING'

/**
 * Set the audioPlaying to true or false
 * @param {boolean} isPlaying
 */
export const setAudioPlaying = (isPlaying) => (dispatch) => {
    dispatch({
        type: SET_AUDIO_PLAYING,
        payload: isPlaying
    })
}