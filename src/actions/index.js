export const elementsFetching = () => {
    return {
        type: 'ELEMENTS_FETCHING'
    }
}

export const elementsFetched = (elements) => {
    return {
        type: 'ELEMENTS_FETCHED',
        payload: elements
    }
}

export const elementsFetchingError = () => {
    return {
        type: 'ELEMENTS_FETCHING_ERROR'
    }
}

export const elementDeleted = (id) => {
    return {
        type: 'ELEMENT_DELETED',
        payload: id
    }
}

export const elementCreated = (element) => {
    return {
        type: 'ELEMENT_CREATED',
        payload: element
    }
}