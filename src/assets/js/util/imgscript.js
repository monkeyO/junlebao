/**
 * 
 * @param {*} inputId input标签的id
 * @param {*} imgId img标签的id
 * @param {*} flag 是否进行图片大小验证以及图片尺寸验证，默认为验证
 */
function previewImg (inputId, imgId, flag) {
  let oInput = document.getElementById(inputId)
  let oImg = document.getElementById(imgId)
  let file = oInput.files[0]
  let state = true //返回是否失败，以此判断是否需要进行赋值操作，目测这里可以删掉这个属性；试用res与rej就行
  return new Promise(function (resolve, reject) {
    if (file.length != 0) {
      let fileType = file.type
      if (fileType != 'image/gif' && fileType != 'image/png' && fileType != 'image/jpeg' && fileType != 'image/jpg') {
        alert('请上传正确格式的图片')
        oInput.value = ''
        oImg.src = '/static/img/bg.png'
        //失败返回false
        state = false
        reject(state)
        return false
      }
      if (file.size > 2000000 && flag) {
        alert('请上传小于2M的图片')
        oInput.value = ''
        oImg.src = '/static/img/bg.png'
        //失败返回false
        state = false
        reject(state)
        return false
      }
    }

    let oReader = new FileReader()
    oReader.onload = function (e) {
      if(!flag){ 
        oImg.src = e.target.result
        resolve(state)
      }else{
        //验证上传的图片宽高
        let img = new Image()
        img.src = e.target.result
        img.onload = function (){
          if (img.width > 800 || img.height > 800){
            alert('请上传800*800以内的图片')
            oInput.value = ''
            oImg.src = '/static/img/bg.png'
            //失败返回false
            state = false
            reject(state)
          } else {
            oImg.src = e.target.result
            resolve(state)
          }
        }
      }
    }
    oReader.readAsDataURL(file)
  })
}
export {
  previewImg
}
