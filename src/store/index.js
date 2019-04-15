import Vuex from 'vuex'
import Vue from 'vue'
// import {URLconfig} from '@/assets/js/config' //此处urlconfig 放到static下，不参与编译
import {checkBackData} from '@/assets/js/util/checkBackData'
import {myaxios} from '@/assets/js/util/myaxios'
import axios from 'axios'

// Vue.prototype.URLconfig = window.URLconfig
Vue.prototype.checkBackData = checkBackData
Vue.prototype.ajax = myaxios
/**
 * @loginstate 登录状态 true || false
 * @timeout   是否3600状态码。
 * @keyData   用来村发布任务的关键词数据
 * @userInfo 当前登录账号信息
 */
let Store = new Vuex.Store({
  strict: true,
  state: {
    loginstate: false,
    timeout: false,
    keyData:{},
    userInfo: ''
  },
  mutations: {
    loginstate (state, arg) {
      sessionStorage.token = arg
      state.loginstate = arg
    },
    timeout (state, arg) {
      state.timeout = arg
    },
    keyData (state, arg) {
      state.keyData = arg
    },
    userInfo (state, arg) {
      state.userInfo = arg
    }
  },
  actions: {
    loginstate (store, arg) {
      store.commit('loginstate', arg)
    },
    timeout (store, arg) {
      store.commit('timeout', arg)
    },
    keyData (store, arg) {
      store.commit('keyData', arg)
    },
    async userInfo (store) {
      let token = '';
      if(localStorage.remember == 1 && localStorage.token.length == 32){
        token = localStorage.token
      }else{
        token = sessionStorage.token
      }
      //获取数据
      let backdata = (await axios({
        method: 'post',
        url: `${URLconfig.HTTPURL}/SellerMoneyInterface/getsellerinfo?tk=${token}`,
        withCredentials: true
      }))
      //处理数据
      if(backdata.data.code == 0){
        store.commit('userInfo', backdata.data.data)
        //存token 切换公共头显示状态
        store.commit('loginstate', backdata.data.token)
      }else{
        store.commit('userInfo', '')
      }
    }
  },
  getters: {
    //获取当前登录数据
    userLoad (state) {
      if (state.userInfo == "") {
        Store.dispatch('userInfo')
      }
    }
  },
  //modules 试用demo测试
  modules: {
    user: {
      state: {
        name: 'demo'
      },
      mutations: {
        test (state, arg) {
          state.name = arg
        }
      },
      actions: {
        test (store, arg) {
          store.commit('test', arg)
        }
      }
    }
  }
})
export default Store
