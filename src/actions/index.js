import {elementsFetching, elementsFetched, elementsFetchingError} from '../components/elementsList/elementsSlice';
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/elementsFilters/filtersSlice';



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
