<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2>
          <i class="fa fa-cog"></i>
          Edit Profile
        </h2>
        <hr>
        <div class="form-horizontal" data-validator-form>
          <div class="form-group">
            <div class="col-sm-2 control-label">Username</div>
            <div class="col-sm-6">
              <input v-model.trim="username" v-validator:input.required="{ title: '用户名', regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }" type="text" class="form-control">
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Gender</label>
            <div class="col-sm-6">
              <select v-model="sex" class="form-control">
                <option value="">UnSelect</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Interest</label>
            <div class="col-sm-6">
              <label class="checkbox-inline">
                <input v-model="hobbies" value="pop" type="checkbox"> pop
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="sports" type="checkbox"> sports
              </label>
              <label class="checkbox-inline">
                <input v-model="hobbies" value="game" type="checkbox"> game
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="col-sm-2 control-label">Profile</label>
            <div class="col-sm-6">
              <textarea v-model.trim="introduction" type="text" class="form-control"></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" class="btn btn-primary" @click="updateProfile">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProfile",
  data() {
    return {
      username: '',
      sex: '',
      hobbies: [],
      introduction: ''
    }
  },
  created() {
    const user = this.$store.state.user

    if (user && typeof user === 'object') {
      const {name, sex, hobbies, introduction} = user

      this.username = name
      this.sex = sex || this.sex
      this.hobbies = hobbies || this.hobbies
      this.introduction = introduction
    }
  },

  methods: {
    updateProfile(e) {
      setTimeout(() => {
        if (e.target.canSubmit) {
          this.$store.dispatch('updateUser', {
            name: this.username,
            sex: this.sex,
            hobbies: this.hobbies,
            introduction: this.introduction
          })
          this.$swal({
                text: 'Edit Profile Success!',
                icon: 'success'
              }
          )
          this.$message.show('Edit Success!')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>