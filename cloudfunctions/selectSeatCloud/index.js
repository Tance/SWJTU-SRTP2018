// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test-5c0742',
})
const wxContext = cloud.getWXContext()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main =(event, context) => { 
  
    db.collection('che').doc(event.cheId).update({
        data: {
          seat: event.seatData
        }, 
      })      

       
    return {
      event,
     
     
    }
    /*openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,*/
  }
 
