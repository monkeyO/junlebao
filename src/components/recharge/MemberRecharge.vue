<template>
    <div id="member_recharge">
      <!-- 会员充值 -->
      <div class="hycz_box">
        <!-- 会员到期日 -->
        <div class="member_expire">
          <img src="@/assets/img/recharge/member_expire_time_bg.png" alt="">
          <span>
            <h4>会员到期时间：</h4>
            <p>{{vipdate}}</p>
          </span>
        </div>
        <!-- 会员充值 -->
        <div class="member_recharge">
          <!-- 会员充值标题 -->
          <div class="title">
            <p><span>请选择会员时长</span></p>
          </div>
          <!-- 会员充值内容 -->
          <div class="member_recharge_content">
            <ul>
              <!-- 充值金额 -->
              <li class="clearfix item_li recharge_money">
                <ul>
                  <li v-for="(item,index) of priceArr" :key="index">
                    <div @click="choose(index,item.id)" :class="show==index?'active_div':''">
                      <b><span>{{item.title}}</span></b>
                      <p>{{item.costprice}}元 <span> (返{{item.rebategold}}金币)</span></p>
                      <div v-if="item.discount == 1" class="discount" style="font-size: 18px;">新手</div>
                      <div v-if="item.discount == 24" class="discount" style="font-size: 18px;">推荐</div>
                    </div>
                  </li>
                </ul>
              </li>
              <!-- 支付方式 -->
              <li class="item_li" style="margin-bottom:25px">
                <span class="payment">支付方式</span>
                <div class="zhifubao_pay" :class="paytype==1?'active_pay':''" @click="choosePay(1)">
                  <img src="@/assets/img/recharge/zhifubao_pay_img.png" alt="">
                  <span>支付宝</span>
                </div>
                <div class="yajin_pay" :class="paytype==3?'active_pay':''" @click="choosePay(3)">
                  <img src="@/assets/img/recharge/yajin_pay_img.png" alt="">
                  <span>押金支付</span>
                </div>
                <div class="jinbi_pay" :class="paytype==4?'active_pay':''" @click="choosePay(4)">
                  <img src="@/assets/img/recharge/jinbi_pay_img.png" alt="">
                  <span>金币支付</span>
                </div>
                <p class="payment_p">您已选择购买<span class="color-red">{{month}}</span>(到期时间为{{maxDate}})会员需支付：<span class="color-red">{{money}}</span>元</p>
              </li>
              <!-- 确认支付 -->
              <li class="item_li">
                <el-button type="danger" class="submit_btn" @click="submit">确认支付</el-button>
              </li>
            </ul>
          </div>
        </div>
        <!-- 提示表格 -->
        <div class='duibibox'>
          <div class='Atitle'>发布<span>货返任务</span>价格对比表</div>
          <div class='Acontent'>
            <ul>
              <li>会员等级</li>
              <li class='backG'>普通商家</li>
              <li>普通商家</li>
              <li class='backG'>普通商家/VIP商家享受</li>
              <li><span>VIP商家</span></li>
              <li class='backG'><span>VIP商家</span></li>
              <li><span>VIP商家</span></li>
            </ul>
            <ul>
              <li>单品发布单数</li>
              <li class='backG'>单品<50</li>
              <li>单品≥50</li>
              <li class='backG'>单品<10</li>
              <li><span>单品≥10</span></li>
              <li class='backG'><span>单品≥30</span></li>
              <li><span>单品≥50</span></li>
            </ul>
            <ul>
              <li>手续费</li>
              <li style="height:293px">
                <div style="line-height: 24px;padding-top: 120px;">
                  <p>300元以内2元/单</p>
                  <p>300元以上商品价格0.8%</p>
                </div>
              </li>
            </ul>
            <ul>
              <li>待审核截图</li>
              <li style="height:146px">
                <div style="line-height: 24px;padding-top: 50px;">
                  <p>系统待审核<span>1元/单</span></p>
                  <p>商家审核退还该笔费用</p>
                </div>
              </li>
              <li style="height:146px">
                <div style="line-height: 24px;padding-top: 50px;">
                  <p>系统审核或是</p>
                  <p>
                    商家审核均<span>免费</span>
                  </p>
                </div>
              </li>
            </ul>
            <ul>
              <li>折扣价</li>
              <li class='backG'>原价</li>
              <li>每单佣金立减1元</li>
              <li class='backG'>原价</li>
              <li><span>每单佣金立减1元</span></li>
              <li class='backG'><span>每单佣金立减2元</span></li>
              <li><span>每单佣金立减3元</span></li>
            </ul>
          </div>
        </div>
        <!-- 温馨提示 -->
        <div class="warm_prompt">
          <div>
            <h3>温馨提示</h3>
            <p>1.如遇到点击确认支付没有反应，请确认您的网页是否设置了弹窗拦截。</p>
            <p>2.线下支付完成后，请提供转账截图，充值账号及时联系客服，以便能快速帮您充值。</p>
            <p>3.如果支付中遇到其他问题，请联系在线客服咨询。QQ：8888888</p>
          </div>
          <div>
            <p><span>【特别提醒】：</span>由于部分浏览器不兼容问题，因此可能会出现无法充值的情况，请更换其他浏览器比如【枫树】、【火狐】进行操作，若更换浏览器仍然不能解决问题，请联系在线客服QQ：800833972，给您带来的不便，敬请谅解。</p>
          </div>
        </div>
      </div>
      <!-- 支付宝提交 -->
      <form method="post" name="vipform"></form>
    </div>
