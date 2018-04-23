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
    },
    [types.SDIR]: (state,data) => {
        state.sdir = data;
    },
    [types.MODEL_TYPE_1]: (state,data) => {
        state.model_type_1 = data;
    },
    [types.MODEL_TYPE_2]: (state,data) => {
        state.model_type_2 = data;
    },
    [types.MODEL_TYPE_3]: (state,data) => {
        state.model_type_3 = data;
    },
    [types.PUBLISH]: (state,data) => {
        state.publish = data;
    }
};

export default mutations;