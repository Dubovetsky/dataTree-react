import combineReducers from 'utils/combinereducers';
import test, {test_struct} from 'reducers/test';

export const initialState = {
    test: test_struct,
};

export default combineReducers({
    test,
});