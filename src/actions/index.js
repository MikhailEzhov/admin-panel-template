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



export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}