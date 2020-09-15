<template>
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{title}}</h1>
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
            <abbr>{{date | moment('from')}}</abbr>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body">
              <div class="markdown-body" v-html="content"></div>
              <div v-if="auth && uid === 1" class="panel-footer operate">
                <div class="actions">
                  <a @click="deleteArticle" class="admin" href="javascript:;">
                    <i class="fa fa-trash-o"></i>
                  </a>
                  <a @click="editArticle" class="admin" href="javascript:;">
                    <i class="fa fa-pencil-square-o"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 点赞 votes -->
        <div class="votes-container panel panel-default padding-md">
          <div class="panel-body vote-box text-center">
            <div class="btn-group">
              <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
                <i class="fa fa-thumbs-up"></i>
                {{likeClass ? 'voted' : 'vote'}}
              </a>

              <div class="or"></div>
              <div @click="showQrcode = true" class="btn btn-success">
                <i class="fa fa-heart"></i>
                Sponsor
              </div>
            </div>

            <div class="voted-users">
              <div class="user-lists">
                <span v-for="likeUser in likeUsers">
                  <img :src="user && user.avatar" class="img-thumbnail avatar avatar-middle" :class="{'animated swing': likeUser.uid === 1}">
                </span>
              </div>

              <div v-if="!likeUsers.length" class="vote-hint">To vote first ?</div>
            </div>
          </div>
        </div>

        <!-- sponsor modal -->
        <Modal :show.sync="showQrcode" class="text-center">
          <template v-slot:header>
            <div v-if="user">
              <img :user="user.avatar" class="img-thumbnail avatar" width="48">
            </div>
          </template>

          <div>
            <p class="text-md">stay hungry, stay foolish</p>
            <div class="payment-qrcode inline-block">
              <h5>Scan to sponsor me</h5>
              <p>
                <qrcode-vue value="https://learnku.com/vuejs/" :size="160"></qrcode-vue>
              </p>
            </div>
          </div>

          <template v-slot:footer>
            <div>
              <div class="text-center">Happy to learn</div>
            </div>
          </template>
        </Modal>

        <!-- comment list -->
        <div class="replies panel panel-default list-panel replies-index">
          <div class="panel-heading">
            <div class="total">
              Reply Count: <b>{{comments.length}}</b>
            </div>
          </div>

          <div class="panel-body">
            <transition-group name="fade-comment" tag="ul" id="reply-list" class="list-group row">
              <li v-for="(comment, index) in comments" :key="comment.commentId" class="list-group-item media">
                <div class="avatar avatar-container pull-left">
                  <router-link :to="`/${comment.uname}`">
                    <img :src="comment.uavatar" class="media-object img-thumbnail avatar avatar-middle">
                  </router-link>
                </div>

                <div class="infos">
                  <div class="media-heading">
                    <router-link :to="`/${comment.uname}`" class="remove-padding-left author rm-link-color">
                      {{comment.uname}}
                    </router-link>

                    <span v-if="auth" class="operate pull-right">
                      <span v-if="comment.uid === 1">
                        <a href="javascript:;" @click="editComment(comment.commentId, index)">
                          <i class="fa fa-edit"></i>
                        </a>
                        <span> ⋅ </span>
                        <a href="javascript:;" @click="deleteComment(comment.commentId)">
                          <i class="fa fa-trash-o"></i>
                        </a>
                      </span>
                    </span>

                    <div class="meta">
                      <a :id="`reply${index + 1}`" :href="`#reply${index + 1}`" class="anchor">
                        #{{index + 1}}
                      </a>
                      <span> ⋅ </span>
                      <abbr class="timeago">
                        {{comment.date | moment('from', {startOf: 'second'})}}
                      </abbr>
                    </div>
                  </div>
                </div>

                <div class="preview media-body markdown-reply markdown-body" v-html="comment.content"></div>
              </li>
            </transition-group>
            <div v-show="!comments.length" class="empty-block">
              No comments now~
            </div>
          </div>
        </div>

        <!-- comment editor -->
        <div id="reply-box" class="reply-box form box-block">
          <div class="form-group comment-editor">
            <textarea v-if="auth" id="editor"></textarea>
            <textarea v-else disabled class="form-control" placeholder="comment after sign in" style="height: 172px"></textarea>
          </div>

          <div class="form-group reply-post-submit">
            <button id="reply-btn" :disabled="!auth" @click="comment" class="btn btn-primary">
              {{commentId ? 'Edit' : 'Reply'}}
            </button>
            <span v-show="commentId" class="help-inline btn-cancel" style="cursor: pointer" @click="cancelEditComment">Cancel Edit</span>
            <span v-show="!commentId" class="help-inline">Ctrl + Enter</span>
          </div>

          <div v-show="commentHtml" id="preview-box" class="box preview markdown-body" v-html="commentHtml"></div>
        </div>
      </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import emoji from 'node-emoji'
import {mapState} from 'vuex'
import Modal from "@/components/Modal";
import QrcodeVue from 'qrcode.vue'

