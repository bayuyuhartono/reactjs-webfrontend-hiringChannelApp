const initialState = {
    register: [],
    message:[],
    isLoading: false,
    isError: false,
    isEmpty: false
}

const register = (state = initialState, action) => {    
    switch(action.type){
        // loading
        case "CREATE_ACCOUNT_PENDING":
        case "LOGIN_ACCOUNT_PENDING":
            return {
                ...state, // collect all previous state
                isError: false,
                isLoading: true,
            }
        // gagal
        case "CREATE_ACCOUNT_REJECTED":
        case "LOGIN_ACCOUNT_REJECTED":
            return {
                ...state,
                message:[],
                isLoading: false,
                isError: true,
                isEmpty: true,
            }

        // berhasil
        case "LOGIN_ACCOUNT_FULFILLED":
            console.log('masuk login fulfilled');
            if (action.payload.data.data) {
                return {
                    state,
                    isLoading: false,
                    isError: false,
                    isEmpty: false,
                    // register: action.payload.data
                    message: [...action.payload.data.message],
                    register: [...action.payload.data.data]
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isEmpty: true,
                    // register: action.payload.data
                    message: [...action.payload.data.message],
                    register: []
                }
            }
        case "CREATE_ACCOUNT_FULFILLED":
            console.log('masuk add fulfilled');
            if (action.payload.data.message === 'email was taken') {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isEmpty: false,
                    register: [],
                    added: false,
                    message: 'email was taken'
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                    isEmpty: false,
                    register: [],
                    added: true
                }
            }

        default:
            return state
    }
}

export default register