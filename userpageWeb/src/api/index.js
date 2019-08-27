import {axios} from "../utils/request";
let curUrl=""
if(process.env.NODE_ENV=="development"){
    curUrl="/api";
}else{
    curUrl=""
}
//登录
export const login=(data)=>axios.post(curUrl+"/user/login",data);
//获取验证码
export const getCheckcode=(data)=>axios.post(curUrl+"/user/checkCode",data);

//获取首页轮播图
export const banners=()=>axios.get(curUrl+"/home/banner");

//获取所有商品
export const allshop=(data)=>axios.get(curUrl+"/home/shop",{params:{...data}})

//获取所有分类
export const getAllTypes=()=>axios.get(curUrl+"/shop/shopType");

//获取筛选商品
export const getFilterShops=(data)=>axios.get(curUrl+"/shop/selectType",{params:{...data}});

//获取购物车商品
export const getCarShop=(data)=>axios.get(curUrl+"/car/getCar",{params:{...data}})

//删除商品件数
export const delShopC=(data)=>axios.post(curUrl+"/car/removeCar",data)

//添加商品件数
export const addShopC=(data)=>axios.post(curUrl+"/car/addCar",data)

//删除商品
export const deleteshops=(data)=>axios.post(curUrl+"/car/removeShop",data)

//获取所有商品
export const getAllShops=()=>axios.get(curUrl+"/shop/allShop");