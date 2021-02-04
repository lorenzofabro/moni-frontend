<template>
  <div>
    <v-card class="pa-5 mt-5 mx-auto" color="#262626" flat width="600">
      <v-container fluid class="ma-0 mb-5" style="background-color: #9613d4">
        <v-card-title
          class="title text-uppercase font-weight-bold white--text"
          style="word-break: break-word"
        >
          Login
        </v-card-title>
      </v-container>

      <v-card-text>
        <v-form>
          <v-text-field
            label="Nombre de usuario"
            v-model="user.username"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            v-model="user.password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="login()" text>Ingresar</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar
      v-model="snackbar.active"
      :top="true"
      :timeout="6000"
      :color="snackbar.color"
      class="subtitle-1"
    >
      {{ snackbar.text }}
      <v-btn text @click="snackbar.active = false"> Cerrar </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data: () => ({
    showPassword: false,
    user: {
      username: "",
      password: "",
    },
    snackbar: {
      active: false,
      color: "",
      text: "",
    },
  }),
  methods: {
    ...mapMutations(["getUser"]),
    ...mapActions(["saveUser", "readToken", "logout"]),
    login() {
      this.axios
        .post("auth/login/", this.user)
        .then((res) => {
          const token = res.data.access;
          this.saveUser(token);
        })
        .catch((e) => {
          this.snackbar.color = "red darken-2";
          this.snackbar.text = e;
          this.snackbar.active = true;
        });
    },
  },
};
</script>