import defaultWords from '../words'
import { handleActions } from 'redux-actions'

export default handleActions({
	SET_DEFAULT_WORDS: (state, action) => {
		return ({
			...state,
			defaultWords: [action.payload]
		})
	}
}, {
	defaultWords: defaultWords
})