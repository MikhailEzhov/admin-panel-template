import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

// redux-thunk популярный Middleware, чаще всего его используют чтобы в dispatch передавать функцию, 
// которая потом что-то делает ассинхронно (запросы на сервер, тайм-ауты, промисы)
import ReduxThunk from 'redux-thunk';

import elements from '../reducers/elements';
import filters from '../reducers/filters';



// Собственный Middleware, проверяет dispatch, проверяет действие переданное в dispatch
// dispatch записан как next
// если строка, то модифицирует dispatch и возвращает действие в виде объекта
// если не строка, то возвратит оригинальный dispatch с оригинальным действием
const stringMiddleware = () => (next) => (action) => { 
    if (typeof action === 'string') {                   
        return next({                                 
            type: action                     
        })
    }
    return next(action)                                 
};  


const store = createStore(
    combineReducers({elements, filters}),                                            // объединение отдельных reducers
    compose(                                                                         // второй аргумент(соединение-композиция функций)
        applyMiddleware(ReduxThunk, stringMiddleware),                                   // последовательно запускает все Middlewares
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()     // всегда внизу - для расширения Redux DevTools
    ) 
);

export default store;