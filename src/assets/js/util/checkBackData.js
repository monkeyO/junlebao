import { MessageBox } from 'element-ui'

/**
 * 
 * @param {*} data  ajax返回需要验证的数据
 * @param {*} needAlert needAlert 是否需要弹窗提示
 * @param {*} flag  用来判断是否超时，如果超时后面的ajax全部返回false
 */
function checkBackData(data, needAlert=true,flag){
  if (flag) return false
  if (data.code == null) return false
  if (data.code !== 0) {
    // 接口超时，并且vuex中超时状态为false,修改超时状态为true,并弹窗
    // 以sessionStorage.token来判断是否是第一次进入页面，第一次进入不进行弹窗
    if(data.code === 3600&&!this.$store.state.timeout&&sessionStorage.token){
      this.$store.dispatch('timeout',true)
      MessageBox.alert(data.msg,{
        lockScroll: false,
        callback: ()=>{
          this.$store.dispatch('loginstate', false)
          this.$store.dispatch('timeout',false)
          this.$router.push('/login')
        }
      })
      return false;
    }
    // 此处应该会跟上面那个重复，后期没BUG的话可以考虑注释掉
    if (data.code === 3600 && needAlert) {
        MessageBox.alert(data.msg,{
          lockScroll: false,
          callback: ()=>{
            this.$store.dispatch('loginstate', false)
            this.$router.push('/login')
          }
        })
        return false;
    }
    if(needAlert){
      MessageBox.alert(data.msg);
    }
    return false;
  } else {
    return true;
  }
}
export {
  checkBackData
}
