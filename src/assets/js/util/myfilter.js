// 统一的过滤器
let MYordericon = str=>{
  switch(str){
    case '1':
      return 'pctypetb'
    break;
    case '2':
      return 'pctypetm'
    break;
    case '3':
      return 'pctypejd'
    break;
    case '4':
      return 'pctypepdd'
    break;
    case '5':
      return 'pctypealbb'
    break;
  }
}
let MYorderstate = str=>{
  switch(str){
    case '0':
      return '待支付'
    break;
    case '1':
      return '待审核'
    break;
    case '2':
      return '审核通过'
    break;
    case '3':
      return '审核失败'
    break;
    case '4':
      return '暂停任务'
    break;
    case '5':
      return '取消任务'
    break;
    case '6':
      return '已完成'
    break;
    case '7':
      return '商家取消任务'
    break;
  }
}
let MYordertype = str=>{
  switch(str){
    case '1':
      return '关键字任务'
    break;
    case '2':
      return '关键字凌晨单任务'
    break;
    case '3':
      return '关键字人气任务'
    break;
    case '4':
      return '回访任务'
    break;
    case '5':
      return '直通车任务'
    break;
    case '6':
      return '淘口令任务'
    break;
    case '7':
      return '二维码任务'
    break;
    case '8':
      return '淘抢购任务'
    break;
    case '9':
      return '聚划算任务'
    break;
    case '10':
      return '京东快车任务'
    break;
    case '11':
      return '直接访问任务'
    break;
    case '12':
      return '阿里口令任务'
    break;
    case '13':
      return '问大家任务'
    break;
  }
}
let MYpctype = str=>{
  switch(str){
    case "1":
      return '淘宝'
    break
    case "2":
      return '天猫'
    break
    case "3":
      return '京东'
    break
    case "4":
      return '拼多多'
    break
    case "5":
      return '阿里巴巴'
    break
  }
}
let MYChildState=(str,state)=>{
  switch(str){
    case '0':
      return '未接手'
    break;
    case '1':
      return '已接手未提交'
    break;
    case '2':
      return '已提交待付款'
    break;
    case '6':
      if(state == 0) return '已提交订单截图及预评价待审核'
      if(state == 3) return '驳回订单截图和预评价'
    break;
    case '8':
      if(state == 0) return '已提交评价截图待审核'
      if(state == 1) return '已完成'
      if(state == 2) return '待提交评价截图'
      if(state == 3) return '驳回评价截图'
    break;
  }
}
export {
  MYordericon,
  MYorderstate,
  MYordertype,
  MYpctype,
  MYChildState
}