import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    filters: [],
    filtersLoadingStatus: 'null',
    activeFilter: 'all'
}


// в createSlice() включена библиотека Immer, она упрощает работу с иммутабельностью,
// это значить, что можно писать напрямую изменение state. эта библиотека сделает всё за нас

// используем createSlice:
const filtersSlice = createSlice({
    name: 'filters',   // имя текущего среза ...Slice
    initialState,      // начальное состояние
    reducers: {        // объект с обработчиками
        filtersFetching: state => {                   // ключ - action, значение - функция для изменения состояния
            state.filtersLoadingStatus = 'loading'    // меняем поле. писать без return и с такими переносами !
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'null';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});


// диструктуризируем сущьности из filtersSlice
const {actions, reducer} = filtersSlice;

// экспортируем
export default reducer;  // по умолчанию
export const {           // диструктуризированные действия
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;