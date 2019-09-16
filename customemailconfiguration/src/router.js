import Vue from "vue";
import Router from "vue-router";

import Emaillist from "./components/EmailList.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Emaillist
    }
  ]
});
