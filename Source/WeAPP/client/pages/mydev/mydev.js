var config = require('../../config')
var Utils = require("../../utils/util.js")
var OpenId = "000";
var Sql_flag = 0;
var DevNum ='';
var rev;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    API_KEY: 'xxxx',
    DEVID: 'xxx',
  },
  get_dev: function () {
    Sql_flag = "SELE"
    var that = this
    OpenId = wx.getStorageSync("OPENID")
    console.log(OpenId)
    if (OpenId == '') {
      console.log("用户未登录")
      Utils.showModel("添加失败", "请登录后重试")
    } else {
      wx.request({
        url: config.service.DB_url + '?Sql_flag=' + Sql_flag + "&OpenId=" + OpenId,
        success: function (res) {           
          console.log(res.data)
          rev = res.data.data['OpenId']
          if (rev == null){
            console.log("未查询到相关数据")
            Utils.showModel("设备为空","请添加设备后查询")
            that.setData({
              API_KEY: 'xxxx',
              DEVID: '当前无设备,请添加',
            })
          }else{
            //console.log(rev)
            that.setData({
              API_KEY: res.data.data["DeviceKey"],
              DEVID: res.data.data["DeviceNum"],
            })
          }
        }
      })
    }
  },
  Del_dev:function()
  {
    var that = this
    Sql_flag = "DEL"
    DevNum = this.data.DEVID
    console.log("DevNum"+DevNum)
    OpenId = wx.getStorageSync("OPENID")
    console.log("OpenId" + OpenId)
    wx.request({
      url: config.service.DB_url + '?Sql_flag=' + Sql_flag + "&OpenId=" + OpenId +"&DevNum="+DevNum,
      success: function (res) {
       console.log(res.data)
       Utils.showSuccess('删除设备成功')
       that.get_dev()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_dev()
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
    this.get_dev()
    wx.stopPullDownRefresh()
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