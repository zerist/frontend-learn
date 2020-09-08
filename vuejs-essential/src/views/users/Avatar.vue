<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2>
          <i class="fa fa-picture-o"></i>
          Avatar
        </h2>
      </div>

      <div data-validator-form>
        <div class="form-group">
          <label>Avatar Preview: </label>
          <div>
            <img :src="avatar" class="avatar-preview-img">
          </div>
        </div>

        <div class="form-group row">
          <div class="col-md-8">
            <input v-model.trim.lazy="avatar" v-validator.required="{title: 'Avatar Address'}" type="text" class="form-control avatar-input">
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-lg btn-primary" @click="updateAvatar">Upload Avatar</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "EditAvatar",
  data() {
    return {
      avatar: ''
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      this.avatar = user.avatar
    }
  },

  methods: {
    updateAvatar() {
      const avatar = this.avatar

      if (avatar) {
        let img = new Image()

        img.onload = () => {
          this.dispatch('updateUser', {avatar})
          this.$message.show('Upload Avatar Success!')
        }

        img.onerror = () => {
          this.$message.show('Upload Avatar Failed!', 'danger')
        }

        img.src = avatar
      }
    }
  }
}
</script>

<style scoped>
.avatar-preview-img {
  min-width: 200ox;
  min-height: 200px;
  max-width: 50%;
}
</style>