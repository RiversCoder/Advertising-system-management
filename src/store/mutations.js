import * as types from './mutation-types.js'

const mutations = {
    [types.LOGIN]: (state, data) => {
        localStorage.token = data;
        state.token = data;
    },
    [types.LOGOUT]: (state) => {
        localStorage.removeItem('token');
        state.token = null;
    },
    [types.SINGER]: (state,data) => {
        state.singer = data;
    },
    [types.SOURCE]: (state,data) => {
        state.source = data;
    },
    [types.SELECT]: (state,data) => {
        state.selectid = data;
    },
    [types.RESULTS]: (state,data) => {
        state.results = data;
    },
    [types.DIR]: (state,data) => {
        state.dir = data;
    }
};

export default mutations;