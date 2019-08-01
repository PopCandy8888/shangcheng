// components/Tab/Tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
        type:Object,
        value:{}
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      handlechange(e){
        // console.log(e);
        const {index}=e.currentTarget.dataset
        this.triggerEvent("itemIndex",{index})
      }
  },
  onLoad(){
    // console.log(this.data.tabs);
  }

})
