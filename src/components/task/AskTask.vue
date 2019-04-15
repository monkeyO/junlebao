<template>
  <div class="ask_task">
    <Header :active=4></Header>
    <div class='box con-box w1200'>
      <el-row>
        <el-col :span="24">
          <!-- banner -->
          <div class="banner"></div>

          <div class='taskStep'>
            <div class="taskStep_title">
              <h2>第<span>1</span>步: 填写商品信息</h2>
            </div>
            <div class="taskStep_content taskStep_content_first">
              <!-- 选择平台 -->
              <el-row id="choose_pt">
                <el-col :span="3">
                  <img src="@/assets/img/task/task_xzpt.png" alt="">
                  <span>选择平台：</span>
                </el-col>
                <el-col :span="2" v-for="(item,index) of shopTypeList" @click.native="chooseitem('shopType',item.val)" :class="shopType==item.val?'active_choose':''" :key="index">
                  <span v-if="item.id==1" class="pctype pctypetb" :class="shopType=='tb'?'active':''"></span>
                  <span v-if="item.id==2" class="pctype pctypetm" :class="shopType=='tm'?'active':''"></span>
                  <span>{{item.name}}</span>
                </el-col>
              </el-row>
              <!-- 选择店铺 -->
              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_xzdp.png" alt="">
                  <span>选择店铺：</span>
                </el-col>
                <el-col :span="21" class='shop-col'>
                  <div v-for="(item,index) of getShopList"
                        @click="chooseitem('shopName',item.id)"
                        :class="shopName==item.id?'active_choose':''"
                        :key="index+1.2"  style="text-align: center;float:left;padding:0 10px;min-width:10%"
                        >
                    <span>{{item.shopname}}</span>
                  </div>
                  <el-col :span="3">
                    <router-link to="/personal?active=shop&showAddShop=addshop">
                      <span>+绑定新店铺</span>
                    </router-link>
                  </el-col>
                </el-col>
              </el-row>
              <!-- 任务渠道 -->
              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_rwqd.png" alt="">
                  <span>任务渠道：</span>
                </el-col>
                <el-col :span="3" @click.native="chooseitem('channel','1')" :class="channel=='1'?'active_choose':''">
                  <!-- 待替换图片 -->
                  <img src="@/assets/img/task/task_wxd.png" alt="">
                  <span>无线端任务</span>
                </el-col>
                <el-col :span="3" class='reject'>
                  <img src="@/assets/img/task/task_pcrw.png" alt="">
                  <span>PC端任务</span>
                  <img src="@/assets/img/task/jjsx.png" alt="" id='jjsx'>
                </el-col>
              </el-row>

              <!-- 立返货返 -->
              <!-- <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_hffs.png" alt="">
                  <span>返款方式：</span>
                </el-col>
                <el-col :span="3" @click.native="chooseitem('backtype','1')" :class="backtype=='1'?'active_choose':''">
                  <span class="pctype pctypelf" :class="backtype=='1'?'active':''"></span>
                  <span>本金立返</span>
                  <div class='f'><span>仅需8元起</span></div>
                </el-col>
                <el-col :span="3" :offset="1" @click.native="chooseitem('backtype','2')" :class="backtype=='2'?'active_choose':''">
                  <span class="pctype pctypehf" :class="backtype=='2'?'active':''"></span>
                  <span>本金货返</span>
                  <div class='f'><span>比立返每单多三元</span></div>
                </el-col>
              </el-row> -->

              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_splj.png" alt="">
                  <span>商品链接：</span>
                </el-col>
                <el-col :span="9" class="input_margin_top">
                  <el-input v-model="itemurl" placeholder="请输入内容" @change="checkurl"></el-input>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_spbt.png" alt="">
                  <span>商品标题：</span>
                </el-col>
                <el-col :span="9" class="input_margin_top">
                  <el-input v-model="itemtitle" placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
              <!-- 主图 -->
              <el-row style="height: 115px;">
                <el-col :span="3">
                  <img src="@/assets/img/task/task_spzt.png" alt="">
                  <span style='vertical-align: middle;'>商品主图：</span>
                </el-col>
                <el-col :span="2" class="image_margin">
                  <input type="file" class="uploadInput" @change="uploadimg('imageUrl1', 'upload', 'uploadimg')" id="upload">
                  <img src="/static/img/bg.png" id="uploadimg">
                </el-col>
                <el-col :span="2" class="image_margin">
                  <input type="file" class="uploadInput" @change="uploadimg('imageUrl2','upload1','uploadimg1')" id="upload1">
                  <img src="/static/img/bg.png" id="uploadimg1">
                </el-col>
                <el-col :span="8" :offset="1" class="p_explain_img color-red reject">
                  <p>第2张为长图，没有可不传。</p>
                  <p>请上传图片尺寸为800x800以内，且文件不能大于2M，格式为：jpg、png；以便买手找到商品。</p>
                  <p>上传的主图请避免与其他店铺商家的主图相似，以便保证买手能进入正确的店铺并完成任务。</p>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_dpsj.png" alt="">
                  <span>单品售价：</span>
                </el-col>
                <el-col :span="3" class="input_margin_top">
                  <el-input-number v-model="price" :min="0" :precision="2" :step="1"></el-input-number>
                </el-col>
              </el-row>
              <el-row style="height: 135px; border-bottom: 0;">
                <el-col :span="3">
                  <img src="@/assets/img/task/task_bz.png" alt="">
                  <span>下单备注：</span>
                </el-col>
                <el-col :span="15">
                  <el-input type="textarea" :rows="6" placeholder="" v-model="orderRemark"></el-input>
                </el-col>
              </el-row>

            </div>
          </div>
          <!-- 选择任务类型 -->
          <div class='taskStep'>
            <div class="taskStep_title">
              <h2>第<span>2</span>步: 选择任务类型</h2>
            </div>
            <div class="taskStep_content_ask">
              <!-- 评价点赞 -->
              <el-row style="margin-bottom: 15px;">
                <el-col :span="6">
                  <el-checkbox v-model="evaluation">安排买手在商品问大家评价点赞</el-checkbox>
                </el-col>
                <el-col :span="18" class="color-red">
                  选择此服务，买手将在淘宝问大家按要求进行评价点赞
                </el-col>
              </el-row>
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <span style="margin-right: 40px;">查看买手如何点赞评价</span>如果您未了解问大家评价点赞的规则，请先查看该教程
                  </template>
                  <el-row class="figure_img">
                    <el-col :span="7" style="margin-left: 24px;">
                      <h3>1.点击进入问大家</h3>
                      <img src="@/assets/img/task/evaluation_img_1.png" alt="" class="img_width">
                    </el-col>
                    <el-col :span="7" :offset="1">
                      <h3>2.找到需要评价点赞的问题</h3>
                      <img src="@/assets/img/task/evaluation_img_2.png" alt="" class="img_width">
                    </el-col>
                    <el-col :span="7" :offset="1">
                      <h3>3.按要求进行评价点赞</h3>
                      <img src="@/assets/img/task/evaluation_img_3.png" alt="" class="img_width">
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <div class="title">
                <h2>设置评价点赞的投放计划</h2>
              </div>
              <div class="set_plan_box" style="margin-bottom: 30px;" v-for="(item,index) of tasktype1" :key="index">
                <el-row class="set_btn">
                  <el-col :span="2">任务<span>{{index+1}}</span>：</el-col>
                  <el-col :span="2" style="float: right; margin-left: 20px;margin-right:10px" v-if="tasktype1.length>1">
                    <el-button type="danger" @click="removeList('tasktype1',index)"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除任务</el-button>
                  </el-col>
                  <el-col :span="2" style="float: right;margin-right:10px" v-if="tasktype1.length!=5">
                    <el-button type="danger" @click="addList('tasktype1')"><i class="fa fa-plus-square-o" aria-hidden="true"></i> 添加任务</el-button>
                  </el-col>
                </el-row>
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      <span style="margin-right: 20px;">设置<span class="color-red">无线端评价点赞淘口令</span>进店</span>
                      <span style="color: #4293ff;">如何查看评价点赞的淘口令链接？</span>
                    </template>
                    <el-row class="figure_img">
                      <el-col :span="5" style="margin-left: 24px;">
                        <h4>1.点击进入问大家</h4>
                        <img src="@/assets/img/task/evaluation_img_tkl_1.png" alt="" class="img_width">
                      </el-col>
                      <el-col :span="5" :offset="1">
                        <h4>2.找到需要评价点赞的问题</h4>
                        <img src="@/assets/img/task/evaluation_img_tkl_2.png" alt="" class="img_width">
                      </el-col>
                      <el-col :span="5" :offset="1">
                        <h4>3.按要求进行评价点赞</h4>
                        <img src="@/assets/img/task/evaluation_img_tkl_3.png" alt="" class="img_width">
                      </el-col>
                      <el-col :span="5" :offset="1">
                        <h4>4.分享淘口令</h4>
                        <img src="@/assets/img/task/evaluation_img_tkl_4.png" alt="" class="img_width">
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-row class="set_remind">
                  <el-col :span="24">请设置买手进店评价点赞的淘口令，为了安全性，请您在【手淘App】"未登录"状态下，复制分享出来的淘口令链接</el-col>
                </el-row>
                <el-row class="set_plan_content">
                  <el-col :span="1" style="text-align: center;">
                    <i class="ordinal">1</i>
                  </el-col>
                  <el-col :span="3" class="set_plan_content_color">评价点赞淘口令：</el-col>
                  <el-col :span="8">
                    <el-input v-model="item.liketkl" placeholder="请输入内容"></el-input>
                  </el-col>
                </el-row>
                <el-row class="set_plan_content">
                  <el-col :span="1" style="text-align: center;">
                    <i class="ordinal">2</i>
                  </el-col>
                  <el-col :span="4" class="set_plan_content_color">需要评价点赞的人数：</el-col>
                  <el-col :span="4">
                    <el-input-number v-model="item.likenum" :min="0" ></el-input-number>
                  </el-col>
                  <el-col :span="3" style="margin-left: 10px; font-size: 14px;">
                    人 (<span class="color-red">1</span>金币/单) <span class="color-red" style="margin-left: 10px;">必填</span>
                  </el-col>
                </el-row>
                <el-row class="set_plan_content" style="border-bottom: 0;">
                  <el-col :span="1" style="text-align: center;">
                    <i class="ordinal">3</i>
                  </el-col>
                  <el-col :span="3" class="set_plan_content_color">需要几天内完成：</el-col>
                  <el-col :span="2"><el-radio v-model="item.needday" label="1" @click.native="setObjNum(3,index)">3天</el-radio></el-col>
                  <el-col :span="2" style="position: relative;">
                    <el-radio v-model="item.needday" label="2" @click.native="setObjNum(5,index)">5天</el-radio>
                    <img src="@/assets/img/task/tuijian1.png" alt="" style="position: absolute; top: -7px; left: 30px;">
                  </el-col>
                  <el-col :span="2"><el-radio v-model="item.needday" label="3" @click.native="setObjNum(7,index)">7天</el-radio></el-col>
                  <el-col :span="2"><el-radio v-model="item.needday" label="4" @click.native="setObjNum(0,index)">自定义</el-radio></el-col>
                  <el-col :span="3">
                    <el-input-number v-model="item.customday" :min="0" :disabled="item.needday!='4'" @change="setObjNum('customday',index)"></el-input-number>
                  </el-col>
                  <el-col :span="1" style="margin-left: 10px;">天</el-col>
                  <el-col :span="7" style="font-size: 15px;">
                    系统将分<span>{{item.num}}</span>天随机分配买手接手完成评价点赞任务
                  </el-col>
                </el-row>
              </div>
              <!-- 提问问题 -->
              <el-row style="margin-bottom: 15px;">
                <el-col :span="6">
                  <el-checkbox v-model="problem">安排买手在商品问大家提问问题</el-checkbox>
                </el-col>
                <el-col :span="18" class="color-red">
                  选择此服务，买手将在淘宝问大家按要求进行提问问题
                </el-col>
              </el-row>
              <el-collapse accordion>
                <el-collapse-item>
                  <template slot="title">
                    <span style="margin-right: 40px;">查看买手如何提问问题</span>如果您未了解问大家提问问题的规则，请先查看该教程
                  </template>
                  <el-row class="figure_img">
                    <el-col :span="7" style="margin-left: 24px;">
                      <h3>1.点击进入问大家</h3>
                      <img src="@/assets/img/task/problem_img_1.png" alt="" class="img_width">
                    </el-col>
                    <el-col :span="7" :offset="1">
                      <h3>2.向已买的人提问问题</h3>
                      <img src="@/assets/img/task/problem_img_2.png" alt="" class="img_width">
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <div class="title">
                <h2>设置提问问题淘口令的投放计划</h2>
              </div>
              <div class="set_plan_box">
                <el-row class="set_plan_content">
                  <el-col :span="10">
                    <span class="set_plan_content_color">1.设置提问问题任务数： (2金币/单)</span><span class="color-red" style="margin-left: 10px;">必填</span>
                  </el-col>
                  <el-col :span="12" class="problem_input">
                    <el-col v-for="(item,index) of tasktype2" :key="index">问题{{index+1}}：<el-input v-model="tasktype2[index]" placeholder="请输入内容"></el-input></el-col>
                    <el-col class="set_problem_btn"><el-button type="danger" @click="addList('tasktype2')"><i class="fa fa-plus-square-o" aria-hidden="true"></i> 添加问题</el-button></el-col>
                    <el-col class="set_problem_btn"><el-button type="danger" @click="removeList('tasktype2')"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除问题</el-button></el-col>
                  </el-col>
                </el-row>
                <el-row class="set_plan_content" style="border-bottom: 0;">
                  <el-col :span="3" class="set_plan_content_color" style="width: 14%;">2.需要几天内完成：</el-col>
                  <el-col :span="2"><el-radio v-model="needday2" label="1" @click.native="setNum(3)">3天</el-radio></el-col>
                  <el-col :span="2" style="position: relative;">
                    <el-radio v-model="needday2" label="2" @click.native="setNum(5)">5天</el-radio>
                    <img src="@/assets/img/task/tuijian1.png" alt="" style="position: absolute; top: -7px; left: 30px;">
                  </el-col>
                  <el-col :span="2"><el-radio v-model="needday2" label="3" @click.native="setNum(7)">7天</el-radio></el-col>
                  <el-col :span="2"><el-radio v-model="needday2" label="4" @change="setNum(0)">自定义</el-radio></el-col>
                  <el-col :span="3">
                    <el-input-number v-model="customday2" :min="0" :disabled="needday2!='4'" @change="setNum('customday2')"></el-input-number>
                  </el-col>
                  <el-col :span="1" style="margin-left: 10px;">天</el-col>
                  <el-col :span="7" style="font-size: 15px;">
                    系统将分<span>{{num2}}</span>天随机分配买手接手完成评价点赞任务
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <!-- 费用合计 -->
          <div class='taskStep'>
            <div class="taskStep_title">
              <h2>第<span>3</span>步: 费用合计</h2>
            </div>
            <div class="taskStep_content_total">
              <el-row style="background: #ff908f; color: #fff; padding: 10px 90px; margin-bottom: 10px;">
                <el-col :span="8">分类</el-col>
                <el-col :span="8">费用明细</el-col>
                <el-col :span="8" style='text-align:right;'>合计</el-col>
              </el-row>

              <div class="total_detail">
                <el-row type="flex" align="middle" style="border-bottom:0">
                  <el-col :span="8">任务佣金</el-col>
                  <el-col :span="8">
                    <p>评价点赞：<span>{{1}}金币x{{type1num}}单</span></p>
                    <p>提问问题：<span>{{2}}金币×{{type2num}}单</span></p>
                  </el-col>
                  <el-col :span="8">{{priceSum}}金币</el-col>
                </el-row>
              </div>
              <!-- 合计 -->
              <div class="total_cost">
                <el-row>
                  <el-col :span="6">费用合计</el-col>
                  <el-col :span="4" :offset="14">
                    金币：<span class="color-red">{{priceSum}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="total_submit">
                <el-button type="danger" @click.native="submit()">提交任务信息</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Header from '@/components/public/Header'
// 弹窗\验证
import { Loading, Message, MessageBox } from 'element-ui'
import {validata} from '@/assets/js/util/validata'
import {previewImg} from '@/assets/js/util/imgscript'

export default {
  name: 'AskTask',
  data(){
    return {
      shopTypeList:[       // 模拟接口获取平台类型数据
        {'id':1,val:'tb','name':'淘宝','reg':'.taobao.'},
        {'id':2,val:'tm','name':'天猫','reg':'.tmall.'}
      ],
      shopType: 'tb',        // 店铺类型
      shopName: 0,           // 店铺ID
      getShopList: [],       // 接口返回的店铺信息
      channel: '1',         // 任务渠道
      // backtype: '1',        // 返款方式
      itemurl: '',          // 商品链接
      itemtitle: '',        //商品标题
      goodsdetail: [],      // 接口改的商品详情
      imageUrl1: '',        // 商品主图
      imageUrl2: '',        // 商品主图
      price: '',            // 单品售价
      orderRemark: '',      // 商家备注
      // 第二部分数据
      tasktype1: [{'liketkl':'','likenum':0,'needday':'4','customday':0,'num':0}],  //任务二数组
      evaluation: false,    // 安排买手在商品问大家评价点赞
      problem: false,      // 安排买手在商品问大家提问问题
      tasktype2:[""],     //任务二数组
      needday2: '4',       // 提问问题 - 需要几天内完成
      customday2:'',       //任务二自定义天数
      num2:'',             //任务二分布天数
      // 编辑数据
      editOrderno:'',
      editDatearea:''
    }
  },
  beforeRouteLeave (to, from, next) {
    delete sessionStorage.orderno
    delete sessionStorage.datearea
    delete sessionStorage.reset
    // delete sessionStorage.type
    next()
  },
  components: {
    Header
  },
  async mounted (){
    await this.getShopData(1)
        //如果是编辑就获取数据
    // let orderno = this.$route.query.orderno
    // let datearea = this.$route.query.datearea
    let orderno = sessionStorage.orderno
    let datearea = sessionStorage.datearea
    if(orderno!=undefined && datearea!=undefined){
      // this.editOrderno = window.atob(orderno)
      // this.editDatearea = window.atob(datearea)
      this.editOrderno = orderno
      this.editDatearea = datearea
      this.getinfor(this.editOrderno,this.editDatearea)
    }
  },
  computed: {
    //类型一的单数
    type1num (){
      let sum = 0
      this.tasktype1.forEach(element=>{
        sum+=element.likenum
      })
      return sum
    },
    //类型二的单数
    type2num (){
      let sum = 0
      this.tasktype2.forEach(element=>{
        element!=""?sum++:''
      })
      return sum
    },
    // 总价
    priceSum () {
      return (this.type1num+(this.type2num*2)).toFixed(2)
    }
  },
  methods: {
    chooseitem(item,str){
      this[item] = str
      if(item == "shopType"){
        let id = str=="tb"?'1':'2'
        this.getShopData(id)
        this.shopName = this.$options.data().shopName
      }
    },
    //编辑获取数据
    async getinfor (orderno,datearea){
      let data = await this.ajax({
        url: `PublishInterface/getquestionorder?tk=${sessionStorage.token}`,
        data: {orderno,datearea},
        needAlert: false
      })
      if(!data) return false
      let data1 = data.data.data1
      let data2 = data.data.data2
      let data3 = data.data.data3
      this.shopTypeList.forEach(element=>{
        if(element.id == data1.pctype){
           this.shopType = element.val
        }
      })
      await this.getShopData(data1.pctype)
      this.shopName = data1.shopid
      this.channel = data1.clientype
      this.itemurl = data1.commodityurl
      this.itemtitle = data1.commodityname
      this.goodsdetail = data1.goodsdetail
      this.imageUrl1 = data1.commoditymasterimgurl
      document.getElementById("uploadimg").src = data1.commoditymasterimgurl?data1.commoditymasterimgurl:document.querySelector("#uploadimg").src
      this.imageUrl2 = data1.commoditypcimgurl
      document.getElementById("uploadimg1").src = data1.commoditypcimgurl?data1.commoditypcimgurl:document.querySelector("#uploadimg1").src
      this.price = data1.commodityprice
      this.orderRemark = data1.remark

      if(data2){
        this.evaluation = true
        data2.forEach((element,i) => {
          if(i<data2.length-1){
            this.tasktype1.push({'liketkl':'','likenum':0,'needday':'4','customday':0,'num':0})
          }
          this.tasktype1[i].liketkl = element.taokouling
          this.tasktype1[i].likenum = element.likes_num
          this.tasktype1[i].needday = element.complete
          this.tasktype1[i].customday = element.days
          switch(element.complete){
            case "1":
              this.tasktype1[i].num = 3
            break
            case "2":
              this.tasktype1[i].num = 5
            break
            case "3":
              this.tasktype1[i].num = 7
            break
            case "4":
              this.tasktype1[i].num = element.days
            break
          }
        })
      }

      if(data3){
        this.problem = true
        data3.forEach((element,i) => {
          //循环添加数据
          this.tasktype2.push('')
          this.tasktype2[i] = element.q1
          this.needday2 = element.complete
          this.customday2 = element.days
          switch(element.complete){
            case "1":
              this.num2 = 3
            break
            case "2":
              this.num2 = 5
            break
            case "3":
              this.num2 = 7
            break
            case "4":
              this.num2 = element.days
            break
          }
        })
        //删除最后一个多余的
        this.tasktype2.pop()
      }
    },
    // 获取对应店铺数据
    async getShopData(shopid){
      let data = await this.ajax({
        url: `PublishInterface/shopinfo?tk=${sessionStorage.token}`,
        data: {class:shopid},
        needAlert:false
      })
      if(!data) return false
            // 如果不是vip,并且是task页面(防止未登录强行进入任务页面)， 就跳转去购买页面
      if(data.isvip == 1 && this.$route.fullPath == '/asktask'){
        MessageBox.alert('您还不是会员，请先充值会员',{
          lockScroll: false,
          showClose: false,
          callback: ()=> {
            this.$router.push('/recharge?active=recharge-getvip')
          }
        })
        return false
      }
      // 获取店铺信息
      this.getShopList = data.data
    },
    // 修改商品链接时触发
    async checkurl () {
      let flag = true
      this.shopTypeList.forEach(element=>{
        if(element.val == this.shopType){
          let reg = new RegExp(element.reg);
          if(!reg.test(this.itemurl)){
              Message({
                message: `请输入正确的商品链接`,
                duration: 1500,
                type: 'error',
                showClose:'true'
              })
              this.itemurl = ""
              flag = false
          }
        }
      })
      if(flag){
        let data = await this.ajax({
          url: `Common/getshopdetails?tk=${sessionStorage.token}`,
          data: {'url':this.itemurl,'id':this.shopName}
        })
        if(!data) {
          this.itemurl = ""
          return false
        }
        if(data.data[0]){
          this.imageUrl1 = data.data[0]
          this.itemtitle = decodeURIComponent(data.data[1])
          this.goodsdetail = data.data
          document.querySelector("#uploadimg").src = data.data[0]
        }
      }
    },
    //显示上传图片功能函数
    async uploadimg (item,inputId,imgId,flag=true) {
      let file = document.getElementById(inputId).files[0]
      //成功才会赋值属性
      previewImg (inputId,imgId,flag).then(res=>{
        (async ()=>{
          // 上传图片，返回图片地址
          let formData = new FormData()
          formData.append('file', file)
          // 上传图片数据
          let data = await this.ajax({
            url: `TaskManageInterface/uploadpicture?tk=${sessionStorage.token}`,
            data: formData,
            ContentType: 'multipart/form-data',
            withCredentials: true
          })
          if(!data) return false
          document.getElementById(imgId).src = data.url
          if(typeof item == "string"){
            this[item] = data.url
            this.changeGoodsdetail(data.url)
          }else{
            this[item.name][item.x].imgList[item.y] = data.url
          }
        })()
      },reject=>{
        this[item] = ""
      })
    },
    // 新增数组
    addList (item,length = 5) {
      if(this[item].length < length){
        switch(item){
          case 'tasktype1':
            this[item].push({'liketkl':'','likenum':0,'needday':'4','customday':0,'num':0})
          break;
          case 'tasktype2':
            this[item].push("")
          break;
        }
      }else {
        Message({
          message: `最多只能设置${length}组关键字`,
          duration: 2000,
          showClose: true,
          type: 'error'
        });
      }
    },
    removeList (item,index) {
      if(this[item].length > 1){
        switch(item){
          case 'tasktype1':
            this[item].splice(index, 1)
          break;
          case 'tasktype2':
            this[item].pop()
          break;
        }
      }else {
        Message({
          message: `至少设置1组关键字`,
          duration: 2000,
          showClose: true,
          type: 'error'
        });
      }
    },
    //任务一设置分配天数
    setObjNum(num,index){
      this.$nextTick(()=>{
        if(typeof num == 'string'){
          this.tasktype1[index].num = this.tasktype1[index][num]
        }else{
          this.tasktype1[index].customday = 0
          this.tasktype1[index].num = num
        }
      })
    },
    //任务二设置分配天数
    setNum(num){
      this.$nextTick(()=>{
        if(typeof num == 'string'){
          this.num2 = this[num]
        }else{
          this.customday2 = 0
          this.num2 = num
        }
      })
    },
    //提交函数
    async submit(){
      let pctype = "1"
      // 选择平台数据
      this.shopTypeList.forEach(element=>{
        if(element.val == this.shopType){
          pctype = element.id
        }
      })
      let shopid = this.shopName
      if(shopid == 0){
        Message({
          message: `请先选择店铺`,
          duration: 2000,
          showClose: true,
          type: 'error'
        });
        return false
      }
      let ordertype = 13
      let moneysum = this.priceSum
      let clientype = this.channel
      let commodityurl = this.itemurl
      let commodityname = this.itemtitle
      let goodsdetail = this.goodsdetail
      let commoditymasterimgurl = this.imageUrl1
      let commoditypcimgurl = this.imageUrl2
      let commodityprice = this.price
      let remark = this.orderRemark

      // 需要验证的数据
      let validataArr = [
        {'val': commodityurl, 'type': 'isnull', 'name': '商品链接'},
        {'val': commodityname, 'type': 'isnull', 'name': '商品标题'},
        {'val': commoditymasterimgurl, 'type': 'imgurl', 'name': '商品主图'},
        {'val': commodityprice, 'type': 'minint', 'name': '单品售价'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) return false

      // 订单编号与datearea; 如果是编辑就有这两个数据
      let id = ""
      let datearea = ""
      //reset为1时，是重新发布,不需要传ID参数
      if(sessionStorage.reset != 1){
        id=this.editOrderno
        datearea=this.editDatearea
      }
      let data1={id,datearea,pctype,ordertype,shopid,clientype,commodityurl,commodityname,goodsdetail,commoditymasterimgurl,commoditypcimgurl,commodityprice,remark,moneysum}
      let data2 = []
      //如果没选择就提示先选择
      if(!this.evaluation && !this.problem){
        Message({
          message: `请选择一个需要发布的任务类型`,
          duration: 2000,
          showClose: true,
          type: 'error'
        });
        return false
      }
      //判断如果任务类型一被选中
      if(this.evaluation){
        for(let i=0;i<this.tasktype1.length;i++){
          if(this.tasktype1[i].liketkl==""){
            Message({
              message: `任务${i+1}需要填写淘口令`,
              duration: 2000,
              showClose: true,
              type: 'error'
            });
            return false
          }
          if(this.tasktype1[i].likenum==0){
            Message({
              message: `任务${i+1}需要填写点赞人数`,
              duration: 2000,
              showClose: true,
              type: 'error'
            });
            return false
          }
          if(this.tasktype1[i].needday==4 && this.tasktype1[i].customday==0){
            Message({
              message: `任务${i+1}需要填写完成天数`,
              duration: 2000,
              showClose: true,
              type: 'error'
            });
            return false
          }
          data2.push({'asktype':1,'taokouling':this.tasktype1[i].liketkl,'likes_num':this.tasktype1[i].likenum,'complete':this.tasktype1[i].needday,'days':this.tasktype1[i].customday})
        }
      }else{
        for(let i=0;i<this.tasktype1.length;i++){
          if(this.tasktype1[i].liketkl!=""){
            Message({
              message: `请先勾选任务类型一`,
              duration: 2000,
              showClose: true,
              type: 'error'
            });
            return false
          }
        }
      }
      //判断如果任务类型二被选中
      if(this.problem){
        if(this.needday2==4 && this.customday2==0){
          Message({
            message: `自定义完成天数不能为0`,
            duration: 2000,
            showClose: true,
            type: 'error'
          });
          return false
        }
        for(let i=0;i<this.tasktype2.length;i++){
          if(this.tasktype2[i]==""){
             Message({
              message: `请填写问题${i+1}`,
              duration: 2000,
              showClose: true,
              type: 'error'
            });
            return false
          }
          data2.push({'asktype':2,'complete':this.needday2,'days':this.customday2,'q1':this.tasktype2[i]})
        }
      }else{
        for(let i=0;i<this.tasktype2.length;i++){
          if(this.tasktype2[i]!=""){
            Message({
              message: `请先勾选任务类型二`,
              duration: 2000,
              showClose: true,
              type: 'error'
            });
            return false
          }
        }
      }
      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      });
      // 获取数据
      let data = await this.ajax({
        url: `PublishInterface/putquestionorder?tk=${sessionStorage.token}`,
        data: {data1,data2}
      })
      //遮罩层关闭
      loading.close()
      if(!data) return false
      sessionStorage.type="AS"
      this.$router.push(`/taskpay/${data.data.id}/${data.data.datearea}`)
    }
  }
}
</script>
<style scoped>
@import '../../assets/css/task/index.css';
.f{
    font-size: 10px;
    color: white;
    position: absolute;
    top: -17px;
}
.f span{
    background: #FB7272;
    border-radius: 7px;
    border-bottom-left-radius: 2px;
    padding: 0 5px;
    position: relative;
    right: -116px;
}
.ask_task {
  background: #F0F0F0;
}
.audit_time_title {
  width: 27%;
  line-height: 115px;
  font-size: 24px;
  color: #ff464e;
  text-align: center;
  margin-right: 6%;
}
.audit_explain {
  padding: 20px 15px;
  color: #fff;
  font-size: 16px;
}
.audit_explain p {
  margin-bottom: 5px;
}
.taskStep{
  background: #fff;
  margin-bottom: 30px;
}
.taskStep_title {
  background: #ff464e;
  color: #fff;
  padding: 5px 20px 10px;
  letter-spacing: 2px;
  font-size: 12px;
}
.taskStep_title span {
  font-size: 30px;
}
.taskStep_content_ask {
  padding: 20px;
  font-size: 16px;
}
.figure_img {
  padding-top: 10px;
  text-align: center;
}
.figure_img h3, .figure_img h4 {
  font-size: 18px;
  color: #7d7d7d;
  margin-bottom: 5px;
}
.figure_img h4 {
  font-size: 14px;
}
.title {
  padding-bottom: 20px;
}
.title h2 {
  height: 20px;
  line-height: 20px;
  font-size: 18px;
  letter-spacing: 2px;
  border-left: 4px solid #ff4251;
  padding-left: 15px;
}
.set_plan_box {
  border: 1px solid #cbcbcb;
  line-height: 40px;
}
.set_plan_content {
  padding: 17px 20px;
  border-bottom: 1px dashed #cbcbcb;
  color: #7d7d7d;
}
.set_plan_content_color {
  color: #434343;
  font-weight: bold;
}
.set_remind {
  padding: 0 20px;
  font-size: 14px;
  border-bottom: 1px dashed #d8d8d8;
  color: #7d7d7d;
}
.ordinal {
  font-style: normal;
  padding: 1px 7px;
  border: 1px solid #d9d9d9;
  border-radius: 25px;
}
.set_btn, .set_btn button, .set_problem_btn button {
  padding: 5px 20px;
}
.set_problem_btn {
  padding-left: 55px;
  margin-bottom: 0!important;
}
</style>
