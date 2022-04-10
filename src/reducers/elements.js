const initialState = {
    elements: [],
    elementsLoadingStatus: 'null'
}

const elements = (state = initialState, action) => {
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
            return {
                ...state,
                elements: state.elements.filter(item => item.id !== action.payload)
            }
        case 'ELEMENT_CREATED':
            return {
                ...state,
                elements: [...state.elements, action.payload]
            }
        default: return state
    }
}

export default elements;