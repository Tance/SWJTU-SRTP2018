// miniprogram/pages/myself/myself.js
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      "user_realname": "姓名 ：",
      "user_birthday": "生日 ：",
      "user_name": "学号 ：",
      "user_campus": "校区 ：",
      "user_phonenumber": "手机 ：",
      "user_money":"余额 ：",
      "user_realname1":"--",
      "user_birthday1":"--",
      "user_name1":"--",
      "user_phonenumber1":'--',
      "user_campus1":'--',
      "user_money1":'--',
  },      
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.cloud.init({
      env: 'test-5c0742',
      traceUser: true
    });
    const db = wx.cloud.database()
    // const _ = db.command;
 
    db.collection('userInformation').where({
      userName: app.globalData.userName
    }).get({
      success: function (res) {
        if (res.data.length >= 1)
          that.setData({
            user_realname1:res.data[0].userRealName,            
            user_birthday1: res.data[0].userBirthday,
            user_name1: res.data[0].userName,
            user_campus1:res.data[0].userCampus,
            user_phonenumber1: res.data[0].userPhoneNumber,
            user_money1:res.data[0].userMoney,            
          })
        app.globalData.userRecordId = res.data[0]._id
      }
      
    })
    
   

  },
  register: function () {
    wx.navigateTo({
      url: '/pages/signInPage/index',
    })
  },
  newUserSignUp: function () {
    wx.navigateTo({
      url: '/pages/signUpPage/signUpPage',
    })
  },
 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
     // app.globalData.userName=this.data.user_name1
    
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }, 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
