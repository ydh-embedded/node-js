import Vue      from 'vue'                    ;
import Router   from 'vue-router'             ;
import HomeView from '../views/HomeView.vue'  ;
import SignUp   from '../views/SignUp.vue'    ;
import Login    from '../views/Login.vue'     ;

Vue.useAttrs(Router);

export default new Router({
    mode: "history" ,
    base: process.env.BASE_URL ,
    routes: [

        {
            path:"/"  ,
            name:"home",
            component: Home
        } ,
        {
            path:"/login"  ,
            name:"login",
            component: Home
        } ,
        {
            path:"/sign-up"  ,
            name:"sign-up",
            component: Home
        }
    ]
})