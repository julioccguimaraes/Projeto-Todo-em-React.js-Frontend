import { combineReducers } from 'redux'
import todoReducer from '../todo/todoReducer'

const rootRecuder = combineReducers({
    todo: todoReducer
})

export default rootRecuder