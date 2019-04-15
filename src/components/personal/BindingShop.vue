<template>
  <div id="binding_shop">
    <!-- 绑定店铺 -->
    <div class="binding_shop">
      <template v-if="showAddShop=='shoplist'">
        <!-- 新增店铺 -->
        <div class="add_shop">
          <div class="add_shop_box">
            <img src="@/assets/img/person/add_shop.png" alt="">
            <button @click="addShop">+新增店铺</button>
          </div>
        </div>
        <div class="notice_item">
          <p>1. 每个平台第1个店铺为免费绑定（免费绑定的店铺有效期为永久），第2个店铺起需支付{{parseInt(shopPrice)}}元/个的费用即可绑定（付费绑定的店铺有效期为一年，到期需续费）</p>
          <p>2. 已发过任务的店铺，不可解绑店铺，如需换绑店铺，需支付{{parseInt(shopPrice)}}元/个（店铺有效期一年，到期需续费），如需换绑店铺，可联系运营MM微信：Mijiang919或在线客服QQ：800833972</p>
        </div>
        <!-- 绑定列表 -->
        <div class="bind_list">
          <!-- 标题 -->
          <div class="bind_list_title">
            <p>绑定列表</p>
          </div>
          <table style="table-layout:fixed;word-break:break-all;">
            <thead>
              <tr class="first_tr">
                <th style="width: 25%;">
                  <span class="bg_icon first_icon"></span>
                  <span>平台</span>
                </th>
                <th style="width: 25%;">
                  <span class="bg_icon second_icon"></span>
                  <span>店铺名称</span>
                </th>
                <th style="width: 25%;">
                  <span class="bg_icon third_icon"></span>
                  <span>到期时间</span>
                </th>
                <th style="width: 25%;">
                  <span class="bg_icon fourth_icon"></span>
                  <span>审核状态</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) of shopList" :key="index">
                <td>{{item.class|shopFilter}}</td>
                <td>{{item.shopname}}</td>
                <td v-if="item.isfirst == 1">永久</td>
                <td v-else>{{item.overtime}}</td>
                <td v-if="item.isfirst == 1 || item.isfirst == 3">
                  <button class="list_btn" style="background: #ef8252;" @click="editShop(item.id)">编辑</button>
                  </td>
                <td v-if="item.isfirst == 2">
                  <button class="list_btn" style="background: #ef6152;" @click="pay(item.id)">去支付</button>
                </td>
                <td v-if="item.isfirst == 4">
                  <button class="list_btn" style="background: #ef6152;" @click="pay(item.id)">去续费</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-if="showAddShop=='addshop'">
        <!-- 选择平台 -->
        <div class="choose_platform">
          <div class="choose_platform_box">
            <!--标题-->
            <div class="choose_platform_title">
              <p>请选择店铺平台：</p>
            </div>
            <!-- 平台 -->
            <ul class="choose_platform_list">
              <li>
                <el-radio v-model="shopClass" label="1">
                  <img src="@/assets/img/person/taobao.png" alt="">
                </el-radio>
              </li>
              <li>
                <el-radio v-model="shopClass" label="2">
                  <img src="@/assets/img/person/tianmao.png" alt="">
                </el-radio>
              </li>
              <li>
                <el-radio v-model="shopClass" label="3">
                  <img src="@/assets/img/person/jingdong.png" alt="">
                </el-radio>
              </li>
              <li>
                <el-radio v-model="shopClass" label="4">
                  <img src="@/assets/img/person/pinduoduo.png" alt="">
                </el-radio>
              </li>
              <li>
                <el-radio v-model="shopClass" label="5">
                  <img src="@/assets/img/person/alibaba.png" alt="">
                </el-radio>
              </li>
            </ul>
          </div>
        </div>
        <!-- 填写店铺信息 -->
        <div class="write_shop_information">
          <!-- 标题 -->
          <div class="write_shop_information_title">
            <p>填写店铺信息：</p>
          </div>
          <!-- 表单 -->
          <div class="write_shop_information_form">
            <ul>
              <li>
                <span>店铺名称：</span>
                <el-input v-model.trim="shopname" placeholder="请输入内容" class="input"></el-input>
              </li>
              <li v-if="shopClass!='3'&&shopClass!='4'">
                <span>店铺掌柜旺旺：</span>
                <el-input v-model.trim="wangwangname" placeholder="请输入内容" class="input"></el-input>
              </li>
              <li>
                <span>店铺首页url：</span>
                <el-input v-model.trim="shopurl" placeholder="请输入内容" class="input" @change="checkUrl(getKeyWord)"></el-input>
              </li>
              <li>
                <span><span class='color-red'>*</span>发件地址：</span>
                <el-select v-model="province" placeholder="请选择" style='width:15%;margin-right:2%' @change="getArea($event,'cityArr',1)">
                  <el-option
                    v-for="(item,index) in provinceArr"
                    :key="index*0.1"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="city" placeholder="请选择" style='width:15%;margin-right:2%' @change="getArea($event,'countyArr',2)">
                  <el-option
                    v-for="(item,index) in cityArr"
                    :key="index*0.2"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="county" placeholder="请选择" style='width:15%;'>
                  <el-option
                    v-for="(item,index) in countyArr"
                    :key="index*0.3"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span style="vertical-align: top;"><span class='color-red'>*</span>详细地址：</span>
                <el-input type="textarea" v-model="hair_addr_detail" placeholder="请输入内容" class="input"></el-input>
              </li>
              <li>
                <span><span class='color-red'>*</span>发件人姓名：</span>
                <el-input v-model.trim="addresser" placeholder="请输入内容" class="input" style='width:17.5%'></el-input>
                <span><span class='color-red'>*</span>发件人电话：</span>
                <el-input v-model.trim="addresser_num" placeholder="请输入内容" class="input" style='width:17.5%'></el-input>
              </li>
              <li class="color-red">
                <p>温馨提示：</p>
                <p>1.请仔细填写绑定店铺的信息，一经提交无法修改</p>
                <p>2.请填写您店铺的真实发件人信息，此信息会打印在快递面单上</p>
              <li>
                <el-button class="btn" @click="cancel">取消</el-button>
                <el-button type="danger" class="btn" @click="submit">确认绑定</el-button>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <!-- 弹窗 -->
    <div v-if='editPop' class="edit_shade">
      <div class="edit_pop">
        <div class="edit_pop_title">
          <span>{{editData.class|shopFilter}}</span>
          <!--<span class="my-close pull-right" @click="close"></span>-->
        </div>
        <div class="edit_pop_content">
          <el-row class="el_row" style="margin-top: 40px; color: #999;">
            <el-col :span="4">*店铺名称：</el-col>
            <el-col :span="8" class="el_col"> <el-input class="pop_input" v-model="editData.shopname" disabled="true"></el-input></el-col>
            <template v-if="editData.class!='3'&&editData.class!='4'">
              <el-col :span="4" style="margin-left: 20px;" >*掌柜旺旺：</el-col>
              <el-col :span="8" class="el_col"> <el-input class="pop_input" v-model="editData.wangwangname" disabled="true"></el-input></el-col>
            </template>
          </el-row>
          <el-row class="el_row" style="color: #999;">
            <el-col :span="4">*首页url：</el-col>
            <el-col :span="20" class="el_col"> <el-input class="pop_input" v-model="editData.shopurl" disabled="true"></el-input></el-col>
          </el-row>
          <el-row class="el_row">
            <el-col :span="4"><span class="color-red">*</span>发件地址：</el-col>
            <el-col :span="20" class="el_col myel_select">
              <el-select v-model="editData.province" placeholder="请选择" style='width:30%;margin-right:4%;' @change="getArea($event,'editcityArr',1)">
                <el-option
                  v-for="(item,index) in provinceArr"
                  :key="index*0.1"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="editData.city" placeholder="请选择" style='width:30%;margin-right:4%;' @change="getArea($event,'editcountyArr',2)">
                <el-option
                  v-for="(item,index) in editcityArr"
                  :key="index*0.2"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="editData.county" placeholder="请选择" style='width:30%;'>
                <el-option
                  v-for="(item,index) in editcountyArr"
                  :key="index*0.3"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="el_row" style="margin-top: 15px;">
            <el-col :span="4"><span class="color-red">*</span>详细地址：</el-col>
            <el-col :span="20" class="el_col">
              <el-input type="textarea" class="pop_input" v-model="editData.hair_addr_detail" resize="none"></el-input>
            </el-col>
          </el-row>
          <el-row class="el_row" style="margin-top: 30px;">
            <el-col :span="4" ><span class="color-red">*</span>发件人：</el-col>
            <el-col :span="8" class="el_col"> <el-input class="pop_input" v-model="editData.addresser"></el-input></el-col>
            <el-col :span="4" style="margin: 0 10px 0 10px;"><span class="color-red">*</span>发件人电话：</el-col>
            <el-col :span="8" class="el_col"> <el-input class="pop_input" v-model="editData.addresser_num"></el-input></el-col>
          </el-row>
          <el-row class="operate_button">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="edit">确定</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {validata} from '@/assets/js/util/validata'
