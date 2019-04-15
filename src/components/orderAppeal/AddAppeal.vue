<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList></PersonList>
       <el-col :span="20">
         <!-- 新增申诉 -->
         <div class="add_appeal">
           <!-- 标题 -->
           <div class="add_appeal_title">
             <p>填写申诉信息：</p>
           </div>
           <!-- 表单 -->
           <div class="add_appeal_form">
             <ul>
               <li>
                 <span><span class='color-red'>*</span>店铺名：</span>
                 <el-input placeholder="店铺名（必填）" class="input" v-model="shopname"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>任务编号：</span>
                 <el-input placeholder="任务编号（必填）" class="input" v-model="taskno"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>子任务编号：</span>
                 <el-input placeholder="子任务编号（必填）" class="input" v-model="subTaskno"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>订单编号：</span>
                 <el-input placeholder="订单编号（必填）" class="input" v-model="payorderno"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>买手旺旺号：</span>
                 <el-input placeholder="买手旺旺号（必填）" class="input" v-model="buyerWangwang"></el-input>
               </li>
               <li>
                 <span><span class='color-red'>*</span>申诉类型：</span>
                 <el-select placeholder="请选择申诉类型" style='width:30%;margin-right:2%' v-model="type">
                   <el-option
                     v-for="item in typeList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
               </li>
               <li>
                 <span style="vertical-align: top;"><span class='color-red'>*</span>申诉理由：</span>
                 <el-input type="textarea"  placeholder="请描述清楚" class="input" v-model="reason"></el-input>
               </li>
               <li>
                 <span style="vertical-align: top;"><span class='color-red'>*</span>上传凭证：</span>
                 <div class="upload_img">
                   <input type="file" class="uploadInput" @change="uploadimg('imageUrl1', 'upload', 'uploadimg')" id="upload">
                   <img src="/static/img/bg.png" id="uploadimg">
                 </div>
                 <div class="upload_img" style="margin-left: 25px;">
                   <input type="file" class="uploadInput" @change="uploadimg('imageUrl2','upload1','uploadimg1')" id="upload1">
                   <img src="/static/img/bg.png" id="uploadimg1">
                 </div>
               </li>
               <li style="font-size: 13px; color: #e73c3a;">上传与申诉内容对应的凭证，以便管理员处理，最多2张图片，每张大小不超过500kb</li>
               <li>
                 <span><span class='color-red'>*</span>QQ号码：</span>
                 <el-input placeholder="请输入内容" class="input" style='width:17.5%' v-model="qq"></el-input>
                 <span><span class='color-red'>*</span>手机号码：</span>
                 <el-input placeholder="请输入内容" class="input" style='width:17.5%' v-model="phone"></el-input>
               </li>
               <li>
                 <el-button type="danger" class="btn" @click="submit">提交</el-button>
               </li>
             </ul>
           </div>
         </div>
         <div class="warm_prompt">
           <p style="color: #666;">温馨提示：</p>
           <p>1.申诉单将由卖家填写，提交之后平台客服介入处理</p>
           <p>2.请填写以上内容，必须填写真实，不要胡乱填写，若发现违规者，则此项功能不对其开放</p>
           <p>3.请务必事发当天填写，若出现多返款，未及时阻止淘宝客导致商家扣点等等一些因素，平台概不负责</p>
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
  name: 'addAppeal',
  data () {
    return {
      msg: '添加申诉',
      shopname: ``, //店铺名
      taskno: ``, //任务编号
      subTaskno: ``, //子任务编号
      payorderno: ``, //订单编号
      buyerWangwang: ``, //买手旺旺号
      type: ``, //申诉类型
      typeList: [ //申诉类型基础数据
        {value: '1', label: '让买手申请退款，不放出'},
        {value: '2', label: '让买手申请退款，重拍'},
        {value: '3', label: '让买手申请退款，继续放出'},
        {value: '4', label: '买手私自申请退款'},
        {value: '5', label: '买手使用村淘，淘宝客，拍立淘进店'},
        {value: '6', label: '买手使用信用卡或花呗'},
        {value: '7', label: '任务完成申请退款'},
        {value: '8', label: '实付比填写金额低'},
        {value: '9', label: '其他'}
      ],
      reason: ``, //申诉理由
      imageUrl1: ``, //申请凭证
      imageUrl2: ``, //申诉凭证
      qq: ``, //QQ号码
      phone: `` //手机号码
    }
  },
  components: {
    Header,
    PersonList
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
    //提交订单申诉
    async submit () {
      let shopname = this.shopname
      let taskno = this.taskno
      let sub_taskno = this.subTaskno
      let payorderno = this.payorderno
      let buyer_wangwang = this.buyerWangwang
      let type = this.type
      let reason = this.reason
      let img1 = this.imageUrl1
      let img2 = this.imageUrl2
      let qq = this.qq
      let phone = this.phone

      //需要验证的数据
      let validataArr = [
        {'val': shopname, 'type': 'isnull', 'name': '店铺名'},
        {'val': taskno, 'type': 'isnull', 'name': '任务编号'},
        {'val': sub_taskno, 'type': 'isnull', 'name': '子任务编号'},
        {'val': payorderno, 'type': 'isnull', 'name': '订单编号'},
        {'val': buyer_wangwang, 'type': 'isnull', 'name': '买手旺旺号'},
        {'val': type, 'type': 'isnull', 'name': '申诉类型'},
        {'val': qq, 'type': 'qq', 'name': 'QQ号码'},
        {'val': phone, 'type': 'phone', 'name': '手机号码'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      //申诉类型为9其他时, 申诉理由不能为空
      if (type == '9' && reason == '') {
        Message({
          message: `申诉理由不能为空`,
          duration: 1500,
          type: 'error',
          showClose:'true'
        })
        return false
      }
      //申诉凭证可上传一张, 但不能为空
      if (img1 == '' && img2 == '') {
        Message({
          message: `申诉凭证不能为空`,
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
        url: `SellerCenterInterface/addComplain?tk=${sessionStorage.token}`,
        data: {shopname, taskno, sub_taskno, payorderno, buyer_wangwang, type, reason, img1, img2, qq, phone},
        withCredentials: true
      })
      //遮罩层关闭
      loading.close()

      if(!data) return false
      this.$router.push('/paysuccess?type=appeal')
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/addappeal.css';
</style>
