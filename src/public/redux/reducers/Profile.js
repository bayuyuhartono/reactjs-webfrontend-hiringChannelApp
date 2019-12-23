const initialState = {
    profile: [],
    isLoading: false,
    isError: false,
    isEmpty: false
}

const profile = (state = initialState, action) => {    
    switch(action.type){
        // loading
        case "FETCH_PROFILE_PENDING":
        case "UPDATE_ACCOUNT_PENDING":
        case "DELETE_ACCOUNT_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }
        // gagal
        case "FETCH_PROFILE_REJECTED":
        case "UPDATE_ACCOUNT_REJECTED":
        case "DELETE_ACCOUNT_REJECTED":
            return {
                ...state,
                isLoading: false,
                isError: true,
                isEmpty: true,
            }

        // berhasil
        case "FETCH_PROFILE_FULFILLED":
            console.log('masuk fulfilled');
            if (action.payload.data.data) {
                return {
                    state,
                    isLoading: false,
                    isError: false,
                    isEmpty: false,
                    // profile: action.payload.data
                    profile: [...action.payload.data.data]
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isEmpty: true,
                    // profile: action.payload.data
                    profile: []
                }
            }
        case "UPDATE_ACCOUNT_FULFILLED":
            console.log('masuk update fulfilled');
            return {
                ...state,
                isLoading: false,
                isError: false,
                isEmpty: false,
                profile: [],
                updated: true
            }
        case "DELETE_ACCOUNT_FULFILLED":
            console.log('masuk delete fulfilled');
            return {
                ...state,
                isLoading: false,
                isError: false,
                isEmpty: false,
                profile: [],
                deleted: true
            }

        default:
            return state
    }
}

export default profile