import { ADD_PROJECT_FAIL, ADD_PROJECT_REQUEST, ADD_PROJECT_RESET, ADD_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DETAIL_PROJECT_FAIL, DETAIL_PROJECT_REQUEST, DETAIL_PROJECT_SUCCESS, GET_PROJECT_FAIL, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, UPDATE_PROJECT_FAIL, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_RESET, UPDATE_PROJECT_SUCCESS } from "../constants/projectConstants";

export const projectListsReducer = (state={ projects: [] }, action) => {

    switch (action.type) {
        case GET_PROJECT_REQUEST:
            return { loading: true, success: false, projects: []}
        case GET_PROJECT_SUCCESS:
            return { loading: false, success: true, projects: action.payload }
        case GET_PROJECT_FAIL:
            return { loading: false, success: false, error: action.payload}   
        default:
            return state;
    }

}



export const addProjectReducer = (state={  }, action) => {

    switch (action.type) {
        case ADD_PROJECT_REQUEST:
            return { loading: true, success: false }
        case ADD_PROJECT_SUCCESS:
            return { loading: false, success: true, ...state, project: action.payload}
        case ADD_PROJECT_FAIL:
            return { loading: false, success: false, error: action.payload}
        case ADD_PROJECT_RESET:
            return { }     
        default:
            return state;
    }

}





export const detailProjectReducer = (state={ project: {} }, action) => {

    switch (action.type) {
        case DETAIL_PROJECT_REQUEST:
            return { loading: true, ...state }
        case DETAIL_PROJECT_SUCCESS:
            return { loading: false, success: true, project: action.payload}
        case DETAIL_PROJECT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}




export const updateProjectReducer = (state={ project: {} }, action) => {

    switch (action.type) {
        case UPDATE_PROJECT_REQUEST:
            return { loading: true, success: false }
        case UPDATE_PROJECT_SUCCESS:
            return { loading: false, success: true, ...state, project: action.payload}
        case UPDATE_PROJECT_FAIL:
            return { loading: false, success: false, error: action.payload}
        case UPDATE_PROJECT_RESET:
            return { }     
        default:
            return state;
    }

}

export const deleteProjectReducer = (state={  }, action) => {

    switch (action.type) {
        case DELETE_PROJECT_REQUEST:
            return { loading: true, success: false }
        case DELETE_PROJECT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_PROJECT_FAIL:
            return { loading: false, success: false, error: action.payload}
        default:
            return state;
    }

}



