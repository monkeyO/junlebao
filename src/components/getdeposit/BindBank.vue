<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
    <PersonList :active="chooseitem"></PersonList>
      <el-col :span="20">
       <!-- 绑定银行卡 -->
       <div class="add_appeal">
         <!-- 标题 -->
         <div class="add_appeal_title">
           <p style='font-size:20px;'>绑定银行卡</p>
         </div>
         <!-- 表单 -->
         <div class="add_appeal_form">
           <ul>
             <li style="color: #e73c3a">请注意：请仔细填写以下信息，银行卡一经绑定后不可修改</li>
             <li>
               <span><span class='color-red'>*</span>开户姓名：</span>
               <el-input placeholder="开户姓名（必填）" class="input" v-model.trim="username"></el-input>
             </li>
             <li>
               <span><span class='color-red'>*</span>身份证号码：</span>
               <el-input placeholder="身份证号码（必填）" class="input" v-model.trim="cardno"></el-input>
             </li>
             <li>
               <span><span class='color-red'>*</span>预留手机号：</span>
               <el-input placeholder="预留手机号（必填）" class="input" v-model.trim="prephone"></el-input>
             </li>
             <!--<li>-->
               <!--<span><span class='color-red'>*</span>短信验证码：</span>-->
               <!--<el-input placeholder="短信验证码（必填）" class="input" v-model="phoneCode" style="width: 32.9%; margin-right: 14px;"></el-input>-->
               <!--<el-button @click="getMsgCode()" :disabled="flagCounter">{{codeCounter}}</el-button>-->
             <!--</li>-->
             <li>
               <span><span class='color-red'>*</span>开户行：</span>
               <el-select placeholder="请选择" style='width:50%;margin-right:2%' v-model="bankname">
                 <el-option :value="item.id" v-for="(item, index) in bank" :key="index*0.1" :label="item.name"></el-option>
               </el-select>
             </li>
             <li>
               <span><span class='color-red'>*</span>银行卡号：</span>
               <el-input placeholder="银行卡号（必填）" class="input" v-model.trim="cardnum"></el-input>
             </li>
             <li>
               <span><span class='color-red'>*</span>支行全称：</span>
               <el-input placeholder="支行全称（必填）" class="input" v-model.trim="openbankname"></el-input>
             </li>
             <li>
               <span><span class='color-red'>*</span>开户省市：</span>
               <el-select v-model="province" placeholder="请选择" style='width:23%; margin-right: 1%;' @change="getArea($event,'cityArr',1)">
                 <el-option
                   v-for="(item,index) in provinceArr"
                   :key="index*0.1"
                   :label="item.name"
                   :value="item.id">
                 </el-option>
               </el-select>省
               <el-select v-model="city" placeholder="请选择" style='width:23%; margin: 0 1%;'>
               <!--<el-select v-model="city" placeholder="请选择" style='width:23%; margin: 0 1%;' @change="getArea($event,'countyArr',2)">-->
                 <el-option
                   v-for="(item,index) in cityArr"
                   :key="index*0.2"
                   :label="item.name"
                   :value="item.id">
                 </el-option>
               </el-select>市
               <!--<el-select v-model="county" placeholder="请选择" style='width:15%;'>-->
                 <!--<el-option-->
                   <!--v-for="(item,index) in countyArr"-->
                   <!--:key="index*0.3"-->
                   <!--:label="item.name"-->
                   <!--:value="item.id">-->
                 <!--</el-option>-->
               <!--</el-select>区-->
             </li>
             <li>
               <el-button type="danger" class="btn" @click="submit">确定</el-button>
              <div style="padding-bottom: 72px;padding-top: 32px;">
                <span class="color-red" style="width: 100%;">温馨提示：为了保障用户资金安全性，平台暂不支持除银行卡之外其它方式的提现，敬请谅解！</span>
              </div>
             </li>
           </ul>
         </div>
       </div>
      </el-col>
      <el-dialog :visible.sync="bindSuccess" width="36.4%" :show-close="false" :close-on-click-modal="false">
        <div class="bind_dialog">
          <img src="@/assets/img/getdeposit/success_icon.png" alt="">
          <p>您已成功绑定银行卡</p>
          <el-button type="danger" class="btn" @click="jump">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {validata} from '@/assets/js/util/validata'
