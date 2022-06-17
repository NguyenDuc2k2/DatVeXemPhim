import { DISPLAY_LOADDING ,HIDE_LOADDING} from "../Action/Type/LoaddingType"

const initialState = {
    isLoadding: false
}

export const LoaddingReducer = (state = initialState, action) => {
    switch (action.type) {

        case DISPLAY_LOADDING: {
            return { ...state, isLoadding: true }
        }
        case HIDE_LOADDING : {
            return { ...state, isLoadding: false }

        }
        default:
            return state
    }
}
