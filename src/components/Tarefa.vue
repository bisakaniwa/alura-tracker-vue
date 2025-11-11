<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';

export default defineComponent({
  name: 'TarefaConcluida',
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
  components: { Box, Cronometro, }
})
</script>

<template>
  <Box>
    <div class="columns">
      <div class="column is-7 descricao-tarefa">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<style scoped>
.descricao-tarefa {
  color: grey;
}
</style>
