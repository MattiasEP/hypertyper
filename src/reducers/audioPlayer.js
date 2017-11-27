import { handleActions } from 'redux-actions'

export default handleActions({
	SET_AUDIO_PLAYING: (state, action) => {
		return ({
			...state,
			audioIsPlaying: action.payload
		})
	}
}, {
	audioIsPlaying: false
})