import { getCarShop} from "@/api/index";
const state = {
  shoplist: [],
  allcount: 0,
  allPrice: 0,
  allchecked:false
};

const mutations = {
  //设置商品属性,checked
  setShopList(state, { data }) {
    let arr = [];
    data.forEach(item => {
      let index = state.shoplist.findIndex(val => val.id == item.id);
      if (index !== -1) {
        arr.push({
          checked: state.shoplist[index].checked,
          ...item
        });
      } else {
        arr.push({
          checked: false,
          ...item
        });
      }
    });
    state.shoplist = arr;
    //购物车有没有数据
    if( state.shoplist.length){
       state.allchecked=state.shoplist.every(item=>item.checked==true);
    } else{
      state.allchecked=false;
    }
   
  },
  //计算总价
  allP(state) {
    state.allPrice = state.shoplist.reduce((prev, item) => {
      return prev +( item.checked ? item.count * item.shopdata.price : 0);
    }, 0);
  },
  //计算总件
  allC(state) {
    state.allcount = state.shoplist.reduce((prev, item) => {
      return prev +( item.checked ? item.count : 0);
    }, 0);
  },
  //全选
  allcheckfn(state){
    state.allchecked=!state.allchecked;
    state.shoplist.forEach(item=>{
        item.checked=state.allchecked
    })
  }
};

const actions = {
  //获取所有商品
  async getAllshop({ commit }) {
    let userInof = window.sessionStorage.getItem("userInfo");
    const userid = userInof ? JSON.parse(userInof).userid : "";
    if (userid) {
      let allShoplist = await getCarShop({ user_id: userid + "" });
      commit("setShopList", allShoplist);
    }else{
      return "身份已过期"
    }
  }
};

const getters = {
  getshoplist(state) {
    return state
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
