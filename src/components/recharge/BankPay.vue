<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList :active="chooseitem"></PersonList>
       <el-col :span="20">
         <!-- 线下转账记录列表 -->
         <template v-if="state == 1">
           <div class="order_appeal" style="padding-bottom: 0;">
             <div class="add_appeal_title" style="margin-bottom: 0;">
               <p>线下转账记录</p>
             </div>
           </div>
           <div class="appeal_list">
             <ul>
               <li v-for="(item, index) in dataList" :key="index">
                 <el-table :data="Array(item)" border :header-cell-style="{'text-align':'center','font-weight':'normal','background':'#f5f5f5'}" :cell-style="{'text-align':'center','color':'#333'}">
                   <el-table-column prop="createdate" label="创建时间"></el-table-column>
                   <el-table-column prop="buyer_account" label="充值类型"></el-table-column>
                   <el-table-column prop="orderid" label="姓名"></el-table-column>
                   <el-table-column prop="type" label="金额"></el-table-column>
                   <el-table-column label="转账截图" prop="img">
                     <template slot-scope="scope">
                       <img :src="scope.row.img" width="106" height="80" @click="showIMG(scope.row.img)" style="cursor: pointer;">
                     </template>
                   </el-table-column>
                   <el-table-column prop="state" label="状态">
                     <template slot-scope="scope">
                       <span v-if="scope.row.state == 0" class="color-e45858">待审核</span>
                       <span v-if="scope.row.state == 1" class="color-e45858">处理中</span>
                       <span v-if="scope.row.state == 2">已成功</span>
                     </template>
                   </el-table-column>
                 </el-table>
               </li>
               <li v-if="bankList.length>0">
                 <el-pagination
                   @current-change="currentChange"
                   :current-page="nowpage"
                   :page-size="pageSize"
                   :total="bankList.length">
                 </el-pagination>
               </li>
             </ul>
           </div>
         </template>
         <!-- 填写支付信息 -->
         <template v-if="state == 2">
           <!-- 新增黑名单 -->
           <div class="add_appeal">
             <!-- 标题 -->
             <div class="add_appeal_title">
               <p>填写支付信息</p>
             </div>
             <!-- 表单 -->
             <div class="add_appeal_form">
               <ul>
                 <li>
                   <span>开户银行：</span>
                   <div class="right_information">中国建设银行股份有限公司济南站前广场支行</div>
                 </li>
                 <li>
                   <span>开户账号：</span>
                   <div class="right_information">6217 0023 4003 2001 986</div>
                 </li>
                 <li>
                   <span>账户姓名：</span>
                   <div class="right_information">唐晓</div>
                 </li>
                 <li>
                   <span>充值金额：</span>
                   <div class="right_information">{{money}}</div>
                 </li>
                 <li>
                   <span>充值类型：</span>
                   <div class="right_information">{{type|typeFilter}}</div>
                 </li>
                 <li>
                   <span>转账人：</span>
                   <el-input placeholder="请输入转账人姓名" class="input" v-model="name"></el-input>
                 </li>
                 <li>
                   <span style="vertical-align: top;">转账截图：</span>
                   <div class="upload_img">
                     <input type="file" class="uploadInput" @change="uploadimg('imageUrl1', 'upload', 'uploadimg')" id="upload">
                     <img src="/static/img/bg.png" id="uploadimg">
                   </div>
                 </li>
                 <li style="font-size: 13px; color: #e73c3a;">上传转账截图允许jpg、png、gif，以便财务审核</li>
                 <li>
                   <el-button type="danger" class="btn" @click="submit">提交</el-button>
                 </li>
               </ul>
             </div>
           </div>
         </template>
       </el-col>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {previewImg} from '@/assets/js/util/imgscript'
import {validata} from '@/assets/js/util/validata'
import {Loading, MessageBox} from 'element-ui'

export default {
  name: 'bankpay',
  data () {
    return {
      msg: '银行卡支付',
      state: ``, //1-线下转账记录列表 2-填写支付信息
      money: ``, //充值金额
      type: ``, //充值类型 1-押金充值 2-金币充值
      name: ``, //转账人
      dataList: [],
      bankList: [],
      nowpage: 1, //当前页
      pageSize: 4 //每页显示条数
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
        return 'bankpay'
      } else {
        return active
      }
    }
  },
  async mounted(){
    if (sessionStorage.rechargeType) {
      this.state = 2
      this.money = sessionStorage.rechargeMoney
      this.type = sessionStorage.rechargeType
    } else {
      this.state = 1
    }
    this.getBankList()

  },
  beforeRouteLeave (to, from, next) {
    delete sessionStorage.rechargeMoney
    delete sessionStorage.rechargeType
    next()
  },
  methods: {
    //点击查看图片
    showIMG(url){
      MessageBox.alert(`<img src='${url}' width='100%' >`,'',{
        dangerouslyUseHTMLString:true,
        showClose: false
      })
    },
    async getBankList () {
      //获取线下转账数据
      let data = await this.ajax({
        url: `SellerCenterInterface/getBlackList?tk=${sessionStorage.token}`,
      })
      if(!data) return false

      this.bankList = data.data
      //默认显示第一页数据
      this.currentChange(1)
    },
    //显示上传图片功能函数
    async uploadimg (item,inputId,imgId,flag) {
      // flag === false?'':flag = true
      flag === false ? true : '' //不验证图片尺寸
      let file = document.getElementById(inputId).files[0]
      //成功才会赋值属性
      previewImg(inputId, imgId, flag).then(res => {
        (async () => {
          // 上传图片，返回图片地址
          let formData = new FormData()
          formData.append('file', file)
          //遮罩层开启
          let loading = Loading.service({
            text: '上传中',
            background: 'rgba(0,0,0,.5)'
          })
          // 上传图片数据
          let data = await this.ajax({
            url: `TaskManageInterface/uploadpicture?tk=${sessionStorage.token}`,
            data: formData,
            ContentType: 'multipart/form-data',
            withCredentials: true,
            needAlert: false
          })
          //遮罩层关闭
          loading.close()
          if (!data) return false
          document.getElementById(imgId).src = data.url
          if (typeof item == "string") {
            this[item] = data.url
          } else {
            this[item.name][item.x].imgList[item.y] = data.url
          }
        })()
      }, reject => {
      })
    },
    async submit () {
      let name = this.name
      let img = this.imageUrl1

      //需要验证的数据
      let validataArr = [
        {'val': name, 'type': 'isnull', 'name': '转账人'},
        {'val': img, 'type': 'isnull', 'name': '转账截图'},
      ]

      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      })
      //获取数据
      let data = await this.ajax({
        url: `SellerCenterInterface/addBlackList?tk=${sessionStorage.token}`,
        data: {name, img},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
    },
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize
      var end = start + this.pageSize
      this.dataList = this.bankList.slice(start, end)
    }
  },
  filters: {
    typeFilter (str) {
      switch (str) {
        case '1':
          return '充值押金'
          break
        case '2':
          return '充值金币'
          break
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/orderappeal.css';
@import '../../assets/css/orderappeal/addappeal.css';
.right_information {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #999;
}
</style>
