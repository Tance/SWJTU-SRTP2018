// miniprogram/pages/order/order.js
const app=getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    orderList: [
      { id: 0, cheNo:'--',cheRouteWay:'--',cheSeatNo:'--',cheFlag:'--',ticketTextId:''},
    
    ],
     orderData:'',  
     reslength:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  refundTicket:function(e){
    /*  var temp=e.currentTarget.id
      console.log(temp)  
      wx.navigateTo({
        url: '/pages/refundticket/refundTicket',
      })*/
   
  },
  onLoad: function (options) {

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
    const db = wx.cloud.database()
    db.collection('dingDan').where({
      userName: app.globalData.userName
    }).get({
      success: function (res) {
        that.setData({
          orderData: res,
          reslength:res.data.length,
        })
        //  console.log(that.data.orderData)
      }
      })


    for (var i = 0; i < that.data.reslength ; i++) {
          var temp ='orderList[' + i + '].cheNo'
          var temp1='orderList['+i+'].cheRouteWay'
          var temp2='orderList['+i+'].cheSeatNo'
          var temp3='orderList['+i+'].cheFlag'
          var temp4 = 'orderList[' + i + '].id'
           var temp5 = 'orderList[' + i +'].ticketTextId'
                      that.setData({
                        [temp5]:that.data.orderData.data[i]._id,
                        [temp4]:i,
                        [temp]: that.data.orderData.data[i].cheNo,
                        [temp1]: that.data.orderData.data[i].cheRouteWay,
                        [temp2]: that.data.orderData.data[i].cheSeat,
                        [temp3]: that.data.orderData.data[i].seatFlag,
           
                      })
          //  console.log(temp)

        }
   // console.log(that.data.orderList)  
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
    var that = this
    const db = wx.cloud.database()
    db.collection('dingDan').where({
      userName: app.globalData.userName
    }).get({
      success: function (res) {
        that.setData({
          orderData: res,
          reslength: res.data.length,
        })
        //  console.log(that.data.orderData)
      }
    })
    var i = 0
    for (; i < that.data.reslength; i++) {
      var temp = 'orderList[' + i + '].cheNo'
      var temp1 = 'orderList[' + i + '].cheRouteWay'
      var temp2 = 'orderList[' + i + '].cheSeatNo'
      var temp3 = 'orderList[' + i + '].cheFlag'
      var temp4 = 'orderList[' + i + '].id'
      that.setData({
        [temp4]: i,
        [temp]: that.data.orderData.data[i].cheNo,
        [temp1]: that.data.orderData.data[i].cheRouteWay,
        [temp2]: that.data.orderData.data[i].cheSeat+1,
        [temp3]: that.data.orderData.data[i].seatFlag,

      })
      //  console.log(temp)
      
    }
    
    if (i >= that.data.reslength){ wx.stopPullDownRefresh}
  
   
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