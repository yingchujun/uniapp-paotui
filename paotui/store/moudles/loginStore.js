
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: '',
    password: '',
    msg: ''
  },
  mutations: {
    LOGIN(state, username, password) {
      state.username = username
      state.password = password
      state.msg = "登录成功"
      console.log(state)
    },
    LOGINOUT(state) {
      state.msg = "退出成功"
    }
  },
  actions: {
    login(context, username) {
      context.commit("LOGIN", username, password)
    },
    login(context,username) {
      context.commit("LOGINOUT")
    }
  }
  
})

export default loginStore