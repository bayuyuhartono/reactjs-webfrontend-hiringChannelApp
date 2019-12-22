import { combineReducers } from 'redux'

// import all reducer
import engineers from './engineers'

const rootReducer = combineReducers({
    engineers
})

export default rootReducer