import {Message, Loading, MessageBox} from 'element-ui'

export default {
  name: 'BindingShop',
  data () {
    return {
      showAddShop: 'shoplist', //默认显示新增店铺
      editPop: false, //弹窗 false-不显示 true-显示
      editData: {}, //编辑店铺数据
      shopList: ``, //店铺列表
      shopPrice: ``, //绑定/续费店铺价格
      shopClass: '1', //单选框label
      shopname: '', //店铺名称
      wangwangname: '', //店铺掌柜旺旺
      shopurl: '', //店铺首页url
      paytype: '', //支付方式
      province: ``, //省
      city: ``, //市
      county: ``, //县
      provinceArr: ``, //省数据
      cityArr: ``, //市数据
      countyArr: ``, //县数据
      hair_addr_detail: '', //详细地址
      addresser: '', //发件人姓名
      addresser_num: '', //发件人电话
      editcityArr: ``, //市数据
      editcountyArr: `` //县数据
    }
  },
  async mounted () {
    let routeQuery = this.$route.query.showAddShop
    if (routeQuery) {
      this.showAddShop = routeQuery
    }

    //获取省市数据
    this.getArea(0,'')
    this.getShopList()
  },
  computed: {
    //各平台店铺首页url规则
    getKeyWord () {
      switch (this.shopClass) {
        case '1':
          return'(\.taobao\.|\.fliggy\.)'
          break
        case '2':
          return '\.tmall\.'
          break
        case '3':
          return '\.jd\.'
          break
        case '4':
          return '\.yangkeduo\.'
          break
        case '5':
          return '\.1688\.'
          break
      }
    }
  },
  watch: {
    $route () {
      if (!this.$route.query.showAddShop) {
        this.showAddShop = 'shoplist'
      }
    },
    //当切换平台时, 清空数据
    shopClass () {
      this.shopname = ''
      this.wangwangname = ''
      this.shopurl = ''
      this.province = ''
      this.city = ''
      this.cityArr = ''
      this.county = ''
      this.countyArr = ''
      this.hair_addr_detail = ''
      this.addresser = ''
      this.addresser_num = ''
    }
  },
  methods: {
    //切换显示新增店铺
    addShop () {
      this.showAddShop = 'addshop'
      this.$router.push('/personal?active=shop&showAddShop=addshop')
    },
    //查看绑定店铺信息
    async editShop (id) {
      //显示弹窗
      this.editPop = true
      //获取绑定店铺信息
      let data = await this.ajax({
        url: `SellerAccountInterface/getshopdetail?tk=${sessionStorage.token}`,
        data: {"shopid": id}
      })
      if(!data) return false
      //赋值
      this.editData = data.data[0]
      //如果没有县, 默认
      if (this.editData.county == 0) {
        this.editData.county = ''
      }
      //获取省, mounted调用过getArea,此处可以注释掉
      // this.getArea(0, '')
      //获得市
      this.getArea(this.editData.province, 'editcityArr')
      //获得区
      this.getArea(this.editData.city, 'editcountyArr')
    },
    //省市联动
    async getArea (pid,item,item2) {
      //item2 控制修市县取消选择
      if(item2 == 1){
        this.city = ``
        this.county = ``
        this.editData.city = ``
        this.editData.county = ``
        this.editcountyArr = ``
      }
      if(item2 == 2){
        this.county = ``
        this.editData.county = ``
      }
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
    async getShopList () {
      //获取店铺数据
      let data = await this.ajax({
        url: `SellerAccountInterface/getshoplist?tk=${sessionStorage.token}`,
      })
      if(!data) return false

      this.shopList = data.data
      this.shopPrice = data.shopprice

      //判断是否到期需续费
      for (let i in this.shopList) {
        let overtime = new Date(this.shopList[i].overtime).getTime()
        let datetime = new Date().getTime()
        if (overtime != 0 && (overtime < datetime)) {
          this.$set(this.shopList[i], 'isfirst', '4')
        }
      }
    },
    //提交绑定店铺
    async submit () {
      let shopClass = this.shopClass
      let shopname = this.shopname
      let wangwangname = this.wangwangname
      let shopurl = this.shopurl
      let province = this.province
      let city = this.city
      let county = this.county
      let hair_addr_detail = this.hair_addr_detail.replace(/[\r\n]/g,"")
      let addresser = this.addresser
      let addresser_num = this.addresser_num

      //京东或拼多多平台, 旺旺号传随机数
      if (shopClass=='3'||shopClass=='4') {
        wangwangname = new Date().getTime().toString(36)
      }
      //需要验证的数据
      let validataArr = [
        {'val': shopname, 'type': 'isnull', 'name': '店铺名称'},
        {'val': wangwangname, 'type': 'isnull', 'name': '店铺掌柜旺旺'},
        {'val': shopurl, 'type': 'isnull', 'name': '店铺首页url'},
        {'val': hair_addr_detail, 'type': 'isnull', 'name': '详细地址'},
        {'val': addresser, 'type': 'isnull', 'name': '发件人姓名'},
        {'val': addresser_num, 'type': 'zuoji', 'name': '发件人电话'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //验证发件人地址
      if(province == `` || city == ``){
        Message({
          message: `请选择发件地址`,
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
        url: `SellerAccountInterface/addshop?tk=${sessionStorage.token}`,
        data: {'class': shopClass,shopname,wangwangname,shopurl,province,city,county,hair_addr_detail,addresser,addresser_num},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      MessageBox.alert(data.msg,{
        lockScroll: false,
        confirmButtonText: '确定',
        callback: ()=>{
          this.$router.push('/personal?active=shop')
          //清空数据
          this.shopClass = '1'
          this.shopname = ''
          this.wangwangname = ''
          this.shopurl = ''
          this.province = ''
          this.city = ''
          this.county = ''
          this.hair_addr_detail = ''
          this.addresser = ''
          this.addresser_num = ''
        }
      })
      this.getShopList()
    },
    //编辑店铺提交
    async edit () {
      let id = this.editData.id
      let province = this.editData.province
      let city = this.editData.city
      let county = this.editData.county
      let hair_addr_detail = this.editData.hair_addr_detail.replace(/[\r\n]/g,"")
      let addresser = this.editData.addresser
      let addresser_num = this.editData.addresser_num

      //需要验证的数据
      let validataArr = [
        {'val': hair_addr_detail, 'type': 'isnull', 'name': '详细地址'},
        {'val': addresser, 'type': 'isnull', 'name': '发件人姓名'},
        {'val': addresser_num, 'type': 'zuoji', 'name': '发件人电话'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //验证发件人地址
      if(province == `` || city == ``){
        Message({
          message: `请选择发件地址`,
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
        url: `SellerAccountInterface/editShop?tk=${sessionStorage.token}`,
        data: {id, province, city, county, hair_addr_detail, addresser, addresser_num},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      MessageBox.alert(data.msg,{
        lockScroll: false,
        confirmButtonText: '确定',
        callback: ()=>{
          this.editPop = false
        }
      })
      this.getShopList()
    },
    //去支付
    pay (id) {
      this.$router.push(`/gopay/${id}`)
    },
    //关闭弹窗
    close () {
      this.editPop = false
    },
    //取消
    cancel () {
      this.showAddShop = 'shoplist'
    },
    //验证店铺首页url
    checkUrl (str) {
      let shopurl = this.shopurl
      let reg = new RegExp(str)
      if(!reg.test(shopurl)) {
        if(this.shopClass == 1){
          str = '.taobao.或者.fliggy.'
        }
        Message({
          message: `请输入正确的店铺首页url, 例如：https://***${str}***`,
          duration: 1500,
          type: 'warning'
        })
        this.shopurl = ''
        return false
      }
    }
  },
  filters: {
    shopFilter (str) {
      switch(str){
        case '1':
          return '淘宝网'
        break
        case '2':
          return '天猫'
        break
        case '3':
          return '京东'
        break
        case '4':
          return '拼多多'
        break
        case '5':
          return '阿里巴巴'
        break
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/personal/bindingshop.css';
</style>
