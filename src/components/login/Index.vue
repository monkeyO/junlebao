<template>
  <div class="main">
    <Header></Header>
    <div class='box clearfix'>
      <!-- <img src="@/assets/img/login/login_bg.png" alt="" id='bg' width="100%"> -->
      <div class='regmain'>
        <div>
            <ul>
              <li style='text-align: center;color:#000000;letter-spacing: 2px; margin-bottom:0; padding-bottom:.1px;'>
                <span style="padding-bottom: 25px; display:inline-block; margin-bottom:-2px; border-bottom:3px solid #FE0913;">用户登录</span>
              </li>
              <li style='border-top: 2px solid; padding-top: 15px;'>
                <!-- <span class='inputbg bgphone'></span> -->
                <input type="text" placeholder="请输入手机号码" id='phone' v-model="phone">
              </li>
              <li>
                <!-- <span class='inputbg bgpsw'></span> -->
                <input type="password" placeholder="输入密码" id='password' v-model="password" @keyup.enter='login'>
              </li>
              <li>
                <div class="p_operation">
                <el-checkbox v-model="remeberMe" style="color:#000000;">记住我(两周内免登录)</el-checkbox>
                <router-link to="/login" class="pull-right" @click.native="showPop">忘记密码</router-link>
              </div>
              </li>
            </ul>
            <div class="login__btn_box">
              <button class='mybtn' @click='login'>登录</button>
            </div>
        </div>
      </div>
    </div>
    <div v-if="editPop" class="edit_shade">
      <div class="edit_pop">
        <div class="edit_pop_title">
          <span>找回密码</span>
          <span class="my-close pull-right" @click="close"></span>
        </div>
        <ul class="edit_pop_content">
          <li>
            <div class="left">手机号码：</div>
            <div class="right">
              <input type="text" placeholder="输入手机号码" v-model="phone1">
            </div>
          </li>
          <li>
            <div class="left">图形验证码：</div>
            <div class="right">
              <input type="text" placeholder="输入图形验证码" v-model="imgCode">
              <img :src="imgCodeUrl" alt="" class="imgCode pull-right" @click="changeCode()">
            </div>
          </li>
          <li>
            <div class="left">短信验证码：</div>
            <div class="right">
              <input type="text" placeholder="输入验证码" v-model="phoneCode">
              <button class="pull-right getCode" @click="getMsgCode()" :disabled="flagCounter" >{{codeCounter}}</button>
            </div>
          </li>
          <li>
            <div class="left">输入新密码：</div>
            <div class="right">
              <input type="password" placeholder="输入您的新密码" v-model="newPassword">
            </div>
          </li>
          <li>
            <button class="btn" @click="submit">确认提交</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/public/Header'
import {validata} from '@/assets/js/util/validata'
import {Loading, MessageBox} from 'element-ui'

export default {
  name: 'Login',
  data () {
    return {
      remeberMe: false,
      phone: '', //登录手机号
      password: '', //登录密码
      editPop: false, //忘记密码弹窗 false-隐藏 true-显示
      phone1: '', //忘记密码手机号
      imgCode: '', //图形验证码
      phoneCode: '', //短信验证码
      newPassword: '', //新密码
      imgCodeUrl: `${URLconfig.HTTPURL}/LoginInterface/getCode`, //图形验证码图片
      flagCounter: false, //获取验证码按钮是否可用 false-可用 true-禁用
      codeCounter: '获取验证码',
    }
  },
  components: {
    Header
  },
  methods: {
    async login () {
      let username = this.phone
      let password = this.password
      let remember = this.remeberMe?'1':'0'
      //需要验证的数据
      let validataArr = [
        {'val': username, 'type': 'isnull', 'name': '手机号'},
        {'val': password, 'type': 'isnull', 'name': '密码'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      if(remember == 1){
        localStorage.remember = 1
      }else{
        localStorage.remember = 0
      }
      //遮罩层开启
      let loading = Loading.service({
        text: '登录中',
        background: 'rgba(0,0,0,.5)'
      });
      //获取数据
      let data = await this.ajax({
        url: `LoginInterface/login`,
        data: {username, password, remember},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      this.$router.push('/main')
    },
    //修改图片验证码
    changeCode () {
      this.imgCodeUrl = `${URLconfig.HTTPURL}/LoginInterface/getCode?str=${Math.random()}`;
    },
    async getMsgCode () {
      let mobile = this.phone1
      let code = this.imgCode

      //需要验证的数据
      let validataArr = [
        {'val': mobile, 'type': 'isnull', 'name': '手机号'},
        {'val': code, 'type': 'isnull', 'name': '图形验证码'},
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //获取验证码
      let data = await this.ajax({
        url: `LoginInterface/getMobileCode`,
        data: {mobile,code},
        withCredentials: true
      })
      if(!data) return false

      MessageBox.alert(data.msg);
      //禁用
      this.flagCounter = true
      //倒计时
      function codeTime(that) {
        let wait = 60;
        let time = setInterval(function () {
          if (wait == 0) {
            that.flagCounter = false
            that.codeCounter = '重新获取'
            wait = 60;
            clearInterval(time);
          } else {
            that.codeCounter = wait + "S";
            wait--;
          }
        }, 1000);
      }
      codeTime(this)
    },
    async submit () {
      let mobile = this.phone1
      let imgcode = this.imgCode
      let code = this.phoneCode
      let password = this.newPassword

      //需要验证的数据
      let validataArr = [
        {'val': mobile, 'type': 'isnull', 'name': '手机号'},
        {'val': imgcode, 'type': 'isnull', 'name': '图形验证码'},
        {'val': code, 'type': 'isnull', 'name': '短信验证码'},
        {'val': password, 'type': 'isnull', 'name': '新密码'},
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //遮罩层开启
      let loading = Loading.service({
        text: '修改中',
        background: 'rgba(0,0,0,.5)'
      });

      //获取数据
      let data = await this.ajax({
        url: `RegisterInterface/putpwd`,
        data: {mobile, code ,password},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      //处理数据
      if(!data) return false
      //隐藏弹窗
      this.editPop = false
      MessageBox.alert(data.msg,{
        lockScroll: false,
        confirmButtonText: '关闭'
      })
    },
    showPop () {
      //显示弹窗
      this.editPop = true
    },
    close () {
      //隐藏弹窗
      this.editPop = false
    }
  }
}
</script>
<style scoped>
   @import '../../assets/css/login/login.css';
</style>
