<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">
          <span class="title">{{logo.title}}</span>
          <img :src="logo.src" :alt="logo.title">
        </router-link>

        <button type="button" class="navbar-toggle" @click="toggleNav">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>

      <div id="top-navbar-collapse" :class="['collapse', 'navbar-collapse', {in: showCollapsedNav}]">
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" :class="{active: index === activeNavIndex}">
            <a href="#" @click="changeNavIndex(index)">{{item}}</a>
          </li>
        </ul>

        <!---- entry component --->
        <div class="navbar-right">
          <SearchInput></SearchInput>
          <TheEntry></TheEntry>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheEntry from "@/components/layouts/TheEntry";
import SearchInput from "@/components/layouts/SearchInput";

export default {
  name: "TheHeader",
  components: {
    TheEntry,
    SearchInput
  },
  data: function () {
    return {
      logo: {
        src: `${this.uploadsUrl}communities/hIZjRRdF8oVYZy69XJnT.png!/both/44x44`,
        title: 'Vuejs @ zerist'
      },
      navList: ['bbs', 'news', 'Q&A', 'lesson'],
      activeNavIndex: 0,
      showCollapsedNav: false
    }
  },
  beforeCreate() {
    this.uploadsUrl = 'https://cdn.learnku.com/uploads/'
  },
  methods: {
    changeNavIndex(index) {
      this.activeNavIndex = index;
    },
    toggleNav() {
      this.showCollapsedNav = !this.showCollapsedNav;
    }
  }
}
</script>

<style scoped>
.title {
  color: #000000
}

.navbar-brand > img {
  display: inline-block;
  float: left;
}

.navbar-default .navbar-nav > .active > a {
  background: rgba(0, 0, 0, .03);
}
</style>