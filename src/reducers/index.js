const initialState = {
    elements: [],
    elementsLoadingStatus: 'null',
    filters: [],
    filtersLoadingStatus: 'null',
    activeFilter: 'all',
    filteredElements: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ELEMENTS_FETCHING':
            return {
                ...state,
                elementsLoadingStatus: 'loading'
            }
        case 'ELEMENTS_FETCHED':
            return {
                ...state,
                elements: action.payload,
                // Фильтруем новые данные по фильтру, который сейчас применяется
                filteredElements: state.activeFilter === 'all' ? 
                                action.payload : 
                                action.payload.filter(item => item.category === state.activeFilter),
                elementsLoadingStatus: 'null'
            }
        case 'ELEMENTS_FETCHING_ERROR':
            return {
                ...state,
                elementsLoadingStatus: 'error'
            }
        case 'ELEMENT_DELETED': 
            // Формируем новый массив, метод filter вернет новый массив
            const newElementsList = state.elements.filter(item => item.id !== action.payload);
            return {
                ...state,
                elements: newElementsList,
                // Фильтруем новые данные по фильтру, который сейчас применяется
                filteredElements: state.activeFilter === 'all' ? 
                                newElementsList : 
                                newElementsList.filter(item => item.category === state.activeFilter)
            }
        case 'ELEMENT_CREATED':
            // Формируем новый массив    
            let newCreatedElementsList = [...state.elements, action.payload];
            return {
                ...state,
                elements: newCreatedElementsList,
                // Фильтруем новые данные по фильтру, который сейчас применяется
                filteredElements: state.activeFilter === 'all' ? 
                                newCreatedElementsList : 
                                newCreatedElementsList.filter(item => item.category === state.activeFilter)
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'null'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredElements: action.payload === 'all' ? 
                                state.elements :
                                state.elements.filter(item => item.category === action.payload)
            }
        default: return state
    }
}

export default reducer;