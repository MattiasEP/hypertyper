import { handleActions } from 'redux-actions'

import defaultWords from '../words'

export default handleActions({
	SET_DEFAULT_WORDS: (state, action) => {
		return ({
			...state,
			defaultWords: [action.payload]
		})
	}
}, {
	defaultWords
})