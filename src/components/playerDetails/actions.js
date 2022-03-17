import { PLAYER_ERROR, PLAYER_REQUESTING, PLAYER_SUCCESS  } from "../../constants";
export function playerRequest() {
    return {
        type: PLAYER_REQUESTING,
    };
}

export function playerError(error) {
    return {
        type: PLAYER_ERROR,
        error,
    };
}

export function playerSuccess(payload) {
    return {
        type: PLAYER_SUCCESS,
        payload
    };
}