<template>
  <div class="users-show">
    <div class="col-md-3 main-col">
      <div class="box">
        <div class="padding-md">
          <div class="list-group text-center">
            <router-link v-for="link in links" :key="link.name" :to="`/users/1/${link.name}`" class="list-group-item">
              <i :class="`text-md fa fa-${link.icon}`"></i>
              {{link.title}}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UsersEdit",
  data() {
    return {
      links: [
        {
          name: 'edit',
          title: 'profile',
          icon: 'list-alt'
        },
        {
          name: 'edit_avatar',
          title: 'update avatar',
          icon: 'picture-o'
        },
        {
          name: 'edit_password',
          title: 'update password',
          icon: 'lock'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>