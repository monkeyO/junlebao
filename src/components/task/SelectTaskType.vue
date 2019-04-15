<template>
  <div>
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
        <div class="set_plan_box" style="margin-bottom: 30px;">
          <el-row class="set_btn">
            <el-col :span="2">任务<span>1</span>：</el-col>
            <el-col :span="2" style="float: right; margin-left: 20px;">
              <el-button type="danger">删除任务</el-button>
            </el-col>
            <el-col :span="2" style="float: right;">
              <el-button type="danger">添加任务</el-button>
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
              <el-input v-model="liketkl" placeholder="请输入内容"></el-input>
            </el-col>
          </el-row>
          <el-row class="set_plan_content">
            <el-col :span="1" style="text-align: center;">
              <i class="ordinal">2</i>
            </el-col>
            <el-col :span="4" class="set_plan_content_color">需要评价点赞的人数：</el-col>
            <el-col :span="3">
              <el-input v-model="likenum" placeholder="请输入内容"></el-input>
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
            <el-col :span="2"><el-radio v-model="needday" label="1">3天</el-radio></el-col>
            <el-col :span="2" style="position: relative;">
              <el-radio v-model="needday" label="2">5天</el-radio>
              <img src="@/assets/img/task/tuijian1.png" alt="" style="position: absolute; top: -7px; left: 30px;">
            </el-col>
            <el-col :span="2"><el-radio v-model="needday" label="3">7天</el-radio></el-col>
            <el-col :span="2"><el-radio v-model="needday" label="4">自定义</el-radio></el-col>
            <el-col :span="3">
              <el-input v-model="customday" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="1" style="margin-left: 10px;">天</el-col>
            <el-col :span="7" style="font-size: 15px;">
              系统将分<span>0</span>天随机分配买手接手完成评价点赞任务
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
              <el-col>问题1：<el-input v-model="problemlist[0]" placeholder="请输入内容"></el-input></el-col>
              <el-col>问题2：<el-input v-model="problemlist[1]" placeholder="请输入内容"></el-input></el-col>
              <el-col class="set_problem_btn"><el-button type="danger">添加问题</el-button></el-col>
              <el-col class="set_problem_btn"><el-button type="danger">删除问题</el-button></el-col>
            </el-col>
          </el-row>
          <el-row class="set_plan_content" style="border-bottom: 0;">
            <el-col :span="3" class="set_plan_content_color" style="width: 14%;">2.需要几天内完成：</el-col>
            <el-col :span="2"><el-radio v-model="needday2" label="1">3天</el-radio></el-col>
            <el-col :span="2" style="position: relative;">
              <el-radio v-model="needday2" label="2">5天</el-radio>
              <img src="@/assets/img/task/tuijian1.png" alt="" style="position: absolute; top: -7px; left: 30px;">
            </el-col>
            <el-col :span="2"><el-radio v-model="needday2" label="3">7天</el-radio></el-col>
            <el-col :span="2"><el-radio v-model="needday2" label="4">自定义</el-radio></el-col>
            <el-col :span="3">
              <el-input v-model="customday2" placeholder="请输入内容"></el-input>
            </el-col>
            <el-col :span="1" style="margin-left: 10px;">天</el-col>
            <el-col :span="7" style="font-size: 15px;">
              系统将分<span>0</span>天随机分配买手接手完成评价点赞任务
            </el-col>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectTaskType',
  data () {
    return {
      evaluation: false, // 安排买手在商品问大家评价点赞
      problem: false, // 安排买手在商品问大家提问问题
      liketkl: '', // 评价点赞淘口令
      likenum: '', // 需要评价点赞的人数
      needday: '', // 评价点赞 - 需要几天内完成
      customday: '', // 自定义天数
      problemlist: [], // 设置提问问题
      needday2: '' // 提问问题 - 需要几天内完成
    }
  },
  methods: {

  }
}
</script>

<style scoped>
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
