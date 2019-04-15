<template>
  <div id="account_manage">
    <!-- 账户管理 -->
    <div class="account_manage">
      <!-- 标题 -->
      <div class="account_manage_title">
        <h3>账户管理</h3>
      </div>
      <!-- 内容盒子 -->
      <template v-if="showContent=='0'">
        <div class="account_manage_box">
          <ul>
            <li class="password">
              <!-- 密码设置 -->
              <div class="set_password">
                <img src="@/assets/img/person/lock.png" alt="">
                <p class="set_password_p">密码设置</p>
                <p>已设置</p>
                <b @click="toggle('1')">修改</b>
              </div>
            </li>
            <li>
              <span>性别：</span>
              <el-radio v-model="sex" label="1" onclick="return false">男</el-radio>
              <el-radio v-model="sex" label="2" onclick="return false">女</el-radio>
              <b @click="toggle('2')">修改</b>
            </li>
            <li>
              <span>手机号：</span>
              <el-input v-model="phone" placeholder="请输入内容" class="input" readonly></el-input>
              <!--<b @click="toggle('2')">修改</b>-->
              <div class="check" v-if="phone">
                <img src="@/assets/img/person/true.png" alt="">
                <span>已验证</span>
              </div>
            </li>
            <li>
              <span>微信：</span>
              <el-input v-model="wechat" placeholder="请输入内容" class="input" readonly></el-input>
              <!--<b @click="toggle('2')">修改</b>-->
              <div class="check" v-if="wechat">
                <img src="@/assets/img/person/true.png" alt="">
                <span>已验证</span>
              </div>
            </li>
            <li>
              <span>QQ：</span>
              <el-input v-model="qq" placeholder="请输入内容" class="input" readonly></el-input>
              <!--<b @click="toggle('2')">修改</b>-->
              <div class="check" v-if="qq">
                <img src="@/assets/img/person/true.png" alt="">
                <span>已验证</span>
              </div>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="showContent=='1'">
        <!-- 修改密码页面 -->
        <div class="change_password">
          <img src="@/assets/img/person/lock.png" alt="">
          <div>
            <p class="change_password_p">密码管理</p>
            <p>为了您的账号安全，请定期更换登录密码，并确保登录密码设置与提现密码不一样</p>
          </div>
        </div>
        <div class="account_manage_box" >
          <ul>
            <li>
              <span>原密码：</span>
              <el-input v-model="password" placeholder="请输入内容" class="input" type="password"></el-input>
            </li>
            <li>
              <span>新密码：</span>
              <el-input v-model="newpassword" placeholder="请输入内容" class="input" type="password"></el-input>
            </li>
            <li>
              <span>确认密码：</span>
              <el-input v-model="repassword" placeholder="请输入内容" class="input" type="password"></el-input>
            </li>
            <li class="btn_box">
              <el-button type="danger" class="btn" @click="submitPas">确认</el-button>
              <el-button type="danger" plain class="btn" @click="toggle('0')">取消</el-button>
            </li>
          </ul>
        </div>
      </template>
      <!-- 修改性别/手机号/微信/QQ/旺旺页面 -->
      <template v-if="showContent=='2'">
        <div class="account_manage_box" >
          <ul>
            <li>
              <span>性别：</span>
              <el-radio v-model="newsex" label="1">男</el-radio>
              <el-radio v-model="newsex" label="2">女</el-radio>
            </li>
            <li>
              <span>手机号：</span>
              <el-input v-model="phone" placeholder="请输入内容" class="input" disabled="true"></el-input>
            </li>
            <li>
              <span>微信：</span>
              <el-input v-model="newwechat" placeholder="请输入内容" class="input"></el-input>
            </li>
            <li>
              <span>QQ：</span>
              <el-input v-model.lazy="newqq" placeholder="请输入内容" class="input"></el-input>
            </li>
            <li class="btn_box">
              <el-button type="danger" class="btn" @click="submitInfo">确认</el-button>
              <el-button type="danger" plain class="btn" @click="toggle('0')">取消</el-button>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {validata} from '@/assets/js/util/validata'
import {Message, Loading} from 'element-ui'

export default {
  name: 'AccountManage',
  data () {
    return {
      password: '', //原密码
      newpassword: '', //新密码
      repassword: '', //确认密码
      sex: '', //性别
      phone: '', //手机号不可修改
      wechat: '', //微信
      qq: '', //QQ
      newsex: '', //修改性别
      newwechat: '', //修改微信
      newqq: '', //修改QQ
      showContent: '0' //0-主页 1-修改密码 2-修改信息
    }
  },
  async mounted () {
    //获取数据
    let data = await this.ajax({
      url: `SellerCenterInterface/getseller?tk=${sessionStorage.token}`,
      needAlert: false
    })
    if(!data) return false

    //回显
    this.sex = data.data.sex
    this.phone = data.data.phone
    this.wechat = data.data.wechat
    this.qq = data.data.qq
  },
  methods: {
    //切换显示
    toggle (str) {
      this.showContent = str
      //获取已有数据
      this.newsex = this.sex
      this.newwechat = this.wechat
      this.newqq = this.qq
      //清空数据
      this.password = ''
      this.newpassword = ''
      this.repassword = ''
    },
    //提交密码
    async submitPas () {
      //获取修改信息
      let password = this.password
      let newpassword = this.newpassword
      let repassword = this.repassword

      //需要验证的数据
      let validataArr = [
        {'val': password, 'type': 'isnull', 'name': '原密码'},
        {'val': newpassword, 'type': 'isnull', 'name': '新密码'},
        {'val': newpassword, 'type': 'password', 'name': '新密码'},
        {'val': repassword, 'type': 'isnull', 'name': '确认密码'},
        {'val': repassword, 'type': 'password', 'name': '确认密码'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false
      //验证两次密码输入是否一致
      if (newpassword !== repassword) {
        Message({
          message: '两次密码输入不一致',
          duration: 1500,
          type: 'error'
        })
        return false
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      //提交数据
      let data = await this.ajax({
        url: `SellerCenterInterface/edit_password?tk=${sessionStorage.token}`,
        data: {password, newpassword, repassword}
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      //切换显示
      this.showContent = '0'
    },
    //提交信息
    async submitInfo () {
      //获取修改信息
      let sex = this.newsex
      let phone = this.phone
      let wechat = this.newwechat
      let qq = this.newqq

      //需要验证的数据
      let validataArr = [
        {'val': qq, 'type': 'isnull', 'name': 'QQ'},
        {'val': qq, 'type': 'qq', 'name': 'QQ'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      //提交数据
      let data = await this.ajax({
        url: `SellerCenterInterface/putselleruser?tk=${sessionStorage.token}`,
        data: {phone, qq, wechat, sex}
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      //切换显示
      this.showContent = '0'
      //显示修改后数据
      this.sex = this.newsex
      this.wechat = this.newwechat
      this.qq = this.newqq
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/personal/accountmanage.css';
</style>
