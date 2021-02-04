<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="pedidos"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Pedidos de préstamos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <FormPrestamo
              titulo="Pedido de préstamo"
              :nuevo="false"
              :pedido="editedItem"
              @save="save"
            />
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="subtitle-1"
                >¿Está seguro que desea eliminar este pedido?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
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
import { mapState } from "vuex";
import FormPrestamo from "../components/FormPrestamo.vue";
export default {
  components: { FormPrestamo },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Apellido", value: "apellido" },
      { text: "Monto", value: "monto" },
      { text: "Aprobado", value: "aprobado" },
      { text: "Email", value: "email" },
      { text: "Género", value: "genero" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    pedidos: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      apellido: "",
      monto: 0,
      aprobado: false,
      email: "",
      genero: 0,
    },
    snackbar: {
      active: false,
      color: "",
      text: "",
    },
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.inicializar();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    inicializar() {
      let config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      this.axios
        .get("api/pedido/", config)
        .then((res) => {
          this.pedidos = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    editItem(item) {
      this.editedIndex = this.pedidos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.pedidos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      this.axios
        .delete(`api/pedido/${this.editedItem.id}/`, config)
        .then((res) => {
          this.snackbar.color = "green darken-2";
          this.snackbar.text = "El pedido se ha eliminado correctamente 😁";
          this.snackbar.active = true;
          this.pedidos.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch((e) => {
          console.error(e);
          this.snackbar.color = "red darken-2";
          this.snackbar.text = e;
          this.snackbar.active = true;
        });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.snackbar.color = "green darken-2";
      this.snackbar.text = "El pedido se ha modificado correctamente 😁";
      this.snackbar.active = true;
      if (this.editedIndex > -1) {
        Object.assign(this.pedidos[this.editedIndex], this.editedItem);
      }
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>