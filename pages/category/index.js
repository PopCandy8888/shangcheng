// pages/category/index.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categoryLeftList: [],
    categoryGoodsList: [],
    currentIndex: 0,
    scopetop: 0
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取本地存储
    const cates = wx.getStorageSync("cates");
    // 判断本地储存是不是存在
    if (!cates) {
      // 没有数据
      this.getCategoryLeft();
    } else {
      // 有缓冲数据
      // 判断是否过期
      if (Date.now() - cates.time > 1000 * 10) {
        // 过期了
        this.getCategoryLeft();
      } else {
        // 没有过期
        // 获取缓存的数据
        const cateData = cates.data;
        // 给全局数据赋值
        this.Cates = cateData;
        // 左侧的数据
        const categoryLeftList = this.Cates.map(v => {
          return { cat_id: v.cat_id, name: v.cat_name };
        });
        // 右侧的数据
        const categoryGoodsList = this.Cates[0].children;
        // console.log(categoryLeftList);
        this.setData({
          categoryLeftList,
          categoryGoodsList
        });
      }
    }
  },
  // 获取左边的数据
  getCategoryLeft() {
    // 加载效果
    wx.showLoading({
      title: "加载中"
    });
    request({
      url: "/categories"
    }).then(result => {
      this.Cates = result;
      // 上面判断这里没有数据,我们在这这里把数据存到本地中
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

      // 左侧的数据
      const categoryLeftList = this.Cates.map(v => {
        return { cat_id: v.cat_id, name: v.cat_name };
      });
      // 右侧的数据
      const categoryGoodsList = this.Cates[0].children;
      // console.log(categoryLeftList);
      this.setData({
        categoryLeftList,
        categoryGoodsList
      });
      // 页面加载效果
      wx.hideLoading()
    });
  },
  // 点击左边列表，切换选中项
  handlechangeindex(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset;
    const categoryGoodsList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      categoryGoodsList,
      scopetop: 0
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
