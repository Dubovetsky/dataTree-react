'use strict';

export const get  = (...args) => request('get',  ...args);
export const post = (...args) => request('post', ...args);

async function request(method, actions, dispatch, url, data, settings = null, ...otherArgs) {

    dispatch({ type: actions.REQUEST, params: otherArgs || [] });

    if (method == 'get') {
        let symbol = ~url.indexOf('?') ? '&' : '?';
        if(data) {
            let str = Object.keys(data).map(key => {
                return key + '=' + data[key];
            }).join('&');
            url += `${symbol}${str}`;
        }
    }
    let options = {
        method,
        body: method != 'get' ? JSON.stringify(data) : undefined
    }
    if(settings) {
        options = {...options, ...settings};
    }
    try {
        let resp = await window.fetch(url, options);
        let data = await resp.json();
        dispatch({
            type: actions.SUCCESS,
            data,
            params: otherArgs || []
        });
        return data;
    } catch(err) {
        dispatch({
            type: actions.FAILURE,
            err,
            params: otherArgs || []
        });
        return {};
    }

}

export function actionCreator(type, data, params = []) {
    return { type, data, params }
}

export function ApiActions(...actions) {
    actions.forEach(config => {
        let [ name, traceStatus ] = typeof config == 'string'
            ? [config]
            : config;
        this[name] = new ApiAction(name, traceStatus);
    })
}

export function ApiAction(name, traceStatus = 0) {
    this.REQUEST = `${name}_REQUEST`;
    this.SUCCESS = `${name}_SUCCESS`;
    this.FAILURE = `${name}_FAILURE`;
    this.RESET   = `${name}_RESET`;
    if (traceStatus) {
        this.STATUS  = `${name}_STATUS`;
    }
}