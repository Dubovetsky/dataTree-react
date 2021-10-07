import {boundApiReducer} from './common';
import { actions } from 'actions';

export const test_struct = {
    pending: null,
    data: []
}

const test = boundApiReducer(actions.FETCH_DATA, (action) => {
    return action.data;
});

export default test;