import { createReducer } from '@reduxjs/toolkit';

// подключаем нужные действия
import { 
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} from '../actions';



const initialState = {
    filters: [],
    filtersLoadingStatus: 'null',
    activeFilter: 'all'
}


// в createReducer() включена библиотека Immer, она упрощает работу с иммутабельностью,
// это значить, что можно писать напрямую изменение state. эта библиотека сделает всё за нас

// используем createReducer
const filters = createReducer(initialState, builder => {  // (начальные состояния, функция builder в которую уже встроены три метода)
    builder
        .addCase(filtersFetching, state => {              // метод, принимает в себя(action, функция для изменения состояния)
            state.filtersLoadingStatus = 'loading';
        })
        .addCase(filtersFetched, (state, action) => {
            state.filtersLoadingStatus = 'null';
            state.filters = action.payload;
        })
        .addCase(filtersFetchingError, state => {
            state.filtersLoadingStatus = 'error';
        })
        .addCase(activeFilterChanged, (state, action) => {
            state.activeFilter = action.payload;
        })
        .addDefaultCase(() => {});                        // метод, принимает в себя функцию с пустым объектом - дефолтный вариант 
        // .addMatcher                                       третий метод, он фильтрует входящий action. не используется
}) 

// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.payload,
//                 filtersLoadingStatus: 'null'
//             }
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'ACTIVE_FILTER_CHANGED':
//             return {
//                 ...state,
//                 activeFilter: action.payload
//             }
//         default: return state
//     }
// }

export default filters;