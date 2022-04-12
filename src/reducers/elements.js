import { createReducer } from '@reduxjs/toolkit';

// подключаем нужные действия
import { 
    elementsFetching,
    elementsFetched,
    elementsFetchingError,
    elementCreated,
    elementDeleted
} from '../actions';



const initialState = {
    elements: [],
    elementsLoadingStatus: 'null'
}


// в createReducer() включена библиотека Immer, она упрощает работу с иммутабельностью,
// это значить, что можно писать напрямую изменение state. эта библиотека сделает всё за нас

// используем createReducer
const elements = createReducer(initialState, builder => {  // (начальные состояния, функция builder в которую уже встроены три метода)
    builder
        .addCase(elementsFetching, state => {              // метод, принимает в себя(action, функция для изменения состояния)
            state.elementsLoadingStatus = 'loading';
        })
        .addCase(elementsFetched, (state, action) => {
            state.elementsLoadingStatus = 'null';
            state.elements = action.payload;
        })
        .addCase(elementsFetchingError, state => {
            state.elementsLoadingStatus = 'error';
        })
        .addCase(elementCreated, (state, action) => {
            state.elements.push(action.payload);           // в массив добавили новый элемент
        })
        .addCase(elementDeleted, (state, action) => {
            state.elements = state.elements.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});                        // метод, принимает в себя функцию с пустым объектом - дефолтный вариант 
        // .addMatcher                                       третий метод, он фильтрует входящий action. не используется
}) 

// const elements = (state = initialState, action) => {
//     switch (action.type) {
//         case 'ELEMENTS_FETCHING':
//             return {
//                 ...state,
//                 elementsLoadingStatus: 'loading'
//             }
//         case 'ELEMENTS_FETCHED':
//             return {
//                 ...state,
//                 elements: action.payload,
//                 elementsLoadingStatus: 'null'
//             }
//         case 'ELEMENTS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 elementsLoadingStatus: 'error'
//             }
//         case 'ELEMENT_DELETED':
//             return {
//                 ...state,
//                 elements: state.elements.filter(item => item.id !== action.payload)
//             }
//         case 'ELEMENT_CREATED':
//             return {
//                 ...state,
//                 elements: [...state.elements, action.payload]
//             }
//         default: return state
//     }
// }

export default elements;