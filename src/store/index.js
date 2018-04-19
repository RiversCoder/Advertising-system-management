import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import * as actions from './actions.js';
import createLogger from 'vuex/dist/logger'; // 修改日志

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: debug ? [createLogger()] : []
});