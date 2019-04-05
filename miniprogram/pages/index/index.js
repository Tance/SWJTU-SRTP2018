// miniprogram/pages/index/index.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    test1: "XC001",
    nowDate: '',
    cheNo0: '', routeWay0: '', cheDate0: '', cheGoTime0: '', cheLatitude0: '30.7', cheLongitude0: '104', cheLeftTicket0: '', textId0: '',
    cheNo1: '', routeWay1: '', cheDate1: '', cheGoTime1: '', cheLatitude1: '30.7', cheLongitude1: '104', cheLeftTicket1: '', textId1: '',

    cheNo: '', routeWay: '', cheDate: '', cheGoTime: '', cheLatitude: '', cheLongitude: '', cheLeftTicket: '',

    cheNo2: '', routeWay2: '', cheDate2: '', cheGoTime2: '', cheLatitude2: '', cheLongitude2: '', cheLeftTicket2: '', textId2: '',
    cheNo3: '', routeWay3: '', cheDate3: '', cheGoTime3: '', cheLatitude3: '', cheLongitude3: '', cheLeftTicket3: '', textId3: '',
    cheNo4: '', routeWay4: '', cheDate4: '', cheGoTime4: '', cheLatitude4: '', cheLongitude4: '', cheLeftTicket4: '', textId4: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/gps/GPS',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        console.log(res.data[0].cheLatitude)
        that.setData({
          cheLatitude0: res.data[0].cheLatitude,
          cheLongitude0: res.data[0].cheLongitude,
          cheLatitude1: res.data[0].cheLatitude,
          cheLongitude1: res.data[0].cheLongitude,
          //res代表success函数的事件对，data是固定的，list是数组
        })
        console.log(parseFloat(that.data.cheLongitude0))
      }
    })
 
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {

        app.globalData.userOpenId = res.result.openid
        console.log('app open id ', app.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  selectSeat0: function () {
    app.globalData.cheTextId = this.data.textId0
    console.log(app.globalData.cheTextId)
    wx.navigateTo({
      url: '/pages/selectSeat/selectSeat'
    })
    app.globalData.cheNo = this.data.cheNo0
    app.globalData.cheRouteWay = this.data.routeWay0
  },
  selectSeat1: function () {
    app.globalData.cheTextId = this.data.textId1
    console.log(app.globalData.cheTextId)
    wx.navigateTo({
      url: '/pages/selectSeat/selectSeat'
    })
    app.globalData.cheNo = this.data.cheNo1
    app.globalData.cheRouteWay = this.data.routeWay1
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {



  },
  /*
  creatPerson
  */

  /**
   * 生命周期函数--监听页面显示
   */


  onShow: function () {
    console.log(this.data.cheLongitude0)
    this.setData({
      cheDistance0: (111 * Math.abs(this.data.cheLatitude0 - 30.76) + Math.abs(this.data.cheLongitude0 - 103.98) * 96).toFixed()+"千米",
      cheWaitTime0:((111 * Math.abs(this.data.cheLatitude0 - 30.76) + Math.abs(this.data.cheLongitude0 - 103.98) * 96)/0.66).toFixed()+"分钟",
      cheDistance1: (111 * Math.abs(this.data.cheLatitude0 - 30.76) + Math.abs(this.data.cheLongitude0 - 103.98) * 96).toFixed() + "千米",
      cheWaitTime1: ((111 * Math.abs(this.data.cheLatitude0 - 30.76) + Math.abs(this.data.cheLongitude0 - 103.98) * 96) / 0.66 ).toFixed() + "分钟",
      })
   
    var myDate = new Date();
    this.setData({
      nowDate: myDate
    })
    var that = this;
    wx.cloud.init({
      env: 'test-5c0742',
      traceUser: true
    });
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('che').where({
      cheDate: _.gte(that.data.nowDate)
    }).get({
      success: function (res) {
        console.log(res, that.data.nowDate)
        that.setData({
          cheNo0: res.data[0].cheNo, routeWay0: res.data[0].cheRouteWay, cheDate0: [res.data[0].cheDate.getFullYear() + "-" + (res.data[0].cheDate.getMonth() + 1) + "-" + res.data[0].cheDate.getDate()], cheGoTime0: [res.data[0].cheDate.getHours() + ":" + res.data[0].cheDate.getMinutes()],  cheLeftTicket0: res.data[0].cheLeftTicket, textId0: res.data[0]._id,
          cheNo1: res.data[1].cheNo, routeWay1: res.data[1].cheRouteWay, cheDate1: [res.data[1].cheDate.getFullYear() + "-" + (res.data[1].cheDate.getMonth() + 1) + "-" + res.data[1].cheDate.getDate()], cheGoTime1: [res.data[1].cheDate.getHours() + ":" + res.data[1].cheDate.getMinutes()], cheLeftTicket1: res.data[1].cheLeftTicket, textId1: res.data[1]._id,
        })
        console.log(res.data[0].cheGoTime, "+++++++++++", that.data.cheGoTime0)
      }
    })

  },
  wantMore: function () {
    var that = this;
    var myDate = new Date();
    this.setData({
      nowDate: myDate
    })

    wx.cloud.init({
      env: 'test-5c0742',
      traceUser: true
    });

    const db = wx.cloud.database()
    const _ = db.command
    db.collection('che').where({
      cheDate: _.gte(that.data.nowDate)
    }).get({
      success: function (res) {
        console.log(res, that.data.nowDate)
        that.setData({
          cheNo2: res.data[0].cheNo, routeWay2: res.data[2].routeWay, cheDate3: res.data[3].cheDate, cheGoTime3: res.data[3].cheGoTime, cheLatitude3: res.data[3].cheLatitude, cheLongitude3: res.data[3].cheLongitude, cheLeftTicket3: res.data[3].cheLeftTicket

          /* cheNo4: res.data[4].cheNo, routeWay4: res.data[4].routeWay, cheDate4: res.data[4].cheDate, cheGoTime4: res.data[4].cheGoTime, cheLatitude4: res.data[4].cheLatitude, cheLongitude4: res.data[4].cheLongitude, cheLeftTicket4: res.data[4].cheLeftTicket*/
        })

      }
    })
    console.log(that.data.cheNo2)

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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