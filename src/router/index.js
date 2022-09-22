import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  // {
  //   path:"/",
  //   name:"layout",
  //   redirect: '/index',
  //   component:()=>import("../layout"),
  //   children:[
  //     {
  //       path:"index",
  //       name:"index",
  //       component:()=>import("../views/index"),
  //       meta:{
  //         title:"首页"
  //       }
  //     },
  //     {
  //       path:"member",
  //       name:"member",
  //       component:()=>import("../views/member/member"),
  //       meta:{
  //         title:"会员管理"
  //       }
  //     },{
  //       path : "supplier",
  //       name : "supplier",
  //       component : () => import("../views/supplier/supplier"),
  //       meta : {
  //         title : "供应商管理"
  //       }
  //     },
  //     {
  //       path : "goods",
  //       name : "goods",
  //       component : () => import("../views/goods/goods"),
  //       meta : {
  //         title : "商品管理"
  //       }
  //     },
  //     {
  //       path : "staff",
  //       name : "staff",
  //       component : () => import("../views/staff/staff"),
  //       meta : {
  //         title : "员工管理"
  //       }
  //     }
    // ]
  // }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
