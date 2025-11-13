<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';
import { useStore } from '@/store';
import { EXCLUIR_TAREFA } from '@/store/tipo-mutacoes';

export default defineComponent({
  name: 'TarefaConcluida',
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
  components: { Box, Cronometro, },
  methods: {
    excluir(idTarefa: string) {
      this.store.commit(EXCLUIR_TAREFA, idTarefa);
    }
  },
  setup() {
    const store = useStore();
    return {
      store,
    }
  }
})
</script>

<template>
  <Box class="espacamento">
    <div class="columns is-align-items-center">
      <div class="column is-4 descricao-tarefa cor-tarefa">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3 cor-tarefa">
        {{ tarefa.projeto?.nome || 'Nenhum projeto vinculado' }}
      </div>
      <div class="column is-4">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
      <div>
        <button class="button ml-2 is-danger" @click="excluir(tarefa.id)">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </Box>
</template>

<style scoped>
.descricao-tarefa {
  padding: 1.25rem;
  padding-left: 1.7rem;
}
.espacamento {
  margin-bottom: 2rem !important;
}
.cor-cinza {
  color: var(--texto-tarefa);
}
</style>
