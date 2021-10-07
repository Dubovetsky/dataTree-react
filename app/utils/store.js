import React, { useReducer, createContext } from 'react';
import Reducer, { initialState } from '../reducers';

export const Store = createContext();

export const StoreProvider = (props) => {
    const [ state, dispatch ] = useReducer(Reducer, initialState);
    let value = {state, dispatch};
    return <Store.Provider value={value} >{props.children}</Store.Provider>;
}
