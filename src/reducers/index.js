import { combineReducers } from 'redux'
import words from './words'
import audioPlayer from './audioPlayer'

export default combineReducers({
	words,
	audioPlayer
})