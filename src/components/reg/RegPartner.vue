<template>
  <div class="regpartner">
    <Header></Header>
    <div class='box clearfix'>
      <!-- <img src="@/assets/img/login/reg_bg.jpg" alt="" id='bg' width="100%" height="100%"> -->
      <img src="@/assets/img/login/reg_bg.jpg" alt="" id='bg' width="100%">
      <div class="regmain">
        <ul>
          <li style='text-align: center;margin-bottom: 40px;'>注册账号</li>
          <li>
            <span class='inputbg bgphone'></span>
            <input type="text" placeholder="请输入手机号码" id='phone' v-model="phone" style="width:270px;border-bottom-right-radius: 0;border-top-right-radius: 0;border-right:0">
            <button class="pull-right getcode" @click="checkphone()">检测手机号</button>
          </li>
          <li>
            <span class='inputbg bgpsw'></span>
            <input type="password" placeholder="输入6-20位带字母数字的密码" id='password' v-model="password">
          </li>
          <li>
            <input type="text" placeholder="输入图形验证码" id='imgcode' v-model="imgCode">
            <img :src="imgCodeUrl" alt="" class="getimgcode pull-right" @click="changeCode()">
          </li>
          <li>
            <input type="text" placeholder="输入验证码" id='code' v-model="phoneCode">
            <!-- <span @click="getcode" class='pull-right getcode'></span> -->
            <button class="pull-right getcode" @click="getMsgCode()" :disabled="flagCounter" >{{codeCounter}}</button>
          </li>
          <li>
            <span class='inputbg bgqq'></span>
            <input type="text" placeholder="输入QQ（必填）" id='qq' v-model="qqNumber">
          </li>
          <li>
            <span class='inputbg bgwx'></span>
            <input type="text" placeholder="输入微信（非必填）" id='wx' v-model="wechat">
          </li>
          <li>
            <span class='inputbg bgqr'></span>
            <input type="text" placeholder="邀请码或者邀请人用户名（必填）" id='qr' v-model="invcode" :readonly="flag">
          </li>
          <li style="font-size:14px" class="regxieyi">
            <el-checkbox v-model="xieyi">
              <span>我已阅读并且同意</span>
            </el-checkbox>
            <span style="color:red;cursor: pointer;" @click="xieyicont=true">《速卖符服务协议》</span>
          </li>
        </ul>
        <div class="login__btn_box">
          <button class='mybtn' @click='regAccount' :disabled="!xieyi">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import {validata} from '@/assets/js/util/validata'
import {Loading, MessageBox} from 'element-ui'

export default {
  name: 'RegPartner',
  data () {
    return {
      imgCodeUrl: `${URLconfig.HTTPURL}/loginapi/getCode`,
      flagCounter: false,
      codeCounter: '发送验证码',
      phone: '',
      password: '',
      imgCode: '',
      phoneCode: '',
      qqNumber: '',
      wechat: '',
      invcode: '',
      flag: false,
      xieyi: false, // 是否同意服务协议
      xieyicont: false, // 协议内容弹窗
    }
  },
  mounted () {
    let inv = this.$route.query.inv
    //使用邀请链接注册, 邀请码添加只读
    if (inv) {
      this.invcode = inv
      this.flag = true
    }
  },
  components: {
    Header
  },
  methods: {
    //修改图片验证码
    changeCode () {
      this.imgCodeUrl = `${URLconfig.HTTPURL}/loginapi/getCode?str=${Math.random()}`;
    },
    async checkphone () {
      let phone = this.phone
      if(phone != ''){
        let data = await this.ajax({
          url: `Registerapi/check_phone`,
          data: {phone},
          withCredentials: true
        })
        if(!data) return false
        this.$message({
          message: '手机号可以注册',
          type: 'success'
        });
      }
    },
    async getMsgCode () {
      let mobile = this.phone
      let code = this.imgCode

      //需要验证的数据
      let validataArr = [
        {'val': mobile, 'type': 'phone', 'name': '手机号'},
        {'val': code, 'type': 'isnull', 'name': '图形验证码'},
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //获取验证码
      let data = await this.ajax({
        url: `loginapi/getMobileCode`,
        data: {mobile,code},
        withCredentials: true
      })
      if(!data) return false

      MessageBox.alert(data.msg);

      this.flagCounter = true
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
    async regAccount () {
      let mobile = this.phone
      let password = this.password
      let qq = this.qqNumber
      let imgcode = this.imgCode
      let phonecode = this.phoneCode
      let wechat = this.wechat
      let invcode = this.invcode
      //需要验证的数据
      let validataArr = [
        {'val': mobile, 'type': 'phone', 'name': '手机号'},
        {'val': password, 'type': 'password', 'name': '密码'},
        {'val': imgcode, 'type': 'isnull', 'name': '图形验证码'},
        {'val': phonecode, 'type': 'isnull', 'name': '手机验证码'},
        {'val': qq, 'type': 'qq', 'name': 'QQ号'},
        {'val': invcode, 'type': 'isnull', 'name': '邀请人'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //遮罩层开启
      let loading = Loading.service({
        text: '注册中',
        background: 'rgba(0,0,0,.5)'
      });
      //获取数据
      let data = await this.ajax({
        url: `registerapi/sellerregister`,
        data: {mobile,qq,'code': phonecode,wechat,password,invcode},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      // 处理数据
      if(!data) return false
      MessageBox.alert(data.msg,{
        lockScroll: false,
        confirmButtonText: '登录',
        callback: ()=>{
          this.$router.push('login')
        }
      })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/reg/regmain.css';
#bg{
  position: absolute;
  z-index: -1;
}
/* 媒体查询*/
@media screen and (max-width: 1200px){
  .box{
    width: 1200px;
  }
  #bg{
    width: 1200px;
  }
}
.mybtn:disabled{
  background: #AAA;
  border: 1px solid #AAA;
}
</style>
