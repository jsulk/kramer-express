import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore} from 'redux';
import { Provider } from 'react-redux';
import postsReducer from './reducers/posts-reducer';

const allReducers = combineReducers({
    posts: postsReducer
});

const store = createStore(
    allReducers,
    {
        posts: []
    },
    window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('app'));

serviceWorker.unregister();