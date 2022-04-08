const initialState = {
    elements: [],
    elementsLoadingStatus: 'null',
    filters: []
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
                elements: newElementsList
            }
        default: return state
    }
}

export default reducer;