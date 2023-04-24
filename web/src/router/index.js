import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from "@/views/pk/PkIndexView"
import RecordIndexView from "@/views/record/RecordIndexView"
import RecordContentView from "@/views/record/RecordContentView"
import RanklistIndexView from "@/views/ranklist/RanklistIndexView"
import BotIndexView from "@/views/user/bots/BotIndexView"
import NotFund from "@/views/error/NotFund"
import UserAccountLoginView from "@/views/user/account/UserAccountLoginView"
import UserAccountRegisterView from "@/views/user/account/UserAccountRegisterView"
import UserAccountLoginByPhoneView from "@/views/user/account/UserAccountLoginByPhoneView"
import BindUserByPhoneView from "@/views/user/account/BindUserByPhoneView"
import BotShoppingView from "@/views/ShoppingMall/BotShoppingView"
import MyShoppingCartView from "@/views/ShoppingMall/MyShoppingCartView"
import BotShoppingShowView from "@/views/ShoppingMall/BotShopShowView"
import UserAccountKOBView from "@/views/user/account/UserAccountKOBView"
import RoastView from "@/views/leavemessage/RoastView"
import store from '@/store/index'


const routes = [
  // 路径映射  path为相对路径，即localhost:8080 + path
  {
    path:"/",
    name:"home",
    conponent: PkIndexView,
    meta: {
      // 需不需要授权
      requestAuth: true,
    }
  },
  {
    path: '/pk/',
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/record/',
    name: "record_index",
    component: RecordIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/ranklist/',
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/user/bot/',
    name: "user_bot_index",
    component: BotIndexView,
    meta: {
      requestAuth: true,
    }
  }, 
  {
    path: "/user/account/login/",
    name : "user_account_login",
    component : UserAccountLoginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path : "/user/account/register/",
    name : "user_account_register",
    component : UserAccountRegisterView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path : "/record/:recordId/",
    name : "record_content",
    component : RecordContentView,
    meta: {
      requestAuth : true,
    }
  },
  {
    path : "/user/account/loginByPhone/",
    name : "user_account_loginByPhone",
    component : UserAccountLoginByPhoneView,
    meta: {
      requestAuth : false,
    }
  },
  {
    path : "/user/account/bindUser/",
    name : "user_account_bindUser",
    component : BindUserByPhoneView,
    meta : {
      requestAuth : false,
    }
  },
  {
    path : "/shopping/botshop/",
    name : "shopping_botshop",
    component : BotShoppingView,
    meta : {
      requestAuth : true,
    }
  },
  {
    path : "/shopping/cart/",
    name : "shopping_cart",
    component : MyShoppingCartView,
    meta : {
      requestAuth : true,
    }
  },
  {
    path : "/shopping/object/:id/",
    component : BotShoppingShowView,
    meta : {
        requestAuth : false,
    }
  },
  {
    path : "/user/account/KOB/",
    name : "user_account_KOB",
    component : UserAccountKOBView,
    meta : {
      requestAuth : true,
    }
  },
  {
    path : "/leavemessage/roast/",
    name : "leavemessage_roast",
    component : RoastView,
    meta : {
      requestAuth : true,
    }
  }
  ,
  {
    path:"/:catchAll(.*)",
    redirect:"/404/",
    meta: {
      requestAuth: true,
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 进到router之前执行的函数,to表示跳转到哪个页面，from表示从哪个页面跳转过来，next表示需不需要跳转
// 可以用来授权页面，若没有授权则跳转到登录页面
router.beforeEach((to, from, next) => {
  if(to.meta.requestAuth && !store.state.user.is_login){
    next({name : "user_account_login"});
  }else{
    next();
  }
})

export default router
