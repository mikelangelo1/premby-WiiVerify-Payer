// import { createStore } from 'vuex'
import Vuex from "vuex";
import Vue from "vue";

import { userModule } from './user'
import { utilsModule } from './utils'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user: userModule,
        utils: utilsModule
    }
})

export default store