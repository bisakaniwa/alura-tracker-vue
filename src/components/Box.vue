<template>
  <div class="has-text-weight-bold" :style="estilo">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'BoxWrapper',
  data() {
    return {
      estilo: {
        background: '#FAF0CA'
      }
    }
  }
})
</script>
