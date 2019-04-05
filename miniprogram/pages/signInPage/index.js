var app = getApp();
Page({
  data: {
    bindName: '',
    bindPassword: '',
    isChecked: false, 
    userName : null,
  },
onShow:function(){
    app.globalData.userName=null;
},
  // 点击注册账号
  registerTap: function () {
    wx.redirectTo({
      url: '/pages/signUpPage/signUpPage'
    })
  },
  // 获取用户名
  bindNameInput: function (e) {
    this.setData({
      bindName: e.detail.value
      
    })
    
      var that = this;
    if (that.data.bindName.length !== 0 && that.data.bindPassword.length !== 0) {
      this.setData({
        isChecked: true
      })
    } else if (that.data.bindName.length === 0) {
      this.setData({
        isChecked: false
      })
    }
  },
  // 获取密码
  bindPasswordInput: function (e) {
    this.setData({
      bindPassword: e.detail.value
    })
    var that = this;
    if (that.data.bindName.length !== 0 && that.data.bindPassword.length !== 0) {
      this.setData({
        isChecked: true
      })
    } else if (that.data.bindPassword.length === 0) {
      this.setData({
        isChecked: false
      })
    }
    
  },
  // 点击登录
  bindingSuccess: function () {
    var that = this
    
    var bindName = that.data.bindName
    var bindPassword = that.data.bindPassword
    
    if (bindName.length != 0 && bindPassword.length != 0) {
      // 初始化云
      wx.cloud.init({
        env: 'test-5c0742',
        traceUser: true
       });     
      console.log("dabase is ok")
      // 初始化数据库
      
     
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('userInformation').where({
            userName : bindName
              }).get({                
                success:function (res){    
                  app.globalData.userRecordId=res.data[0]._id
                  console.log(app.globalData.userRecordId,"qweretdddddddddddddd",res.data[0]._id)
                  console.log("连接数据库成功！", res);              
             if (res.data[0].userPassword === bindPassword)
               {
                  
                    wx.showToast(
                    {
                    title: '登陆成功！\n欢迎使用校车订票服务',
                    icon: 'none',
                    duration: 800
                    })
                           
                 app.globalData.userName=res.data[0].userName,                
               
               setTimeout(function () {
                 wx.switchTab({
                   url: '/pages/myself/myself',
                 })
               }, 1000)

               
             } else {
               wx.showToast({
                 title: '用户名或密码错误',
                 icon: 'none',
                 duration: 1000
               })     
               
            }                 
                  
            },    
         
         })       
        
         
   }else{
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none',
        duration: 1000
      })  
   }    
    
  },
 

  
 
})

