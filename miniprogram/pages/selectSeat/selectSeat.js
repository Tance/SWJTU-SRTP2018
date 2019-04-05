// miniprogram/pages/selectSeat/selectSeat.js
var app=getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    seat: '',
    seatList:[
      { id: 1, value: '' },
      { id: 2, value: '' },
      { id: 3, value: '' },
      { id: 4, value: '' },
      { id: 5, value: '' },
      { id: 6, value: '' },
      { id: 7, value: '' },
      { id: 8, value: '' },
      { id: 9, value: '' },
      { id: 10, value: '' },
      { id: 11, value: '' },
      { id: 12, value: '' },
      { id: 13, value: '' },
      { id: 14, value: '' },
      { id: 15, value: '' },
      { id: 16, value: '' },
      { id: 17, value: '' },
      { id: 18, value: '' },
      { id: 19, value: '' },
      { id: 20, value: '' },
      { id: 21, value: '' },
      { id: 22, value: '' },
      { id: 23, value: '' },
      { id: 24, value: '' },
      { id: 25, value: '' },
      { id: 26, value: '' },
      { id: 27, value: '' },
      { id: 28, value: '' },
   /*   { id: 18, value: '' },
      { id: 18, value: '' },*/
      

    ],
    seatid:[],
    seatImg:'',
    temp3: '0',
    userMoney:'',
    cheZuoWei:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    var that = this;
    const db = wx.cloud.database()
    db.collection('userInformation').where({
      userName: app.globalData.userName
    }).get({
      success: function (res) {
        that.setData({
          userMoney: res.data[0].userMoney
        })
        console.log(userMoney, "++++++++++", res.data[0].userMoney, res)
      }
      
    })   

    const _ = db.command
    db.collection('che').where({
      _id: app.globalData.cheTextId
    }).get({
      success: function (res) {
        that.setData({
          seat: res.data[0].seat
        })
       
       // console.log("sfdghc",that.data.seat)
       
       for (var i = 0 ;i<that.data.seatList.length;i++)
        {
          var temp='seatList['+i+'].value'

       
          if (that.data.seat[i])
         that.setData({
             [temp] : '/images/seat.png'
           }) 
           else
           that.setData({
             [temp]:'/images/selectedSeat.png'
           })    
         //  console.log(temp)

        }
      //  that.data.seatList[0].value='/image/seat.png'
       // that.setData()
      }
    })
  
  },
  clickSeat:function(e){  
   
    console.log(e.target.id); 
    var temp1=e.target.id-1
    

    
    if (this.data.seat[temp1])
        {           

       if (this.data.temp3 == 0){
            this.setData({
              ["seatList[" + temp1 + "].value"]: "/images/selectSeat.png",
              temp3: 1,
              ["seatid[" + (e.target.id -1)+ "]"]: true,
            })
            
            console.log(this.data.seatid)
        }
       else{           
           this.setData({
             temp3:0,
          ["seatList[" + temp1 + "].value"]: "/images/seat.png",
             ["seatid[" + (e.target.id -1)+ "]"]:false,
            
            // ["seatid[" + this.data.seatid.length + "]"]: e.target.id,
        })
       
         console.log(this.data.seatid)
      }
          //  e.data.src="/images/selectSeat.png"
        }
        else
        {
             wx.showToast(
          {
            title: '此座位已经被选中\n请选择其他座位',
            icon: 'none',
            duration: 800
          })
        }
  },
confiremSelectSeat:function(){
  var seatData=this.data.seat;
  var countSeat=0; 

  for (var i=0;i<this.data.seatid.length;i++)
  {
      if (this.data.seatid[i]==true)
        countSeat++
  }
  for (var i=0;i<=this.data.seat.length;i++)
  {
        if (this.data.seatid[i]==true)
        {
          seatData[i]=false              
        }
    
  }

  console.log(this.data.userMoney, "qwef", countSeat)
  if (this.data.userMoney >= countSeat * 2 && app.globalData.userRecordId)
  {
    wx.cloud.callFunction({
    name: 'selectSeatCloud',
    data: {
      userMoney:this.data.userMoney,
      countSeat:countSeat,
      cheId: app.globalData.cheTextId,
      seatData: seatData,
    },
    complete: res => {
      console.log('callFunction test result: ', res)
    }  
    })


    var leftMoney1 = this.data.userMoney - countSeat * 2
   
      wx.cloud.callFunction({
      name: 'selectSeatMoney',
      data: {
        userRecordID: app.globalData.userRecordId,
        leftMoney: leftMoney1,
      }, complete: res => {
        console.log(app.globalData.userRecordId, 'callFunction money result: ', res)
      }
    })
   
    wx.showToast(
      {
        title: '购买成功！!',
        icon: 'none',
        duration: 800
      })
    
  }else
  {
    wx.showToast(
      {
        title: '购买失败，余额不足！',
        icon: 'none',
        duration: 800
      })
  }
  setTimeout(function () {
    wx.switchTab({
      url: '/pages/order/order',
    })
  }, 1500)
  const db=wx.cloud.database()
  for (var i = 0; i < (this.data.seatid.length + 1); i++) {
   // console.log(this.data.seatid)
    if (this.data.seatid[i] && this.data.userMoney > countSeat * 2) {
      db.collection('dingDan').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          userName: app.globalData.userName,
          cheNo: app.globalData.cheNo,
          cheSeat: i,
          seatFlag:true,
          cheRouteWay:app.globalData.cheRouteWay,
        },
        complete: function (res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          console.log(res + "新写入数据");
          console.log(res.errMsg);
        }
      })
    }
  }
  
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