<template>
  <div class="demo">
    <div class="upload">
        <input type="file" class="uploadInput" @change="uploadimg('upload','uploadimg')" id="upload">
        <img style="width:100px;height: 100px" src="http://admin.hdamai.com/public/static/www/img/upload.jpg" id="uploadimg">
    </div>
    <router-link to="/" slot="left">
      <h1>去首页</h1>
    </router-link>
    <router-link to="/reg" slot="left">
      <h1>去注册</h1>
    </router-link>
    <router-link to="/demo/test">
      <h1  @click='changedata'>去子路由</h1>
    </router-link>
    <div>
    <h1>
      vuex子属性DEMO,点击增加: {{testvuex}}
    </h1>
    <h1>
      data属性num: {{num}}
    </h1>
    <input type="text" v-model="num">
    <input type="text" :value="data">
    <button @click='adddemo'>点击增加</button>
    </div>
    <div>
      <i class="fa fa-quora" aria-hidden="true"></i><span>测试奥森图标字体</span>
    </div>
    <!-- element-ui demo -->
    <el-transfer v-model="value5" :props="{key: 'value', label: 'desc'}" :data="data3" filterable  @change="handleChange" @left-check-change="test" ref="transfer">
      <!-- 插槽使用方法 -->
      <div slot="left-footer" >添加左侧插槽demo</div>
      <div slot="right-footer" >
        <button @click='testClearQuery("right")'>清除</button>
      </div>
    </el-transfer>
    <!-- //懒加载demo -->
      <div class="effect_feedback_bottom">
        <ul>
          <li><img src="" v-lazy="src[0]" alt="" class="img_width"></li>
          <li><img src="" v-lazy="src[1]" alt="" class="img_width"></li>
          <li><img src="" v-lazy="src[2]" alt="" class="img_width"></li>
          <li><img src="" v-lazy="src[3]" alt="" class="img_width"></li>
        </ul>
      </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import {previewImg} from '@/assets/js/util/imgscript'

export default {
  name: 'Demo',
  data () {
    const generateData3 = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          value: i + 2,
          desc: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      msg: '这是demo组件',
      num: 0,
      data3: generateData3(),
      value5: [],
      data: 11,
      src: [
        'http://admin.hdamai.com/public/page/sddh5/img/home/nav2.png',
        'http://admin.hdamai.com/public/page/sddh5/img/home/nav3.png',
        'http://admin.hdamai.com/public/page/sddh5/img/home/nav4.png',
        'http://admin.hdamai.com/public/page/sddh5/img/home/nav5.png'
      ]
    }
  },
  components: {
    Header
  },
  computed: {
    testvuex () {
      return this.$store.state.user.name
    }
  },
  async mounted () {
    this.num = this.$store.state.demo
    // JQ的ajax
    let data = await  $.post(`http://admin.hdamai.com/mobile/Memberapi/indexapi?tk=0e51426c7c94ab15a94f26271a78bd33`)
    // axios的AJAX
    // let data = await this.ajax({
    //   method: 'post',
    //   url: 'http://admin.hdamai.com/getindexinfo',
    //   data: JSON.stringify({})
    // })
    // 特殊情况下可用fetch的ajax
  },
  methods: {
    showIMG(url){
     MessageBox.alert(`<img src='${url}' width='100%' >`,'',{
        dangerouslyUseHTMLString:true,
        showClose: false
      });
    },
    adddemo () {
      this.$store.dispatch('test', `这里是测试`)
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    test (a, b) {
      console.log(a, b)
    },
    testClearQuery (str) {
      this.$refs.transfer.clearQuery(str)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    changedata () {
      // 此函数用于同以页面试用子路由进行数据切换的时候
      this.data = 22
    },
    // 显示上传图片功能函数
    uploadimg (inputId, imgId) {
      previewImg (inputId, imgId)
    }
  },
  updated () {
    // 数据更新后钩子
  },
  beforeDestroy () {
    console.log('销毁，此时可以用来处理数据清空类操作')
  },
  beforeRouteEnter (to, from, next) {
    document.title = to.meta.title
    if (to.path == '/demo/test') {
      // element-ui 弹窗
    }
    next()
  },
  // 组件激活时的钩子函数
  activated () {
    // window.location.hash.replace('#/', '')
    // 获取路由参数
    console.log(this.$route.params)
    // 获取get方式参数
    console.log(this.$route.query)
  }
}
</script>

<style scoped>
/* 当层级过深的时候，对一些静态资源引用时路径需要写很深,可以使用@import 引入外部css文件 */
@import '../assets/common.css';

.demo{
  text-align: center;
}
/* img{
  width: 20% !important;
} */
.upload {
    display: inline-block;
    position: relative;
    height: 100px;
}
.uploadInput {
    width: 104px;
    height: 108px;
    position: absolute;
    background: transparent;
    border: 0;
    opacity: 0;
    cursor: pointer;
}
</style>
