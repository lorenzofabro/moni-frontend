<template>
  <v-app style="background-color: #262626">
    <AppBar />
    <v-main>
      <v-scroll-y-transition mode="out-in">
        <router-view></router-view>
      </v-scroll-y-transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>

import Home from '@/views/Home.vue';
import AppBar from '@/components/AppBar.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',

  components: {
    Home, AppBar, Footer
  },

  data: () => ({
    //
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
