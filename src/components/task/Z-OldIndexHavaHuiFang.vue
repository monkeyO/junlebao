<template>
  <div class='task' @click="cancelErr">
    <Header :active=4></Header>
    <div class='box con-box w1200'>
      <el-row>
        <el-col :span="24">
          <!-- banner -->
          <div class="banner"></div>

          <!-- 填写商品信息 -->
          <div class='taskStep'>
            <div id="jump1"></div>
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
                <el-col :span="2" v-for="(item,index) of shopTypeList" @click.native="chooseitem('shopType',item.val),getBaseData(item.id)" :class="shopType==item.val?'active_choose':''" :key="index+1.1">
                  <span v-if="item.id==1" class="pctype pctypetb" :class="shopType=='tb'?'active':''"></span>
                  <span v-if="item.id==2" class="pctype pctypetm" :class="shopType=='tm'?'active':''"></span>
                  <span v-if="item.id==3" class="pctype pctypejd" :class="shopType=='jd'?'active':''"></span>
                  <span v-if="item.id==4" class="pctype pctypepdd" :class="shopType=='pdd'?'active':''"></span>
                  <span v-if="item.id==5" class="pctype pctypealbb" :class="shopType=='albb'?'active':''"></span>
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
              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_hffs.png" alt="">
                  <span>返款方式：</span>
                </el-col>
                <el-col :span="3" @click.native="chooseitem('backtype','1')" :class="backtype=='1'?'active_choose':''">
                  <!-- 待替换图片 -->
                  <!-- <img src="@/assets/img/task/task_wxd.png" alt=""> -->
                  <span class="pctype pctypelf" :class="backtype=='1'?'active':''"></span>
                  <span>本金立返</span>
                  <div class='f'><span>仅需8元起</span></div>
                </el-col>
                <el-col :span="3" :offset="1" @click.native="chooseitem('backtype','2')" :class="backtype=='2'?'active_choose':''">
                  <!-- <img src="@/assets/img/task/task_pcrw.png" alt=""> -->
                  <span class="pctype pctypehf" :class="backtype=='2'?'active':''"></span>
                  <span>本金货返</span>
                  <div class='f'><span>比立返每单多三元</span></div>
                </el-col>
                <div id="jump2"></div>
              </el-row>

              <el-row>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_splj.png" alt="">
                  <span>商品链接：</span>
                </el-col>
                <el-col :span="9" class="input_margin_top">
                  <el-input v-model="itemurl" placeholder="请输入内容" @change="checkurl" id="itemurl"></el-input>
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
                <el-col :span="3" :offset="1" style="border-left: 1px solid #ccc; padding-left: 50px;">
                  <img src="@/assets/img/task/task_mdp.png" alt="">
                  <span>每单拍：</span>
                </el-col>
                <el-col :span="3" class="input_margin_top">
                  <el-input-number v-model="count" :min="0" ></el-input-number>
                </el-col>
                <el-col :span="7" class="p_explainv reject">
                  <p>(件)（出于安全，建议每单不要超过2件）</p>
                </el-col>
              </el-row>
              <!-- 展示价格 -->
              <el-row>
                <el-col :span="4" style="width: 15%;">
                  <img src="@/assets/img/task/task_ssjg.png" alt="">
                  <span>搜索页面展示价格：</span>
                </el-col>
                <el-col :span="3" class="input_margin_top" style='margin-top: 0'>
                  <el-input-number v-model="showPrice" :min="0"  size="small" :precision="2" :step="1"></el-input-number>
                </el-col>
                <el-col :span="10" class="p_explain reject">
                  <p>非必填(如该商品有满减、促销、多价格等情况，请填写此金额)</p>
                </el-col>
              </el-row>
              <el-row v-if="shopType == 'pdd'">
                <el-col :span="3">
                  <img src="@/assets/img/task/task_zfyq.png" alt="">
                  <span>支付要求：</span>
                </el-col>
                <el-col :span="9" class="p_explain">
                    <el-radio v-model="pddCheckList" label="1" @click.native="cancelRadio($event,'pddCheckList')">单独购买</el-radio>
                    <el-radio v-model="pddCheckList" label="2" @click.native="cancelRadio($event,'pddCheckList')">拼单购买</el-radio>
                </el-col>
              </el-row>
              <el-row v-else>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_zfyq.png" alt="">
                  <span>支付要求：</span>
                </el-col>
                <el-col :span="9" class="p_explain">
                    <el-checkbox label="1" v-model="buytypecoupon">允许使用优惠券</el-checkbox>
                    <el-checkbox label="2" v-model="buytypecard">允许使用信用卡</el-checkbox>
                    <el-checkbox label="3" v-model="buytype">{{shopType=='jd'?'允许使用白条':'允许使用花呗'}}</el-checkbox>
                </el-col>
                <el-col :span="10" class="p_explain reject" style='margin-top: -2px;'>
                  <img src="@/assets/img/task/task_zfyqjg.png" alt="" style="vertical-align: middle;">
                  <span class='color-fd5856'>(使用信用卡、{{shopType=='jd'?'白条':'花呗'}}支付手续费商家自行承担)</span>
                </el-col>
              </el-row>

              <el-row class="row_height">
                <el-col :span="3" style="width: 12%;">
                  <img src="@/assets/img/task/task_sfsqfs.png" alt="">
                  <span>收费收取方式：</span>
                </el-col>
                <el-col :span="20" class="p_explain input_margin_top">
                  <p>
                    <el-radio v-model="baoyoustate" label="1">产品不包邮</el-radio>
                    <span class='reject radio-span'>无需买手联系客服。商家每单额外支付<span style="color: #fd5856; font-weight: bold;">10元</span>作为运费押金，任务完成后运费押金将全部退还给商家</span>
                  </p>
                  <div class="underline"></div>
                  <p>
                    <el-radio v-model="baoyoustate" label="2">产品本身包邮</el-radio>
                    <span class='reject radio-span'>买手按照商品实际金额下单</span>
                  </p>
                </el-col>
              </el-row>


              <el-row style="height: 135px; border-bottom: 0;">
                <el-col :span="3">
                  <img src="@/assets/img/task/task_bz.png" alt="">
                  <span>下单备注：</span>
                </el-col>
                <el-col :span="15">
                  <el-input type="textarea" :rows="6" placeholder="可备注买手下单规格/颜色等事宜，该备注不作为强制买手必须完成的任务" v-model="orderRemark"></el-input>
                </el-col>
              </el-row>

            </div>
          </div>

          <!-- 选择进店渠道 -->
          <div class='taskStep'>
            <div id="jump3"></div>
            <div class="taskStep_title">
              <h2>第<span>2</span>步: 选择进店渠道</h2>
            </div>
            <div class="taskStep_content" style="padding-top: 10px;">
              <img src="@/assets/img/task/tuijian.png" alt="" style="margin-left: 129px;" v-if="shopType=='tb'||shopType=='tm'">
              <img src="@/assets/img/task/peihe.png" alt="" :style="shopType=='tb'||shopType=='tm'?'':'margin-left: 129px'">
              <!-- 标签页导航 -->
              <el-tabs v-model="activeName" type="card"  @tab-click="changeTabs">
                <el-tab-pane label="关键字" name="first" dataid="1">
                  <div class="remind">
                    <p>买家通过商家提供的关键词，使用手机淘宝APP自然搜索入店，完成浏览、收藏、加购、领取优惠券，通过指定的渠道完成下单</p>
                    <p>选择此任务类型，可根据商品数据控制每日转化，适合大部分类目，推荐选择</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>
                  <div class="set_keyword_table">
                    <el-row class="set_keyword_th">
                      <el-col :span="3" :offset="15">
                        设置关键字：<span class="color-orange">{{keywordArr.length}}</span>组
                      </el-col>
                      <el-col :span="3">
                        设置下单数：<span class="color-orange">{{keywordSum}}</span>组
                      </el-col>
                      <el-col :span="3">
                        <span class='pointer color-fd5856' @click='addkeyword'>+新增关键字</span>
                      </el-col>
                    </el-row>
                    <el-row class="set_keyword_table_title">
                      <el-col :span="5">流量入口</el-col>
                      <el-col :span="5">关键字</el-col>
                      <el-col :span="4">下单数</el-col>
                      <el-col :span="5">添加筛选条件(非必填)</el-col>
                      <el-col :span="5">操作</el-col>
                    </el-row>
                    <el-row class="set_keyword_table_content" v-for="(i, index) in keywordArr" :key="index">
                      <el-col :span="5">
                        <el-select v-model="i.value" placeholder="请选择">
                          <el-option v-for="item in i.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="i.keyword" placeholder="请输入关键字"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-input-number v-model="i.num" :min="0" label="下单数量" @input="checkint(index)"></el-input-number>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="warning" @click="i.setKeywordDialog = true">设置</el-button>
                        <KeyDialog :data="{obj:i,index,getDiscount,getKorder}" @dialog="dialogData" v-if="i.setKeywordDialog"></KeyDialog>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="danger" @click='removekeyword(index)'>删除</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="关键字(凌晨单)" name="second" v-if="shopType=='tb'||shopType=='tm'" dataid="2">
                  <div class="remind">
                    <p>买家通过商家提供的关键词，使用手机淘宝APP自然搜索入店完成下单</p>
                    <p>此任务类型推荐急需提升销量或补单的商家选择，适合全品类</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                  <div class="set_keyword_table">
                    <el-row class="set_keyword_th">
                      <el-col :span="3" :offset="15">
                        设置关键字：<span class="color-orange">{{keywordArr.length}}</span>组
                      </el-col>
                      <el-col :span="3">
                        设置下单数：<span class="color-orange">{{keywordSum}}</span>组
                      </el-col>
                      <el-col :span="3">
                        <span class='pointer color-fd5856' @click='addkeyword'>+新增关键字</span>
                      </el-col>
                    </el-row>
                    <el-row class="set_keyword_table_title">
                      <el-col :span="5">流量入口</el-col>
                      <el-col :span="5">关键字</el-col>
                      <el-col :span="4">下单数</el-col>
                      <el-col :span="5">添加筛选条件(非必填)</el-col>
                      <el-col :span="5">操作</el-col>
                    </el-row>
                    <el-row class="set_keyword_table_content" v-for="(i, index) in keywordArr" :key="index">
                      <el-col :span="5">
                        <el-select v-model="i.value" placeholder="请选择">
                          <el-option v-for="item in i.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="i.keyword" placeholder="请输入关键字"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-input-number v-model="i.num" :min="0" label="下单数量"></el-input-number>
                      </el-col>
                      <el-col :span="5" v-if="activeName=='second'">
                        <el-button type="warning" @click="i.setKeywordDialog = true">设置</el-button>
                        <KeyDialog :data="{obj:i,index,getDiscount,getKorder}" @dialog="dialogData" v-if="i.setKeywordDialog"></KeyDialog>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="danger" @click='removekeyword(index)'>删除</el-button>
                      </el-col>
                    </el-row>
                    <!-- 凌晨单特有数据 -->
                    <el-row class='lingchendan'>
                      <img src="@/assets/img/common/alarm.jpg" alt="">
                      <span style='padding-right:5px'>设置凌晨单发放时间</span>
                        <el-date-picker
                          style="width:13%"
                          v-model="linchenDate"
                          type="date"
                          size="small"
                          :editable="false"
                          :picker-options="{disabledDate: time => time < new Date()}"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                        </el-date-picker>
                        <el-time-select
                          style="width:10%"
                          v-model="startLinchen"
                          :editable="false"
                          size="small"
                          placeholder="起始时间"
                          @change="endLinchen=''"
                          :picker-options="{start: '00:00', step: '01:00', end: '8:00'}">
                        </el-time-select>
                        <span>——</span>
                        <el-time-select
                          style="width:10%"
                          v-model="endLinchen"
                          :editable="false"
                          size="small"
                          placeholder="结束时间"
                          :picker-options="{start: '00:00', step: '01:00', end: '8:00', minTime: startLinchen}">
                        </el-time-select>
                      <span style='padding:0 40px 0 5px'>放的单数会在这个时间段内平均发布出去</span>
                      <el-checkbox v-model="bindDate">到点取消任务</el-checkbox>
                    </el-row>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="关键字(人气)" name="third"  dataid="3">
                  <div class="remind">
                    <p>买家通过商家提供的关键词，使用手机淘宝APP自然搜索入店完成下单</p>
                    <p>此任务类型推荐急需提升销量或补单的商家选择，适合全品类</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                  <div class="set_keyword_table">
                    <el-row class="set_keyword_th">
                      <el-col :span="3" :offset="18">
                        设置关键字：<span class="color-orange">{{keywordArr.length}}</span>组
                      </el-col>
                      <el-col :span="3">
                        <span class='pointer color-fd5856' @click='addkeyword'>+新增关键字</span>
                      </el-col>
                    </el-row>

                    <el-row class="set_keyword_table_title">
                      <el-col :span="6">流量入口</el-col>
                      <el-col :span="6">关键字</el-col>
                      <el-col :span="6">添加筛选条件(非必填)</el-col>
                      <el-col :span="6">操作</el-col>
                    </el-row>

                    <el-row class="set_keyword_table_content" v-for="(i, index) in keywordArr" :key="index">
                      <el-col :span="6">
                        <el-select v-model="i.value" placeholder="请选择">
                          <el-option v-for="item in i.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="6">
                        <el-input v-model="i.keyword" placeholder="请输入关键字"></el-input>
                      </el-col>
                      <el-col :span="6" v-if="activeName=='third'">
                        <el-button type="warning" @click="i.setKeywordDialog = true">设置</el-button>
                        <KeyDialog :data="{obj:i,index,getDiscount,getKorder}" @dialog="dialogData" v-if="i.setKeywordDialog"></KeyDialog>
                      </el-col>
                      <el-col :span="6">
                        <el-button type="danger" @click='removekeyword(index)'>删除</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="回访" name="fourth" v-if="shopType=='tb'||shopType=='tm'||shopType=='jd'"  dataid="4">
                  <div class="remind">
                    <p>买家首日通过手机淘宝APP商家提供的任务关键字搜索入店，并完成首日的浏览、收藏、加购等首日任务</p>
                    <p>次日通过足迹、收藏夹、购物车等渠道进行回访，完成第二天商家设置的任务内容后下单</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                  <div class="set_keyword_table">
                    <el-row class="set_keyword_th">
                      <el-col :span="3" :offset="18">
                        设置关键字：<span class="color-orange">{{keywordArr.length}}</span>组
                      </el-col>
                      <el-col :span="3">
                        <span class='pointer color-fd5856' @click='addkeyword'>+新增关键字</span>
                      </el-col>
                    </el-row>

                    <el-row class="set_keyword_table_title">
                      <el-col :span="6">流量入口</el-col>
                      <el-col :span="6">关键字</el-col>
                      <el-col :span="6">添加筛选条件(非必填)</el-col>
                      <el-col :span="6">操作</el-col>
                    </el-row>

                    <el-row class="set_keyword_table_content" v-for="(i, index) in keywordArr" :key="index">
                      <el-col :span="6">
                        <el-select v-model="i.value" placeholder="请选择">
                          <el-option v-for="item in i.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="6">
                        <el-input v-model="i.keyword" placeholder="请输入关键字"></el-input>
                      </el-col>
                      <el-col :span="6" v-if="activeName=='fourth'">
                        <el-button type="warning" @click="i.setKeywordDialog = true">设置</el-button>
                        <KeyDialog :data="{obj:i,index,getDiscount,getKorder}" @dialog="dialogData" v-if="i.setKeywordDialog"></KeyDialog>
                      </el-col>
                      <el-col :span="6">
                        <el-button type="danger" @click='removekeyword(index)'>删除</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <!-- 京东专属渠道 -->
                <el-tab-pane label="京东快车" name="fifth-x" v-if="shopType=='jd'"  dataid="10">
                  <div class="remind" style="padding:35px;">
                    <p>买家通过商家提供的关键词，通过手机淘宝APP搜索直通车入店，完成浏览、收藏、加购、领取优惠券等操作后下单</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                   <div class="set_keyword_table">
                    <el-row class="set_keyword_th">
                      <el-col :span="3" :offset="15">
                        设置关键字：<span class="color-orange">{{keywordArr.length}}</span>组
                      </el-col>
                      <el-col :span="3">
                        设置下单数：<span class="color-orange">{{keywordSum}}</span>组
                      </el-col>
                      <el-col :span="3">
                        <span class='pointer color-fd5856' @click='addkeyword'>+新增关键字</span>
                      </el-col>
                    </el-row>
                    <el-row class="set_keyword_table_title">
                      <el-col :span="5">流量入口</el-col>
                      <el-col :span="5">关键字</el-col>
                      <el-col :span="4">下单数</el-col>
                      <el-col :span="5">添加筛选条件(非必填)</el-col>
                      <el-col :span="5">操作</el-col>
                    </el-row>
                    <el-row class="set_keyword_table_content" v-for="(i, index) in keywordArr" :key="index">
                      <el-col :span="5">
                        <el-select v-model="i.value" placeholder="请选择">
                          <el-option v-for="item in i.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="i.keyword" placeholder="请输入关键字"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-input-number v-model="i.num" :min="0" label="下单数量"></el-input-number>
                      </el-col>
                      <el-col :span="5" v-if="activeName=='fifth-x'">
                        <el-button type="warning" @click="i.setKeywordDialog = true">设置</el-button>
                        <KeyDialog :data="{obj:i,index,getDiscount,getKorder}" @dialog="dialogData" v-if="i.setKeywordDialog"></KeyDialog>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="danger" @click='removekeyword(index)'>删除</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <!-- 天猫淘宝直通车 -->
                <el-tab-pane label="直通车" name="fifth" v-if="shopType=='tb'||shopType=='tm'"  dataid="5">
                  <div class="remind" style="padding:35px;">
                    <p>买家通过商家提供的关键词，通过手机淘宝APP搜索直通车入店，完成浏览、收藏、加购、领取优惠券等操作后下单</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                   <div class="set_keyword_table">
                    <el-row class="set_keyword_th">
                      <el-col :span="3" :offset="15">
                        设置关键字：<span class="color-orange">{{keywordArr.length}}</span>组
                      </el-col>
                      <el-col :span="3">
                        设置下单数：<span class="color-orange">{{keywordSum}}</span>组
                      </el-col>
                      <el-col :span="3">
                        <span class='pointer color-fd5856' @click='addkeyword'>+新增关键字</span>
                      </el-col>
                    </el-row>
                    <el-row class="set_keyword_table_title">
                      <el-col :span="5">流量入口</el-col>
                      <el-col :span="5">关键字</el-col>
                      <el-col :span="4">下单数</el-col>
                      <el-col :span="5">添加筛选条件(非必填)</el-col>
                      <el-col :span="5">操作</el-col>
                    </el-row>
                    <el-row class="set_keyword_table_content" v-for="(i, index) in keywordArr" :key="index">
                      <el-col :span="5">
                        <el-select v-model="i.value" placeholder="请选择">
                          <el-option v-for="item in i.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="i.keyword" placeholder="请输入关键字"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-input-number v-model="i.num" :min="0" label="下单数量"></el-input-number>
                      </el-col>
                      <el-col :span="5" v-if="activeName=='fifth'">
                        <el-button type="warning" @click="i.setKeywordDialog = true">设置</el-button>
                        <KeyDialog :data="{obj:i,index,getDiscount,getKorder}" @dialog="dialogData" v-if="i.setKeywordDialog"></KeyDialog>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="danger" @click='removekeyword(index)'>删除</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <!-- 拼多多专属渠道 -->
                <el-tab-pane label="直接访问" name="sixth-x" v-if="shopType=='pdd'"  dataid="11">
                  <div class="remind" style="padding:35px; margin-bottom: 25px;">
                    <p>买家通过商家分享的商品链接入店，完成浏览、收藏商品、店铺等任务后下单</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                  <div class="taskStep_content_first">
                    <el-row>
                      <el-col :span="3" style="width: 12%;">
                        <img src="@/assets/img/task/task_splj.png" alt="">
                        <span>进店链接：</span>
                      </el-col>
                      <el-col :span="12" class="input_margin_top">
                        <el-input v-model="tkltkl" placeholder="" ></el-input>
                      </el-col>
                    </el-row>
                    <el-row style="border-bottom: 0; margin-bottom: 0; padding-bottom: 5px;">
                      <el-col :span="3" style="width: 12%;">
                        <span class="color-red">*</span><span>下单人数：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-input-number v-model="setAmount" :min="0"  label="下单人数" ></el-input-number>
                      </el-col>
                      <el-col :span="2" class='reject'>
                        <span>人</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <!-- 阿里巴巴专属渠道 -->
                <el-tab-pane label="阿里口令" name="sixth-y" v-if="shopType=='albb'"  dataid="12">
                  <div class="remind" style="padding:35px; margin-bottom: 25px;">
                    <p>买家通过商家分享的阿里口令入店，买家确认收货后，会根据商家的要求进行好评等操作</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                  <div class="taskStep_content_first">
                    <el-row>
                      <el-col :span="3" style="width: 12%;">
                        <img src="@/assets/img/task/task_splj.png" alt="">
                        <span>阿里口令：</span>
                      </el-col>
                      <el-col :span="12" class="input_margin_top">
                        <el-input v-model="tkltkl" placeholder="请输入淘口令" ></el-input>
                      </el-col>
                    </el-row>
                    <el-row style="border-bottom: 0; margin-bottom: 0; padding-bottom: 5px;">
                      <el-col :span="3" style="width: 12%;">
                        <span class="color-red">*</span><span>下单人数：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-input-number v-model="setAmount" :min="0"  label="下单人数" ></el-input-number>
                      </el-col>
                      <el-col :span="2" class='reject'>
                        <span>人</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="淘口令" name="sixth" v-if="shopType=='tb'||shopType=='tm'"  dataid="6">
                  <div class="remind" style="padding:35px; margin-bottom: 25px;">
                    <p>买家通过商家分享的商品链接入店，完成浏览、收藏商品、店铺等任务后下单</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>

                  <div class="taskStep_content_first">
                    <el-row>
                      <el-col :span="3" style="width: 12%;">
                        <img src="@/assets/img/task/task_splj.png" alt="">
                        <span>进店淘口令：</span>
                      </el-col>
                      <el-col :span="12" class="input_margin_top">
                        <el-input v-model="tkltkl" placeholder="请输入淘口令" ></el-input>
                      </el-col>
                    </el-row>
                    <el-row style="border-bottom: 0; margin-bottom: 0; padding-bottom: 5px;">
                      <el-col :span="3" style="width: 12%;">
                        <span class="color-red">*</span><span>下单人数：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-input-number v-model="setAmount" :min="0"  label="下单人数" ></el-input-number>
                      </el-col>
                      <el-col :span="2" class='reject'>
                        <span>人</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="二维码" name="seventh" v-if="shopType=='tb'||shopType=='tm'"  dataid="7">
                  <div class="remind">
                    <p>买家通过商家提供的二维码图片，从手淘APP通过扫一扫二维码找到商品，之后完成下单等操作</p>
                    <p>确认收货后，会根据商家提供的好评关键词进行评价，有利于提升销量权重</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>
                  <div class="qrcode">
                    <div class="qrcode_item">
                      <span>进店二维码：</span>
                      <!-- <img src="@/assets/img/task/bg1.png" alt=""> -->
                      <el-col :span='3' class="image_margin">
                        <input type="file" class="uploadInput" @change="uploadimg('tbqrfile', 'tbqr', 'tbqrimg', false)" id="tbqr" >
                        <img src="/static/img/bg.png" id="tbqrimg">
                      </el-col>
                    </div>
                    <div class="qrcode_item">
                      <span>下单人数：</span>
                      <el-input-number v-model="setAmount" :min="0"  size="small"></el-input-number>
                      <span style="margin-left: 10px;"> 人</span>
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="淘抢购" name="eighth" v-if="shopType=='tb'||shopType=='tm'"  dataid="8">
                  <div class="remind" style="padding:35px; margin-bottom: 25px;">
                    <p>买家通过商家分享的淘口令入店，完成深度浏览后下单，适合全品类</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>
                  <div class="taskStep_content_first">
                    <el-row>
                      <el-col :span="3" style="width: 13%;">
                        <span class="color-red">*</span>
                        <span>淘抢购类型：</span>
                      </el-col>
                      <el-col :span="18" style="text-align: left;">
                        <el-radio v-model="tqgType" label="1">淘抢购</el-radio>
                        <el-radio v-model="tqgType" label="2">即将售馨</el-radio>
                        <el-radio v-model="tqgType" label="3">围观抢</el-radio>
                        <el-radio v-model="tqgType" label="4">爆款返场</el-radio>
                        <el-radio v-model="tqgType" label="5">品牌抢购</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3" style="width: 13%;">
                        <span class="color-red">*</span>
                        <span>进店淘口令：</span>
                      </el-col>
                      <el-col :span="8" class="input_margin_top">
                        <el-input v-model="tkltkl" placeholder="请输入淘口令"></el-input>
                      </el-col>
                      <el-col :span="2" :offset="1">
                        <span class="color-red">*</span>
                        <span>下单人数：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-input-number v-model="setAmount" :min="0" ></el-input-number>
                      </el-col>
                      <el-col :span="1">
                        <span style='margin-left:10px'>人</span>
                      </el-col>
                    </el-row>
                    <el-row style="border-bottom: 0; margin-bottom: 0; padding-bottom: 5px;">
                      <el-col :span="3" style="width: 13%;">
                        <span class="color-red">*</span>
                        <span>淘抢购所在场次：</span>
                      </el-col>
                      <el-col :span="8" class="input_margin_top">
                        <el-date-picker v-model="jhsdatetime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"></el-date-picker>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>

                <el-tab-pane label="聚划算" name="ninth" v-if="shopType=='tb'||shopType=='tm'"  dataid="9">
                  <div class="remind" style="padding:35px; margin-bottom: 25px;">
                    <p>买家通过商家分享的淘口令入店，完成深度浏览后下单，适合全品类</p>
                    <p style="color:red;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</p>
                  </div>
                  <div class="taskStep_content_first">
                    <el-row>
                      <el-col :span="3" style="width: 12%;">
                        <img src="@/assets/img/task/task_splj.png" alt="">
                        <span>进店淘口令：</span>
                      </el-col>
                      <el-col :span="8" class="input_margin_top">
                        <el-input v-model="tkltkl" placeholder="请输入淘口令"></el-input>
                      </el-col>
                      <el-col :span="3" class='reject'>
                        <span class="color-red">*</span>
                        <span>聚划算类型：</span>
                      </el-col>
                      <el-col :span="8" style="text-align: left;">
                        <el-radio v-model="jhstype" label="1" style='margin-right:0'>今日</el-radio>
                        <el-radio v-model="jhstype" label="2" style='margin-right:0'>品牌</el-radio>
                        <el-radio v-model="jhstype" label="3" style='margin-right:0'>聚透</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3" style="width: 13%;">
                        <img src="@/assets/img/task/task_splj.png" alt="">
                        <span>聚划算开团时间：</span>
                      </el-col>
                      <el-col :span="8" class="input_margin_top">
                        <el-date-picker v-model="jhsdatetime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" style="width:95%"></el-date-picker>
                      </el-col>
                      <el-col :span="2" class='reject'>
                        <span class="color-red">*</span>
                        <span>下单人数：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-input-number v-model="setAmount" :min="0" ></el-input-number>
                      </el-col>
                      <el-col :span="1">
                        <span style='margin-left:10px'>人</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <!-- 除凌晨单、人气、回访外，其他模式需要有执行天数 -->
              <el-row style="margin-top: 35px;" v-if="activeName != 'second' && activeName != 'third' && activeName != 'fourth'">
                <el-col :span="2.5">
                  执行任务天数：
                </el-col>
                <el-col :span="4" class="input_margin_top">
                  <el-input-number v-model="taskactionday" :min="0" :max="7" :step="1" size="small"></el-input-number>
                </el-col>
                <el-col :span="17" style="margin-left:-35px;color:#666">
                  最多可连续发布7天任务，第二天后的任务时间将按照第一天审核通过的时间来放出
                </el-col>
              </el-row>
            </div>
          </div>
          <!-- 设置投放计划 -->
          <div class='taskStep' v-if="activeName == 'third' || activeName == 'fourth'">
            <div id="jump4"></div>
            <div class="taskStep_title">
              <h2>第<span>{{step}}</span>步: 设置投放计划</h2>
            </div>
            <div class="taskStep_content taskStep_content_first">
              <h3 style="margin-bottom: 20px;">设置访客计划</h3>
              <el-row>
                <el-col :span="3" style="width: 13%;">
                  <img src="@/assets/img/task/task_a.png" alt="">
                  <span>首日到店访客数：</span>
                </el-col>
                <el-col :span="4" class="input_margin_top">
                  <el-input-number v-model="firstdaynum" :min="0" :step="10" label="访客人数" @blur="checkfirstdaynum"></el-input-number>
                </el-col>
                <el-col :span="6" class="plan_margin_left reject">
                  必须为10的整数倍 ({{generalG}}金币/访客)
                </el-col>
                <el-col :span="3">
                  <img src="@/assets/img/task/task_a.png" alt="">
                  <span>任务执行天数：</span>
                </el-col>
                <el-col :span="4" class="input_margin_top plan_margin_left">
                  <el-input-number v-model="taskactionday" :min="0" :max="7" label="执行天数"></el-input-number>
                </el-col>
                <el-col :span="1" class="plan_margin_left reject">
                  天
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="3" style="width: 13%;">
                  <img src="@/assets/img/task/task_a.png" alt="">
                  <span>访客每日增长量：</span>
                </el-col>
                <el-col :span="2">
                  <el-radio v-model="isrise" label="1">不增长</el-radio>
                </el-col>
                <el-col :span="2">
                  <el-radio v-model="isrise" label="2">每日增长</el-radio>
                </el-col>
                <el-col :span="4" class="input_margin_top plan_margin_left">
                  <el-input-number v-model="risenum" :min="0" label="日增长人数" :disabled="risenumFlag"></el-input-number>
                </el-col>
                <el-col :span="1" class="plan_margin_left">
                  人
                </el-col>
              </el-row>

              <h4 style="margin-bottom: 10px;">浏览流量费用计算</h4>
              <el-row class="browse_flow">
                <el-col :span="5">执行天数</el-col>
                <el-col :span="5">首日入店访客 (个)</el-col>
                <el-col :span="4">每日增长量</el-col>
                <el-col :span="6">总计访客量</el-col>
                <el-col :span="4">费用合计</el-col>
              </el-row>

              <el-row class="browse_flow_content">
                <el-col :span="5">{{taskactionday}}</el-col>
                <el-col :span="5">{{firstdaynum}}</el-col>
                <el-col :span="4">{{risenum}}</el-col>
                <el-col :span="6">{{countTask}}</el-col>
                <el-col :span="4"><span>{{countTask}}</span> x <span>{{generalG}}</span> = <span>{{(countTask*generalG).toFixed(2)}}</span></el-col>
              </el-row>

              <h3 style="margin: 20px 0;">设置人气计划</h3>

              <!-- 关键词人气计划 -->
              <template v-if="activeName=='third'">
                <el-row class="popularity_plan">
                  <el-col :span="2" class='reject'>第一天类目</el-col>
                  <el-col :span="2" class='reject'>执行天数</el-col>
                  <el-col :span="4" class='reject'>每日操作数量占比</el-col>
                  <el-col :span="4" class='reject'>选择是否每日增长</el-col>
                  <el-col :span="2" class='reject'>首日数量</el-col>
                  <el-col :span="2" class='reject'>每日数量</el-col>
                  <el-col :span="3" class='reject'>总计访客数量</el-col>
                  <el-col :span="4" class='reject'>费用合计(访客数x单价)</el-col>
                </el-row>
                <!-- <el-row class="popularity_plan_content" v-for="(i,index) in shopType=='jd'?renqiPlanJd:shopType=='pdd'?renqiPlanPdd:renqiPlanTb" :key="index+0.2" v-if='showItem(0,i.title)'> -->
                <el-row class="popularity_plan_content" v-for="(i,index) in renqiPlanArr" :key="index+0.2" v-if='showItem(0,i.type)'>
                  <RenqiPlan :data='{obj:i, taskactionday, firstdaynum, risenum,isrise,day:0}' @getVisitorNum="getVisitorNum"></RenqiPlan>
                </el-row>
                <el-row class="popularity_plan_content" style="border-bottom: 1px solid #999; font-size: 16px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">
                  <el-col :span="4" :offset="19" style="width: 20%;">
                    <span>费用合计：<span class="color-red">{{planPrice}}</span>金币</span>
                  </el-col>
                </el-row>
              </template>
              <!-- 回访人气计划 -->
              <template v-if="activeName=='fourth'">
                <el-row class="popularity_plan">
                  <el-col :span="2" class='reject'>第一天类目</el-col>
                  <el-col :span="2" class='reject'>执行天数</el-col>
                  <el-col :span="4" class='reject'>每日操作数量占比</el-col>
                  <el-col :span="4" class='reject'>选择是否每日增长</el-col>
                  <el-col :span="2" class='reject'>首日数量</el-col>
                  <el-col :span="2" class='reject'>每日数量</el-col>
                  <el-col :span="3" class='reject'>总计访客数量</el-col>
                  <el-col :span="4" class='reject'>费用合计(访客数x单价)</el-col>
                </el-row>
                <!-- <el-row class="popularity_plan_content" v-for="(i,index) in shopType=='jd'?renqiPlanJd:shopType=='pdd'?renqiPlanPdd:renqiPlanTb" :key="index+0.3" v-if='showItem(1,i.title)'> -->
                <el-row class="popularity_plan_content" v-for="(i,index) in renqiPlanArr" :key="index+0.3" v-if='showItem(1,i.type)'>
                  <RenqiPlan :data='{obj:i, taskactionday, firstdaynum, risenum,isrise,day:1}' @getVisitorNum="getVisitorNum"></RenqiPlan>
                </el-row>
                <el-row class="popularity_plan_content" style="border-bottom: 1px solid #999; font-size: 16px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">
                  <el-col :span="4" :offset="19" style="width: 20%;">
                    <span>费用合计：<span class="color-red">{{planPrice1}}</span>金币</span>
                  </el-col>
                </el-row>

                <el-row class="popularity_plan" style='margin-top:10px'>
                  <el-col :span="2" class='reject'>第二天类目</el-col>
                  <el-col :span="2" class='reject'>执行天数</el-col>
                  <el-col :span="4" class='reject'>每日操作数量占比</el-col>
                  <el-col :span="4" class='reject'>选择是否每日增长</el-col>
                  <el-col :span="2" class='reject'>首日数量</el-col>
                  <el-col :span="2" class='reject'>每日数量</el-col>
                  <el-col :span="3" class='reject'>总计访客数量</el-col>
                  <el-col :span="4" class='reject'>费用合计(访客数x单价)</el-col>
                  <div id="jump6"></div>
                </el-row>
                <el-row class="popularity_plan_content" v-for="(i,index) in renqiPlanArr1" :key="index+0.4" v-if='showItem(2,i.type)'>
                  <RenqiPlan :data='{obj:i, taskactionday, firstdaynum, risenum,isrise,day:2}' @getVisitorNum="getVisitorNum"></RenqiPlan>
                </el-row>
                <el-row class="popularity_plan_content" style="border-bottom: 1px solid #999; font-size: 16px; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px;">
                  <el-col :span="4" :offset="19" style="width: 20%;">
                    <span>费用合计：<span class="color-red">{{planPrice2}}</span>金币</span>
                  </el-col>
                </el-row>
              </template>

              <!-- 设置下单计划 -->
              <div v-if="taskactionday">
                <h3 style="margin: 20px 0; float: left;">设置下单计划</h3>
                <div class="order_explain color-red">
                  <p>转化率设置说明：</p>
                  <p>请根据店铺实际数据和设置的每日访客计划设置下单人数比例以控制转化率；因类目标准不同，建议控制转化率高于行业</p>
                  <p>平均值，低于行业优秀均值，每日下单人数占比增长率不要超过20%！如因转化率过高，导致商品降权，平台概不负责。</p>
                </div>
                <div class='clearfix' style='border-left:1px solid #999'>
                  <el-col :span="4">
                    <el-row type="flex" justify="center" align="middle" class="order_plan">下单渠道</el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content">关注店铺后下单人数</el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content">收藏商品后下单人数</el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content">加入购物车后下单人数</el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content">领取优惠券后下单人数</el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content" v-if="activeName=='third'">货比三家后下单人数</el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content">下单人数</el-row>
                  </el-col>
                  <el-col :span="3"  v-for="i in Math.round(taskactionday)" :key="i" style='width:11.90546%'>
                    <el-row type="flex" justify="center" align="middle" class="order_plan"><span class="plan_day">第{{i|lowerToUpper}}天</span></el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content"><el-input-number v-model="planNum[i-1][0]" :min="0" size="small" @input="checkplanNum(i-1,0)"></el-input-number></el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content"><el-input-number v-model="planNum[i-1][1]" :min="0" size="small" @input="checkplanNum(i-1,1)"></el-input-number></el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content"><el-input-number v-model="planNum[i-1][2]" :min="0" size="small" @input="checkplanNum(i-1,2)"></el-input-number></el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content"><el-input-number v-model="planNum[i-1][3]" :min="0" size="small" @input="checkplanNum(i-1,3)"></el-input-number></el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content" v-if="activeName=='third'"><el-input-number v-model="planNum[i-1][4]" :min="0" size="small" @input="checkplanNum(i-1,4)"></el-input-number></el-row>
                    <el-row type="flex" justify="center" align="middle" class="order_plan_content">{{planNum[i-1].reduce((total, num) => total + num)}}</el-row>
                  </el-col>
                  <div id="jump5"></div>
                </div>
                <div class="order_plan_content plan_content_sum">
                  <el-col :span="3" :offset="1">
                    <span>执行任务天数：<span class="color-red">{{taskactionday}}</span> 天</span>
                  </el-col>
                  <el-col :span="3" style="width: 15%; border-left: 0; margin-left: 10px;" class='reject'>
                    <span>总计下单人数：<span class="color-red">{{countNum}}</span> 人</span>
                  </el-col>
                </div>
              </div>
            </div>
          </div>

          <!-- 选择增值服务 -->
          <div class='taskStep'>
            <div class="taskStep_title">
              <div id="jump7"></div>
              <h2>第<span>{{step+1}}</span>步: 选择增值服务</h2>
            </div>
            <div class="taskStep_content_third">
              <div class="remind_addservice" style='font-size:13px'>
                <p>平台代返款：买手完成后,平台将直接使用押金为您操作返款,商家无需耗费时间、人力处理退款,减少押款周期本次平台代返款费用：<span class='color-red'>{{setAmount+`单`}}x1金币 = {{setAmount*1|tofixed}}</span></p>
                <p>平台代确认截图：买手完成后系统将自动确认任务截图，减少商家审核时间（系统自动审核为批量审核，不负责查看任务截图）若商家自己手动审核截图等任务结束后结算退还，订单金额截图0.5金币/单，评价截图0.5金币/单</p>
                <p>本次待确认截图合计：<span  class='color-red'>{{setAmount+`单`}}x1金币 = {{setAmount*1|tofixed}}</span></p>
              </div>
              <h3 class="title">以下增值服务请根据个人需求自愿选择，选择以下服务系统会更加精准的匹配对应人群完成您的任务</h3>
              <!-- 千人千面精准人群投放 -->
              <div class="addservice">
                <div class="addservice_title">
                  <h3>千人千面精准人群投放 (独门秘籍)</h3>
                  <span>选择此服务，商家可从地区、性别、年龄、淘气值、消费标签、花呗号等更加精准的筛选买手来完成您的任务</span>
                </div>
                <div class="addservice_content">
                  <!-- 京东增值服务 -->
                  <template v-if="shopType=='jd'">
                    <el-row>
                      <el-col :span="2">
                        <span>性别限制：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-select v-model="valuesex.state" placeholder="无限制" @change="addServerList(valuesex,optionsSex,'性别限制')">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsSex" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="2">
                        <span>京享值限制：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-select v-model="valuejingxiang.state" placeholder="无限制" @change="addServerList(valuejingxiang,optionsJingXiang,'京享值限制')">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsJingXiang" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </template>
                  <!-- 拼多多增值服务 -->
                  <template v-if="shopType=='pdd'">
                    <el-row>
                      <el-col :span="2">
                        <span>性别限制：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-select v-model="valuesex.state" placeholder="无限制" @change="addServerList(valuesex,optionsSex,'性别限制')">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsSex" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </template>
                  <!-- 阿里巴巴增值服务  -->
                  <template v-if="shopType=='albb'">
                    <el-row>
                      <el-col :span="3">
                        <span>会员等级限制</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-select v-model="valuevip.state" placeholder="无限制" @change="addServerList(valuevip,optionsVIP,'会员等级限制')">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsVIP" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                  </template>
                  <!-- 淘宝天猫增值服务 -->
                  <template v-if="shopType=='tb'||shopType=='tm'">
                    <el-row>
                      <el-col :span="2" style="width: 10%;margin-right: -10px;">
                        <span class="color-red hide">*</span>
                        <span>性别限制：</span>
                      </el-col>
                      <el-col :span="4" class="input_margin_top" style="margin-right: -10px;">
                        <el-select v-model="valuesex.state" placeholder="无限制" @change="addServerList(valuesex,optionsSex,'性别限制')" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsSex" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="1" style="margin-right: -10px;">
                        <span class="color-red hide">*</span>
                        <span>年龄限制：</span>
                      </el-col>
                      <el-col :span="4" class="input_margin_top">
                        <el-select v-model="valueage.state" placeholder="无限制" @change="addServerList(valueage,optionsAge,'年龄限制')" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsAge" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" style="width: 12%;margin-right: -10px;" :offset="1">
                        <span class="color-red hide">*</span>
                        <span>购买力限制：</span>
                      </el-col>
                      <el-col :span="4" class="input_margin_top">
                        <el-select v-model="valuebuy.state" placeholder="无限制" @change="addServerList(valuebuy,optionsBuy,'购买力限制')" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsBuy" :key="item.id" :label="item.value+' '+item.price+'金币'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="2" style="width: 10%;margin-right: -10px;">
                        <span class="color-red hide">*</span>
                        <span>淘气值限制：</span>
                      </el-col>
                      <el-col :span="4" class="input_margin_top" style="margin-right: -10px;">
                        <el-select v-model="valuetqz.state" placeholder="无限制" @change="addServerList(valuetqz,optionsTqz,'淘气值限制')" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsTqz" :key="item.id" :label="item.value+' '+item.price+'金币/单'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" :offset="1" style="margin-right: -10px;">
                        <span class="color-red hide">*</span>
                        <span>买号信誉限制：</span>
                      </el-col>
                      <el-col :span="4" class="input_margin_top">
                        <el-select v-model="valuexy.state" placeholder="无限制" @change="addServerList(valuexy,optionsXy,'买号信誉限制')" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsXy" :key="item.id" :label="item.value+' '+item.price+'金币/单'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" style="width: 12%;margin-right: -10px;" :offset="1">
                        <span class="color-red hide">*</span>
                        <span>芝麻积分限制：</span>
                      </el-col>
                      <el-col :span="4" class="input_margin_top">
                        <el-select v-model="valuezm.state" placeholder="无限制" @change="addServerList(valuezm,optionsZm,'芝麻积分限制')" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsZm" :key="item.id" :label="item.value+' '+item.price+'金币/单'" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="3" style="width: 16%;">
                        <span class="color-red hide">*</span>
                        <span>消费标签限制10金币：</span>
                      </el-col>
                      <el-col :span="3" class="input_margin_top">
                        <el-select v-model="limitType1.state" placeholder="无限制" @change="getLabel(limitType1.state,1),addServerListRadio(limitType1.state,'消费标签限制',10)" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsBq1" :key="item.id" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="3" class="input_margin_top" style="margin-left:20px">
                        <el-select v-model="limitType2.state" placeholder="无限制" @change="getLabel(limitType2.state,2)" :disabled="match.state">
                          <el-option label="无限制" value=""></el-option>
                          <el-option v-for="item in optionsBq2" :key="item.id" :label="item.text" :value="item.id"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="10" :offset="1">
                        <p>您当前选择消费标签为： <span>{{limitValue1}}&emsp;{{limitValue2}}</span></p>
                      </el-col>
                    </el-row>

                    <el-row style="border-bottom: 0;padding-bottom: 0;">
                      <el-checkbox v-model="match.state" @click.native="chooselimit" @change="addServerListRadio(match.state,'智能匹配人群',20)">智能匹配人群<span class="color-red">20</span>金币 选择此服务，系统会将您发布的商品根据性别、年龄、购买力、淘气值等多维度智能匹配精准人群</el-checkbox>
                    </el-row>
                  </template>
                </div>
              </div>
              <!-- 其他增值服务 -->
              <div class="otherservice">
                <div id="jump8"></div>
                <el-row>
                  <el-col :span="4">
                    <el-checkbox v-model="review.state" @change="addServerListRadio(review.state,'优先审单',3)">优先审单<span>3金币</span></el-checkbox>
                  </el-col>
                </el-row>

                <template v-if="activeName!='second'">
                  <el-row>
                    <el-col :span="5">
                      <el-checkbox v-model="starttime.state"  @change="addServerListRadio(starttime.state,'任务开始时间',3)">任务开始时间 <span>3金币</span><span class="hovermsg" @mouseover="hovermsg = 1" @mouseout="hovermsg = 0">!</span></el-checkbox>
                      <span v-if="hovermsg==1" class="hovercontent">放的单数会在这个时间段内平均放出，该增值服务为任务发放时间，不强制买手在选择时间范围内完成下单，买手领取任务后会保留2个小时，2个小时内未付款，则任务将自动取消</span>
                    </el-col>
                    <el-col :span="6" class="input_margin_top" style="margin-left: -30px;margin-top: -1px;">
                      <el-time-select
                        style='width:45%'
                        placeholder="起始时间" v-model="startDate"
                        @change="endDate=''"
                        :picker-options="{start: '00:00', step: '01:00', end: '23:00', minTime: new Date().getHours()+':00'}"
                        :editable="false"
                        size="small">
                      </el-time-select>
                      <el-time-select
                        style='width:45%'
                        placeholder="结束时间" v-model="endDate"
                        :picker-options="{start: '00:00', step: '01:00', end: '23:00', minTime: startDate }"
                        :editable="false"
                        size="small">
                      </el-time-select>
                    </el-col>
                    <el-col :span="10">
                      审核时间为9-21点，请在本时间段内选择此服务
                      <!-- <span class="color-red" style="font-size:12px">(此服务在21点之后选择无效)</span> -->
                    </el-col>
                    <el-col :span="3">
                      <el-checkbox v-model="endtime">到点取消任务<span class="hovermsg" @mouseover="hovermsg = 2" @mouseout="hovermsg = 0">!</span></el-checkbox>
                      <span v-if="hovermsg==2" class="hovercontent msg1">选择了到点取消，任务开始时间到任务截至时间，时间段至少错开1个小时，请您设置好时间避免一次性放出任务</span>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="5">
                      <span class="color-red hide">*</span>
                      <span>访客入店时间分布优化</span>
                    </el-col>
                    <template v-for="(item,index) of enterArr">
                      <!-- 点击每日增长智慧要隐藏自定义 -->
                      <el-col :span="5" :key="item.id" v-if="item.id!='67'||(risenumFlag&&activeName != 'fourth')" style="margin-left: -20px;">
                        <el-radio v-model="enterTime.state" :label="item.id" @click.native="cancelRadio($event,'enterTime'),addServerListRadio(enterTime,'访客入店时间优化',item.price)">
                          {{item.value}} {{item.price}}金币<span class="hovermsg"  @mouseover="hovermsg = item.id" @mouseout="hovermsg = 0">!</span>
                        </el-radio>
                        <span v-if="hovermsg==item.id" class="hovercontent msg2" :class="index==1?'msg3':index==2?'msg1':''">{{item.remark}}</span>
                      </el-col>
                    </template>
                    <el-col :span="4" class="input_margin_top" v-if="(risenumFlag&&activeName != 'fourth')">
                      <el-button @click="setCustom">下单时间分布</el-button>
                    </el-col>
                    <!-- 自定义下单时间弹窗 -->
                    <setTimeDiaLog :data="{obj:setTimeRangeArr,customDialog}" @dialog="setTimeData" v-if="customDialog"></setTimeDiaLog>
                  </el-row>
                </template>
                <!-- 自动审核上线 -->
                <el-row>
                  <el-col :span="4">
                    <el-checkbox v-model="audit.state" @change="addServerListRadio(audit.state,'自动审核上线',3)">自动审核上线<span> 3金币</span></el-checkbox>
                  </el-col>
                  <el-col :span="20" class="font_size">
                    <span>选择此服务后，任务付款提交之后将由系统自动审核通过，关键词设置必须在手淘前30页，若关键词找不到商品，后果由商家自负</span>
                  </el-col>
                </el-row>

                <el-row class="row_height">
                  <el-col :span="3" style="width: 14%;">
                    <span class="color-red hide">*</span>
                    <span>提升任务完成速度</span>
                  </el-col>
                  <el-col :span="10" class="font_size">
                    增加金币越多，推荐任务排名越靠前，便于买手更快速完成任务
                  </el-col>
                  <el-col :span="24" style="margin-top: 5px;">
                    <el-col :span="5" v-for="item of recommendArr" :key="item.id">
                      <el-radio v-model="recommend.state" :label="item.id" @click.native="cancelRadio($event,'recommend'),addServerListRadio(recommend,'提升任务完成速度',item.price)">
                        {{item.value}} {{item.price}}金币
                      </el-radio>
                    </el-col>
                  </el-col>
                </el-row>

                <el-row class="row_height">
                  <el-col :span="3" style="width: 11%;">
                    <span class="color-red hide">*</span>
                    <span>加赏任务佣金</span>
                  </el-col>
                  <el-col :span="10" class="font_size">
                    增加金币越多，买手完成任务的积极性越大，买手会优先做此类任务
                  </el-col>
                  <el-col :span="24" style="margin-top: 5px;">
                    <el-col :span="3">
                      <el-checkbox v-model="reward.state"  @change="addServerListRadio(reward.state,'加赏佣金',rewardValue)">每单加赏佣金</el-checkbox>
                    </el-col>
                    <el-col :span="4" class="input_margin_top">
                      <el-input-number v-model="rewardValue" :min="0.2" :step="1" @change="addServerListRadio(reward.state,'加赏佣金',rewardValue)"></el-input-number>
                    </el-col>
                    <el-col :span="3" style="margin-left: 10px;">
                      金币
                    </el-col>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="3" style="width: 15%;">
                    <span class="color-red hide">*</span>
                    <span>限制下单任务周期</span>
                  </el-col>
                  <el-col :span="20" class="font_size">
                    限制同店铺下单过的买手在一定时间内不可重复接手同店铺的任务(建议回购率低的品类选择，如：床上用品、数码家电等)
                  </el-col>
                  <el-col :span="24" style="margin-top: 5px;">
                    <el-col :span="4" v-for="item of periodArr" :key="item.id">
                      <el-radio v-model="period.state" :label="item.id" @click.native="cancelRadio($event,'period'),addServerListRadio(period,'限制下单任务周期',item.price)">
                        {{item.value}} <span class="color-red">{{item.price}}</span>金币
                      </el-radio>
                    </el-col>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="5">
                    <span class="color-red hide">*</span>
                    <span>同买手接不同店铺任务限制</span>
                  </el-col>
                  <el-col :span="19" class="font_size">
                    选择此服务后，买手将在规定时间内不可接此账户中另外一个店铺的任务
                  </el-col>
                  <el-col :span="24" style="margin-top: 5px;">
                    <el-col :span="4" v-for="item of shopPeriodArr" :key="item.id">
                      <el-radio v-model="shopPeriod.state" :label="item.id" @click.native="cancelRadio($event,'shopPeriod'),addServerListRadio(shopPeriod,'限制同买手接不同店铺任务',item.price)">
                        {{item.value}} <span class="color-red">{{item.price}}</span>金币
                      </el-radio>
                    </el-col>
                  </el-col>
                </el-row>

                <el-row class="row_height">
                  <el-col :span="3" style="width: 12%;">
                    <span class="color-red hide">*</span>
                    <span>提升买号权重</span>
                  </el-col>
                  <el-col :span="20" class="font_size">
                    指定刚注册平台的新人完成您发布的任务，此类账号多为优质的真实购物号，买号权重更高
                  </el-col>
                  <el-col :span="24" style="margin-top: 5px;">
                    <el-col :span="5" v-for="item of weightArr" :key="item.id">
                      <el-radio v-model="weight.state" :label="item.id" @click.native="cancelRadio($event,'weight'),addServerListRadio(weight,'提升买号权重',item.price)">
                         {{item.value}} <span class="color-red">{{item.price}}</span>金币/单
                      </el-radio>
                    </el-col>
                  </el-col>
                </el-row>
                <template v-if="shopType == 'albb'||shopType == 'tb'||shopType == 'tm'">
                  <el-row class="row_height">
                    <el-col :span="3" style="width: 10%;">
                      <span class="color-red hide">*</span>
                      <span>花呗号下单</span>
                    </el-col>
                    <el-col :span="20" class="font_size">
                      选择此服务，只有实名认证的花呗号才可接收任务
                    </el-col>
                    <el-col :span="24">
                      <el-row style="border-bottom: 0; margin-top: 5px;">
                        <el-col :span="4" v-for="item of huabeiArr" :key="item.id">
                          <el-radio v-model="huabei.state" :label="item.id" @click.native="cancelRadio($event,'huabei'),addServerListRadio(huabei,'花呗号下单',item.price)">
                            {{item.value}} <span class="color-red">{{item.price}}</span>金币
                          </el-radio>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                  <el-row style="height: 170px; border-bottom: 0;">
                    <el-col :span="2">
                      <span class="color-red hide">*</span>
                      <span>竞品狙击</span>
                    </el-col>
                    <el-col :span="20" class="font_size">
                      选择此服务后，买手需先去浏览、关注、加购指定竞品后，才可下单完成任务商品
                    </el-col>
                    <el-col :span="24" class="color-red font_size">
                      注：浏览指定竞品人数不得高于任务设置的总人数
                    </el-col>
                    <el-col :span="24" style="height: 75px; margin-top: 5px;">
                      <el-col :span="2">竞品淘口令</el-col>
                      <el-col :span="22">
                        <el-input type="textarea" :rows="3" placeholder="" v-model="jptkl.state" @change="addServerListRadio(jptkl.state,'竞品狙击')"></el-input>
                      </el-col>
                    </el-col>
                    <el-col :span="24" style="margin-top: 15px; letter-spacing: 1px;" class="font_size">
                      <el-col :span="8">
                        <span>设置浏览人数({{jptklArr[0].price}}金币/单)</span>
                        <el-input-number v-model="browsenum" :min="0" :max="setAmount" label="" style="width: 35%;" @change="addServerListRadio(jptkl.state,'竞品狙击')"></el-input-number>
                        人
                      </el-col>
                      <el-col :span="8">
                        <span>设置收藏商品人数({{jptklArr[1].price}}金币/单)</span>
                        <el-input-number v-model="collectnum" :min="0" :max="setAmount" label="" style="width: 35%;" @change="addServerListRadio(jptkl.state,'竞品狙击')"></el-input-number>
                        人
                      </el-col>
                      <el-col :span="8" style="text-align: right">
                        <span>设置加购人数({{jptklArr[2].price}}金币/单)</span>
                        <el-input-number v-model="shoppingnum" :min="0" :max="setAmount" label="" style="width: 35%;" @change="addServerListRadio(jptkl.state,'竞品狙击')"></el-input-number>
                        人
                      </el-col>
                    </el-col>
                  </el-row>
                </template>
              </div>

              <!-- 好评优化 -->
              <div class="otherservice font_size">
                <div id="jump9"></div>
                <p>
                  <span class="color-red hide">*</span>
                  <span style="margin-right: 15px; font-size: 16px;">好评优化</span>
                  <span>选择此服务，买手会根据您的要求对商品进行评论</span>
                </p>
                <p class="color-red">
                  若不选择以下几种好评方式，系统将默认买手自由发挥15字以内的评语
                </p>
                <p v-for="item of evaluationArr" :key="item.id">
                  <el-radio v-model="evaluation.state" :label="item.id" @click.native="cancelRadio($event,'evaluation'),addServerListRadio(evaluation,'好评优化',item.price)">
                    <span v-if="item.id=='83'">五星好评：选择此服务后，接手任务买手将商品5分默认好评 (0金币/单)</span>
                    <span v-if="item.id=='84'">关键词好评：选择此服务后，系统将会以下关键词随即分配给买手，买手评价内容需涉及分配的相关关键词 (1金币/单)</span>
                  </el-radio>
                </p>
                <div class="keyword_box" v-if="evaluation.state=='84'">
                  <div class="keyword_box_title">
                    请根据您发布任务的商品设定几个关键词作为访客的评价独自发挥撰写评价，例如”手感舒服、款式漂亮、包装讲究、物流很快、性价比高“等..请填写没有标点符号和空格的短词，关键字内容最多可填写10个字。不要填写完成的评价内容，避免所有访客评价内容一致
                  </div>
                  <div class="keyword_box_content clearfix">
                    <ul>
                      <li v-for="(i,index) in keywordlist" :key='index'>
                        关键字<span>{{index+1}}</span>：
                        <el-input v-model="keywordlist[index]" placeholder="请输入内容" style="width: 60%;"></el-input>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="set_keyword_box" v-if="evaluation.state=='84'">
                  <div class="add_keyword">
                    <el-button type="success" @click="addList('keywordlist')"><i class="fa fa-plus-square-o" aria-hidden="true"></i> 添加关键字</el-button>
                    <el-button type="danger" @click="removeList('keywordlist')"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除关键字</el-button>
                    <span class='maxlist'>最多可添加5组关键字</span>
                  </div>
                </div>
              </div>
              <!-- 自定义短语好评 -->
              <div class="otherservice">
                <el-row style="border-bottom: 0; margin-bottom: 0;padding-bottom:0">
                  <el-col :span="3">
                    <el-checkbox v-model="msgtext.state" @change="addServerListRadio(msgtext.state,'自定义短语好评',1)">自定义短语好评</el-checkbox>
                  </el-col>
                  <el-col :span="20" class="font_size">
                    选择此服务后，选择此服务后系统将随机分配短语给买手(<span class="color-red">1</span>金币/单)
                  </el-col>
                </el-row>
                <el-row>
                  <span class='color-red font_size' style='padding-left: 20px;'>请您根据发布任务的商品设定自定义短语好评，买手将复制自定义短语到下单平台评价，评价字数限定500字以内；请勿填写内容一致的评语</span>
                </el-row>
                <div>
                  <div class="keyword_box_content clearfix" style="margin-left:20px">
                    <ul>
                      <li v-for="(i,index) in msgList" :key='index' style='text-align: start;'>
                        自定义短语<span>{{index+1}}</span>：
                        <el-input v-model="msgList[index]" placeholder="请输入内容" style="width: 60%;"></el-input>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="set_imagetext_box">
                  <div class="add_imagetext">
                    <el-button type="success" @click="addList('msgList',setAmount)"><i class="fa fa-plus-square-o" aria-hidden="true"></i> 添加自定义好评</el-button>
                    <el-button type="danger" @click="removeList('msgList')"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除自定义好评</el-button>
                    <span class='maxlist'>组数不得超过总单量</span>
                  </div>
                </div>
              </div>
              <!-- 图文好评 -->
              <div class="otherservice" v-if="shopType!='albb'">
                <div id="jump10"></div>
                <el-row style="border-bottom: 0; margin-bottom: 0;">
                  <el-col :span="3" style="width: 10%;">
                    <el-checkbox v-model="imagetext.state" @change="addServerListRadio(imagetext.state,'图文好评',3)">图文好评</el-checkbox>
                  </el-col>
                  <el-col :span="20" class="font_size">
                    选择此服务后，接手任务买手评价时需同时上传商家提供的图片进行评价(<span class="color-red">3</span>金币/单)
                  </el-col>
                </el-row>
                <div v-for="(i,index) in imgArr" :key="index">
                  <el-row style="height: 130px; border-bottom: 0;">
                    <el-col :span="2">图片素材{{index+1}}</el-col>
                    <el-col :span="2" class="image_margin" v-for="(j,Jindex) in i.imgList" :key="Jindex">
                      <input type="file" class="uploadInput" @change="uploadimg({name:'imgArr',x:index,y:Jindex}, 'tuwen'+index+Jindex, 'tuwenimg'+index+Jindex, false)" :id="'tuwen'+index+Jindex" >
                      <img :src="j?j:'/static/img/bg.png'" :id="'tuwenimg'+index+Jindex">
                    </el-col>
                  </el-row>
                  <el-row style="border-bottom: 0;">
                    <el-col :span="2">自定义短语</el-col>
                    <el-col :span="7" class="input_margin_top">
                      <el-input v-model="i.text" placeholder="请输入内容"></el-input>
                    </el-col>
                  </el-row>
                </div>

                <div class="set_imagetext_box">
                  <div class="add_imagetext">
                    <el-button type="success" @click="addList('imgArr')"><i class="fa fa-plus-square-o" aria-hidden="true"></i> 添加图文好评</el-button>
                    <el-button type="danger" @click="removeList('imgArr')"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除图文好评</el-button>
                    <span class='maxlist'>最多可添加5组图文好评</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 快递发货 -->
          <div class='taskStep' style="font-size:16px;" v-if="kuaidiflag">
            <div class="taskStep_title clearfix">
              <h2 class='pull-left'>第<span>{{step+2}}</span>步: 快递发货</h2>
              <span class='pull-right' style="font-size:16px;padding-top: 17px;">此选项为非必需选项，商家可使用以下快递发货，也可使用自己的快递发货</span>
            </div>
            <div style='background: #FEDDDE;color:#FF545B;padding:20px;font-weight: bold;'>
              <p>1.平台提供中通，圆通，申通三种快递</p>
              <p>2.所有快递均可提供快递底单，均为一次性单号</p>
              <p>3.购买后请在12小时内在淘宝后台点击发货，未及时发货可能会导致快递信息延迟，必须在后台点击发货后才会有快递记录</p>
              <p>4.中通快递可用于淘宝/天猫，京东，拼多多；圆通及申通只能用于淘宝/天猫；阿里巴巴暂不提供快递(如需要可联系在线客服咨询)</p>
            </div>
            <div style='padding:20px;padding-bottom:40px'>
              <el-row style="padding-bottom:20px;border-bottom:1px dashed #ccc;">
                <span style="margin-right: 20px;">快递发货</span>
                <el-radio v-model="kuaidi" label="1">使用平台包裹</el-radio>
                <el-radio v-model="kuaidi" label="2">自己发快递</el-radio>
              </el-row>
              <el-row style="padding-top:20px" v-if="kuaidi=='1'">
                <span style="margin-right: 20px;">设置每个订单的重量(<span class='color-red'>{{kuaidiPrice}}</span>金币)/单</span>
                <el-input-number v-model="kuaidikg" :min="0" :max="40" :precision="2" label="请输入重量" size="small"></el-input-number>
                <span>(kg)</span>
                <span style="color:#999;font-size:14px">&emsp;请根据您任务商品的实际重量来设定，最大不超过40KG，可设置小数点后两位</span>
              </el-row>
              <el-row style="padding-top:20px" v-if="kuaidi=='1'">
                <el-radio v-model="kuaiditype" label="1" >
                  <img src="@/assets/img/task/ztkuaidi.png" alt="" style='vertical-align: middle;margin-right:80px;'>
                </el-radio>
                <el-radio v-model="kuaiditype" label="2" v-if="shopType != 'jd'&&shopType != 'pdd'">
                  <img src="@/assets/img/task/ytkuaidi.png" alt="" style='vertical-align: middle;margin-right:80px;'>
                </el-radio>
                <el-radio v-model="kuaiditype" label="3" v-if="shopType != 'jd'&&shopType != 'pdd'">
                  <img src="@/assets/img/task/stkuaidi.png" alt="" style='vertical-align: middle;'>
                </el-radio>
              </el-row>
              <!-- //地址信息 -->
              <el-row v-if="kuaidi=='1'">
                <div class="kdtitle">
                  请确认以下发货信息是否正确，若不正确可编辑修改
                </div>
                <!-- 回显 -->
                <el-row class="kdcont"  v-if="addressState == 1">
                  <el-col :span="20">
                    <p style="margin-bottom: 22px;">
                      发货人：<span style="color:#333">{{addresserName}}</span>
                    </p>
                    <p style="margin-bottom: 22px;">
                      联系方式：<span style="color:#333">{{addresserPhone}}</span>
                    </p>
                    <p>
                      发货地址：<span style="color:#333">{{showAddresser}}</span>
                    </p>
                  </el-col>
                  <el-col :span="4">
                    <div class="kdright">
                      <button class="kdbtn" @click="addressState = 2">编辑地址</button>
                    </div>
                  </el-col>
                </el-row>
                <!-- 编辑 -->
                <el-row class="kdcont" v-if="addressState == 2">
                  <el-col :span="16">
                    <div style="margin-bottom: 22px;">
                      <span>发件地址：</span>
                      <el-select v-model="province" placeholder="请选择" style='width:23%;margin-right:2%' @change="getArea($event,'cityArr',1)">
                        <el-option
                          v-for="(item,index) in provinceArr"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <el-select v-model="city" placeholder="请选择" style='width:23%;margin-right:2%' @change="getArea($event,'countyArr',2)">
                        <el-option
                          v-for="(item,index) in cityArr"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                      <el-select v-model="county" placeholder="请选择" style='width:23%;'>
                        <el-option
                          v-for="(item,index) in countyArr"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                    <div style="margin-bottom: 22px;">
                      <div style="float: left">
                        <span>详细地址：</span>
                      </div>
                      <el-input type="textarea" v-model="addresser" placeholder="请输入详细地址" style="width:75%"></el-input>
                    </div>
                    <p>
                      <span>发件人姓名：</span><el-input v-model="addresserName" placeholder="请输入内容" style="width:30%"></el-input>
                      <span style="margin-left:10px">发件人电话：</span><el-input v-model="addresserPhone" placeholder="请输入内容" style="width:30%"></el-input>
                    </p>
                  </el-col>
                  <el-col :span="8">
                    <div class="kdright" style="height:175px;margin-top:0">
                      <div style="margin-top: 60px;">
                        <el-button type="danger" style="width:30%" @click="saveAddress">保存地址</el-button>
                        <el-button type="info" style="width:30%" @click="cancelAddress">取消</el-button>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </div>
          <!-- 费用合计 -->
          <div class='taskStep'>
            <div class="taskStep_title">
              <h2>第<span>{{kuaidiflag?step+3:step+2}}</span>步: 费用合计<span style="color:#FFE9AE;font-size:14px">(除人气和回访任务单笔任务大于50单及以上，每单减一元佣金费)</span></h2>
            </div>
            <div class="taskStep_content_total">
              <el-row style="background: #ff908f; color: #fff; padding: 10px 90px; margin-bottom: 10px;">
                <el-col :span="8">分类</el-col>
                <el-col :span="8">费用明细</el-col>
                <el-col :span="8" style='text-align:right;'>合计</el-col>
              </el-row>

              <div class="total_detail">
                <el-row type="flex" align="middle">
                  <el-col :span="8">押金</el-col>
                  <el-col :span="8">
                    <p>商品押金：<span>{{price}}元 x {{setAmount}}单 × {{count}}件</span></p>
                    <p>运费押金：<span>{{baoyoustate == "1"?10:0}}元×{{setAmount}}单</span></p>
                  </el-col>
                  <el-col :span="8">{{yajinSum}}</el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="8">佣金</el-col>
                  <el-col :span="8">
                    <p>刷单佣金：<span>{{yongjin1}}元×{{setAmount}}单{{(activeName!='third'&&activeName!='fourth'&&setAmount>=50)?' - '+setAmount+'元':''}}</span></p>
                    <p v-if="activeNameId==3 ||activeNameId==4">浏览点击：<span>{{generalG}}元×{{countTask-setAmount}}单</span></p>
                    <p v-for="(item,index) of yongjinArr" :key="index">
                      {{item.title}}:
                      <span>{{item.radio|tofixed}}元×{{item.amount}}单</span>
                    </p>
                  </el-col>
                  <el-col :span="8">{{yongjinSum}}</el-col>
                </el-row>
                <el-row type="flex" align="middle">
                  <el-col :span="8">增值服务</el-col>
                  <el-col :span="8">
                    <p>平台代返款：<span>{{1}}金币×{{setAmount}}单</span></p>
                    <p>平台代确认截图：<span>{{1}}金币×{{setAmount}}单</span></p>
                    <p v-for="(item,index) of serverArr" :key="index+5.1">
                      {{item.name}}：
                      <span>{{item.price|tofixed}}金币{{item.name=="加赏佣金"||item.name=="好评优化"||item.name=="自定义短语好评"||item.name=="图文好评"?'×'+setAmount+'单':''}}</span>
                    </p>
                  </el-col>
                  <el-col :span="8">{{serverSum}}</el-col>
                </el-row>
                <el-row type="flex" align="middle" style="border-bottom: 0;">
                  <el-col :span="8">快递费用</el-col>
                  <el-col :span="8">
                    <p>{{kuaidiname}}：<span>{{kuaidiPrice}}元×{{setAmount}}单</span></p>
                  </el-col>
                  <el-col :span="8">{{kuaidiSum}}</el-col>
                </el-row>
              </div>
              <!-- 合计 -->
              <div class="total_cost">
                <el-row>
                  <el-col :span="6">费用合计：{{priceSum}}</el-col>
                  <el-col :span="4" :offset="10">
                    押金：<span class="color-red">{{yajinPriceSum}}</span>
                  </el-col>
                  <el-col :span="4">
                    金币：<span class="color-red">{{jinbiPriceSum}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="total_submit">
                <el-button type="danger" @click.native="submit()" id="submit">提交任务信息</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 关键字免责条款弹窗 -->
    <el-dialog
      custom-class="gjzmianze"
      title="发布任务时出现以下情形时，后果由商家承担，请注意："
      :visible.sync="gjzmianze"
      :show-close="false"
      :close-on-click-modal="false"
      width="46%">
      <p>1、商家发布A宝贝任务时，同个店铺中B宝贝的价格跟A宝贝一致，同时B宝贝主图跟A宝贝一样或者相似度 太高，</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;导致买 手在做任务时不能有效的分辨从而上传B宝贝的信息；</p>
      <p>2、商家未能及时修改相关信息（如：任务过程中优惠券被领完等），任务信息出现错误，导致买手完成的任务达</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不到商家要求；</p>
      <p>3、商家不按照任务类型发任务，自身发布要求与平台任务类型不符合或冲突，导致买手接任务后无法完成；</p>
      <p>4、请商家在任务期间，关闭商品的淘宝客推广、京东联盟推广;因部分浏览器会出现挟持现象，引起买家商 家之间</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不必要的纠纷，导致买家会存在报复心理，投诉店铺、追加差评，所以商家个人原因未关闭淘客、村淘等返利</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;形式所造成的损失平台概不负责，接到反馈的我们会冻结买号；请各位商家谅解~</p>
      <p style="margin-top:25px;color:#999">（免责条款不断更新中……）请商家发布时要仔细审核自己的任务信息，并进行及时调整！ </p>
      <div style="margin-top:60px;text-align: center;">
        <el-button type="danger" @click.native="gjzmianze=false" style="padding: 10px 40px;">知道了</el-button>
      </div>
    </el-dialog>
    <!-- 直通车免责条款弹窗 -->
    <el-dialog
      custom-class="gjzmianze"
      title="发布任务时出现以下情形时，后果由商家承担，请注意："
      :visible.sync="ztcmianze"
      :show-close="false"
      :close-on-click-modal="false"
      width="46%">
      <p>1、直通车产品的创意图及创意商品名必须和自然搜索不一致，否则买家很有可能从自然搜索商品进入； </p>
      <p>2、创意图必须为1张；</p>
      <p>3、投放区域必须是全国，不能设置地区限制； </p>
      <p>4、投放时间必须为全天； </p>
      <p>5、请将直通车宝贝调整到自然搜索宝贝前面，方便买手找到；</p>
      <p>6、请商家在任务期间，关闭商品的淘宝客推广、京东联盟推广;若因个人原因未关闭淘宝客所产生的佣金，平台概</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不负责；</p>
      <p class="color-red" style="margin-top:25px;">特别提醒：</p>
      <p class="color-red" style="margin-top:5px;font-size:14px">1.请保证直通车有余额充值。如果因余额不足导致直通车下线，由此导致点击、收藏以及加购不足问题，平台概不负责！ </p>
      <p class="color-red" style="margin-top:5px;font-size:14px">2.因为直通车不稳定性以及是人为操作，所以平台不保证100%流量点击从直通车进入，如果介意的的商家请勿发布！</p>
      <p class="color-red" style="margin-top:5px;font-size:14px">3.直通车任务的访客，容易被淘宝系统过滤掉，如访客被系统过滤平台概不负责，如果介意的的商家请勿发布！</p>
      <div style="margin-top:60px;text-align: center;">
        <el-button type="danger" @click.native="ztcmianze=false" style="padding: 10px 40px;">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Header from '@/components/public/Header'
// 投放计划 --人气计划
import RenqiPlan from './taskCompoent/RenqiPlan'
// 投放计划 -- 关键词弹窗
import KeyDialog from './taskCompoent/KeyDialog'
// 自定义时间弹窗
import setTimeDiaLog from './taskCompoent/setTimeDiaLog'
import {previewImg} from '@/assets/js/util/imgscript'
//弹窗
import { Loading, Message, MessageBox } from 'element-ui'
// 验证
import {validata} from '@/assets/js/util/validata'
export default {
  name: 'Task',
  data () {
    return {
      gjzmianze: false,   // 关键字免责条款
      ztcmianze: false,   // 直通车免责条款
      editOrderno:'',     //
      editDatearea:'',
      addressState: 1,   //地址状态码
      province: ``,      // 省
      city: ``,         // 市
      county: ``,       // 县
      provinceArr: [],  // 省数据
      cityArr: [],     // 市数据
      countyArr: [],   // 县数据
      showAddresser: ``, //显示的详细地址
      addresser: ``,      //详细地址
      addresserName: ``,  //发件人姓名
      addresserPhone: ``, //发件人电话
      yongjin: [],          //佣金
      shopTypeList:[       // 模拟接口获取平台类型数据
        {'id':1,val:'tb','name':'淘宝','reg':'.taobao.'},
        {'id':2,val:'tm','name':'天猫','reg':'.tmall.'},
        {'id':3,val:'jd','name':'京东','reg':'.jd.'},
        {'id':4,val:'pdd','name':'拼多多','reg':'.yangkeduo.'},
        {'id':5,val:'albb','name':'阿里巴巴','reg':'.1688.'}
      ],
      getShopList:[],       // 接口获取商铺列表
      getDiscount:[],       // 接口获取折扣服务
      getKorder:[],         // 接口获取排序方式
      getLog:[],            // 接口获取快递类型
      step: 2,              // 动态步骤
      //第一步商品信息数据
      shopType: 'tb',       // 选择平台
      shopName: 0,          // 选择店铺
      channel: '1',  // 任务渠道
      backtype: '1',  // 返款方式
      itemurl: '',          // 商品链接
      itemtitle: '',        //商品标题
      goodsdetail: [],      // 接口改的商品详情
      imageUrl1: '',        // 商品主图
      imageUrl2: '',        // 商品主图
      price: '',            // 单品售价
      count: '',            // 每单拍
      showPrice: '',        // 展示价格
      buytypecoupon: '',    // 优惠券
      buytypecard: '',      // 信用卡
      buytype: '',          // 白条/花呗
      pddCheckList: '',        // 支付要求,拼多多单独\拼单购买
      baoyoustate: '2',      // 收费收取方式
      orderRemark: '',         // 下单备注
      //第二步进店渠道数据
      activeName: 'first',  // 第2步分页导航展示
      activeNameId: 1,
      linchenDate:'',
      startLinchen:'',
      endLinchen:'',
      bindDate: false,      // 凌晨单是否到点取消
      options:[             //动态变化keywordArr的options
        {
          'value': 'tb',
          'label': '淘宝APP搜索'
        }
      ],
      keywordArr:[          //动态添加关键词
        {
          'value': 'tb',
          'options': [{
            'value': 'tb',
            'label': '淘宝APP搜索'
          }],
          'setKeywordDialog': false,  // 关键词弹窗
          'setRange': {
            tableData:[
              {str:'分类名称',str1:'风格',str2:'材质',},
              {str:'分类关键词',str1:'休闲',str2:'蚕丝',}
            ],
            zhekouState:[],
            paixuState:``
          },
          'keyword': '',
          'num': 0
        }
      ],
      setAmount: 0,          // 商家设置发布单数总和
      tkltkl: '',            // 淘口令选项卡 - 进店淘口令
      tbqrfile: '',            // 二维码选项卡 - 二维码图片
      tqgType: '1',          // 淘抢购类型
      jhsdatetime: '',       //聚划算选项卡 - 开团时间\淘抢购选项卡 - 所在场次
      jhstype: '1',           // 聚划算类型
      //第三步投放计划数据
      firstdaynum: 0,       // 首日到店访客数
      generalG: 0.55,       // 首日到店访客金币
      taskactionday: 0,     // 任务执行天数
      isrise: "1",            // 访客每日增长量
      risenum: 0,           // 增长人数
      risenumFlag: true,    // 默认不选中每日增长,设置为禁用状态
      renqiPlanArr:[],      // 人气计划数据
      renqiPlanArr1:[],      // 人气计划回访第二天
      countPlan: [],         //关键词数据
      countPlan1: [],        //回访第一天数据
      countPlan2: [],        //回访第二天数据
      planPrice: 0,          //关键词人气计划总价格
      planPrice1: 0,         //回访第一天人气计划总价格
      planPrice2: 0,         //回访第二天人气计划总价格
      planNum: [             //七天下单计划的数据
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
      ],
      hovermsg:0,          // 显示对应的msg状态
      //第四步增值服务数据
      valuesex: {},         // 性别限制，用来设置增值服务ID以及选中状态
      valueage: {},         // 年龄限制
      valuebuy: {},         // 购买力限制
      valuetqz: {},         // 淘气值限制
      valuexy: {},          // 买号信誉限制
      valuezm: {},          // 芝麻积分限制
      valuevip: {},          // 阿里巴巴会员等级限制
      valuejingxiang: {},    // 京东京享值限制
      limitType1: {},         //消费标签限制id大类
      limitType2: {},         // 消费标签限制id小类,种类限制只需要传给API小类ID
      limitValue1: '',         // 消费标签限制文案大类
      limitValue2: '',         // 消费标签限制文案小类
      optionsSex: [],
      optionsAge: [],
      optionsBuy: [],
      optionsTqz: [],
      optionsXy: [],
      optionsZm: [],
      optionsBq1: [],
      optionsBq2: [],
      optionsVIP: [],
      optionsJingXiang: [],
      match: {},           // 智能匹配人群
      review: {},          // 优先审单
      starttime: {},       // 任务开始时间
      startDate: '',            // 任务开始时间段
      endDate: '',             // 任务结束时间段
      endtime: false,         // 到点取消任务
      enterTime:{},           //进店时间分布
      enterArr: [],           //进店时间分布数据
      customDialog: false,    // 自定义时间弹窗
      setTimeRangeArr: [{date:new Date(),amount:0,data:[{'time':'','num':0}]}],    // 自定义时间数据
      recommend: {},          // 平台推荐位置
      recommendArr: [],       // 提升任务完成速度数据
      reward: {},          // 每单加赏佣金
      rewardValue: 0.2,        // 加赏佣金值
      audit: {},           // 自动审核服务
      period: {},         // 限制下单任务周期
      periodArr: [],         // 限制下单任务周期数据
      shopPeriod: {},         // 限制同买手接任务周期
      shopPeriodArr: [],         // 限制同买手接任务数据
      weight: {},         // 提升买号权重
      weightArr:[],       //买号权重数据
      huabei: {},         // 花呗号下单
      huabeiArr: [],         // 花呗号下单数据
      jptkl: {},              // 竞品淘口令
      jptklArr: [{price:''},{price:''},{price:''}],              // 竞品淘口令数据
      browsenum: '',          // 浏览人数
      collectnum: '',         // 收藏商品人数
      shoppingnum: '',        // 加购人数
      evaluation: {},         // 好评方式
      evaluationArr: [],         // 好评方式
      keywordlist: [''],      // 关键字列表
      msgtext: {},       // 短语好评
      msgList: [''],       // 短语好评列表
      imagetext: {},       // 图文好评
      imgArr: [        //图文列表
        {'text':'', imgList:['','','','','']}
      ],
      //快递
      kuaidi: "1",
      kuaidikg: "",
      kuaiditype: "1",
      kuaidiPrice: 2.8, // zt 2.8; other 3
      kuaidiflag: true,
      //第五步费用合计数据
      kuaidiname: `中通快递`,
      serverArr:[],
      yongjinArr:[],
    }
  },
  beforeRouteLeave (to, from, next) {
    delete sessionStorage.orderno
    delete sessionStorage.datearea
    delete sessionStorage.reset
    delete sessionStorage.type
    next()
  },
  async mounted () {
    let orderno = sessionStorage.orderno
    let datearea = sessionStorage.datearea
    // 如果不是编辑就显示免责弹窗窗
    if(orderno == undefined && datearea == undefined){
      this.gjzmianze = true
    }
    //获取基本信息
    await this.getBaseData(1)
    //获取人气计划信息
    await this.getPlanData(1,1,this.backtype)
    //获取省市数据
    await this.getArea(0,'')

    //如果是编辑就获取数据
    if(orderno!=undefined && datearea!=undefined){
      // this.editOrderno = window.atob(orderno)
      // this.editDatearea = window.atob(datearea)
      this.editOrderno = orderno
      this.editDatearea = datearea
      this.getinfor(this.editOrderno,this.editDatearea)
    }
  },
  components: {
    Header,
    RenqiPlan,
    KeyDialog,
    setTimeDiaLog
  },
  filters: {
    lowerToUpper (str) {
      switch(str){
        case 1:
          return '一'
        break;
        case 2:
          return '二'
        break;
        case 3:
          return '三'
        break;
        case 4:
          return '四'
        break;
        case 5:
          return '五'
        break;
        case 6:
          return '六'
        break;
        case 7:
          return '七'
        break;
      }
    },
    tofixed (number){
      return parseFloat(number).toFixed(2)
    }
  },
  methods:　{
    // 获取任务信息
    async getinfor(orderno,datearea){
      let data = await this.ajax({
        url: `PublishInterface/getorder?tk=${sessionStorage.token}`,
        data: {orderno,datearea}
      })
      if(!data) return false
      //第一步数据
      let data1 = data.data.data1
      let data2 = data.data.data2
      let data3 = data.data.data3
      let data4 = data.data.data4
      let data5 = data.data.data5
      let data6 = data.data.data6
      let data7 = data.data.data7
      let data8 = data.data.data8
      // 选择平台数据
      this.shopTypeList.forEach(element=>{
        if(element.id == data1.pctype){
          this.shopType = element.val
        }
      })
      await this.getBaseData(data1.pctype)
      this.shopName = data1.shopid
      this.channel = data1.clientype
      this.backtype = data1.limitcashtype
      await this.getPlanData(data1.pctype,data1.ordertype,data1.limitcashtype)
      this.itemurl = data1.commodityurl
      this.itemtitle = data1.commodityname
      this.imageUrl1 = data1.commoditymasterimgurl
      this.goodsdetail = data1.goodsdetail
      document.querySelector("#uploadimg").src=data1.commoditymasterimgurl?data1.commoditymasterimgurl:document.querySelector("#uploadimg").src
      this.imageUrl2 = data1.commoditypcimgurl
      document.querySelector("#uploadimg1").src=data1.commoditypcimgurl?data1.commoditypcimgurl:document.querySelector("#uploadimg1").src
      this.price = data1.commodityprice
      this.count = data1.personbuycount
      this.showPrice = data1.commodityshowprice
      this.buytypecoupon = data1.buytypecoupon==1?true:false
      this.buytypecard = data1.buytypecard==1?true:false
      this.buytype = data1.buytype==1?true:false
      this.baoyoustate = data1.logmoney
      this.orderRemark = data1.remark
      this.pddCheckList = data1.orderbuytype
      //第二步数据
      this.activeNameId = data1.ordertype
      switch(data1.ordertype){
        case "1":this.activeName = 'first';break
        case "2":this.activeName = 'second';break
        case "3":this.activeName = 'third';break
        case "4":this.activeName = 'fourth';break
        case "5":this.activeName = 'fifth';break
        case "6":this.activeName = 'sixth';break
        case "7":this.activeName = 'seventh';break
        case "8":this.activeName = 'eighth';break
        case "9":this.activeName = 'ninth';break
        case "10":this.activeName = 'fifth-x';break
        case "11":this.activeName = 'sixth-x';break
        case "12":this.activeName = 'sixth-y';break
      }
      // 重置进店渠道数据
      this.changeTabs(data1.ordertype)
      // 循环处理关键词数据
      data2.forEach((element,index)=>{
        //每次进入就使关键词长度加1，最后一次除外
        if(index<data2.length-1){
          this.keywordArr.push(this.$options.data().keywordArr[0])
        }
        //开始获取数据
        this.shopTypeList.forEach(e=>{
          if(e.id == element.keywordclass){
            this.keywordArr[index].value = e.val
          }
        })
        this.keywordArr[index].keyword = element.keyword
        this.keywordArr[index].num = element.pordernum
        this.keywordArr[index].priceStart = parseInt(element.pricestart)
        this.keywordArr[index].priceEnd = parseInt(element.priceend)
        this.keywordArr[index].setRange.paixuState = element.keywordorderbyid==0?'':element.keywordorderbyid
        element.discount1==1?this.keywordArr[index].setRange.zhekouState.push('discount1'):''
        element.discount2==1?this.keywordArr[index].setRange.zhekouState.push('discount2'):''
        element.discount3==1?this.keywordArr[index].setRange.zhekouState.push('discount3'):''
        element.discount4==1?this.keywordArr[index].setRange.zhekouState.push('discount4'):''
        element.discount5==1?this.keywordArr[index].setRange.zhekouState.push('discount5'):''
        element.discount6==1?this.keywordArr[index].setRange.zhekouState.push('discount6'):''
        element.discount7==1?this.keywordArr[index].setRange.zhekouState.push('discount7'):''
        element.discount8==1?this.keywordArr[index].setRange.zhekouState.push('discount8'):''
        element.discount9==1?this.keywordArr[index].setRange.zhekouState.push('discount9'):''
        element.discount10==1?this.keywordArr[index].setRange.zhekouState.push('discount10'):''
        element.discount11==1?this.keywordArr[index].setRange.zhekouState.push('discount11'):''
        // 添加zhekoulist
        let zhekouArr = []
        this.keywordArr[index].setRange.zhekouState.forEach(element => {
          this.getDiscount.forEach(res=>{
            if(element == res.index){
              zhekouArr.push({"name":res.index,"val":1})
            }
          })
        })
        this.keywordArr[index].setRange.zhekouList = zhekouArr
        // 添加分类数据
        this.keywordArr[index].setRange.tableData.forEach((e,i)=>{
          if(i==0){
            e.data1 = element.type1
            e.data2 = element.type2
            e.data3 = element.type3
            e.data4 = element.type4
          }else{
            e.data1 = element.typekey1
            e.data2 = element.typekey2
            e.data3 = element.typekey3
            e.data4 = element.typekey4
          }
        })
        //省市
        this.keywordArr[index].province = element.province
        this.keywordArr[index].city = element.sendarea
        //凌晨单数据
        if(data1.ordertype == 2){
          this.linchenDate = element.linchendate
          this.startLinchen = element.startime
          this.endLinchen = element.endtime
          this.bindDate = element.jobstate==1?true:false
        }
      })
      //淘口令，聚划算等数据
      this.tkltkl = data3.taskpassword
      this.tbqrfile = data3.qrcodeurl
      document.querySelector("#tbqrimg").src=data3.qrcodeurl?data3.qrcodeurl:document.querySelector("#tbqrimg").src
      this.tqgType = data3.rushtype
      this.jhstype = data3.hottype
      this.jhsdatetime = data3.hotsdate
      //总计下单人数
      this.$nextTick(()=>{
        this.setAmount = data1.ordertotal
      })
      //投放计划数据
      this.taskactionday = data1.alldays
      this.firstdaynum = data1.firstdaynum
      if(data1.addpersoncount!=0){
        this.isrise = "2"
        this.risenum = data1.addpersoncount
      }
      //人气计划数据
      if(data1.ordertype == 3){
        //关键词人气任务数据
        this.renqiPlanArr.forEach(element=>{
          switch(element.title){
            case "收藏商品":
              element.operatenum = data5.proportion1
              element.isrise2 = data5.isincrease1
            break
            case "关注店铺":
              element.operatenum = data5.proportion2
              element.isrise2 = data5.isincrease2
            break
            case "加入购物车":
              element.operatenum = data5.proportion3
              element.isrise2 = data5.isincrease3
            break
            case "领取优惠券":
              element.operatenum = data5.proportion4
              element.isrise2 = data5.isincrease4
            break
            case "领取红包":
              element.operatenum = data5.proportion5
              element.isrise2 = data5.isincrease5
            break
            case "分享商品":
              element.operatenum = data5.proportion6
              element.isrise2 = data5.isincrease6
            break
            case "浏览评价页面":
              element.operatenum = data5.proportion7
              element.isrise2 = data5.isincrease7
            break
            case "货比三家":
              element.operatenum = data5.proportion8
              element.isrise2 = data5.isincrease8
            break
            case "随机浏览副商品":
              element.operatenum = data5.proportion9
              element.isrise2 = data5.isincrease9
            break
            default :
              element.operatenum = 0.5
              element.isrise2 = "1"
            break
          }
          //计算合计价格
          let sum = 0
          if(element.isrise2 == 1){
            sum = data1.firstdaynum * data1.alldays
          }else{
            // a1+(a1+(n-1)*d)*n/2；a1-首选项； n-天数； d-差
            sum = (data1.firstdaynum+(data1.firstdaynum+(data1.alldays-1)*data1.addpersoncount))*data1.alldays/2
          }
          sum = Math.round(sum*parseFloat(element.operatenum))
          this.getVisitorNum(element.type,element.title,sum,sum*element.money,element.money,0,element.operatenum,element.isrise2)
        })
      }
      //回访任务数据
      if(data1.ordertype == 4){
        this.renqiPlanArr.forEach(element=>{
          switch(element.title){
            case "收藏商品":
              element.operatenum = data6.proportion1
              element.isrise2 = data6.isincrease1
            break
            case "关注店铺":
              element.operatenum = data6.proportion2
              element.isrise2 = data6.isincrease2
            break
            case "加入购物车":
              element.operatenum = data6.proportion3
              element.isrise2 = data6.isincrease3
            break
            case "货比三家":
              element.operatenum = data6.proportion4
              element.isrise2 = data6.isincrease4
            break
            case "随机浏览副商品":
              element.operatenum = data6.proportion5
              element.isrise2 = data6.isincrease5
            break
            default :
              element.operatenum = 0
              element.isrise2 = "1"
            break
          }
          //计算合计价格
          let sum = 0
          if(element.isrise2 == 1){
            sum = data1.firstdaynum * data1.alldays
          }else{
            // a1+(a1+(n-1)*d)*n/2；a1-首选项； n-天数； d-差
            sum = (data1.firstdaynum+(data1.firstdaynum+(data1.alldays-1)*data1.addpersoncount))*data1.alldays/2
          }
          sum = Math.round(sum*parseFloat(element.operatenum))
          this.getVisitorNum(element.type,element.title,sum,sum*element.money,element.money,1,element.operatenum,element.isrise2)
        })
        this.renqiPlanArr1.forEach(element=>{
          switch(element.title){
            case "收藏商品":
              element.operatenum = data6.proportion6
              element.isrise2 = data6.isincrease6
            break;
            case "关注店铺":
              element.operatenum = data6.proportion7
              element.isrise2 = data6.isincrease7
            break;
            case "加入购物车":
              element.operatenum = data6.proportion8
              element.isrise2 = data6.isincrease8
            break;
            case "领取优惠券":
              element.operatenum = data6.proportion9
              element.isrise2 = data6.isincrease9
            break;
            case "领取红包":
              element.operatenum = data6.proportion10
              element.isrise2 = data6.isincrease10
            break;
            case "分享商品":
              element.operatenum = data6.proportion11
              element.isrise2 = data6.isincrease11
            break;
            case "浏览评价页面":
              element.operatenum = data6.proportion12
              element.isrise2 = data6.isincrease12
            break;
            case "随机浏览副商品":
              element.operatenum = data6.proportion13
              element.isrise2 = data6.isincrease13
            break;
            default :
              element.operatenum = 0
              element.isrise2 = "1"
            break
          }
          //计算合计价格
          let sum = 0
          if(element.isrise2 == 1){
            sum = data1.firstdaynum * data1.alldays
          }else{
            // a1+(a1+(n-1)*d)*n/2；a1-首选项； n-天数； d-差
            sum = (data1.firstdaynum+(data1.firstdaynum+(data1.alldays-1)*data1.addpersoncount))*data1.alldays/2
          }
          sum = Math.round(sum*parseFloat(element.operatenum))
          this.getVisitorNum(element.type,element.title,sum,sum*element.money,element.money,2,element.operatenum,element.isrise2)
        })
      }
      // 下单计划数据
      data8.forEach((element,index)=>{
        this.planNum[index][0] = element.c1
        this.planNum[index][1] = element.c2
        this.planNum[index][2] = element.c3
        this.planNum[index][3] = element.c4
        this.planNum[index][4] = element.c5
      })
      // 增值服务数据
      data4.forEach(element=>{
        switch(element.classtype){
          // 性别限制
          case '1':
            this.valuesex.state = element.addserviceid
            this.addServerList(this.valuesex,this.optionsSex,'性别限制')
          break;
          // 年龄限制
          case '2':
            this.valueage.state = element.addserviceid
            this.addServerList(this.valueage,this.optionsAge,'年龄限制')
          break;
          // 购买力限制
          case '3':
            this.valuebuy.state = element.addserviceid
            this.addServerList(this.valuebuy,this.optionsBuy,'购买力限制')
          break;
          // 淘气值限制
          case '4':
            this.valuetqz.state = element.addserviceid
            this.addServerList(this.valuetqz,this.optionsTqz,'淘气值限制')
          break;
          // 买号信誉
          case '6':
            this.valuexy.state = element.addserviceid
            this.addServerList(this.valuexy,this.optionsXy,'买号信誉限制')
          break;
          // 芝麻信用
          case '7':
            this.valuezm.state = element.addserviceid
            this.addServerList(this.valuezm,this.optionsZm,'芝麻积分限制')
          break;
          // 消费标签限制
          case '5':
            this.limitType1.state = element.othervalue.a
            this.getLabel(this.limitType1.state,1).then(res=>{
              this.addServerListRadio(this.limitType1.state,'消费标签限制',10)
              this.limitType2.state = element.othervalue.b
              this.getLabel(this.limitType2.state,2)
            })
          break;
          // 智能匹配精准人群
          case '8':
            if(data1.isai =="1"){
              this.match.state = true
              this.addServerListRadio(this.match.state,'智能匹配人群',20)
            }
          break;
          // 优先审核
          case '9':
            if(data1.isfirst =="1"){
              this.review.state = true
              this.addServerListRadio(this.review.state,'优先审单',3)
            }
          break;
          // 任务开始时间
          case '10':
            this.starttime.state = true
            this.startDate = data1.stime
            this.endDate = data1.etime
            this.endtime = data1.isautocancle=="1"?true:false
            this.addServerListRadio(this.starttime.state,'任务开始时间',3)
          break;
          // 入店时间分布
          case '11':
            this.enterTime.state = element.addserviceid
            let enterTimeItem = this.enterArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.enterTime,'访客入店时间优化',enterTimeItem[0].price)
            //如果选中的是自定义
            if(data1.iscustomrelease == "1"){
              this.$nextTick(()=>{
                data7.forEach((element,index)=>{
                  //每次进入就长度加1，最后一次除外
                  if(index<data7.length-1){
                    this.setTimeRangeArr.push(this.$options.data().setTimeRangeArr[0])
                  }
                  this.setTimeRangeArr[index].date = element.datepart
                  this.setTimeRangeArr[index].amount = parseInt(element.num)
                  let data = []
                  element.data.forEach((e)=>{
                    data.push({'time':e.settime,'num':parseInt(e.setamount)})
                  })
                  this.setTimeRangeArr[index].data = data
                })
              })
            }
          break;
          // 提升任务完成速度
          case '12':
            this.recommend.state = element.addserviceid
            let recommenItem = this.recommendArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.recommend,'提升任务完成速度',recommenItem[0].price)
          break;
          // 加赏佣金
          case '13':
            this.reward.state = true
            this.rewardValue = data1.rewardgoldcoin
            this.addServerListRadio(this.reward.state,'加赏佣金',this.rewardValue)
          break;
          // 限制下单任务周期
          case '15':
            this.period.state = element.addserviceid
            let periodItem = this.periodArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.period,'限制下单任务周期',periodItem[0].price)
          break;
          // 限制买手接同店任务
          case '22':
            this.shopPeriod.state = element.addserviceid
            let shopPeriodItem = this.shopPeriodArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.shopPeriod,'限制同买手接不同店铺任务',shopPeriodItem[0].price)
          break;
          // 提升买号权重
          case '16':
            this.weight.state = element.addserviceid
            let weightItem = this.weightArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.weight,'提升买号权重',weightItem[0].price)
          break;
          // 花呗号下单
          case '17':
            this.huabei.state = element.addserviceid
            let huabeiItem = this.huabeiArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.huabei,'花呗号下单',huabeiItem[0].price)
          break;
          // 竞品狙击
          case '18':
            this.jptkl.state = data1.competitive
            this.browsenum = data1.competitivebrowse
            this.collectnum = data1.competitivecollection
            this.shoppingnum = data1.competitiveaddcart
            this.addServerListRadio(this.jptkl.state,'竞品狙击')
          break;
          // 好评优化
          case '19':
            this.evaluation.state = element.addserviceid
            let evaluationItem = this.evaluationArr.filter(item=>element.addserviceid == item.id?item:'')
            this.addServerListRadio(this.evaluation,'好评优化',evaluationItem[0].price)
            this.keywordlist = [...element.othervalue.split("@")]
          break;
          // 图文好评
          case '20':
            if(data1.havingpic=="1"){
              this.imagetext.state = true
              this.addServerListRadio(this.imagetext.state,'图文好评',3)
              this.imgArr = [...element.othervalue]
            }
          break;
          // 月均消费额度,暂时没用
          case '21':
            //
          break;
          // 自定义短语
          case '23':
            this.msgtext.state = true
            this.addServerListRadio(this.msgtext.state,'自定义短语好评',1)
            this.msgList = [...element.othervalue.split("@")]
          break;
          // 京享值,京东用
          case '24':
            this.valuejingxiang.state = element.addserviceid
            this.addServerList(this.valuejingxiang,this.optionsJingXiang,'京享值限制')
          break;
          // 会员等级,阿里巴巴用
          case '25':
            this.valuevip.state = element.addserviceid
            this.addServerList(this.valuevip,this.optionsVIP,'会员等级限制')
          break;
          // 自动审核上线
          case '26':
            this.audit.state = true
            this.addServerListRadio(this.audit.state,'自动审核上线',3)
          break;
        }
      })
      //快递服务数据
      this.kuaidi = data1.platformlog
      this.kuaidikg = data1.logweight
      this.kuaiditype = data1.log
    },
    // 获取页面数据信息
    async getBaseData(shopType){
      let data = await this.ajax({
        url: `PublishInterface/gettaskbase?tk=${sessionStorage.token}`,
        data: {'class':shopType},
        needAlert:false
      })
      if(!data) return false
      // 如果不是vip,并且是task页面(防止未登录强行进入任务页面)， 就跳转去购买页面
      if(data.isvip == 1 && this.$route.fullPath == '/task'){
        MessageBox.alert('您还不是会员，请先充值会员',{
          lockScroll: false,
          showClose: false,
          callback: ()=> {
            this.$router.push('/recharge?active=recharge-getvip')
          }
        })
        return false
      }
      this.getShopList = data.shop
      this.getDiscount = data.discount
      this.getKorder = data.korder
      this.getLog = data.log
      //增值服务数据
      data.data.forEach(element=>{
        switch(element.classtype){
          // 性别限制
          case '1':
            this.valuesex.id = element.classtype
            this.optionsSex = element.data
          break;
          // 年龄限制
          case '2':
            this.valueage.id = element.classtype
            this.optionsAge = element.data
          break;
          // 购买力限制
          case '3':
            this.valuebuy.id = element.classtype
            this.optionsBuy = element.data
          break;
          // 淘气值限制
          case '4':
            this.valuetqz.id = element.classtype
            this.optionsTqz = element.data
          break;
          // 买号信誉
          case '6':
            this.valuexy.id = element.classtype
            this.optionsXy = element.data
          break;
          // 芝麻信用
          case '7':
            this.valuezm.id = element.classtype
            this.optionsZm = element.data
          break;
          // 消费标签限制
          case '5':
            this.limitType2.id = element.classtype
            this.limitType1.id = element.classtype
            this.optionsBq1 = element.data
          break;
          // 智能匹配精准人群
          case '8':
            this.match.id = element.classtype
            this.match.serviceId = element.data[0].id
          break;
          // 优先审核
          case '9':
            this.review.id = element.classtype
            this.review.serviceId = element.data[0].id
          break;
          // 任务开始时间
          case '10':
            this.starttime.id = element.classtype
            this.starttime.serviceId = element.data[0].id
          break;
          // 入店时间分布
          case '11':
            this.enterTime.id = element.classtype
            // 入店时间分布默认为平均分布
            this.enterTime.state = 104
            this.enterArr = element.data
          break;
          // 提升任务完成速度
          case '12':
            this.recommend.id = element.classtype
            this.recommendArr = element.data
          break;
          // 加赏佣金
          case '13':
            this.reward.id = element.classtype
            this.reward.serviceId = element.data[0].id
          break;
          // 限制下单任务周期
          case '15':
            this.period.id = element.classtype
            this.periodArr = element.data
          break;
          // 限制买手接同店任务
          case '22':
            this.shopPeriod.id = element.classtype
            this.shopPeriodArr = element.data
          break;
          // 提升买号权重
          case '16':
            this.weight.id = element.classtype
            this.weightArr = element.data
          break;
          // 花呗号下单
          case '17':
            this.huabei.id = element.classtype
            this.huabeiArr = element.data
          break;
          // 竞品狙击
          case '18':
            this.jptkl.id = element.classtype
            this.jptklArr = element.data
            this.jptkl.serviceId = element.data
          break;
          // 好评优化
          case '19':
            this.evaluation.id = element.classtype
            this.evaluationArr = element.data
          break;
          // 图文好评
          case '20':
            this.imagetext.id = element.classtype
            this.imagetext.serviceId = element.data[0].id
          break;
          // 月均消费额度,暂时没用
          case '21':
            // this.jptklArr = element.data
          break;
          // 自定义短语
          case '23':
            this.msgtext.id = element.classtype
            this.msgtext.serviceId = element.data[0].id
          break;
          // 京享值,京东用
          case '24':
            this.valuejingxiang.id = element.classtype
            this.optionsJingXiang = element.data
          break;
          // 会员等级,阿里巴巴用
          case '25':
            this.valuevip.id = element.classtype
            this.optionsVIP = element.data
          break;
          // 自动审核上线
          case '26':
            this.audit.id = element.classtype
            this.audit.serviceId = element.data[0].id
          break;
        }
      })
    },
    //获取商品类型的以及显示的类型文案
    async getLabel (id,type){
      if(type == 1){
        if(id){
          // 循环赋值显示文案
          this.optionsBq1.forEach(element=>{
            if(element.id == id){
              this.limitValue1 = element.value
            }
          })
        }else{
          this.limitValue1 = ''
        }
        this.limitType2.state = ''
        this.limitValue2 = ''
        // 获取对应小类数据
        let data = await this.ajax({
          url: `PublishInterface/label?tk=${sessionStorage.token}`,
          data: {'type':2,'id':id},
          needAlert:false
        })
        if(!data) return false
        this.optionsBq2 = data.data
      }else{
        this.optionsBq2.forEach(element=>{
          if(element.id == id){
            this.limitValue2 = element.text
          }
        })
      }
    },
    async getPlanData(pctype,ordertype,limitcashtype){
      // 获取对应人气计划数据
      let data = await this.ajax({
        url: `PublishInterface/rewardrank?tk=${sessionStorage.token}`,
        data: {pctype,ordertype,limitcashtype},
        needAlert:false
      })
      if(!data) return false
      // 赋值首日到店价格
      this.generalG = data.korder
      // 赋值佣金
      this.yongjin = data.com
      // 赋值人气计划数据
      this.renqiPlanArr = data.popu
      this.renqiPlanArr1 = JSON.parse(JSON.stringify(data.popu))
    },
    async getArea (pid,item,item2) {
      //item2 控制修市县取消选择
      if(item2 == 1){
        this.city = ``
        this.county = ``
      }
      if(item2 == 2){
        this.county = ``
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
    async getAddress(id){
      if(id!=0){
        let data = await this.ajax({
          url: `SellerAccountInterface/getshopdetail?tk=${sessionStorage.token}`,
          needAlert:false,
          data: {"shopid": id}
        })
        if(!data) return false
        this.addresserName = data.data[0].addresser
        this.addresserPhone = data.data[0].addresser_num
        this.province = data.data[0].province
        this.addresser = data.data[0].hair_addr_detail
        //获得市
        this.city = data.data[0].city
        await this.getArea(data.data[0].province, 'cityArr')
        //获得区
        this.county = data.data[0].county
        await this.getArea(data.data[0].city, 'countyArr')

        let a,b,c
        this.provinceArr.forEach(element=>{
          if(element.id == this.province){
            a = element.name
          }
        })
        this.cityArr.forEach(element=>{
          if(element.id == this.city){
            b = element.name
          }
        })
        this.countyArr.forEach(element=>{
          if(element.id == this.county){
            c = element.name
          }
        })
        this.showAddresser = a+b+c+this.addresser
      }
    },
    //选择器，用来触发元素选中状态
    chooseitem (item,str) {
      this[item] = str
      //如果是切换平台类型，需要重置进店渠道、商铺。
      if(item == 'shopType'){
        //循环获取ID，重置人气计划数据
        this.shopTypeList.forEach(element=>{
          if(element.val == str){
            this.getPlanData(element.id,this.activeNameId,this.backtype)     //切换人气计划数据
          }
        })
        //切换时重置增值服务数据
        this.shopName = this.$options.data().shopName         //取消店铺数据
        this.activeName = this.$options.data().activeName //重置进店方式
        this.tkltkl = this.$options.data().tkltkl //重置淘口令
        this.activeNameId = this.$options.data().activeNameId         // 进店渠道ID   1
        this.firstdaynum = this.$options.data().firstdaynum         // 首日到店访客数   0
        this.taskactionday = this.$options.data().taskactionday     // 任务执行天数     0
        this.isrise = this.$options.data().isrise                   // 访客每日增长量   0
        this.risenum = this.$options.data().risenum                 // 增长人数        0
        this.risenumFlag = this.$options.data().risenumFlag         // 默认不选中每日增长,设置为禁用状态   true
        this.planNum = this.$options.data().planNum                 // 七天数据
        this.setTimeRangeArr = this.$options.data().setTimeRangeArr // 自定义弹窗数据
        this.countPlan = this.$options.data().countPlan             // 关键字人气，人气计划数据
        this.countPlan1 = this.$options.data().countPlan1           // 回访第一天，人气计划数据
        this.countPlan2 = this.$options.data().countPlan2           // 回访第二天，人气计划数据
        this.planPrice = this.$options.data().planPrice             // 关键字人气，人气计划价格
        this.planPrice1 = this.$options.data().planPrice1           // 回访第一天，人气计划价格
        this.planPrice2 = this.$options.data().planPrice2           // 回访第二天，人气计划价格
        this.yongjinArr = this.$options.data().yongjinArr           // 重置佣金合计计算
        this.gjzmianze = this.$options.data().gjzmianze             // 每次切换店铺类型就显示关键字弹窗显示
      }
      //切换立返货返时，要进行获取数据
      if(item == 'backtype'){
        //切换进店方式时，重置人气计划数据
        this.shopTypeList.forEach(element=>{
          if(element.val == this.shopType){
            this.getPlanData(element.id,this.activeNameId,this.backtype)     //切换人气计划数据
          }
        })
      }
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
      // flag === false?'':flag = true
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
    changeGoodsdetail(url){
      this.goodsdetail[0] = url
    },
    // 修改关键词单数不可为小数
    checkint(index){
      this.$nextTick(()=>{
        if(String(this.keywordArr[index].num).indexOf('.') != -1){
          this.keywordArr[index].num = Math.round(this.keywordArr[index].num)
        }
      })
    },
    // 修改下单天数不可为空
    checkplanNum(x,y){
      this.$nextTick(()=>{
        if(String(this.planNum[x][y]).indexOf('.') != -1){
          this.planNum[x][y] = Math.round(this.planNum[x][y])
        }
      })
    },
    //修改首日人数为10的倍数
    checkfirstdaynum(){
      this.$nextTick(()=>{
        if(this.firstdaynum%10 != 0){
          this.firstdaynum = this.firstdaynum+(10-this.firstdaynum%10)
        }
      })
    },
    //下单关键词
    addkeyword () {
      let num = this.shopType == 'tb' || this.shopType == 'tm'? 10:5
      if(this.keywordArr.length < num){
        this.keywordArr.push({
          'value': this.shopType,
          'options': this.options,
          'setKeywordDialog': false,  // 关键词弹窗
          'setRange': {
            tableData:[
              {str:'分类名称',str1:'风格',str2:'材质',},
              {str:'分类关键词',str1:'休闲',str2:'蚕丝',}
            ],
            zhekouState:[],
            paixuState:``
          },
          'keyword': '',
          'num': 0
        })
      }else{
        Message({
          message: `最多只能设置${num}组关键字`,
          duration: 1500,
          type: 'error'
        });
      }
    },
    removekeyword (index) {
      if(this.keywordArr.length > 1){
        this.keywordArr.splice(index, 1)
      }else{
        Message({
          message: `最少需设置1组关键字`,
          duration: 1500,
          type: 'error'
        });
      }
    },
    // 好评关键词
    addList (item,length = 5) {
      if(this[item].length < length){
        switch(item){
          case 'keywordlist':
            this[item].push('')
          break;
          case 'msgList':
            this[item].push('')
          break;
          case 'imgArr':
            this[item].push({'text':'', imgList:['','','','','']})
          break;
        }
      }else {
        Message({
          message: `最多只能设置${length}组关键字`,
          duration: 1500,
          type: 'error'
        });
      }
    },
    removeList (item) {
      if(this[item].length > 1){
        this[item].pop()
      }else {
        Message({
          message: `至少设置1组关键字`,
          duration: 1500,
          type: 'error'
        });
      }
    },
    changeTabs (obj){
      //如果是编辑obj就是string,切换tab时，obj就是object
      let orderid
      if(typeof obj == 'object'){
        orderid = obj.$el.getAttribute('dataid')
        this.activeNameId = orderid
        //显示关键词免责弹窗
        if(orderid == 1){
          this.gjzmianze = true
        }
        //显示直通车免责弹窗、京东快车是10
        if(orderid == 5){
          this.ztcmianze = true
        }
      }else{
        orderid = obj
      }
      //切换进店方式时，重置人气计划数据
      this.shopTypeList.forEach(element=>{
        if(element.val == this.shopType){
          this.getPlanData(element.id,orderid,this.backtype)     //切换人气计划数据
        }
      })
      //切换tabs时,重置keywordArr
      this.keywordArr = [{
        'value': this.shopType,
        'options': this.options,
        'setKeywordDialog': false,  // 关键词弹窗
        'setRange': {
          tableData:[
            {str:'分类名称',str1:'风格',str2:'材质',},
            {str:'分类关键词',str1:'休闲',str2:'蚕丝',}
          ],
          zhekouState:[],
          paixuState:``
        },
        'keyword': '',
        'num': 0
      }]
      //切换时重置增值服务数据
      this.tkltkl = this.$options.data().tkltkl //重置淘口令
      this.jhsdatetime = this.$options.data().jhsdatetime //重置淘抢购、聚划算时间
      this.tqgType = this.$options.data().tqgType //重置淘抢购类型
      this.jhstype = this.$options.data().jhstype //重置聚划算类型
      this.firstdaynum = this.$options.data().firstdaynum         // 首日到店访客数   0
      this.taskactionday = this.$options.data().taskactionday     // 任务执行天数     0
      this.isrise = this.$options.data().isrise                   // 访客每日增长量   0
      this.risenum = this.$options.data().risenum                 // 增长人数        0
      this.risenumFlag = this.$options.data().risenumFlag         // 默认不选中每日增长,设置为禁用状态   true
      this.planNum = this.$options.data().planNum                 // 七天数据
      this.setTimeRangeArr = this.$options.data().setTimeRangeArr // 自定义弹窗数据
      this.countPlan = this.$options.data().countPlan             // 关键字人气，人气计划数据
      this.countPlan1 = this.$options.data().countPlan1           // 回访第一天，人气计划数据
      this.countPlan2 = this.$options.data().countPlan2           // 回访第二天，人气计划数据
      this.planPrice = this.$options.data().planPrice             // 关键字人气，人气计划价格
      this.planPrice1 = this.$options.data().planPrice1           // 回访第一天，人气计划价格
      this.planPrice2 = this.$options.data().planPrice2           // 回访第二天，人气计划价格
      this.yongjinArr = this.$options.data().yongjinArr           // 重置佣金合计计算
    },
    //取消单选框数据的操作
    cancelRadio (event,item){
      if(event.target.checked && event.target.tagName == "INPUT"){
        if(this[item].state){
          this[item].state =''
        }
      }
    },
    //用来获取子标签人气计划中的数据
    getVisitorNum (type, title, amount, price, radio, day, operatenum, addaout) {
      function MyLoop(that,item){
        let sum = 0 //用来计算合计价格
        let flag = false
        that[item].forEach(element => {
          if(type == element.type){
            element.title = title
            element.amount = amount
            element.price = price
            element.radio = radio
            element.operatenum = operatenum
            element.addaout = addaout
            flag = true;
          }
          sum += element.price
        })
        if(!flag){
          that[item].push({type,title,amount,price,radio,operatenum,addaout})
          sum += price
        }
        //用来计算佣金合计的数据
        that.yongjinArr = [...that.countPlan,...that.countPlan1,...that.countPlan2]
        //处理回访想同类目的比例
        if(day==1||day==2){
          that.countPlan1.forEach(element=>{
            that.countPlan2.forEach(e=>{
              if(element.title == e.title){
                if(element.operatenum + e.operatenum >1){
                    Message({
                      message: `${element.title}两天设置总计不可超出百分百`,
                      duration: 1500,
                      type: 'error',
                      showClose:'true'
                    })
                }
              }
            })
          })
        }
        return sum.toFixed(2)
      }
      this.$nextTick(() => {
        day == 0 ?this.planPrice = MyLoop(this, 'countPlan'):''
        day == 1 ?this.planPrice1 = MyLoop(this, 'countPlan1'):''
        day == 2 ?this.planPrice2 = MyLoop(this, 'countPlan2'):''
      })
    },
    // 人气计划中各个类型平台显示不同的信息，return true为显示
    showItem (day,type){
      //day 0为关键词 1为回访第一天 2位回访第二天
      switch(type){
        case '1': // 收藏商品 //关注商品
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return true
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '2': // 关注店铺
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return true
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '3': // 加入购物车
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return false
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '4': // 领取优惠券
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return true
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return false
            if(this.shopType =='jd') return false
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '5': // 领取红包
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return false
            if(this.shopType =='pdd') return false
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return false
            if(this.shopType =='jd') return false
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return false
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '6': // 分享商品
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return false
            if(this.shopType =='pdd') return true
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return false
            if(this.shopType =='jd') return false
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return false
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '7': // 浏览评价页面
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return true
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return false
            if(this.shopType =='jd') return false
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '8': // 货比三家
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return false
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return false
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return false
            if(this.shopType =='jd') return false
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        case '9': // 随机浏览副商品
          if(day == 0){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
            if(this.shopType =='pdd') return false
          }else if(day == 1){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else if(day == 2){
            if(this.shopType =='tb' || this.shopType =='tm' || this.shopType =='albb') return true
            if(this.shopType =='jd') return true
          }else{
            alert('人气计划数据错误，请联系管理员')
            return false
          }
        break;
        default:
          return false
        break;
      }
    },
    //添加增值服务费用合计列表,下拉框模式
    addServerList (obj,arr,name){
      // 加赏佣金需要*单数，其他的默认1即可
      let ordernum = 1
      //如果此服务被选中，则添加进增值服务；
      if(obj.state){
        arr.forEach(element=>{
          if(element.id == obj.state){
            let price = element.price
            let flag = false
            this.serverArr.forEach(element=>{
              if(element.name == name){
                element.price = price
                flag = true
              }
            })
            if(!flag){
              this.serverArr.push({name,price,ordernum})
            }
            return false
          }
        })
      }else{
        this.serverArr = this.serverArr.filter(element=>{
          if(element.name != name){
            return element
          }
        })
      }
    },
    //添加增值服务费用合计列表,单选框模式
    addServerListRadio (item,name,price){
      this.$nextTick(()=>{
        if(typeof item == "object") {
          item = item.state
        }
        // 加赏佣金需要*单数，用0代表，增值服务中监听单数，防止先修改加赏佣金，后修改单数时，值没变化；其他的默认1即可
        let ordernum = 1
        if(name=="加赏佣金" || name=="好评优化" || name=="自定义短语好评" || name=="图文好评"){ordernum = 0}
        if(name=="加赏佣金"){price = parseFloat(this.rewardValue)}
        if(name=="竞品狙击"){
          // 浏览人数、收藏商品人数、加购人数
          let a = parseFloat(this.jptklArr[0].price)*parseInt(this.browsenum)
          let b = parseFloat(this.jptklArr[1].price)*parseInt(this.collectnum)
          let c = parseFloat(this.jptklArr[2].price)*parseInt(this.shoppingnum)
          price = (a+b+c).toFixed(2)
        }
        //如果item不为false，则添加进增值服务；
        if(item){
              let flag = false
              this.serverArr.forEach(element=>{
                if(element.name == name){
                  element.price = price
                  flag = true
                }
              })
              if(!flag){
                this.serverArr.push({name,price,ordernum})
              }
        }else{
          this.serverArr = this.serverArr.filter(element=>{
            if(element.name != name){
              return element
            }
          })
        }
      })
    },
    //设置开启自定义下单数量弹窗
    setCustom () {
      if(this.enterTime.state=="67" && this.setAmount != 0){
        this.customDialog = true
        //如果执行天数为0 就显示一条弹窗数据
        if(this.taskactionday == 0){
          this.setTimeRangeArr[0].amount = this.setAmount
        }else{
          //数组长度与选择的天数不一致，就重新编辑
          if(this.setTimeRangeArr.length != this.taskactionday){
            let arr = []
            let curDate = new Date().getTime();
            //关键词人气需要添加显示多条数据
            for(let i=0;i<this.taskactionday;i++){
              let nowDate = new Date(curDate + 24*60*60*1000*i)
              let amount = this.planNum[i].reduce((total, num) => total + num)
              arr.push({date:nowDate,amount:amount,data:[{'time':'','num':0}]})
            }
            this.setTimeRangeArr = arr
          }
        }
      }else{
        Message({
          message: `请先设置下单数量并选中自定义`,
          duration: 1500,
          type: 'error',
          showClose:'true'
        })
      }
    },
    //赋值条件筛选数据的回调函数
    dialogData (obj,index) {
      for(let item in obj){
        if(item in this.keywordArr[index]){
          this.keywordArr[index][item] = obj[item]
        }else{
          this.keywordArr[index][item]=""
        }
      }
    },
    //设置自定义下单弹窗的回调函数
    setTimeData (item,arr){
      this[item] = false
      if(arr){
        this.setTimeRangeArr = arr
      }
    },
    //取消保存地址
    cancelAddress () {
      this.addressState = 1
      this.getAddress(this.shopName)
    },
    //保存修改地址
    async saveAddress () {
      this.addressState = 1
      let id = this.shopName
      let province = this.province
      let city = this.city
      let county = this.county
      let hair_addr_detail = this.addresser
      let addresser = this.addresserName
      let addresser_num = this.addresserPhone
      if(id == 0) return false
      let data = await this.ajax({
        url: `SellerAccountInterface/editShop?tk=${sessionStorage.token}`,
        data: {id, province, city, county, hair_addr_detail, addresser, addresser_num},
        withCredentials: true
      })
      if(!data) return false
      this.getAddress(id)
    },
    //智能匹配与限制选择只能二选一；
    chooselimit () {
      this.$nextTick(()=>{
        if(this.match.state){
          this.valuesex.state=""
          this.valueage.state=""
          this.valuebuy.state=""
          this.valuetqz.state=""
          this.valuexy.state=""
          this.valuezm.state=""
          this.limitType1.state=""
          this.limitType2.state=""
          this.limitValue1=""
          this.limitValue2=""
        }
      })
    },
    //点击任意地方取消出错的信息
    cancelErr(){
      // //获取当前鼠标焦点
      // var triggerElement = document.activeElement
      // // 获取当前鼠标焦点的label的属性
      // if(triggerElement.getAttribute('id') != "submit"){
      //   let list = document.querySelectorAll("[err='y']")
      //   if(list.length>0){
      //     Array.from(list).forEach((element)=>{
      //       element.removeAttribute("err")
      //     })
      //   }
      // }
    },
    jump(id){
      let jump = document.getElementById(id)
      if(jump == null) jump = document.getElementById('jump3')
      // jump.setAttribute("err","y")
      function pageY(elem){
        return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop
      }
      document.documentElement.scrollTop = pageY(jump)
    },
    //提交发布任务信息
    async submit () {
      //状态码
      let flag = true

      //平台数据
      let pctype = this.shopType
      this.shopTypeList.forEach(element=>{
        if(element.val == pctype){
          pctype = element.id
        }
      })
      //店铺数据
      let shopid = this.shopName
      if(shopid == 0){
        Message({
          message: `请选择商铺`,
          duration: 1500,
          type: 'error'
        })
        this.jump("jump1")
        return false
      }
      //任务渠道、返款方式、商品链接、商品标题、主图、副图、单品售价、每单拍、展示价格
      let clientype = this.channel
      let limitcashtype = this.backtype
      let commodityurl = this.itemurl
      let commodityname = this.itemtitle
      let commoditymasterimgurl = this.imageUrl1
      let commoditypcimgurl = this.imageUrl2
      let commodityprice = this.price
      let personbuycount = this.count
      let commodityshowprice = this.showPrice
      // 支付要求,优惠券、信用卡、花呗、拼多多支付要求
      let buytypecoupon = this.buytypecoupon?1:0
      let buytypecard = this.buytypecard?1:0
      let buytype = this.buytype?1:0
      let orderbuytype = this.pddCheckList
      // 产品包邮/不包邮、备注
      let logmoney = this.baoyoustate
      let remark = this.orderRemark
      // 总计下单人数
      let ordertotal = this.setAmount
      if(this.countTask!=0 && this.setAmount>this.countTask){
        Message({
          message: `下单人数不可大于总计访客数量`,
          duration: 1500,
          type: 'error'
        })
        return false
      }

      // 需要验证的数据
      let validataArr = [
        {'val': commodityurl, 'type': 'isnull', 'name': '商品链接'},
        {'val': commodityname, 'type': 'isnull', 'name': '商品标题'},
        {'val': commoditymasterimgurl, 'type': 'imgurl', 'name': '商品主图'},
        {'val': commodityprice, 'type': 'minint', 'name': '单品售价'},
        {'val': personbuycount, 'type': 'minint', 'name': '每单的件数'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr)) {
        this.jump("jump2")
        return false
      }
      // 需要验证的数据
      let validataArr1 = [
        {'val': ordertotal, 'type': 'minint', 'name': '下单人数'}
      ]
      //如果验证不通过就return false
      if(!validata(validataArr1)) {
        if(this.activeNameId == 3 || this.activeNameId == 4){
          this.jump("jump5")
        }else{
          this.jump("jump3")
        }
        return false
      }
      //------------------------------------------------ 第一步数据完成

      //进店渠道ID
      let ordertype = this.activeNameId

      // data2数据(关键词数据)
      let data2=[]
      if(ordertype == 1||ordertype == 2||ordertype == 3||ordertype == 4||ordertype == 5||ordertype == 10){
        this.keywordArr.forEach(element=>{
          //关键词、下单数、流量入口
          let keyword = element.keyword||""
          let pordernum = element.num
          let keywordclass = ''
          this.shopTypeList.forEach(e=>{
            if(e.val == element.value){
              keywordclass = e.id
            }
          })
          // 分类名称、分类关键词
          let type1,type2,type3,type4
          let typekey1,typekey2,typekey3,typekey4
          element.setRange.tableData.forEach((e,i)=>{
            if(i==0){
              type1 = e.data1||''
              type2 = e.data2||''
              type3 = e.data3||''
              type4 = e.data4||''
            }else{
              typekey1 = e.data1||''
              typekey2 = e.data2||''
              typekey3 = e.data3||''
              typekey4 = e.data4||''
            }
          })
          // 折扣服务
          let discount1=0,discount2=0,discount3=0,discount4=0,discount5=0,discount6=0,discount7=0,discount8=0,discount9=0,discount10=0,discount11=0
          element.setRange.zhekouList?
          element.setRange.zhekouList.forEach(e=>{
            e.name=='discount1'?discount1=e.val:''
            e.name=='discount2'?discount2=e.val:''
            e.name=='discount3'?discount3=e.val:''
            e.name=='discount4'?discount4=e.val:''
            e.name=='discount5'?discount5=e.val:''
            e.name=='discount6'?discount6=e.val:''
            e.name=='discount7'?discount7=e.val:''
            e.name=='discount8'?discount8=e.val:''
            e.name=='discount9'?discount9=e.val:''
            e.name=='discount10'?discount10=e.val:''
            e.name=='discount11'?discount11=e.val:''
          }):''
          // 排序方式、价格区间start\end、发货地址(市级ID)
          let keywordorderbyid = element.setRange.paixuState
          let pricestart = element.priceStart
          let priceend = element.priceEnd
          let sendarea = element.city||""
          // 凌晨单数据
          let linchendate = this.linchenDate
          let startime = this.startLinchen
          let endtime = this.endLinchen
          let jobstate = this.bindDate?1:0
          if(ordertype == 2){
            // 需要验证的数据
            let validataArr = [
              {'val': keyword, 'type': 'isnull', 'name': '关键字'},
              {'val': linchendate, 'type': 'isnull', 'name': '下单日期'},
              {'val': startime, 'type': 'isnull', 'name': '下单时间'},
              {'val': endtime, 'isnull': 'isnull', 'name': '下单结束时间'}
            ]
            //如果验证不通过就return false
            if(!validata(validataArr)) {
              flag = false
            }
          }else{
            // 需要验证的数据
            let validataArr = [
              {'val': keyword, 'type': 'isnull', 'name': '关键字'}
            ]
            //如果验证不通过就return false
            if(!validata(validataArr)) {
              flag = false
            }
          }
          data2.push({keyword,pordernum,keywordclass,type1,type2,type3,type4,
                    typekey1,typekey2,typekey3,typekey4,discount1,discount2,
                    discount3,discount4,discount5,discount6,discount7,discount8,
                    discount9,discount10,discount11,keywordorderbyid,pricestart,
                    priceend,sendarea,linchendate,startime,endtime,jobstate})
        })
      }
      if(!flag) {
        this.jump("jump3")
        return false
      }
      // data3数据(淘口令之类)
      // 淘口令、二维码、淘抢购类型、聚划算类型、淘抢购所在场次\聚划算开团时间
      let taskpassword = this.tkltkl
      let qrcodeurl = this.tbqrfile
      let rushtype = this.tqgType
      let hottype = this.jhstype
      let hotsdate = this.jhsdatetime
      // 淘口令、淘抢购、聚划算、拼多多直接访问、阿里口令
      if(ordertype == 6||ordertype == 8||ordertype == 9||ordertype == 11||ordertype == 12){
        let validataArr = [
          {'val': taskpassword, 'type': 'isnull', 'name': '进店口令'}
        ]
        if(!validata(validataArr)) {flag = false}
      }
      // 二维码
      if(ordertype == 7){
        let validataArr = [
          {'val': qrcodeurl, 'type': 'imgurl', 'name': '二维码'}
        ]
        if(!validata(validataArr)) {flag = false}
      }
      // 淘抢购
      if(ordertype == 8){
        let validataArr = [
          {'val': hotsdate, 'type': 'isnull', 'name': '淘抢购所在场次'}
        ]
        if(!validata(validataArr)) {flag = false}
      }
      // 聚划算
      if(ordertype == 9){
        let validataArr = [
          {'val': hotsdate, 'type': 'isnull', 'name': '聚划算开团时间'}
        ]
        if(!validata(validataArr)) {flag = false}
      }
      let data3 = {taskpassword,qrcodeurl,rushtype,hottype,hotsdate}
      if(!flag) {
        this.jump("jump3")
        return false
      }
      // data5\data6数据(人气计划)
      let data5,data6
      // 执行任务天数
      let alldays=this.taskactionday
      // 不是凌晨单，人气，回访，判断是否填写任务天数
      if(ordertype !=2 && ordertype!=3 && ordertype!=4){
        let validataArra = [
          {'val': alldays, 'type': 'minint', 'name': '任务执行天数'}
        ]
        if(!validata(validataArra)) {
          this.jump("jump4")
          return false
        }
      }

      // 首日到店访客、每日增长量(0不增长，正数增长)
      let firstdaynum=0,addpersoncount=0
      //人气计划数据
      let proportion1,proportion2,proportion3,proportion4,proportion5,proportion6,
          proportion7,proportion8,proportion9,proportion10,proportion11,proportion12,proportion13
      let isincrease1,isincrease2,isincrease3,isincrease4,isincrease5,isincrease6,
          isincrease7,isincrease8,isincrease9,isincrease10,isincrease11,isincrease12,isincrease13
      //关键词人气或者回访
      if(ordertype ==3||ordertype==4){
        firstdaynum = this.firstdaynum
        addpersoncount = this.isrise=="1"?0:this.risenum
        if(firstdaynum%10 != 0){
          Message({
            message: `请正确填写首日到店访客数量`,
            duration: 1500,
            type: 'error',
            showClose:'true'
          })
          this.jump("jump4")
          return false
        }
        let validataArr = [
          {'val': alldays, 'type': 'minint', 'name': '任务执行天数'},
          {'val': firstdaynum, 'type': 'minint', 'name': '首日到店访客'}
        ]
        if(!validata(validataArr)) {
          this.jump("jump4")
          return false
        }
        //添加data5\data6数据
        if(ordertype == 3){
          this.countPlan.forEach(element=>{
            switch(element.title){
              case "收藏商品":
                proportion1 = element.operatenum
                isincrease1 = element.addaout
              break;
              case "关注店铺":
                proportion2 = element.operatenum
                isincrease2 = element.addaout
              break;
              case "加入购物车":
                proportion3 = element.operatenum
                isincrease3 = element.addaout
              break;
              case "领取优惠券":
                proportion4 = element.operatenum
                isincrease4 = element.addaout
              break;
              case "领取红包":
                proportion5 = element.operatenum
                isincrease5 = element.addaout
              break;
              case "分享商品":
                proportion6 = element.operatenum
                isincrease6 = element.addaout
              break;
              case "浏览评价页面":
                proportion7 = element.operatenum
                isincrease7 = element.addaout
              break;
              case "货比三家":
                proportion8 = element.operatenum
                isincrease8 = element.addaout
              break;
              case "随机浏览副商品":
                proportion9 = element.operatenum
                isincrease9 = element.addaout
              break;
            }
          })
          data5={proportion1,proportion2,proportion3,proportion4,proportion5,proportion6,proportion7,proportion8,proportion9,
                isincrease1,isincrease2,isincrease3,isincrease4,isincrease5,isincrease6,isincrease7,isincrease8,isincrease9,}
        }else{
           this.countPlan1.forEach(element=>{
            switch(element.title){
              case "收藏商品":
                proportion1 = element.operatenum
                isincrease1 = element.addaout
              break;
              case "关注店铺":
                proportion2 = element.operatenum
                isincrease2 = element.addaout
              break;
              case "加入购物车":
                proportion3 = element.operatenum
                isincrease3 = element.addaout
              break;
              case "货比三家":
                proportion4 = element.operatenum
                isincrease4 = element.addaout
              break;
              case "随机浏览副商品":
                proportion5 = element.operatenum
                isincrease5 = element.addaout
              break;
            }
          })
           this.countPlan2.forEach(element=>{
            switch(element.title){
              case "收藏商品":
                proportion6 = element.operatenum
                isincrease6 = element.addaout
              break;
              case "关注店铺":
                proportion7 = element.operatenum
                isincrease7 = element.addaout
              break;
              case "加入购物车":
                proportion8 = element.operatenum
                isincrease8 = element.addaout
              break;
              case "领取优惠券":
                proportion9 = element.operatenum
                isincrease9 = element.addaout
              break;
              case "领取红包":
                proportion10 = element.operatenum
                isincrease10 = element.addaout
              break;
              case "分享商品":
                proportion11 = element.operatenum
                isincrease11 = element.addaout
              break;
              case "浏览评价页面":
                proportion12 = element.operatenum
                isincrease12 = element.addaout
              break;
              case "随机浏览副商品":
                proportion13 = element.operatenum
                isincrease13 = element.addaout
              break;
            }
          })
          this.countPlan1.forEach(e1=>{
            this.countPlan2.forEach(e=>{
              if(e1.title == e.title){
                if(e1.operatenum + e.operatenum >1){
                  Message({
                    message: `${e1.title}两天设置总计不可超出百分百`,
                    duration: 1500,
                    type: 'error',
                    showClose:'true'
                  })
                  flag = false
                }
              }
            })
          })
          data6={proportion1,proportion2,proportion3,proportion4,proportion5,proportion6,proportion7,
                proportion8,proportion9,proportion10,proportion11,proportion12,proportion13,
                isincrease1,isincrease2,isincrease3,isincrease4,isincrease5,isincrease6,isincrease7,
                isincrease8,isincrease9,isincrease10,isincrease11,isincrease12,isincrease13}
        }
      }
      if(!flag) {
        this.jump("jump6")
        return false
      }

      // data8数据(下单计划)
      let data8 = []
      if(ordertype ==3||ordertype==4){
        for(let i=0;i<alldays;i++){
         let sum = this.planNum[i].reduce((total, num) => total + num)
          if(sum > 0){
            let totalperson = sum
            let days = i+1
            let c1 = this.planNum[i][0]
            let c2 = this.planNum[i][1]
            let c3 = this.planNum[i][2]
            let c4 = this.planNum[i][3]
            let c5 = this.planNum[i][4]
            data8.push({totalperson,days,c1,c2,c3,c4,c5})
          }else{
            Message({
              message: `第${i+1}天未设置单数`,
              duration: 1500,
              type: 'error',
              showClose:'true'
            })
            flag = false
            return false
          }
        }
      }
      if(!flag) {
        this.jump("jump5")
        return false
      }
      // data4数据(增值服务)、data7数据(如果用户选择自定义入店时间分布时用到的数据)
      let data4 = []
      let data7 = []
      // data1部分数据,性别、年龄、购买力、淘气值、信用、芝麻积分、限制标签
      let limitsex,limitage,limitpower,limitenergy,limitcredit,limitpoints,limitlabel
      // data1部分数据,智能匹配(0/1)、买号权重(0/选中的ID)、任务开始时间、结束时间、是否自动取消(0/1)、是否自定义下单(0/1)、加赏佣金(默认0)
      let isai=0,weight=1,stime,etime,isautocancle=0,iscustomrelease=0,rewardgoldcoin=0
      // data1部分数据,优先审核(0/1)、竞品淘口令、竞品浏览人数、竞品收藏人数、竞品加购人数、是否有图文评价(0/1)
      let isfirst=0,competitive,competitivebrowse,competitivecollection,competitiveaddcart,havingpic=0
      // 性别限制
      if(this.valuesex.state){
        let addserviceid = this.valuesex.id
        let othervalue = this.valuesex.state
        limitsex = this.valuesex.state
        data4.push({addserviceid,othervalue})
      }
      // 年龄限制
      if(this.valueage.state){
        let addserviceid = this.valueage.id
        let othervalue = this.valueage.state
        limitage = this.valueage.state
        data4.push({addserviceid,othervalue})
      }
      // 购买力限制
      if(this.valuebuy.state){
        let addserviceid = this.valuebuy.id
        let othervalue = this.valuebuy.state
        limitpower = this.valuebuy.state
        data4.push({addserviceid,othervalue})
      }
      // 淘气值限制
      if(this.valuetqz.state){
        let addserviceid = this.valuetqz.id
        let othervalue = this.valuetqz.state
        limitenergy = this.valuetqz.state
        data4.push({addserviceid,othervalue})
      }
      // 买号信誉限制
      if(this.valuexy.state){
        let addserviceid = this.valuexy.id
        let othervalue = this.valuexy.state
        limitcredit = this.valuexy.state
        data4.push({addserviceid,othervalue})
      }
      // 芝麻积分限制
      if(this.valuezm.state){
        let addserviceid = this.valuezm.id
        let othervalue = this.valuezm.state
        limitpoints = this.valuezm.state
        data4.push({addserviceid,othervalue})
      }
      // 阿里巴巴会员等级限制
      if(this.valuevip.state){
        let addserviceid = this.valuevip.id
        let othervalue = this.valuevip.state
        data4.push({addserviceid,othervalue})
      }
      // 京东京享值限制
      if(this.valuejingxiang.state){
        let addserviceid = this.valuejingxiang.id
        let othervalue = this.valuejingxiang.state
        data4.push({addserviceid,othervalue})
      }
      // 消费限制标签
      if(this.limitType2.state){
        let addserviceid = this.limitType2.id
        let othervalue = this.limitType2.state
        if(this.limitType1.state!=""&&this.limitType2.state==""){
          Message({
            message: `请选择消费限制标签`,
            duration: 1500,
            type: 'error',
            showClose:'true'
          })
          this.jump('jump7')
          return false
        }
        data4.push({addserviceid,othervalue})
      }
      // 智能匹配人群
      if(this.match.state){
        let addserviceid = this.match.id
        let othervalue = {val:"choose",id:this.match.serviceId}
        isai = 1
        data4.push({addserviceid,othervalue})
      }
      // 优先审核
      if(this.review.state){
        let addserviceid = this.review.id
        let othervalue = {val:"choose",id:this.review.serviceId}
        isfirst = 1
        data4.push({addserviceid,othervalue})
      }
      // 任务开始时间
      if(this.starttime.state){
        let addserviceid = this.starttime.id
        let othervalue = {val:"choose",id:this.starttime.serviceId}
        stime = this.startDate
        etime = this.endDate
        isautocancle = this.endtime?"1":"0"
        let validataArr = [
          {'val': stime, 'type': 'isnull', 'name': '任务开始时间'},
          {'val': etime, 'type': 'isnull', 'name': '任务结束时间'}
        ]
        if(!validata(validataArr)) {
          this.jump('jump7')
          return false
        }
        data4.push({addserviceid,othervalue})
      }
      // 入店时间优化
      if(this.enterTime.state){
        let addserviceid = this.enterTime.id
        let othervalue = this.enterTime.state
        // 67是自定义
        if(this.enterTime.state == '67'){
          iscustomrelease=1
          let sum = 0
          let cflag = true
          this.setTimeRangeArr.forEach(element=>{
            let datepart = element.date
            let num = element.amount
            let data = []
            element.data.forEach(e=>{
              data.push({settime:e.time,setamount:e.num})
              sum += e.num
              if(e.time == ""&&e.num!=0){cflag = false}
            })
            data7.push({datepart,num,data})
          })
          if (sum != this.setAmount){
            Message({
              message: `自定义单数与设置单数不符`,
              duration: 1500,
              type: 'error',
              showClose:'true'
            })
            this.jump('jump8')
            return false
          }
          if (!cflag){
            Message({
              message: `自定义发布时间未设置`,
              duration: 1500,
              type: 'error',
              showClose:'true'
            })
            this.jump('jump8')
            return false
          }
        }
        data4.push({addserviceid,othervalue})
      }
      // 提升完成速度
      if(this.recommend.state){
        let addserviceid = this.recommend.id
        let othervalue = this.recommend.state
        data4.push({addserviceid,othervalue})
      }
      // 加赏佣金
      if(this.reward.state){
        let addserviceid = this.reward.id
        let othervalue = {val:"choose",id:this.reward.serviceId}
        rewardgoldcoin = this.rewardValue
        data4.push({addserviceid,othervalue})
      }
      // 自动审核上线
      if(this.audit.state){
        let addserviceid = this.audit.id
        let othervalue = {val:"choose",id:this.audit.serviceId}
        data4.push({addserviceid,othervalue})
      }
      // 限制下单任务周期
      if(this.period.state){
        let addserviceid = this.period.id
        let othervalue = this.period.state
        data4.push({addserviceid,othervalue})
      }
      // 同买手接不同任务限制
      if(this.shopPeriod.state){
        let addserviceid = this.shopPeriod.id
        let othervalue = this.shopPeriod.state
        data4.push({addserviceid,othervalue})
      }
      // 买号权重
      if(this.weight.state){
        let addserviceid = this.weight.id
        let othervalue = this.weight.state
        weight = this.weight.state
        data4.push({addserviceid,othervalue})
      }
      // 花呗号下单
      if(this.huabei.state){
        let addserviceid = this.huabei.id
        let othervalue = this.huabei.state
        data4.push({addserviceid,othervalue})
      }
      // 竞品狙击
      if(this.jptkl.state){
        let addserviceid = this.jptkl.id
        let othervalue = "choose"
        competitive = this.jptkl.state
        competitivebrowse = this.browsenum
        competitivecollection = this.collectnum
        competitiveaddcart = this.shoppingnum
        this.jptkl.serviceId.forEach(element=>{
          data4.push({addserviceid,'othervalue':{val:"choose",id:element.id}})
        })
      }
      // 好评优化
      if(this.evaluation.state){
        let addserviceid = this.evaluation.id
        let othervalue = {val:this.keywordlist.join("@"),id:this.evaluation.state}
        // 83是五星好评
        if(this.evaluation.state== "83"){
          othervalue={val:"",id:this.evaluation.state}
        }else{
          // 关键词好评需要判断value
          if(othervalue.val == ""){
            Message({
              message: `关键字未设置`,
              duration: 1500,
              type: 'error',
              showClose:'true'
            })
            this.jump('jump9')
            return false
          }
        }
        data4.push({addserviceid,othervalue})
      }
      // 自定义短语好评
      if(this.msgtext.state){
        let addserviceid = this.msgtext.id
        let othervalue = {val:this.msgList.join("@"),id:this.msgtext.serviceId}
        // 自定义短语好评需要判断value
        if(othervalue.val == ""){
          Message({
            message: `自定义短语未设置`,
            duration: 1500,
            type: 'error',
            showClose:'true'
          })
          this.jump('jump9')
          return false
        }
        data4.push({addserviceid,othervalue})
      }
      // 图文好评
      if(this.imagetext.state){
        let addserviceid = this.imagetext.id
        let othervalue = {val:this.imgArr,id:this.imagetext.serviceId}
        // 自定义短语好评需要判断value
        if(othervalue.val[0].imgList.filter(item=>item != "").length == 0){
          Message({
            message: `图文好评未设置图片`,
            duration: 1500,
            type: 'error',
            showClose:'true'
          })
          this.jump('jump10')
          return false
        }
        havingpic = 1
        data4.push({addserviceid,othervalue})
      }

      // 快递数据
      let platformlog = this.kuaidi
      let logweight = this.kuaidikg
      // if(platformlog == "1"&&logweight == "0"){
      //   Message({
      //     message: `请正确填写快递重量`,
      //     duration: 1500,
      //     type: 'error',
      //     showClose:'true'
      //   })
      //   return false
      // }
      let log = this.kuaiditype
      let moneysum = this.priceSum

      // 单独传一个人数，等于单数
      let ordertotalperson = ordertotal
      // 单独爬虫抓到的的商品信息
      let goodsdetail = this.goodsdetail
      // 单独传参，处理增值服务任务开始时间
      // 0:默认(全天平均时间放出),其他三项不勾选存此默认值。
      // 1:一次性放出，只勾选了此选项存这个值。
      // 2:自定义时间点放出，勾选了此选项，未勾选自定义放出时间时存这个值。
      // 3:设置了开始时间和结束时间的平均放出，凡事勾选了自定义放出时间就存这个值。
      let setreleasetime = 0
      if(!this.starttime.state && this.enterTime.state == "66"){
        setreleasetime = 1
      }
      // 入店时间优化
      if(this.starttime.state && this.enterTime.state != "67"){
        setreleasetime = 2
      }
      if(this.enterTime.state == "67"){
        setreleasetime = 3
      }
      // 订单编号与datearea; 如果是编辑就有这两个数据
      let id = ""
      let datearea = ""
      //reset为1时，是重新发布,不需要传ID参数
      if(sessionStorage.reset != 1){
        id=this.editOrderno
        datearea=this.editDatearea
      }
      let data1 = {id,datearea,pctype,shopid,clientype,commodityurl,commodityname,goodsdetail,commoditymasterimgurl,commoditypcimgurl,commodityprice,personbuycount,
                  commodityshowprice,buytypecoupon,buytypecard,buytype,remark,alldays,firstdaynum,ordertype,isai,weight,stime,etime,isautocancle,setreleasetime,
                  iscustomrelease,rewardgoldcoin,competitive,competitivebrowse,competitivecollection,competitiveaddcart,limitsex,limitage,limitpower,limitenergy,moneysum,
                  limitcredit,limitpoints,limitlabel,havingpic,isfirst,platformlog,logweight,log,addpersoncount,orderbuytype,logmoney,limitcashtype,ordertotal,ordertotalperson}

      //遮罩层开启
      let loading = Loading.service({
        text: '提交中',
        background: 'rgba(0,0,0,.5)'
      });
      // 获取数据
      let data = await this.ajax({
        url: `PublishInterface/confirmorder?tk=${sessionStorage.token}`,
        data: {data1,data2,data3,data4,data5,data6,data7,data8}
      })
      //遮罩层关闭
      loading.close()
      if(!data) return false
      // MessageBox.alert(data.msg,{
      //   lockScroll: false,
      //   showClose: false,
      //   confirmButtonText: '去支付',
      //   callback: ()=> {
      //     }
      // })
      this.$router.push(`/taskpay/${data.data.id}/${data.data.datearea}`)
    }
  },
  computed: {
    //关键词下单总数
    keywordSum () {
      let sum = 0
      this.keywordArr.forEach(element => {
        sum += element.num
      })
      this.setAmount = sum
      return sum
    },
    //计算下单总人数
    countNum () {
      let sum = 0
      this.planNum.forEach(element => {
        sum += element.reduce((total, num) => total + num)
      })
      this.setAmount = sum
      return sum
    },
    //动态添加计划天数
    addDay () {
      let sum = this.taskactionday
      return sum
    },
    // 计算访客总量
    countTask () {
      // a1+(a1+(n-1)*d)*n/2；a1-首选项； n-天数； d-差
      let sum = (this.firstdaynum+(this.firstdaynum+(this.taskactionday-1)*this.risenum))*this.taskactionday/2
      return sum
    },
    // 押金合计
    yajinSum () {
      // 商品押金
      let a = this.price*this.setAmount*this.count
      // 运费
      let b = (this.baoyoustate == "1"?10:0)*this.setAmount
      return (a+b).toFixed(2)
    },
    // 佣金计算
    yongjin1 () {
      let yongjin1 = 0
      let price = this.price*this.count
      let flag = true
      this.yongjin.forEach(element=>{
        if( price <= element.maxprice && flag){
          yongjin1 = element.money
          flag = false
        }
      })
      return yongjin1
    },
    // 佣金合计
    yongjinSum () {
      let sum = 0,a = 0
      //只有人气与回访时才加浏览点击的价钱
      if(this.activeNameId==3 ||this.activeNameId==4){
        sum += (this.countTask-this.setAmount)*this.generalG
      }
      this.yongjinArr.forEach(element=>{
        sum+= parseFloat(element.price)
      })
      if(this.activeName!='third'&&this.activeName!='fourth'&&this.setAmount>=50){
        a = this.yongjin1*this.setAmount-this.setAmount
      }else{
        a = this.yongjin1*this.setAmount
      }
      return (a+sum).toFixed(2)
    },
    // 增值服务合计
    serverSum () {
      let sum = 0
      this.serverArr.forEach(element=>{
        sum += parseFloat(element.price)*parseInt(element.ordernum?1:this.setAmount)
      })
      return (sum+this.setAmount+this.setAmount).toFixed(2)
    },
    // 快递合计
    kuaidiSum () {
      return (this.kuaidiPrice*this.setAmount).toFixed(2)
    },
    // 费用总计
    priceSum () {
      let a = parseFloat(this.yongjinSum)
      let b = parseFloat(this.serverSum)
      let c = parseFloat(this.kuaidiSum)
      let d = parseFloat(this.yajinSum)
      let sum = parseFloat(a+b+c+d).toFixed(2)
      if(this.activeName != 'second' && this.activeName != 'third' && this.activeName != 'fourth'){
        sum = (parseFloat(a+b+c+d)*this.taskactionday).toFixed(2)
      }
      return sum
    },
    // 押金费用总计
    yajinPriceSum(){
      return parseFloat(this.yajinSum).toFixed(2)
    },
    // 金币费用总计
    jinbiPriceSum(){
      let a = parseFloat(this.yongjinSum)
      let b = parseFloat(this.serverSum)
      let c = parseFloat(this.kuaidiSum)
      return parseFloat(a+b+c).toFixed(2)
    }
  },
  watch: {
    //监听店铺选择，获取地址数据
    shopName (value) {
      this.getAddress(value)
    },
    // 监听每日访客数量，1 不增长；2 每日增长，增长时取消禁用
    isrise (value) {
      if(value == 2) {
        this.enterTime.state="" //取消自定义发布时间状态
        this.risenumFlag = false
      }else{
        this.risenumFlag = true
        this.risenum = 0
      }
    },
    // 监听第二步分页导航，frist 到 ninth
    activeName (value) {
      if(value == 'third' || value == 'fourth'){
        this.step = 3
      }else {
        this.step = 2
      }
    },
    //监听商铺类型切换，用来修改流量入口选项；
    shopType (value) {
      switch (value){
        case 'tb':
          this.options = [
            {
              'value': value,
              'label': '淘宝APP搜索'
            }
          ]
        break;
        case 'tm':
          this.options = [
            {
              'value': 'tb',
              'label': '淘宝APP搜索'
            },
            {
              'value': value,
              'label': '天猫APP搜索'
            }
          ]
        break;
        case 'jd':
          this.options = [
            {
            'value': value,
            'label': '京东APP搜索'
            }
          ]
        break;
        case 'pdd':
          this.options = [
            {
            'value': value,
            'label': '拼多多APP搜索'
            }
          ]
        break;
        case 'albb':
          this.options = [
            {
            'value': value,
            'label': '阿里巴巴APP搜索'
            }
          ]
        break;
      }
      this.keywordArr = [{
        'value': value,
        'options': this.options,
        'setKeywordDialog': false,  // 关键词弹窗
        'setRange': {
          tableData:[
            {str:'分类名称',str1:'风格',str2:'材质'},
            {str:'分类关键词',str1:'休闲',str2:'蚕丝'}
          ],
          zhekouState:[],
          paixuState:``
        },
        'keyword': '',
        'num': 0
      }]
      if(value == 'albb'){
        this.kuaidiflag = false
      }else{
        this.kuaidiflag = true
      }
    },
    //切换快递类型
    kuaiditype (value) {
      if(this.kuaidi == "1"){
        if(value == "1") {
          this.kuaidiPrice = 2.8
          this.kuaidiname = '中通快递'
        }
        if(value == "2") {
          this.kuaidiPrice = 3
          this.kuaidiname = '圆通快递'
        }
        if(value == "3") {
          this.kuaidiPrice = 3
          this.kuaidiname = '申通快递'
        }
      }
    },
    // 是否自己使用快递
    kuaidi(value){
      if(value == "2"){
        this.kuaidiPrice = 0
        this.kuaidiname = '自己发快递'
      }else{
        this.kuaiditype = "0"
        this.$nextTick(()=>{
          this.kuaiditype = "1"
        })
      }
    },
    // 监听数字属性
    // 每单拍下件数
    count(a,b){
      this.$nextTick(()=>{
        this.count =  Math.round(a)
      })
    },
    // 总单数
    setAmount(a,b){
      this.$nextTick(()=>{
        this.setAmount =  Math.round(a)
      })
    },
    // 浏览人数
    browsenum(a,b){
      this.$nextTick(()=>{
        this.browsenum =  Math.round(a)
      })
    },
    // 收藏人数
    collectnum(a,b){
      this.$nextTick(()=>{
        this.collectnum =  Math.round(a)
      })
    },
    // 加购人数
    shoppingnum(a,b){
      this.$nextTick(()=>{
        this.shoppingnum =  Math.round(a)
      })
    },
    // 人气与回访天数
    taskactionday(a,b){
      // 如果b>a 就是减少天数，需要重置planNum数据;
      // 如果需要 改成增加天数时也进行重置数据，可以将判断改为b!=0
      if(b>a){
        this.planNum = this.$options.data().planNum
      }
      this.$nextTick(()=>{
        this.taskactionday =  Math.round(a)
      })
    },
    // 人气与回访增长人数
    risenum(a,b){
      this.$nextTick(()=>{
        this.risenum =  Math.round(a)
      })
    },
    // 人气与回访首日到店人数
    firstdaynum(a,b){
      //获取当前鼠标焦点
      var triggerElement = document.activeElement
      this.$nextTick(()=>{
        // 鼠标焦点不再访客人数上，说明离开了，就得用离开前的值
        if(triggerElement.getAttribute('label') != "访客人数"){
          if(a%10 != 0 && b%10 == 0  && b!=0){
            this.firstdaynum = b
          }
        }
      })
    },
    //在编辑任务时，点击发布任务。刷新页面
    $route(old,new1){
      if(old.name == new1.name){
        this.$router.go(0)
      }
    }
  },
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
/* *[err='y']{
  border:2px dashed red;
} */

/* 黄色叹号样式 */
.hovermsg{
    display: inline-block;
    color: #FAB427;
    font-size: 12px;
    width: 16px;
    height: 16px;
    border: 1px solid #FAB427;
    border-radius: 50%;
    box-sizing: border-box;
    text-align: center;
    line-height: 14px;
    margin-left: 5px;
}
/* 悬浮信息样式 */
.hovercontent{
  background: rgba(0,0,0,.7);
  position: absolute;
  color: white;
  font-size: 14px;
  padding: 0 10px;
  z-index: 9999;
  left: 0;
  top: 30px;
  width: 66%;
}
/* // 到店取消信息位置 */
.msg1{
  right: 0 !important;
  left: auto;
  width: 50%;
}
.msg2{
  width: 40%;
}
.msg3{
  left: 350px;
  width: 50%;
  width: 40%;
}
.kdtitle{
  height: 46px;
  background: #F5F5F5;
  border: 1px solid #E8E8E8;
  color: #999;
  font-size: 14px;
  line-height: 46px;
  padding-left: 22px;
  margin-top:25px;
}
.kdcont{
  border: 1px solid #e8e8e8;
  border-top: 0;
  padding: 32px 0 32px 22px;
  color:#999;
  font-size: 14px;
}
.kdright{
  text-align: center;
  margin-top: 40px;
  padding-top: 5px;
  border-left: 1px solid #E8E8E8;
  height: 38px;
}
.kdbtn{
border:1px solid #bbb;
background:#E8E8E8;
height:28px;
width:96px;
color:#333;
}
</style>
