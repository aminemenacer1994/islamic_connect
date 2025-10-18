import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/umrah",
    name: "Umrah",
    component: () => import(/* webpackChunkName: "umrah" */ "../views/Umrah.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
