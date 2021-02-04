<template>
  <div class="text-center">
    <div class="mt-5">
      <v-btn class="mt-2" color="#9613d4" :to="{ name: 'Pedido'}" x-large>Pedir un préstamo</v-btn>
    </div>
    <div class="mt-5">
      <v-btn class="mt-2" color="#9613d4" :to="{ name: 'Pedidos'}" x-large>Ver solicitudes de préstamos</v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    
  }
}
</script>
