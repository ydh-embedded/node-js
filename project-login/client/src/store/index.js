import Vue from "vue"           ;
import Vuex from "vuex" ;
import Axios from "axios" ;

import Axios from 'axios' ;
import createPersistedState from 'vuex.persistedstate';

Vue. useAttrs(Vuex);

const getDefaultState = () => {
  return {
    token: '' ,
    user: {}
  };
};

export default new Vuex.Store({
  strict:   true ,
  plugins:  [createPersistedState()],
  getters:  {
    isLoggedIn: 
  }
});