import { configureStore } from '@reduxjs/toolkit'
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


// store создан через метод из Redux Toolkit
const store = configureStore({
    reducer: {elements, filters},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware), // встроенные middlewares в Redux Toolkit + собственный (stringMiddleware)
    devTools: process.env.NODE_ENV !=='production',                                        // расширение для браузера будет включено в режиме разработчика, выключено в режиме продакшн
})

export default store;