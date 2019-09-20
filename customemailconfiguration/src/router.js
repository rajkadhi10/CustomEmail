import Vue from "vue";
import Router from "vue-router";

import Emaillist from "./components/EmailList.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Emaillist
    },
    {
      path: "/add",
      name: "home",
      component: Emaillist
    },
    {
      path: "/composemail",
      name: "home",
      component: Emaillist
    },
    {
      path: "/delete",
      name: "home",
      component: Emaillist
    },
    {
      path: "/edit",
      name: "home",
      component: Emaillist
    }
  ]
});
