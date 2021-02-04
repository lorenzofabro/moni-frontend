<template>
  <v-app-bar app color="#5e0b85" dark>
    <div class="d-flex align-center headline ml-5">MONI</div>
    <v-spacer></v-spacer>
    <v-btn class="mt-2" :to="{ name: 'Login'}" text v-if="!isActive">Login</v-btn>
    <v-btn class="mt-2" text v-if="isActive" @click="logout()">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed:{
    ...mapGetters(['isActive'])
  },
  methods: {
    ...mapActions(["logout"])
  }
}
</script>