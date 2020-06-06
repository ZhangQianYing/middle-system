import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerPathList: ['home','commodityExamine','commodityLibrary','examineDetails','libraryDetails','outputGateway', 'entryGateway','userSystem','roleSystem','addUser', 'addRole','businessRegister','businessAuth']
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
