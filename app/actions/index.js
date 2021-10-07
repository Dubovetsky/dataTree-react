import { ApiActions, get } from './common';

export const actions = new ApiActions(
    'FETCH_DATA',
);

const API_ROOT = 'http://164.90.161.80:3000/api/content';
const API_DIR = 'http://164.90.161.80:3000/api/content?dirId=';

export const getRootDataAction = dispatch => get(actions.FETCH_DATA, dispatch, API_ROOT);
export const getDirDataAction = (dispatch, id) => get(actions.FETCH_DATA, dispatch, API_DIR + id);