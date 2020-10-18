import { createAction, handleActions } from 'redux-actions';

import { Robot } from '../lib/robot';

const INITIAL_STATE = {
    report: "",
    robot: new Robot(),
    error: "",
};

const ActionTypes = {
    SUBMIT_COMMAND: 'SUBMIT_COMMAND',
}

export const submitCommand =  createAction(ActionTypes.SUBMIT_COMMAND)

const reducer = handleActions({
    [ActionTypes.SUBMIT_COMMAND]: (state, action) => {
        const { error, report } = state.robot.followCommand(action.payload);
        return {
            ...state,
            error: error || "",
            report: report || "",
        }
    },
}, INITIAL_STATE);

export default reducer;
