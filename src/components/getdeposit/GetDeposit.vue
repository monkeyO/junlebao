<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
    <PersonList :active="chooseitem"></PersonList>
      <el-col :span="20">
        <!-- 押金提现 -->
        <div class="get_deposit">
          <!-- 标题 -->
          <div class="get_deposit_title">
            <p style="font-size:20px;">提现</p>
          </div>
          <!-- 提现方式 -->
          <div class="get_deposit_payment">
            <div class="item_li">
              <span class="payment">提现方式</span>
              <div class="bank_pay" @click="chooseDepoist(2)" :class="deposittype==2?'active_pay':''">
                <img src="@/assets/img/recharge/bank_pay_img.png" alt="">
                <span>银行卡</span>
              </div>
            </div>
          </div>
          <!-- 提现银行 -->
          <div class="get_deposit_bankname clearfix">
            <div class="pull-left">提现至</div>
            <div class="pull-right">
              <img v-if="bankname!=(195||194||193||176)" :src="bankname|bankIMGFilter" alt="" width="180" height="36" style="margin-right: 15px;">
              <div v-else style="line-height: 36px; color: #999;">{{bankname|bankIMGFilter}}</div>
            </div>
          </div>
          <!-- 银行卡号 -->
          <div class="get_deposit_credit_card_number clearfix">
            <div class="pull-left">银行卡号</div>
            <div class="pull-right">{{cardnum|cardnumFilter}}</div>
          </div>
          <!-- 提现操作 -->
          <div class="get_deposit_operate">
            <div class="top">
              <span>可提现押金<span style="color:#E92725">{{Number(deposit).toFixed(2)}}</span>元</span>
              <span class="get_deposit_all" @click="depositAll">全部提现</span>
            </div>
            <div class="middle clearfix">
              <div class="pull-left">
                <span>￥</span>
                <input type="text" placeholder="请输入提现金额" v-model.trim="amount" />
              </div>
              <div class="pull-right">输入提现金额不得低于0元</div>
            </div>
            <div class="bottom clearfix">
              <div class="pull-left">提现将收取<span>{{fee*100}}%</span>手续费</div>
              <div class="pull-right">实际到账金额：<span>{{Number(getMoney).toFixed(2)}}元</span></div>
            </div>
          </div>
          <!-- 提交 -->
          <div class="get_deposit_submit">
            <el-button type="danger" class="btn" @click="submit">确认提现</el-button>
          </div>
          <div style="padding-top: 72px;font-size: 16px;padding-bottom: 20px;">
               <span class="color-red">温馨提示：为了保障用户资金安全性，平台暂不支持除银行卡之外其它方式的提现，敬请谅解！</span>
          </div>
        </div>
      </el-col>
      <el-dialog :visible.sync="bindRemind" width="36.4%" :show-close="false" :close-on-click-modal="false">
        <div class="bind_dialog">
          <img src="@/assets/img/getdeposit/success_icon.png" alt="">
          <!--<p>请先去绑定银行卡</p>-->
          <p>没有可用来提现的账号</p>
          <el-button type="danger" class="btn" @click="jump('1')">前去绑定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="applySuccess" width="36.4%" :show-close="false" :close-on-click-modal="false">
        <div class="bind_dialog">
          <img src="@/assets/img/getdeposit/success_icon.png" alt="">
          <p>提现申请成功</p>
          <el-button type="danger" class="btn" @click="jump('2')">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {Loading, Message} from 'element-ui'

