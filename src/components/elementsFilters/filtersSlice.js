import {useHttp} from '../../hooks/http.hook';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    filters: [],
    filtersLoadingStatus: 'null',
    activeFilter: 'all'
}


// используем createAsyncThunk - создаём action(действие) с дополнительными свойствами:
export const fetchFilters = createAsyncThunk(
    // type:
    'filters/fetchFilters',     // 'имя текущего среза ...Slice / действие'  - в redux devtools действия так же обозначены
    // payloadCreator:          // это функция - которая должна вернуть асинхронный код
    async () => {               // без аргументов, а иначе (первый аргумент - что прийдет при dispatch(отправке),  второй аргумент - thunkAPI(в нём много параметров, каторые можно использовать))
        const {request} = useHttp();
        return await request("http://localhost:3001/filters");
    }
); // в итоге createAsyncThunk вернет действие с тремя свойствами:  pending - в ожидании | fulfilled - выполнено | rejected - отклонено


// в createSlice() включена библиотека Immer, она упрощает работу с иммутабельностью,
// это значить, что можно писать напрямую изменение state. эта библиотека сделает всё за нас

// используем createSlice:
const filtersSlice = createSlice({
    name: 'filters',   // имя текущего среза ...Slice
    initialState,      // начальное состояние
    reducers: {        // основные обработчики
        activeFilterChanged: (state, action) => {     // ключ - action, значение - функция для изменения состояния     
            state.activeFilter = action.payload;      // меняем поле. писать без return и с такими переносами !
        }
    },
    extraReducers: (builder) => {                                 // extraReducers - другие обработчики(внешние)
        builder
            .addCase(fetchFilters.pending, state => {             // (действие созданное при помощи createAsyncThunk. обрабатываем  pending -  в ожидании  ,  изменение state)             
                state.filtersLoadingStatus = 'loading'
            })
            .addCase(fetchFilters.fulfilled, (state, action) => { // (действие созданное при помощи createAsyncThunk. обрабатываем  fulfilled - выполнено  ,  изменение state) 
                state.filtersLoadingStatus = 'null';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, state => {            // (действие созданное при помощи createAsyncThunk. обрабатываем  rejected - отклонено  ,  изменение state)             
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})                             // по умолчанию пустая функция, которая нечего не делает
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