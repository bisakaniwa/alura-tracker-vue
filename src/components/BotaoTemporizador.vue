<template>
  <button class="button" @click="aoClicar" :disabled="desabilitado">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{ texto }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BotaoTemporizador',
  props: {
    texto: { type: String, required: true },
    desabilitado: { type: Boolean },
    icone: { type: String, required: true },
  },
  emits: ['aoClicar'],
  methods: {
    aoClicar(): void {
      this.$emit('aoClicar');
    }
  }
});
</script>
