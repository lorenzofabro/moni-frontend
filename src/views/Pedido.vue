<template>
  <div>
    <FormPrestamo 
      titulo="Nuevo pedido de préstamo"
      :nuevo="true"
    />
  </div>
</template>

<script>
import FormPrestamo from "../components/FormPrestamo.vue";
export default {
  components: {
    FormPrestamo
  }
};
</script>>