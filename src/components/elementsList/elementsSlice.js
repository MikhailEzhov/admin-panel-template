import { useHttp } from '../../hooks/http.hook';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



const initialState = {
    elements: [],
    elementsLoadingStatus: 'null'
}


// используем createAsyncThunk - создаём action(действие) с дополнительными свойствами:
export const fetchElements = createAsyncThunk(
    // type:
    'elements/fetchElements',   // 'имя текущего среза ...Slice / действие'  - в redux devtools действия так же обозначены
    // payloadCreator:          // это функция - которая должна вернуть асинхронный код
    async () => {               // без аргументов, а иначе (первый аргумент - что прийдет при dispatch(отправке),  второй аргумент - thunkAPI(в нём много параметров, каторые можно использовать))
        const {request} = useHttp();
        return await request("http://localhost:3001/elements");
    }
); // в итоге createAsyncThunk вернет действие с тремя свойствами:  pending - в ожидании | fulfilled - выполнено | rejected - отклонено


// в createSlice() включена библиотека Immer, она упрощает работу с иммутабельностью,
// это значить, что можно писать напрямую изменение state. эта библиотека сделает всё за нас

// используем createSlice:
const elementsSlice = createSlice({
    name: 'elements',   // имя текущего среза ...Slice
    initialState,       // начальное состояние
    reducers: {         // основные обработчики
        elementCreated: (state, action) => {           // ключ - action, значение - функция для изменения состояния     
            state.elements.push(action.payload);       // меняем поле. писать без return и с такими переносами !
        },
        elementDeleted: (state, action) => {                   
            state.elements = state.elements.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {                                  // extraReducers - другие обработчики(внешние)
        builder
            .addCase(fetchElements.pending, state => {             // (действие созданное при помощи createAsyncThunk. обрабатываем  pending -  в ожидании  ,  изменение state)             
                state.elementsLoadingStatus = 'loading';   
            })
            .addCase(fetchElements.fulfilled, (state, action) => { // (действие созданное при помощи createAsyncThunk. обрабатываем  fulfilled - выполнено  ,  изменение state)             
                state.elementsLoadingStatus = 'null';  
                state.elements = action.payload;   
            })
            .addCase(fetchElements.rejected, state => {            // (действие созданное при помощи createAsyncThunk. обрабатываем  rejected - отклонено  ,  изменение state)             
                state.elementsLoadingStatus = 'error'; 
            })
            .addDefaultCase(() => {})                              // по умолчанию пустая функция, которая нечего не делает
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