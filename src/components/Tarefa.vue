<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';
import { useStore } from '@/store';
import { REMOVER_TAREFA } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'TarefaConcluida',
  props: {
    tarefa: { type: Object as PropType<ITarefa>, required: true },
  },
  emits: ['aoClicarTarefa'],
  components: { Box, Cronometro },
  setup(props, { emit }) {
    const store = useStore();

    const excluir = (idTarefa: string) => {
      store.dispatch(REMOVER_TAREFA, idTarefa);
    }

    const tarefaClicada = (): void => {
      emit('aoClicarTarefa', props.tarefa);
    }

    return {
      store,
      excluir,
      tarefaClicada,
    };
  }
})
</script>

<template>
  <Box class="espacamento">
    <div class="columns is-align-items-center" @click="tarefaClicada">
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
        <button class="button ml-2 is-danger" @click.stop="excluir(tarefa.id)">
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
  cursor: pointer;
}

.cor-cinza {
  color: var(--texto-tarefa);
}
</style>
