import Vue from 'vue'
import VueRouter  from 'vue-router'
import RecupererPassword from "../Views/RecupererPassword.vue"
import login from "../Views/login.vue"
import createaccount from "../Views/createaccount.vue"
import profil from "../Views/profil.vue"


Vue.use(VueRouter);

const routes = [
    {
      path: "/recupererpassword",
      name: "recupererpassword",
      component: RecupererPassword
    },
    {
      path: "/",
      component: login
    },
    {
      path: "/inscription",
      component: createaccount
    },
    {
        path: "/profil/:id",
        component: profil
      }
    
  ];
  
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });

  export default router;


