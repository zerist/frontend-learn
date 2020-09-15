<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"></Message>

    <div class="col-md-9 topics-index main-col">
      <div class="panel panel-default">
        <div class="panel-heading">
          <ul class="list-inline topic-filter">
            <li><a href="/topics?filter=default" class="active">active</a></li>
            <li><a href="/topics?filter=excellent">excellent</a> </li>
            <li><a href="/topics?filter=vote">vote</a> </li>
            <li><a href="/topics?filter=recent">recent</a> </li>
            <li><a href="/topics?filter=noreply">no reply</a> </li>
          </ul>
          <div class="clearfix"></div>
        </div>

        <div class="panel-body remove-padding-horizontal">
          <ul class="list-group row topic-list">
            <li v-for="article in articles" :key="article.articleId" class="list-group-item">
              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="reply_count_area hidden-xs pull-right">
                <div class="count_set">
                  <span class="count_of_votes" title="vote count">{{article.likeUsers ? article.likeUsers.length : 0}}</span>
                  <span class="count_seperator">/</span>
                  <span class="count_of_replies" title="reply count">{{article.comments ? article.comments.length : 0}}</span>
                  <span class="count_seperator">|</span>
                  <abbr class="timeago">{{article.date | moment('from')}}</abbr>
                </div>
              </router-link>

              <router-view v-if="user" :to="`/${user.name}`" tag="div" class="avatar pull-left">
                <img :src="user.avatar" class="media-object img-thumbnail avatar avatar-middle">
              </router-view>

              <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
                <div class="media-heading">
                  {{article.title}}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Home",
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false
    }
  },
  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('Register successed!')
            break
          case 'Login':
            vm.showMsg('Login Success')
            break
        }
      } else if (logout) {
        vm.showMsg('Action success!')
      }
    })
  },
  computed: {
    ...mapState([
        'auth',
        'user',
        'articles'
    ])
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('Action success!')
      }
    }
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  }
}
</script>

<style scoped>

</style>