<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList :active="chooseitem"></PersonList>
       <el-col :span="20">
         <!-- 新增黑名单 -->
         <div class="add_appeal">
           <!-- 标题 -->
           <div class="add_appeal_title">
             <p>添加黑名单</p>
           </div>
           <!-- 表单 -->
           <div class="add_appeal_form">
             <ul>
               <li>
                 <span><span class='color-red'>*</span>买号：</span>
                 <el-input placeholder="买手ID（必填）" class="input" v-model="buyerAccount"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>订单号：</span>
                 <el-input placeholder="订单号（必填）" class="input" v-model="orderId"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>拉黑原因：</span>
                 <el-select placeholder="拉黑原因" style='width:15%;margin-right:2%' v-model="type">
                   <el-option
                     v-for="item in blackList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </li>
               <li>
                 <span style="vertical-align: top;"><span class='color-red'>*</span>填写原因：</span>
                 <el-input type="textarea"  placeholder="请简要说明原因" class="input" v-model="reason"></el-input>
               </li>
               <li>
                 <span style="vertical-align: top;"><span class='color-red'>*</span>上传凭证：</span>
                 <div class="upload_img">
                   <input type="file" class="uploadInput" @change="uploadimg('imageUrl1', 'upload', 'uploadimg')" id="upload">
                   <img src="/static/img/bg.png" id="uploadimg">
                 </div>
               </li>
               <li>
                 <el-button type="danger" class="btn" @click="submit">提交</el-button>
               </li>
             </ul>
           </div>
         </div>
       </el-col>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {previewImg} from '@/assets/js/util/imgscript'
import {validata} from '@/assets/js/util/validata'
import {Loading, Message} from 'element-ui'

export default {
  name: 'blackAppeal',
  data () {
    return {
      msg: '添加黑名单',
      buyerAccount: ``, //买号
      orderId: ``, //订单号
      type: ``, //拉黑原因
      blackList: [ //拉黑原因基础数据
        {value: '1', label: '买号导致降权'},
        {value: '2', label: '私自申请退款'},
        {value: '3', label: '卖家号'},
        {value: '4', label: '其他'}
      ],
      reason: ``, //填写原因
      imageUrl1: `` //拉黑凭证
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
        return 'blacklist'
      } else {
        return active
      }
    }
  },
  methods: {
    //显示上传图片功能函数
    async uploadimg (item,inputId,imgId,flag) {
      // flag === false?'':flag = true
      flag === false?true:'' //不验证图片尺寸
      let file = document.getElementById(inputId).files[0]
      //成功才会赋值属性
      previewImg (inputId,imgId,flag).then(res=>{
        (async ()=>{
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
            needAlert:false
          })
          //遮罩层关闭
          loading.close()
          if(!data) return false
          document.getElementById(imgId).src = data.url
          if(typeof item == "string"){
            this[item] = data.url
          }else{
            this[item.name][item.x].imgList[item.y] = data.url
          }
        })()
      },reject=>{
      })
    },
    //提交黑名单
    async submit () {
      let buyer_account = this.buyerAccount
      let orderid = this.orderId
      let type = this.type
      let reason = this.reason
      let img = this.imageUrl1

      //需要验证的数据
      let validataArr = [
        {'val': buyer_account, 'type': 'isnull', 'name': '买号'},
        {'val': orderid, 'type': 'isnull', 'name': '订单号'},
        {'val': type, 'type': 'isnull', 'name': '拉黑原因'},
        {'val': img, 'type': 'isnull', 'name': '上传凭证'},
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //拉黑原因为4其他时, 填写原因不能为空
      if (type == '4' && reason == '') {
        Message({
          message: `填写原因不能为空`,
          duration: 1500,
          type: 'error',
          showClose:'true'
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
        url: `SellerCenterInterface/addBlackList?tk=${sessionStorage.token}`,
        data: {buyer_account, orderid, type, reason, img},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      this.$router.push('/paysuccess?type=black')
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/addappeal.css';
</style>
