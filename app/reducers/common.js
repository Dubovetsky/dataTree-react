export const boundApiReducer = ( type, prepare = action => action.data, extendKey = null ) => {
    return apiReducer.bind(null, type, prepare, extendKey);
}
var data = {};
const b = (m) => {
    if (m.length > 0) return []
    let l = m.id != 0 ? [] : [{ id: m.id, title: m.title }]
    let c = m.children.map(e => {
        return {
            id: e.id, title: e.title, parrent: m.id
        }
    })
    data.data.forEach(e => c = c.filter(f => f.id != e.id))
    return [...l, ...c]
}

const apiReducer = (type, prepare, extendKey, state, action) => {
    switch (action.type) {
    case type.REQUEST:
        data = {
            pending: true,
            data: state.data
        };
        return typeof extendKey === 'function' ? Object.assign({}, state, { [extendKey(action)]: data }) : data;
    case type.SUCCESS:
        data = {
            pending: false,
            data: [ ...data.data , ...b(prepare(action))]
        };
        return typeof extendKey === 'function' ? Object.assign({}, state, { [extendKey(action)]: data }) : data;
    case type.FAILURE:
        data = {
            pending: null,
            data: undefined
        };
        return typeof extendKey === 'function' ? {} : data;
    case type.RESET:
        data = {
            pending: null,
            data: {}
        };
        return typeof extendKey === 'function' ? {} : data;
    default:
        return state;
    }
}