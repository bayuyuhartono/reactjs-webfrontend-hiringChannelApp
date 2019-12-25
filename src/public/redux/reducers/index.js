import { combineReducers } from 'redux'

// import all reducer
import engineers from './EngineerList'
import companys from './CompanyList'
import profile from './Profile'
import register from './Register'

const rootReducer = combineReducers({
    engineers,
    companys,
    profile,
    register
})

export default rootReducer