<template>
  <div>
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"></Message>
  </div>
</template>

<script>
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
    auth() {
      return this.$store.state.auth
    }
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