// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    adress: {}
  },
  handleChooesAdress() {
    // 判断是否有过收货地址
    wx.getSetting({
      success(res) {
        // console.log(res.authSetting["scope.address"], "55");
        const adress = res.authSetting["scope.address"];
        if (adress === undefined || adress === true) {
          // 直接获取地址
        } else {
          // 打开设置地址
          console.log(22);
          wx.openSetting({
            success(res) {
              console.log(res);
            },
            fail(err) {
              console.log(err);
            }
          });
        }
        // 获取收获地址
        wx.chooseAddress({
          success(res) {
            console.log(res);
            // 把地址存到本地存储中
            res.all=res.provinceName+res.cityName+res.countyName+res.detailInfo+res.userName+'电话：'+res.telNumber
            console.log(res.all);
            wx.setStorageSync("adress", res);
          },
          fail(res) {
            console.log(res);
          }
        });
      }
    });
  },
  onShow(){
    // 把地址赋值给data
    this.setData({
      adress:wx.getStorageSync("adress")||{}
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
