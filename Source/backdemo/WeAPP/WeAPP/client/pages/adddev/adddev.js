
var config = require('../../config')
var Session = require('../..//vendor/wafer2-client-sdk/lib/session');
var Utils = require("../../utils/util.js")
var S_inputId = 0;
var S_inputKey = 0;
var OpenId = 0;
var S_session = 0;
var Sql_flag = 0;
//var  =0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Sql_flag: ""

  },
  input_ID: function (even) {
    // console.log(even.detail["value"])
    S_inputId = even.detail["value"]
    console.log(S_inputId)
  },
  input_Key: function (even) {
    //  console.log(even.detail["value"])
    S_inputKey = even.detail["value"]
    console.log(S_inputKey)
  },
  Add_dev: function () { 
    Sql_flag = "INSTER"
    OpenId =    wx.getStorageSync("OPENID")
    S_session = Session.get();
    console.log(OpenId)
    if (OpenId==''){
      console.log("用户未登录")
      Utils.showModel("添加失败","请登录后重试")
    }else{
      wx.request({
        url: config.service.DB_url + "?OpenId=" + OpenId + "&Userinfo=" + S_session + "&DevNum=" + S_inputId + "&DevKey=" + S_inputKey + "&Sql_flag=" + Sql_flag,

        success: function (res) {
          console.log(res.data)
          Utils.showSuccess("添加设备成功")
        }
      }
      )
    }
    
    

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