</template>

<script>
import {validata} from '@/assets/js/util/validata'
import {Loading, MessageBox} from 'element-ui'

export default {
  name: 'MemberRecharge',
  data () {
    return {
      msg: `会员充值`,
      maxDate: ``, //联动会员到期日
      month: '',
      money: '', //需支付金额
      id: '', //套餐id
      show: 0, //默认第一个套餐被选中
      paytype: '1', //1-支付宝 3-押金支付 4-金币支付
      priceArr: [],
      vipdate: ``, //会员到期时间
    }
  },
  async mounted () {
    //获取数据
    let data = await this.ajax({
      url: `SellerAccountInterface/getvipbase?tk=${sessionStorage.token}`,
      needAlert: false
    })
    if(!data) return false

    this.priceArr = data.data
    this.month = data.data[0].title
    this.money = data.data[0].costprice
    this.id = data.data[0].id
    this.vipdate = data.vipdate
    this.getMaxDate(data.data[0].daynum, data.vipdate)
  },
  methods: {
    //选择套餐数据联动
    choose (index,id) {
      this.month = this.priceArr[index].title
      this.money = this.priceArr[index].costprice
      this.show = index
      this.id = id
      this.getMaxDate(this.priceArr[index].daynum, this.vipdate)
    },
    //选择支付方式
    choosePay (index) {
      this.paytype = index
    },
    async submit () {
      let paytype = this.paytype
      let money = this.money
      let id = this.id
      //遮罩层开启
      let loading = Loading.service({
        text: '支付中',
        background: 'rgba(0,0,0,.5)'
      });
      //获取数据
      let data = await this.ajax({
        url: `SellerAccountInterface/confirmpay?tk=${sessionStorage.token}`,
        data: {id, paytype, money}
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      if (data.state == 1) {
        //支付宝支付
        // document.vipform.action = data.msg
        // document.vipform.submit()
        //块钱支付
        this.$confirm(`<img src='${data.qrcode}' width='100%'>`, '请用支付宝扫码支付', {
          dangerouslyUseHTMLString: true,
          showClose: false,
          center: true,
          closeOnClickModal: false,
          confirmButtonClass: "cancelbtn",
          confirmButtonText: '支付完成',
          cancelButtonText: '支付遇到问题'
        })
          .then(() => {
            sessionStorage.orderno = data.orderno
            sessionStorage.type = 2
            this.$router.push('/kuaiqianpay')
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: '请重新支付'
            })
          })
      } else {
        MessageBox.alert(data.msg, {
          lockScroll: false,
          showClose: false,
          confirmButtonText: '支付成功',
          callback: () => {
            this.$store.dispatch('userInfo')
            this.$router.push(`/recharge`)
          }
        })
      }
    },
    //获取会员到期日
    getMaxDate (time, vipdate){
      let date = new Date().getTime()
      let getdate = new Date(vipdate).getTime()
      if (!vipdate||(getdate < date)) {
        let date = new Date()
        date = new Date(date.setDate(date.getDate()+time))
        this.dateFormat(date)
      } else {
        let date = new Date(vipdate)
        date = new Date(date.setDate(date.getDate()+time))
        this.dateFormat(date)
      }
    },
    //日期格式化
    dateFormat (date) {
      let year = date.getFullYear()
      let month = (date.getMonth() + 1) < 10? '0'+(date.getMonth() + 1): date.getMonth() + 1
      let day = date.getDate() < 10? '0' + date.getDate(): date.getDate()
      let hour = date.getHours() < 10? '0' + date.getHours(): date.getHours()
      let minute = date.getMinutes() < 10? '0' + date.getMinutes(): date.getMinutes()
      let second = date.getSeconds() < 10? '0' + date.getSeconds(): date.getSeconds()
      this.maxDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/recharge/memberrecharge.css';
.duibibox {
  border: 1px solid #D7D7D7;
  border-bottom: 0;
}
.duibibox .Atitle{
  background: #fde8d9;
  height: 54px;
  text-align: center;
  line-height: 54px;
  font-size: 20px;
  border-bottom: 1px solid #D7D7D7;
}
.duibibox .Atitle span{
  color: #07A0F8;
}
.duibibox .Acontent{

  display: flex;
}
.duibibox .Acontent ul{
  flex: 1;
}
.duibibox .Acontent ul+ul{
  border-left: 1px solid #D7D7D7;
}
.duibibox .Acontent ul li{
  height: 48px;
  border-bottom: 1px solid #D7D7D7;
  text-align: center;
  line-height: 48px;
  font-size: 16px;
}
.duibibox .Acontent ul li.backG{
  background: #F8F9FE
}
.duibibox .Acontent ul li:first-child{
  line-height: 58px;
  height: 58px;
  font-size: 18px;
}
.duibibox .Acontent span{
  color: #E92725;
}
</style>
