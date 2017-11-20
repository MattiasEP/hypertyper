import React from 'react';
import ReactDOM from 'react-dom';

import reducers from './reducers'

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

import './index.css';
import App from './components/App'

import registerServiceWorker from './registerServiceWorker'

// Enable Redux DevTools
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const createStoreWithMiddleware = compose( applyMiddleware(thunkMiddleware), enhancers )(createStore)
const store = createStoreWithMiddleware(reducers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker()
