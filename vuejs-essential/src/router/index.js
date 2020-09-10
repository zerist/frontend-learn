import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "@/router/routes";
import {replaceState} from "vue-router/src/util/push-state";

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
    const articleId = to.params.articleId

    app.$message.hide()

    if (
        (auth && to.path.indexOf('/auth/') !== -1)
        || (!auth && to.meta.auth)
        || (articleId && !store.getters.getArticleById(articleId))
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