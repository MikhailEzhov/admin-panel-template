import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    elements: [],
    elementsLoadingStatus: 'null'
}


// в createSlice() включена библиотека Immer, она упрощает работу с иммутабельностью,
// это значить, что можно писать напрямую изменение state. эта библиотека сделает всё за нас

// используем createSlice:
const elementsSlice = createSlice({
    name: 'elements',   // имя текущего среза ...Slice
    initialState,       // начальное состояние
    reducers: {         // объект с обработчиками
        elementsFetching: state => {                       // ключ - action, значение - функция для изменения состояния
            state.elementsLoadingStatus = 'loading';       // меняем поле. писать без return и с такими переносами !
        },
        elementsFetched: (state, action) => {                   
            state.elementsLoadingStatus = 'null';  
            state.elements = action.payload;  
        },
        elementsFetchingError: state => {                   
            state.elementsLoadingStatus = 'error'; 
        },
        elementCreated: (state, action) => {                   
            state.elements.push(action.payload);
        },
        elementDeleted: (state, action) => {                   
            state.elements = state.elements.filter(item => item.id !== action.payload);
        }
    }       
});


// диструктуризируем сущьности из elementsSlice
const {actions, reducer} = elementsSlice;

// экспортируем
export default reducer;  // по умолчанию
export const {           // диструктуризированные действия
    elementsFetching,
    elementsFetched,
    elementsFetchingError,
    elementCreated,
    elementDeleted
} = actions;