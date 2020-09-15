<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          Article List
          <router-link v-if="auth" to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            Create Article
          </router-link>
        </h1>

        <ul class="list-group">
          <li v-for="article in articles" class="list-group-item">
            <img v-if="user" :src="user.avatar" class="avatar avatar-small">
            <router-link :to="`/articles/${article.articleId}/content`" class="title">
              {{article.title}}
            </router-link>

            <span class="meta pull-right">
              <span class="timeago">
                {{article.date | moment('from')}}
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "List",
  computed: {
    ...mapState([
        'auth',
        'user',
        'articles'
    ])
  }
}
</script>

<style scoped>

</style>