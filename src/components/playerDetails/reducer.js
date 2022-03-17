import { PLAYER_ERROR, PLAYER_REQUESTING, PLAYER_SUCCESS  } from "../../constants";

// The initial state of the PLAYER Reducer
export const initialState = {
    playerData: [],
    requesting: false,
    successful: false,
    errors: {},
};

const PlayerReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case PLAYER_REQUESTING:
            return { ...state, requesting: true };
        case PLAYER_SUCCESS:
            return {...state ,successful: true, playerData: actions.payload} ;
        case PLAYER_ERROR:
            return { ...state, successful: false, errors: { ...actions.error } };
        default:
            return state;
    }
}

export default PlayerReducer;