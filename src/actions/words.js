const SET_DEFAULT_WORDS = 'SET_DEFAULT_WORDS'

/**
 * Sets all the default words to play with
 * @param {array} words
 */
export const setDefaultWords = (words) => (dispatch) => {
    dispatch({
        type: SET_DEFAULT_WORDS,
        payload: words
    })
}