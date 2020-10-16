import { createAction, handleActions } from 'redux-actions';

import { RobotPosition } from '../lib/robot';

const INITIAL_STATE = {
    showReport: false,
    robotPosition: null,
    error: ''
};

const ActionTypes = {
    SUBMIT_COMMAND: 'SUBMIT_COMMAND',
}

export const submitCommand =  createAction(ActionTypes.SUBMIT_COMMAND)

const reducer = handleActions({
    [ActionTypes.SUBMIT_COMMAND]: (state, action) => {
        const command = action.payload.toLowerCase();

        return {
            ...state,
        }
    },
}, INITIAL_STATE);

export default reducer;
