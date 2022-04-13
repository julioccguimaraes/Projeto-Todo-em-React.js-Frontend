import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export function changeDescription(event) {
    return {
        type: 'DESCRIPTION_CHANGED',
        payload: event.target.value
    }
}

export function search() {
    // redux-thunk
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? '&description__regex=/' + description + '/' : ''
        const request = axios.get(URL + '?sort=-createdAt' + search)
        .then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))
    }
}
// com redux-multi
// problema: não espera o promise request e já executa o search
/*
export function add(description) {
    const request = axios.post(URL, { description })

    return [{
        type: 'TODO_ADDED',
        payload: request
    },
    search()
    ]
}
*/

// com redux-thunk
export function add(description) {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export function markAsDone(todo) {
    return function (dispatch) {
        axios.put(URL + '/' + todo._id, { ...todo, done: true })
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = todo => {
    return dispatch => {
        axios.put(URL + '/' + todo._id, { ...todo, done: false })
            .then(resp => dispatch(search()))
    }
}

export const remove = todo => {
    return dispatch => {
        axios.delete(URL + '/' + todo._id)
            .then(resp => dispatch(search()))
    }
}

// [] vem do redux-multi
export const clear = () => {
    return [
        {type: 'TODO_CLEAR'},
        search()
    ]
}