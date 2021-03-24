const initState = {
    auth: false,
    requested: false,
    user: ''
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'AUTHENTICATE_USER') {
        return {
            ...state,
            auth: true,
            user: action.userdata
        }
    } else if (action.type === 'REQUESTED') {
        return {
            ...state,
            requested: true
        }
    }
    return state
}

export default rootReducer;