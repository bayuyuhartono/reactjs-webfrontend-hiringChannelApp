const initialState = {
    companys: [],
    isLoading: false,
    isError: false,
    isEmpty: false
}

const companys = (state = initialState, action) => {    
    switch(action.type){
        // loading
        case "FETCH_COMPANYS_PENDING":
        case "FETCH_SINGLE_COMPANY_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }

        // gagal
        case "FETCH_COMPANYS_REJECTED":
        case "FETCH_SINGLE_COMPANY_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                isEmpty: true,
            }
            
        // berhasil
        case "FETCH_COMPANYS_FULFILLED":
            console.log('masuk fulfilled');
            if (action.payload.data.message !== 'Not Found') {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isEmpty: false,
                    // companys: action.payload.data
                    companys: [...action.payload.data.data]
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isEmpty: true,
                    // companys: action.payload.data
                    companys: [],
                    forbidden: true
                }
            }
            
            case "FETCH_SINGLE_COMPANY_FULFILLED":
                console.log('masuk fulfilled');
                if (action.payload.data.data) {
                    return {
                        state,
                        isLoading: false,
                        isError: false,
                        isEmpty: false,
                        // company: action.payload.data
                        companys: [...action.payload.data.data]
                    }
                } else {
                    return {
                        state,
                        isLoading: false,
                        isError: false,
                        isEmpty: true,
                        // company: action.payload.data
                        companys: []
                    }
                }
        default:
            return state
    }
}

export default companys