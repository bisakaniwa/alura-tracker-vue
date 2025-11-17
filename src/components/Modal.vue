<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    mostrar: { type: Boolean, required: true },
  },
})
</script>

<template>
  <div class="modal" :class="{ 'is-active': mostrar }" v-if="mostrar">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head pt-4 pb-4">
        <slot name="cabecalho" />
      </header>
      <section class="modal-card-body">
        <slot name="corpo" />
      </section>
      <footer class="modal-card-foot is-justify-content-space-evenly pt-4 pb-4">
        <slot name="rodape" />
      </footer>
    </div>
  </div>
</template>
