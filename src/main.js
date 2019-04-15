import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ELEMENT from 'element-ui'

import './theme/index.css'
import VueClipboard from 'vue-clipboard2'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.config.silent = true
Vue.use(ELEMENT)

//一键复制
Vue.use(VueClipboard)
//图片懒加载配置,后期需要换掉这个懒加载的图
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://admin.hdamai.com/public/page/sddh5/img/home/nav2.png',
  loading: 'http://admin.hdamai.com/public/page/sddh5/img/home/nav1.png',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted (){
    //加载时手动调用一下userLoad,加载用户数据
    // this.$store.getters.userLoad
  },
  watch:{
    async $route(old,new1){
      // 预留IndexEditTask 为后台编辑任务使用，不进行登录判断
      if(old.name=='IndexEditTask'){
        return false
      }
      //判断只有当userInfo信息为空的时候才进行获取数据
      if(!this.$store.state.userInfo){
        await this.$store.dispatch('userInfo')
        // 如果没有数据就去登录页面
        if(!this.$store.state.userInfo && this.$route.path !='/reg' && this.$route.path != '/regpartner'){
          this.$router.push('/login')
        }
      }
    }
}
})
//处理页面滚动条位置
router.afterEach(function (to, from) {
  window.scrollTo(0, 0)
  document.title = to.meta.title
})
