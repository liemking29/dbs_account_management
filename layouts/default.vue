<template>
  <div class="page-container">
    <md-app>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent name-company" md-elevation="0">
          <a class="logo__title" href="/">Delta Brains</a>
        </md-toolbar>

        <md-list class="menu__item">
          <md-list-item to="/create-account"
            ><span class="item">Tạo tài khoản</span></md-list-item
          >
          <md-list-item class="item" to="/"
            ><span class="item">Quản lí tài khoản</span></md-list-item
          >
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <nuxt />
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DefaultLayout',

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  destroyed() {},
});
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.name-company {
  font-size: 20px;
  font-weight: 700;
}

.item {
  font-weight: 500;
}

.nuxt-link-exact-active {
  background-color: #448aff !important;
  color: #fff !important;
}

.logo__title {
  color: #151515 !important;

  &:hover {
    text-decoration: none;
  }
}
</style>
