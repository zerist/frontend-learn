import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "@/router/routes";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes
});

router.beforeEach((to, from, next) => {
    const auth = router.app.$options.store.state.auth

    if (auth && to.path.indexOf('/auth/') !== -1) {
        next('/')
    } else {
        next()
    }

})

export default router;