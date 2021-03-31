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
    } else if (action.type === 'UPDATE_USER') {
        return {
            ...state,
            user: action.userdata
        }
    } else if (action.type === 'SIGNOUT_USER') {
        return {
            auth: false,
            requested: false,
            user: ''
        }
    }
    return state
}

export default rootReducer;