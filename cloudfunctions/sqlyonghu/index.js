// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db=wx.cloud.database({
    ebv:'test-5c0742',
    
  })
  db.collection('yonghu').where({
    yonghuopenid: wxContext.OPENID // 填入当前用户 openid
  }).get({
    success(res) {
      console.log(res.data)
    }
  })
  

  return {
    //sqldata:res.data,
    event,
    sqldata: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}