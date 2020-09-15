import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "@/router/routes";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savePosition) {
        if (to.hash) {
            return {selector: to.hash}
        } else if (savePosition) {
            return savePosition
        } else {
            return {x: 0, y: 0}
        }
    }
});

router.beforeEach((to, from, next) => {
    const app = router.app
    const store = app.$options.store
    const auth = store.state.auth
    const articleId = to.params.articleId
    const user = store.state.user && store.state.user.name
    const paramUser = to.params.user

    app.$message.hide()

    if (
        (auth && to.path.indexOf('/auth/') !== -1)
        || (!auth && to.meta.auth)
        || (articleId && !store.getters.getArticleById(articleId))
        || (paramUser && paramUser !== user && !store.getters.getArticlesByUid(null, paramUser).length)
    ) {
        next('/')
    } else {
        next()
    }

})

router.afterEach((to, from) => {
    const app = router.app
    const store = app.$options.store
    const showMsg = to.params.showMsg

    if (showMsg) {
        if (typeof showMsg === 'string') {
            app.$message.show(showMsg)
        } else {
            app.$message.show('Action success!')
        }
    }
})

export default router;