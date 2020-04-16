import * as actions from "../actions/actions";

export default function reducer(state = {}, action) {
    switch (action.type) {
        case actions.GET_FRIENDS_AND_REQUESTERS:
            return { ...state, payload: action.payload };
        case actions.ACCEPT_FRIEND_REQUEST:
            return {
                ...state,
                payload: state.payload.map((user) => {
                    if (user.id != action.id) {
                        return user;
                    } else {
                        return { ...user, accepted: true };
                    }
                }),
            };
        case actions.END_FRIENDSHIP:
            return {
                ...state,
                payload: state.payload.filter((user) => user.id != action.id),
            };
        case actions.GET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };
        case actions.GET_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message],
            };
        default:
            return state;
    }
}
