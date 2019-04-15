// import {URLconfig} from '@/assets/js/config'
import axios from 'axios'

async function myaxios(option){
  let method = option.method || 'post'
  // 此处url不参与编译用window
  let url = `${URLconfig.HTTPURL}/${option.url}`
  let data = Object.prototype.toString.call(option.data) === "[object FormData]"?option.data:JSON.stringify(option.data)
  let ContentType = option.ContentType || 'application/x-www-form-urlencoded'
  let withCredentials = option.withCredentials == true?true:false
  try {
    //获取数据
    let backdata = (await axios({
      method,
      url,
      data,
      withCredentials,
      headers: {
        'Content-Type': ContentType
      }
    }))
    // console.log(`${option.url}/`,backdata.data)
    // 统一状态，判断是否3600
    let timeout= this.$store.state.timeout
    //验证数据
    let flag = this.checkBackData(backdata.data, option.needAlert,timeout)
    if(backdata.data.token){
      //更新token
      this.$store.dispatch('loginstate', backdata.data.token)
    }
    //如果localStorage.remember == 1 就是记住我，需要把token放到localStorage里存着
    if(localStorage.remember ==1 ){
      localStorage.token = backdata.data.token
    }
    if(flag){
      return backdata.data
    }else{
      return false
    }
  } catch (error) {
    alert(`服务器出错，请联系管理员或稍后再试`)
    return false
  }
}
export {
  myaxios
}
