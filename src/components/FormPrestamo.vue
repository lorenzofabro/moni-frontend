<template>
  <div>
    <v-card class="pa-5 mt-5" color="#262626" flat>
      <v-container fluid class="ma-0 mb-5" style="background-color: #9613d4">
        <v-card-title
          class="title text-uppercase font-weight-bold white--text"
          style="word-break: break-word"
        >
          <v-btn icon @click="$router.back()" class="mr-2" v-if="nuevo"
            ><v-icon>mdi-chevron-left</v-icon></v-btn
          >
          {{ titulo }}</v-card-title
        >
      </v-container>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              v-model="pedido.dni"
              :rules="[(v) => !!v || 'El DNI es un campo requerido']"
              label="DNI *"
              required
              class="mb-1"
              tabindex="1"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="pedido.nombre"
              :rules="[(v) => !!v || 'El nombre es un campo requerido']"
              label="Nombre *"
              required
              class="mb-1"
              tabindex="3"
            ></v-text-field>

            <v-autocomplete
              outlined
              chips
              v-model="pedido.genero"
              :items="generos"
              item-text="nombre"
              item-value="id"
              label="Género *"
              :rules="[(v) => !!v || 'Debe seleccionar su género']"
              required
              class="mb-1"
              tabindex="5"
            ></v-autocomplete>

            <v-switch
              v-model="pedido.aprobado"
              v-if="!nuevo"
              :label="`${pedido.aprobado ? 'Aprobado' : 'Desaprobado'}`"
            ></v-switch>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              outlined
              v-model="pedido.monto"
              type="number"
              :rules="[
                montoRules.minValue(pedido.monto, 0),
                montoRules.isEmpty(),
              ]"
              label="Monto *"
              required
              class="mb-1"
              tabindex="2"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="pedido.apellido"
              :rules="[(v) => !!v || 'El apellido es un campo requerido']"
              label="Apellido *"
              required
              class="mb-1"
              tabindex="4"
            ></v-text-field>

            <v-text-field
              outlined
              v-model="pedido.email"
              :rules="[(v) => !!v || 'El email es un campo requerido']"
              label="Email *"
              required
              class="mb-1"
              tabindex="6"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-container class="mt-5 text-center">
          <v-btn :disabled="!valid" color="success" class="mr-4" @click="add">
            Confirmar
          </v-btn>
          <v-btn color="error" @click="reset"> Limpiar </v-btn>
        </v-container>
      </v-form>

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
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["titulo", "nuevo", "pedido"],
  data: () => ({
    valid: true,
    generos: [],
    pedido: {},
    montoRules: {
      minValue(value, min) {
        return (value || "") >= min || `El monto debe ser mayor a  ${min}`;
      },
      isEmpty() {
        return (v) => !!v || "Debe ingresar el monto del préstamo";
      },
    },
    snackbar: {
      active: false,
      color: "",
      text: "",
    },
  }),

  created() {
    this.inicializar();
    this.getGeneros();
  },

  computed: {
    ...mapState(["token"]),
  },

  methods: {
    inicializar() {
      if (this.nuevo) {
        this.pedido = {
          dni: "",
          nombre: "",
          apellido: "",
          genero: "",
          email: "",
          monto: "",
          aprobado: false,
        };
      }
    },
    add() {
      let validate = this.$refs.form.validate();
      if (validate) {
        if (this.nuevo) {
          this.axios
            .post("api/pedido/", this.pedido)
            .then((res) => {
              if (res.data.aprobado) {
                this.snackbar.color = "green darken-2";
                this.snackbar.text =
                  "Su pedido ha sido aprobado correctamente 😁";
              } else {
                this.snackbar.color = "orange darken-2";
                this.snackbar.text = "Su pedido ha sido rechazado 😓";
              }
              this.snackbar.active = true;
              this.reset();
            })
            .catch((e) => {
              console.error(e);
              this.snackbar.color = "red darken-2";
              this.snackbar.text = e;
              this.snackbar.active = true;
            });
        } else {
          let config = {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          };
          this.axios
            .put(`api/pedido/${this.pedido.id}/`, this.pedido, config)
            .then((res) => {
              this.$emit("save");
            })
            .catch((e) => {
              console.error(e);
              this.snackbar.color = "red darken-2";
              this.snackbar.text = e;
              this.snackbar.active = true;
            });
        }
      } else {
        this.snackbar.color = "red darken-2";
        this.snackbar.text = "Verifique los campos obligatorios 😓";
        this.snackbar.active = true;
      }
    },
    getGeneros() {
      this.axios
        .get("api/generos/")
        .then((res) => {
          this.generos = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>