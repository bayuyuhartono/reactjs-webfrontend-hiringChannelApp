import { combineReducers } from 'redux'

// import all reducer
import engineers from './EngineerList'
import companys from './CompanyList'
import profile from './Profile'

const rootReducer = combineReducers({
    engineers,
    companys,
    profile
})

export default rootReducer