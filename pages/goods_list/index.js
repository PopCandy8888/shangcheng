// pages/goods_list/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, name: "综合", isActive: true },
      { id: 1, name: "销量", isActive: false },
      { id: 2, name: "价格", isActive: false }
    ],
    goodsList: []
  },
  // 接口需要的参数
  queryParams: {
    // 搜索的关键字
    query: "",
    // 分类id
    cid: "",
    // 页码
    pagenum: 1,
    // 页容量
    pagesize: 10
  },
  // 总页数
  allTotal: 1,
  // 页面一开始就开始加载
  onLoad(options) {
    // console.log(123);
    // console.log(options);
    this.queryParams.cid = options.cid;
    this.getGoodsList();
  },
  // 页面下拉刷新
  onPullDownRefresh() {
    // console.log(123);
    this.queryParams.pagenum = 1;
    this.setData({
      goodsList: []
    });
    this.getGoodsList();
  },
  // 页面触底事件
  onReachBottom() {
    // console.log(123);
    if (this.allTotal === this.queryParams.pagenum) {
      wx.showToast({
        title: "没有下一页数据了",
        icon: "none"
      });
    } else {
      this.queryParams.pagenum++;
      this.getGoodsList();
    }
  },
  // 获取详细数据
  getGoodsList() {
    // 页面加载效果
    wx.showLoading({
      title: "加载中"
    });
    request({ url: "/goods/search", data: this.queryParams }).then(result => {
      console.log(result);
      // 计算总页数
      this.allTotal = Math.ceil(result.total / this.queryParams.pagesize);
      this.setData({
        goodsList: [...this.data.goodsList, ...result.goods]
      });
      // 页面加载效果结束
      wx.hideLoading();
      // 页面停止刷新
      wx.stopPullDownRefresh();
    });
  },
  // 处理点击事件
  handlechangeIndex(e) {
    console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.map((v, i) => {
      if (index === i) {
        v.isActive = true;
      } else {
        v.isActive = false;
      }
    });
    this.setData({
      tabs
    });
  }
});
