<template>
    <div id="service">
      <!-- 侧边栏客服 -->
      <div class="aside">
        <!-- 在线客服 -->
        <div class="online_service">
          <img src="@/assets/img/online_service.png" alt="" class="img_width">
          <p>在线客服</p>
          <!-- 客服在线咨询 -->
          <div class="online_service_box">
            <!-- 标题 -->
            <div class="online_service_box_title">
              <h3>客服在线咨询</h3>
              <p>时间：9:00 - 21：00</p>
            </div>
            <!-- 列表 -->
            <ul>
              <li>
                <h4>商家入驻咨询</h4>
                <img src="@/assets/img/qq_talk.png" alt="" @click="dialogVisible = true">
              </li>
              <li>
                <h4>订单问题咨询</h4>
                <img src="@/assets/img/qq_talk.png" alt="" @click="dialogVisible = true">
              </li>
              <li>
                <h4>售后问题咨询</h4>
                <img src="@/assets/img/qq_talk.png" alt="" @click="dialogVisible = true">
              </li>
            </ul>
          </div>
        </div>
        <!-- 商家入驻 -->
        <div class="merchant_settled">
          <img src="@/assets/img/merchant_settled.png" alt="" class="img_width">
          <p>商家入驻</p>
          <!-- 商家入驻二维码咨询 -->
          <div class="merchant_settled_box">
            <img src="@/assets/img/common/qr_code_index.jpg" alt="" class="img_width">
            <p>扫一扫添加运营微信</p>
            <p>一对一指导</p>
          </div>
        </div>
      </div>

      <!-- 弹窗 -->
      <el-dialog title="常见问题" :visible.sync="dialogVisible" width="63.5%" class="popup" :lock-scroll="false">
        <!-- element弹窗内容区 -->
        <div class="el_content">
          <!-- element弹窗咨询区 -->
          <div class="el_consult">
            <!-- 左侧 -->
            <div class="el_consult_left">
              <h3>发布任务类型：</h3>
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="1.平台任务的流程是什么？" name="1">
                  <div>绑定店铺 - 发布任务 - 发布后等待客服审核 - 系统推送任务给买手操作 - 下单后商家发货 - </div>
                  <div>签收好评 - 商家确认评价截图 - 系统返款</div>
                </el-collapse-item>
                <el-collapse-item title="2.发布任务需要那些费用？" name="2">
                  <div>押金：拍下金额*件数*单数（返还给买手的本金）</div>
                  <div>平台代返款：单数*1金币/单（平台收取的手续费）</div>
                  <div>平台代确认截图：单数*1金币/单（系统操作审核订单截图0.5金币/单，评价截图0.5金币/单，若商家自己审核，费用任务结束后返还）</div>
                  <div>佣金：佣金*单数（分给买手的佣金）</div>
                  <div>除此之外，其余的增值服务项商家可根据自己的需求选择哦~</div>
                </el-collapse-item>
                <el-collapse-item title="3.进行中的任务可以修改那些内容？" name="3">
                  <div>①任务搜索价格</div>
                  <div>②任务搜索主图</div>
                  <div>③商品标题</div>
                  <div>④任务关键词</div>
                  <div>⑤买号的属性（年龄、标签、淘气值、性别等）</div>
                </el-collapse-item>
                <el-collapse-item title="4.账户中的押金和金币能提现吗？" name="4">
                  <div>押金可以提现，金币不允许提现哦</div>
                </el-collapse-item>
                <el-collapse-item title="5.支持发布那些平台的任务？" name="5">
                  <div>好卖符可发布淘宝、天猫、京东、阿里巴巴、拼多多五个平台的任务</div>
                </el-collapse-item>
              </el-collapse>
              <h3>绑定店铺类问题：</h3>
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="1.如何绑定店铺？" name="6">
                  <div>点击【卖家中心】 - 【绑定店铺】，进行绑定</div>
                </el-collapse-item>
                <el-collapse-item title="2.一个账号可以绑定几个店铺？" name="7">
                  <div>每个平台的第一店铺绑定免费，第二个起100元/个</div>
                </el-collapse-item>
                <el-collapse-item title="3.已经绑定过的店铺可以换绑吗？" name="8">
                  <div>未发布过任务的店铺可以免费换绑1次，已发布过任务的店铺需要支付100元/个</div>
                </el-collapse-item>
                <el-collapse-item title="4.店铺关闭了可以换绑吗？" name="9">
                  <div>凡是发布过任务的店铺，操作换绑都需要收取费用</div>
                </el-collapse-item>
              </el-collapse>
            </div>
            <!-- 右侧 -->
            <div class="el_consult_right">
              <h3>审核类问题：</h3>
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="1.发布任务后什么时候可以审核上线？" name="10">
                  <div>一般情况下，任务提交后客服会在30分钟内审核上线，如任务异常客服会在QQ或者电话告知</div>
                  <div>您原因配合修改；当日17点前提交的任务当日上线，21点后的任务次日上线，如着急当日上线</div>
                  <div>可在21点前留言需要审核，可当日上线哦</div>
                </el-collapse-item>
                <el-collapse-item title="2.审核不通过怎么办？" name="11">
                  <div>审核不通过的任务，可在【卖家中心】 - 【我的任务】 - 【审核未通过】页面查看到对应审核</div>
                  <div>不通过的原因，之后修改重新提交审核就可以了</div>
                </el-collapse-item>
                <el-collapse-item title="3.如何能快速审核通过？" name="12">
                  <div>发布任务的时候可先自行查询排名，如任务商品在搜索页面的30页内能搜索到，客服审核时间</div>
                  <div>也会加快哦，您还可以在发布任务的时候选择“客服优先审核服务”，可优先处理</div>
                </el-collapse-item>
              </el-collapse>
              <h3>订单类问题：</h3>
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="1.买手拍错价格了怎么办？" name="13">
                  <div>拍下金额比任务设置金额低的话买手是实付多少返多少的，如有差价任务结束后返还至账户上</div>
                </el-collapse-item>
                <el-collapse-item title="2.买手用错买号下单了怎么办？" name="14">
                  <div>用错买号，您可以：</div>
                  <div>①要求退款重拍，接入人工客服，配合您联系买手处理；</div>
                  <div>②提供下单买号，我们核实买号安全性没问题后，可以正常操作，并给予买手警告以后注意；</div>
                  <div>③要求退款，取消任务资格，联系人工客服配合您联系买手处理。</div>
                </el-collapse-item>
                <el-collapse-item title="3.买手下单使用了花呗/信用卡支付怎么办？" name="15">
                  <div>请接入人工客服后提供付款截图、任务编号、买手旺旺号，客服会核实扣除买手1%本金作为</div>
                  <div>手续费补偿给您的哦~</div>
                </el-collapse-item>
                <el-collapse-item title="4.买手下单时使用了村淘/淘宝客/返利网怎么办？" name="16">
                  <div>发布任务页面有说明建议发布任务的时候关闭村淘或者返利网、淘宝客等返利形式下单的哦，</div>
                  <div>因部分浏览器会出现挟持现象，可能会导致出现这种现象，接到反馈后，我们会冻结买号并</div>
                  <div>尽力配合商家去处理</div>
                </el-collapse-item>
                <el-collapse-item title="5.买手拍下后退款了怎么办？" name="17">
                  <div>请留言订单编号和退款截图发送给客服进行核实处理</div>
                </el-collapse-item>
              </el-collapse>
              <h3>确认收货/返款保证金类：</h3>
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="1.买手收到货后没有评价怎么办？" name="18">
                  <div>请留下订单号方便我们查询哦</div>
                </el-collapse-item>
                <el-collapse-item title="2.买手给予了差评怎么办？" name="19">
                  <div>平台规定买手评价都是五星好评，如出现差评的情况请提供截图和订单号，客服会联系买手</div>
                  <div>处理，并给予处罚</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <!--element弹窗紧急处理区-->
          <div class="el_dispose">
            <h3>以上常见问题找不到解决方法？</h3>
            <div>
              <span>联系在线客服</span>
              <a href="tencent://message/?uin=88888888&Site=&Menu=yes">
                <img src="@/assets/img/qq_talk.png" alt="">
              </a>
              <span>，只处理紧急问题</span>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'Service',
  data () {
    return {
      activeNames: [],
      dialogVisible: false
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/public/service.css';
</style>
