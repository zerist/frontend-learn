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
    const app = router.app
    const store = app.$options.store
    const auth = store.state.auth

    app.$message.hide()

    if ((auth && to.path.indexOf('/auth/') !== -1) || (!auth && to.meta.auth)) {
        next('/')
    } else {
        next()
    }

})

export default router;