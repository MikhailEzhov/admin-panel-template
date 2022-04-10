import { createStore, combineReducers } from 'redux';
import elements from '../reducers/elements';
import filters from '../reducers/filters';


const store = createStore(
    combineReducers({elements, filters}), // объединение отдельных reducers
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;