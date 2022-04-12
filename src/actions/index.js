import { createAction } from "@reduxjs/toolkit";



// Общее действие для элементов, вернет функцию в которой ассинхронные действия
// делает запрос на получение, обрабатывает разные состояния ответа
// работает при подключенном redux-thunk Middleware
export const fetchElements = (request) => (dispatch) => {
    dispatch(elementsFetching());
    request("http://localhost:3001/elements")
        .then(data => dispatch(elementsFetched(data)))
        .catch(() => dispatch(elementsFetchingError()))
}

// Общее действие для фильтров, вернет функцию в которой ассинхронные действия
// делает запрос на получение, обрабатывает разные состояния ответа
// работает при подключенном redux-thunk Middleware
export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}



// export const elementsFetching = () => {
//     return {
//         type: 'ELEMENTS_FETCHING'
//     }
// }

export const elementsFetching = createAction('ELEMENTS_FETCHING');



// export const elementsFetched = (elements) => {
//     return {
//         type: 'ELEMENTS_FETCHED',
//         payload: elements
//     }
// }

export const elementsFetched = createAction('ELEMENTS_FETCHED');



// export const elementsFetchingError = () => {
//     return {
//         type: 'ELEMENTS_FETCHING_ERROR'
//     }
// }

export const elementsFetchingError = createAction('ELEMENTS_FETCHING_ERROR');



// export const elementDeleted = (id) => {
//     return {
//         type: 'ELEMENT_DELETED',
//         payload: id
//     }
// }

export const elementDeleted = createAction('ELEMENT_DELETED');



// export const elementCreated = (element) => {
//     return {
//         type: 'ELEMENT_CREATED',
//         payload: element
//     }
// }

export const elementCreated = createAction('ELEMENT_CREATED');



// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

export const filtersFetching = createAction('FILTERS_FETCHING');



// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

export const filtersFetched = createAction('FILTERS_FETCHED');



// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');



// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');