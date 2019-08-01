export const request=(params)=>{
    // 公共的接口资源
    const baseUrl="https://api.zbztb.cn/api/public/v1";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message)
            },
            fail:(err)=>{
                reject(err)
            }
        })
    })
}