// pages/goods_detail/index.js
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],//商品数据详情，需要的
  },
  goodsObj:[],//所有的数据

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { goods_id } = options
    this.getDetailList(goods_id)
  },
  // 获取详情页面数据
  getDetailList(goods_id) {
    request({ url: "/goods/detail", data: { goods_id } })
    .then(result=>{
      // console.log(result);
      // 把数据全部赋值
      this.goodsObj=result
      this.setData({
        goodsList:{
          goods_name:result.goods_name,
          goods_price:result.goods_price,
          pics:result.pics,
          goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
    })
  },
  // 点击轮播图，放大预览
  handlePreviewImage(e){
    // console.log(e);
    const {index}=e.currentTarget.dataset
    const urls=this.data.goodsList.pics.map(v => v.pics_big)
    const current=urls[index]
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd(){
      // 获取本第存储中加入购物车的对象
      let cart= wx.getStorageSync("cart")||{};
      // 判断本地数据中是否有购物车对象
      if(cart[this.goodsObj.goods_id]){
        cart[this.goodsObj.goods_id].num++
      }else{
        // 第一次添加
        cart[this.goodsObj.goods_id]=this.goodsObj
        cart[this.goodsObj.goods_id].num=1
      }
      // 把数据存到本地存储中
      wx.setStorageSync("cart", cart);
      // 添加购物车成功的提示
      wx.showToast({
        title: '购买成功',
        icon: 'success',
        // 遮罩层 蒙版
        //  mask：true 但是用户 点击 按钮的时候没有反应！！
        // mask: true
      });


  },
});