import {Loading, Message} from 'element-ui'

export default {
  name: 'bankpay',
  data () {
    return {
      msg: '绑定银行卡',
      username: ``, //开户姓名
      cardno: ``, //身份证号码
      prephone: ``, //预留手机号
      bankname: ``, //开户行
      bank: [], //开户行基础数据
      cardnum: ``, //银行卡号
      openbankname: ``, //支行全称
      province: ``, //省
      city: ``, //市
      // county: ``, //县
      provinceArr: ``, //省数据
      cityArr: ``, //市数据
      // countyArr: ``, //县数据
      bindSuccess: false
    }
  },
  components: {
    Header,
    PersonList
  },
  computed: {
    //处理跳转路由时需要点亮的item
    chooseitem () {
      let active = this.$route.query.active
      if (active == undefined) {
        return 'accountManage'
      } else {
        return active
      }
    }
  },
  async mounted(){
    this.getBankList()
    this.getArea(0,'')
  },
  methods: {
    async getBankList () {
      let data = await this.ajax({
        url: `SellerCenterInterface/bankList?tk=${sessionStorage.token}`
      })
      if(!data) return false
      this.bank = data.data
    },
    //省市联动
    async getArea (pid,item,item2) {
      //item2 控制修市县取消选择
      if(item2 == 1){
        this.city = ``
        // this.county = ``
      }
      // if(item2 == 2){
      //   this.county = ``
      // }
      if(typeof pid == "object"){
        pid = pid.target.value
      }
      let data = await this.ajax({
        url: `SellerAccountInterface/addr_of_express?pid=${pid}&t=${sessionStorage.token}`
      })
      if(!data) return false
      if(pid == 0 && item==''){
        this.provinceArr = data.arealist
      }else{
        this[item] = data.arealist
      }
    },
    async submit () {
      let username = this.username
      let cardno = this.cardno
      let prephone = this.prephone
      let bankname = this.bankname
      let cardnum = this.cardnum
      let openbankname = this.openbankname
      let province = this.province
      let city = this.city

      //需要验证的数据
      let validataArr = [
        {'val': username, 'type': 'isnull', 'name': '开户姓名'},
        {'val': cardno, 'type': 'idcard', 'name': '身份证号码'},
        {'val': prephone, 'type': 'phone', 'name': '预留手机号'},
        {'val': bankname, 'type': 'isnull', 'name': '开户行'},
        {'val': cardnum, 'type': 'int', 'name': '银行卡号'},
        {'val': openbankname, 'type': 'isnull', 'name': '支行全称'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //验证开户省市是否选择
      if(province == `` || city == ``){
        Message({
          message: `请选择开户省市`,
          duration: 1500,
          type: 'warning'
        })
        return false
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      //获取数据
      let data = await this.ajax({
        url: `SellerCenterInterface/tiedbankcard?tk=${sessionStorage.token}`,
        data: {username, cardno, bankname, openbankname, prephone, cardnum, province, city},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      this.bindSuccess = true
    },
    jump () {
      this.$router.push('/accountmanage')
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/addappeal.css';
.add_appeal_form ul {
  margin-top: 24px;
  font-size: 16px;
}
.bind_dialog {
  text-align: center;
}
.bind_dialog img {
  width: 68px;
  height: 68px;
}
.bind_dialog p {
  margin-top: 30px;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 2px;
}
.bind_dialog .btn {
  margin: 34px auto 10px;
  width: 40%;
  height: 48px;
  font-size: 20px;
}

</style>
