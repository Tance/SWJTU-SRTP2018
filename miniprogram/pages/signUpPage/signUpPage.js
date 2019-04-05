// miniprogram/pages/signUpPage/signUpPage.js
var app=getApp()
Page({   
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userRealName:'',
    userPassword: '',
    userIdcard:'',
    userPasswordAgain: '',
    checkbox: false,
    repetition: false,
    openIdExist:false,
    recordId:'',
    date:'1998-01-01',
     items: [
       { name: '犀浦', value: '犀浦', checked: 'true' },
      { name: '九里', value: '九里', },
      { name: '峨眉', value: '峨眉' },      
    ],
    userCampus:'犀浦',
    
  },
  
  // 用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    });
    var that = this;
    var userName = this.data.userName;
    // 初始化云
    wx.cloud.init({
      env: 'test-5c0742',
      traceUser: true
    });
    // 初始化数据库
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('userInformation').where({
      userName: _.eq(userName)
    }).get({
      success: function (res) {
        if (res.data.length >=1) {          
          that.setData({
            repetition: true
          })
          console.log(res.data.length)
        }       
        else 
          that.setData({
            repetition:false
          })
      }
    })
  },
  // 密码
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    });
  },
  userRealNameInput:function(e){
    this.setData({
        userRealName:e.detail.value
    });
  },
  userIdcardInput: function (e) {
    this.setData({
      userIdcard: e.detail.value
    });
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 再次输入密码
  userPasswordAgainInput: function (e) {
    this.setData({
      userPasswordAgain: e.detail.value
    });
  },
  userPhoneNumberInput:function (e){
    this.setData({
      userPhoneNumber:e.detail.value
    })
  },
  radioChange:function(e) {
    this.setData({
      userCampus:e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 同意
  checkboxChange: function () {
    if (this.data.checkbox === false) {
      this.setData({
        checkbox: true
      })
    } else {
      this.setData({
        checkbox: false
      })
    }
    
  },
  // 下一步，完善个人信息
  perfectInforTap: function () {
    var that=this
    var userName = this.data.userName;
    var userRealName=this.data.userRealName;
    var userIdcard = this.data.userIdcard;
    var userPassword = this.data.userPassword;
    var userPhoneNumber = this.data.userPhoneNumber;
    var userCampus =this.data.userCampus;
    var checkbox = this.data.checkbox;
    var userPasswordAgain = this.data.userPasswordAgain;
    var name = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    var repetition = this.data.repetition;
    var date=this.data.date;
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (!name.test(userName)) {
      wx.showToast({
        title: '用户名格式不正确',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (repetition == true) {
      wx.showToast({
        title: '用户名已存在',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (userPassword == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if(userIdcard.length != 18 || !name.test(userIdcard)){
      wx.showToast({
        title: '请输入正确的证件号码',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }else if (userPassword.length < 6) {
      wx.showToast({
        title: '密码最少6位',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (userPassword !== userPasswordAgain) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else if (checkbox === false) {
      wx.showToast({
        title: '请选中已阅读',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    } else {
      wx.showToast({
        title: '成功',
        icon: 'none',
        duration: 800,
        mask: true});
      
      wx.cloud.init({
        env: 'test-5c0742',
        traceUser: true
      });
      // 保存用户名和密码
      const db = wx.cloud.database();
      const _ = db.command;
        db.collection('userInformation').add({
                // data 字段表示需新增的 JSON 数据
                  data: { 
                  userName: userName,
                  userIdcard :userIdcard,
                  userPassword: userPassword,
                  userPhoneNumber: userPhoneNumber,             
                  userBirthday: date,
                  userRealName:userRealName,
                  userCampus:userCampus,
                  },
                  success: function (res) {
                    app.globalData.userRecordId=res.data[0]._id
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log(res+"新写入数据");
                  console.log(res.errMsg);
                 }
                })
         app.globalData.userName=userName,
         console.log(app.globalData.userName)
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/myself/myself',
        })
      }, 1000) 
    }
      
    
   /* getApp().globalData.userName=userName
    console.log(app.globalData.userName)*/
   
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    /*var  that=this 
    // 初始化云
    wx.cloud.init({
      env: 'test-5c0742',
      traceUser: true
    });
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('userInformation').where({
      _openid: app.globalData.openid
    }).get({
      success: function (res) {
        if (res.data.length >= 1) {
          that.setData({
            openIdExist: true,
            textid: res.data[0]._id

          })
          //console.log(res);         

        }
        console.log(res);
        console.log("openidexist66" + that.data.openIdExist);
      }
    })
    console.log("opendiexit:" + that.data.openIdExist) */

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