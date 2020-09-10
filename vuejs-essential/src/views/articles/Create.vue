<template>
  <div class="blog-container">
    <div class="blog-pages">
      <div class="col-md-12 panel">
        <h2 class="text-center">Create Articles</h2>

        <hr>

        <div data-validator-form>
          <input v-model.trim="title" v-validator.required="{title: 'title'}" type="text" class="form-control" placeholder="input title here..." @input="saveTitle">
        </div>

        <hr>

        <div class="form-group">
          <textarea id="editor"></textarea>
        </div>

        <div class="form-group">
          <button class="btn btn-primary" type="submit" @click="post">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
import localStorage from "@/util/localStorage";

window.hljs = hljs

export default {
  name: "Create",
  mounted() {
    const simplemde = new SimpleMDE({
      element: document.querySelector('#editor'),
      placeholder: 'MardDown Editor',
      spellcheck: false,
      autoDownloadFontAwesome: false,
      autosave: {
        enable: true,
        uniqueId: 'vuejs-essential'
      },
      renderingConfig: {
        codeSyntaxHighlighting: true
      }
    })

    simplemde.codemirror.on('change', () => {
      this.content = simplemde.value()
    })

    this.simplemde = simplemde
    this.fillContent()
  },
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    saveTitle() {
      localStorage.setItem('smde_title', this.title)
    },
    fillContent() {
      const simplemde = this.simplemde
      const title = localStorage.getItem('smde_title')

      if (title !== null) {
        this.title = title
      }

      this.content = simplemde.value()
    },
    post() {
      const title = this.title
      const content = this.content

      if(title !== '' && content.trim() !== '') {
        const article = {
          title,
          content
        }

        this.$store.dispatch('post', {article})
        this.clearData()
      }
    },
    clearData() {
      this.title = ''
      localStorage.removeItem('smde_title')
      this.simplemde.value('')
      this.simplemde.clearAutosavedValue()
    }
  }
}
</script>

<style scoped>
.blog-container {
  max-width: 980px;
  margin: 0 auto;
  margin-top: 20px;
}

textarea {
  height: 200px;
}
</style>