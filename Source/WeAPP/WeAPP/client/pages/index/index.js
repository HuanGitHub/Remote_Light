
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var CMD_OneNetURL = "https://api.heclouds.com/cmds"
var GET_OneNetURL = "https://api.heclouds.com/devices"

var API_KEY;
var OpenId;
var Sql_flag;
var Dev_Id
var Dev_st;
Page({

  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    text_data: '暂无数据'

  },
  
  switch2Change: function (e) {
    //console.log('switch2 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == true){
      this.send_data1()
    }else{
      this.send_data0()
    }


  },
  get_Devinfo: function () {
    Sql_flag = 'SELE'
    OpenId = wx.getStorageSync("OPENID")
  //  console.log("OpenId:" + OpenId)
    if (OpenId == '') {

    } else {
      wx.request({
        url: config.service.DB_url + '?Sql_flag=' + Sql_flag + "&OpenId=" + OpenId,
        success: function (res) {
          console.log(res.data.data)
          if (res.data.data['DeviceKey'] == null) {
            
            Dev_st = 0;
            wx.showToast({
              title: '设备为空',
              icon: 'none'
            })
            API_KEY = res.data.data['DeviceKey']
            Dev_Id = res.data.data['DeviceNum']
          } else {
            API_KEY = res.data.data['DeviceKey']
            Dev_Id = res.data.data['DeviceNum']
            Dev_st = 1;
          }

        }
      })
    }

  },

  onLoad: function () {
    this.login()
    // this.get_Devinfo()
  

  },
  userInfoHandler: function (res) {
    console.log(res)
    console.log(wx.getStorageSync("OPENID"))
  },

  get_data: function () {
    var that = this
    if (!this.Dev_able()) {
      wx.showToast({
        title: '设备为空',
        icon: 'none'
      })
    } else {
      wx.request({
        //url: 'https://api.heclouds.com/devices/6933384/datastreams', 
        url: 'https://api.heclouds.com/devices/' + Dev_Id + '/datastreams',
        data: {

        },
        header: {
          //'api-key': 'f0=1DKFkvQYF74iYolVRGDVz=3Q=' // 默认值
          'api-key': API_KEY// 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({

            text_data: "湿度：" + res.data.data['3']['current_value'] + '\r\n' + "温度：" + res.data.data['0']['current_value'],
            //text_data: "温度：" + res.data.data['0']['current_value'],
          })
          util.showSuccess("Success")

        }
      })
    }
  },
  Dev_able: function () {
    if (Dev_st == 0) {

      return false
    } else {
      return true
    }
  },
  send_data0: function () {
    if (!this.Dev_able()) {
      wx.showToast({
        title: '设备为空',
        icon: 'none'
      })
    } else {
      wx.request({
        url: CMD_OneNetURL + '?device_id=' + Dev_Id + '&qos=1&type=0',
        data: {
          LED1: 0

        },
        method: "POST",
        header: {
          //'api-key': 'f0=1DKFkvQYF74iYolVRGDVz=3Q=' // 默认值
          'api-key': API_KEY// 默认值
        },
        success: function (res) {
          console.log(res.data)
          util.showSuccess("Success")
        }
      })

    }



  },
  send_data1: function () {
    if (!this.Dev_able()) {
      wx.showToast({
        title: '设备为空',
        icon: 'none'
      })
    } else {
      wx.request({
        url: CMD_OneNetURL + '?device_id=' + Dev_Id + '&qos=1&type=0',
        data: {
          LED1:1
        },
        method: "POST",
        header: {
          // 'api-key': 'f0=1DKFkvQYF74iYolVRGDVz=3Q=', // 默认值
          'api-key': API_KEY// 默认值
          //"Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          util.showSuccess("Success")
        }
      })
    }
  },
  Save_data: function () {
    wx.request({
      //url: config.service.DB_url+"?id=5",
     // url: config.service.DB_url + "?OpenId=000&Userinfo=000&DevNum=000&DevKey=000&Sql_flag=INSTER",
      url: config.service.DB_url,
      success(res) {
        console.log(res.data)
      },
      fail(res){
        console.log("require fail"+res.data)
      }
    })
  },

  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
      //  console.log("result:"+result)
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
          that.get_Devinfo()
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
              that.get_Devinfo()
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  onPullDownRefresh: function () {
    this.get_Devinfo()
    wx.stopPullDownRefresh()
  },


})
