//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-5c0742',
        traceUser: true,
      })
    }
    
    this.globalData = {
      userOpenId:null,
      userName:null,
      userPassword:null,
      userPhoneNumber:null,
      userGender:null,
      userBirthday:null,
      userCampus:null,
      userRealName:null,
      userRecordId:null,
      cheTextId:null,
      cheNo:null,
      cheRouteWay:null,
      ticketTextId:null,
    }
  }
})
