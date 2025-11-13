<template>
  <div class="projetos">
    <h1 class="title cor-titulo">Projetos</h1>
    
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'TelaProjetos',
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
.cor-titulo {
  color: var(--texto-projetos);
}
</style>
