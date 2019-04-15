import VueRouter from 'vue-router'

// 路由改为懒加载
const  Demo = r => require.ensure( [], () => r (require('@/components/Demo')))
// const  Index = r => require.ensure( [], () => r (require('@/components/Index')))
const  Reg = r => require.ensure( [], () => r (require('@/components/reg')))
const  RegPartner = r => require.ensure( [], () => r (require('@/components/reg/RegPartner')))
const  Login = r => require.ensure( [], () => r (require('@/components/login')))
const  Personal = r => require.ensure( [], () => r (require('@/components/personal')))
const  Invite = r => require.ensure( [], () => r (require('@/components/invite')))
const  Fudai = r => require.ensure( [], () => r (require('@/components/fudai')))
const  Recharge = r => require.ensure( [], () => r (require('@/components/recharge')))
const  BankPay = r => require.ensure( [], () => r (require('@/components/recharge/BankPay')))
const  Task = r => require.ensure( [], () => r (require('@/components/task')))
const  IndexEditTask = r => require.ensure( [], () => r (require('@/components/task/IndexEditTask')))
const  MyTask = r => require.ensure( [], () => r (require('@/components/task/MyTask')))
const  AskTask = r => require.ensure( [], () => r (require('@/components/task/AskTask')))
const  MyTaskDetail = r => require.ensure( [], () => r (require('@/components/task/MyTaskDetail')))
const  ChildTaskDetail = r => require.ensure( [], () => r (require('@/components/task/ChildTaskDetail')))
const  TaskPay = r => require.ensure( [], () => r (require('@/components/task/TaskPay')))
const  GoPay = r => require.ensure( [], () => r (require('@/components/public/GoPay')))
const  KuaiQianPay = r => require.ensure( [], () => r (require('@/components/public/KuaiQianPay')))
const  PaySuccess = r => require.ensure( [], () => r (require('@/components/public/PaySuccess')))
const  OrderAppeal = r => require.ensure( [], () => r (require('@/components/orderAppeal/Index')))
const  AddAppeal = r => require.ensure( [], () => r (require('@/components/orderAppeal/AddAppeal')))
const  BlackList = r => require.ensure( [], () => r (require('@/components/blackList/Index')))
const  BlackAppeal = r => require.ensure( [], () => r (require('@/components/blackList/BlackAppeal')))
const  KuaidiManage = r => require.ensure( [], () => r (require('@/components/kuaidi/Index')))
const  AccountManage = r => require.ensure( [], () => r (require('@/components/getdeposit/AccountManage')))
const  BindBank = r => require.ensure( [], () => r (require('@/components/getdeposit/BindBank')))
const  GetDeposit = r => require.ensure( [], () => r (require('@/components/getdeposit/GetDeposit')))

export default new VueRouter({
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: Demo,
      meta: {
        title: 'DEMO'
      }
    },
    {
      path: '/main',
      name: 'index',
      // component: Index,
      component: Personal,
      meta: {
        title: '好卖符'
      }
    },
    // 默认路径指向login
    {
      path: '/',
      name: 'logining',
      // component: Index,
      component: Login,
      meta: {
        title: '好卖符'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '好卖符登录'
      }
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '好卖符注册'
      }
    },
    {
      path: '/regpartner',
      name: 'regpartner',
      component: RegPartner,
      meta: {
        keepAlive: true, // 需要被缓存
        title: '好卖符合作伙伴注册'
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal,
      meta: {
        title: '卖家中心'
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge,
      meta: {
        title: '充值中心'
      }
    },
    {
      path: '/BankPay',
      name: 'BankPay',
      component: BankPay,
      meta: {
        title: '线下充值'
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite,
      meta: {
        title: '邀请返利'
      }
    },
    {
      path: '/fudai',
      name: 'fudai',
      component: Fudai,
      meta: {
        title: '领取福袋'
      }
    },
    {
      path: '/task',
      name: 'task',
      component: Task,
      meta: {
        title: '发布任务'
      }
    },
    {
      path: '/IndexEditTask',
      name: 'IndexEditTask',
      component: IndexEditTask,
      meta: {
        title: '编辑增值服务'
      }
    },
    {
      path: '/mytask',
      name: 'mytask',
      component: MyTask,
      meta: {
        title: '我的任务'
      }
    },
    {
      path: '/mytaskdetail',
      name: 'mytaskdetail',
      component: MyTaskDetail,
      meta: {
        title: '我的任务详情'
      }
    },
    {
      path: '/childtaskdetail',
      name: 'childtaskdetail',
      component: ChildTaskDetail,
      meta: {
        title: '子任务详情'
      }
    },
    {
      path: '/asktask',
      name: 'asktask',
      component: AskTask,
      meta: {
        title: '问大家任务'
      }
    },
    {
      path: '/TaskPay/:id/:datearea',
      name: 'TaskPay',
      component: TaskPay,
      meta: {
        title: '支付信息'
      }
    },
    {
      path: '/gopay/:id',
      name: 'gopay',
      component: GoPay,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/KuaiQianPay',
      name: 'KuaiQianPay',
      component: KuaiQianPay,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/PaySuccess',
      name: 'PaySuccess',
      component: PaySuccess,
      meta: {
        title: '支付成功'
      }
    },
    {
      path: '/orderappeal',
      name: 'OrderAppeal',
      component: OrderAppeal,
      meta: {
        title: '订单申诉'
      }
    },
    {
      path: '/AddAppeal',
      name: 'AddAppeal',
      component: AddAppeal,
      meta: {
        title: '提交申诉'
      }
    },
    {
      path: '/BlackList',
      name: 'BlackList',
      component: BlackList,
      meta: {
        title: '黑名单'
      }
    },
    {
      path: '/KuaidiManage',
      name: 'KuaidiManage',
      component: KuaidiManage,
      meta: {
        title: '快递管理'
      }
    },
    {
      path: '/BlackAppeal',
      name: 'BlackAppeal',
      component: BlackAppeal,
      meta: {
        title: '添加黑名单'
      }
    },
    {
      path: '/AccountManage',
      name: 'AccountManage',
      component: AccountManage,
      meta: {
        title: '提现账号管理'
      }
    },
    {
      path: '/BindBank',
      name: 'BindBank',
      component: BindBank,
      meta: {
        title: '绑定银行卡'
      }
    },
    {
      path: '/GetDeposit',
      name: 'GetDeposit',
      component: GetDeposit,
      meta: {
        title: '押金提现'
      }
    },
  ]
})