export default {
  name: "Content",
  components: {
    Modal,
    QrcodeVue
  },
  data() {
    return {
      title: '',
      content: '',
      date: '',
      uid: 1,
      likeUsers: [],
      likeClass: '',
      showQrcode: false,
      commentHtml: '',
      comments: [],
      commentId: undefined
    }
  },
  computed: {
    ...mapState([
        'auth',
        'user'
    ])
  },
  created() {
    const articleId = this.$route.params.articleId
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      let {uid, title, content, date, likeUsers, comments} = article

      this.uid = uid
      this.title = title
      this.content = SimpleMDE.prototype.markdown(emoji.emojify(content, name => name))
      this.date = date
      this.likeUsers = likeUsers || []
      this.likeClass = this.likeUsers.some(likeUsers => likeUsers.uid === 1) ? 'active' : ''
      this.renderComments(comments)

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }
    this.articleId = articleId
  },
  mounted() {
    if (this.auth) {
      window.hljs = hljs

      const simplemde = new SimpleMDE({
        element: document.querySelector('#editor'),
        placeholder: 'Edit in MarkDown style',
        spellcheck: false,
        autoDownloadFontAwesome: false,
        toolbar: false,
        status: false,
        renderingConfig: {
          codeSyntaxHighlighting: true
        }
      })

      simplemde.codemirror.on('change', () => {
        this.commentMarkdown = simplemde.value()
        this.commentHtml = simplemde.markdown(emoji.emojify(this.commentMarkdown, name => name))
      })

      simplemde.codemirror.on('keyup', (codemirror, event) => {
        if (event.ctrlKey && event.keyCode === 13) {
          this.comment()
        } else if (this.commentId && event.keyCode === 27) {
          this.cancelEditComment()
        }
      })

      this.simplemde = simplemde
    }
  },
  methods: {
    editArticle() {
      this.$router.push({
        name: 'Edit',
        params: {articleId: this.articleId}
      })
    },
    deleteArticle() {
      this.$swal({
        text: 'Sure to delete this article?',
        buttons: ['Cancel', 'Delete']
      }).then((res) => {
        if (res) {
          this.$store.dispatch('post', {articleId: this.articleId})
        }
      })
    },
    like(e) {
      if (!this.auth) {
        this.$swal({
          text: 'Do this action after sign in!',
          button: 'Sign in'
        }).then((res) => {
          if (res) {
            this.$router.push('/auth/login')
          }
        })
      } else {
        const target= e.currentTarget
        const active = target.classList.contains('active')
        const articleId = this.articleId

        if (active) {
          this.likeClass = ''
          this.$store.dispatch('like', {articleId}).then((likeUsers) => {
            this.likeUsers = likeUsers
          })
        } else {
          this.likeClass = 'active animated rubberBand'
          this.$store.dispatch('like', {articleId, isAdd: true}).then((likeUsers) => {
            this.likeUsers = likeUsers
          })
        }
      }
    },
    comment() {
      if (this.commentMarkdown && this.commentMarkdown.trim() !== '') {
        this.$store.dispatch('comment', {
          comment: {content: this.commentMarkdown},
          articleId: this.articleId,
          commentId: this.contentId
        }).then((comments) => {
          this.renderComments(comments)
        })

        if (this.commentId) {
          this.cancelEditComment()
        } else {
          this.simplemde.value('')
          document.querySelector('#reply-btn').focus()

          this.$nextTick(() => {
            const lastComment = document.querySelector('#reply-list li:last-child')
            if (lastComment) lastComment.scrollIntoView(true)
          })
        }
      }
    },
    renderComments(comments) {
      if (Array.isArray(comments)) {
        const newComments = comments.map(comment => ({...comment}))
        const user = this.user || {}

        for (let comment of newComments) {
          comment.uname = user.name
          comment.uavatar = user.avatar

          comment.content = SimpleMDE.prototype.markdown(emoji.emojify(comment.content, name => name))
        }

        this.comments = newComments
        this.commentMarkdown = comments
      }
    },
    editComment(commentId, commentIndex) {
      //console.log(commentId,commentIndex)
      const simplemde = this.simplemde

      const codemirror = simplemde.codemirror

      const comments = this.commentMarkdown

      for (const comment of comments) {
        if (parseInt(comment.commentId) === parseInt(commentId)) {
          simplemde.value(comment.content)
          codemirror.focus()
          codemirror.setCursor(codemirror.lineCount(), 0)
          this.commentIndex = commentIndex + 1
          this.commentId = commentId
          break
        }
      }
    },
    cancelEditComment() {
      this.commentId = undefined
      this.simplemde.value('')

      this.$nextTick(() => {
        if (this.commentIndex === undefined) return
        const currentComment = document.querySelector(`#reply-list li:nth-child(${this.commentIndex})`)

        if (currentComment) {
          currentComment.scrollIntoView(true)
          currentComment.querySelector('.operate a').focus()
        }
      })
    },
    deleteComment(commentId) {
      this.$swal({
        text: 'Sure to delete ?',
        buttons: ['cancel', 'delete']
      }).then((res) => {
        if (res) {
          this.$store.dispatch('comment', {
            commentId,
            articleId: this.articleId
          }).then(this.renderComments)
          this.cancelEditComment()
        }
      })
    }
  }
}
</script>

<style scoped>
.fade-comment-enter-active, .fade-comment-leave-active {
  transition: opacity 1.5s;
}

.fade-comment-enter, .fade--comment-leave-to {
  opacity: 0;
}
</style>