export default {
  name: 'bankpay',
  data () {
    return {
      msg: '押金提现',
      deposittype: 2, //提现方式 1-支付宝 2-银行卡
      bankid: ``, //绑定银行卡的id
      bankname: ``, //开户行
      cardnum: ``, //银行卡卡号
      deposit: ``, //可提现押金
      amount: ``, //提现金额
      fee: ``, //提现手续费
      bindRemind: false,
      applySuccess: false
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
        return 'getDeposit'
      } else {
        return active
      }
    },
    //计算实际到账金额
    getMoney () {
      return this.amount * (1 - this.fee)
    }
  },
  async mounted(){
    this.getData()
  },
  methods: {
    async getData () {
      //获取提现账号数据
      let data = await this.ajax({
        url: `SellerCenterInterface/getcashbase?tk=${sessionStorage.token}`,
      })
      if(!data) return false
      //判断是否已绑定提现账号
      !data.data?this.bindRemind = true:this.bindRemind = false

      this.deposit = data.data.deposit?data.data.deposit:``
      this.bankname = data.data.bankname
      this.cardnum = data.data.cardnum
      this.fee = data.data.fee?data.data.fee:``
      this.bankid = data.data.bankid
    },
    //选择提现方式
    chooseDepoist (index) {
      this.deposittype = index
    },
    //全部提现
    depositAll () {
      this.amount = this.deposit
    },
    //提交
    async submit () {
      let amount  = Number(this.amount)
      let deposit = Number(this.deposit)
      let putway = this.deposittype
      let userbankid = this.bankid
      let putaccount = this.cardnum

      if(amount == '' || amount == 0) {
        Message({
          message: `请输入提现金额`,
          duration: 1500,
          type: 'warning'
        })
        this.amount = ''
        return false
      } else if (amount <= 0) {
        Message({
          message: `提现金额不得低于0元`,
          duration: 1500,
          type: 'warning'
        })
        this.amount = ''
        return false
      } else if (amount - deposit > 0) {
        Message({
          message: `提现金额不得大于可提现押金`,
          duration: 1500,
          type: 'warning'
        })
        this.amount = ''
        return false
      }

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      //获取数据
      let data = await this.ajax({
        url: `SellerCenterInterface/submitcash?tk=${sessionStorage.token}`,
        data: {amount, putway, userbankid, putaccount},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false

      this.applySuccess = true
    },
    jump (str) {
      switch(str) {
        case '1':
          this.$router.push('/accountmanage')
          break
        case '2':
          this.$store.dispatch('userInfo')
          this.$router.push('/personal')
          break
      }
    }
  },
  filters: {
    bankIMGFilter (str) {
      switch (str) {
        case 176:
          return '广州市农村信用合作社'
        case 193:
          return '农村商业银行'
        case 194:
          return '城市商业银行'
        case 195:
          return '农村信用合作社'
        default:
          return `static/img/${str}.png`
      }
    },
    cardnumFilter (str) {
      if (str) {
        return str.replace(/^(\d{4})\d*(\d{4})$/, '$1 **** **** $2')
      }
    }
  }
}
</script>

<style scoped>
.box{
  display: flex;
  justify-content: center;
}
.orderappeal{
  background: #f0f0f0;
}
.get_deposit {
  background: #fff;
  padding: 24px 20px 22px 20px;
  letter-spacing: 2px;
  font-size: 18px;
}
.get_deposit_title {
  height: 24px;
  font-size: 18px;
  border-left: 4px solid #e73c3a;
  padding-left: 20px;
  margin-bottom: 10px;
}
.get_deposit_payment {
  padding: 24px 0;
  border-top: 1px solid #ccc;
}
.item_li .payment{
  display: inline-block;
  width: 12%;
  font-size: 18px;
  /*padding: 10px;*/
  margin-top: 5px;
  vertical-align: middle;
}
/* 支付方式选择框样式 */
.bank_pay {
  display: inline-block;
  width: 146px;
  /*height: 40px;*/
  padding: 10px;
  border: 1px solid #cccccc;
  margin-right: 10px;
  position: relative;
  text-align: center;
  cursor: pointer;
}
.bank_pay span {
  display: inline-block;
  font-size: 18px;
  vertical-align: middle;
}
.active_pay {
  background: url(../../assets/img/recharge/choose_pay_bg.png) no-repeat;
  border-color: #fff;
  background-size: 100% 60px;
}
.bank_pay:hover {
  background: url(../../assets/img/recharge/choose_pay_bg.png) no-repeat;
  border-color: #fff;
  background-size: 100% 60px;
}
.item_li  img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.get_deposit_bankname {
  padding: 14px 0;
  border-top: 1px solid #ccc;
}
.get_deposit_bankname .pull-left {
  line-height: 36px;
}
.get_deposit_credit_card_number {
  padding: 22px 0;
  border-top: 1px solid #ccc;
}
.get_deposit_credit_card_number .pull-right {
  color: #999;
}
.get_deposit_operate {
  padding: 24px 0;
  border-top: 1px solid #ccc;
}
.get_deposit_all {
  margin-left: 24px;
  color: #3565dc;
  cursor: pointer;
}
.get_deposit_operate .middle {
  margin: 42px 0 16px;
  font-size: 36px;
}
.get_deposit_operate .middle input {
  font-size: 28px;
  border: 0;
  color: #666;
}
.get_deposit_operate .middle input::placeholder {
  color: #dcdcdc;
  letter-spacing: 2px;
}
.get_deposit_operate .middle .pull-right {
  margin-top: 16px;
  color: #eb3938;
  font-size: 18px;
}
.get_deposit_operate .bottom {
  padding-top: 32px;
  border-top: 1px solid #ccc;
}
.get_deposit_operate .bottom span {
  color: #eb3938;
}
.get_deposit_submit .btn{
  width: 21%;
  height: 56px;
  margin-top: 110px;
  font-size: 25px;
}
</style>
