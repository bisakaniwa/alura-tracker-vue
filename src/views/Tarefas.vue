<template>
  <Formulario />
  <div class="lista">
    <Box v-if="listaEstaVazia" class="lista">
      Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
    </Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'TelaTarefas',
  components: { Formulario, Tarefa, Box },
  setup() {
    const store = useStore();
    return {
      tarefas: computed(() => store.state.tarefas),
      listaEstaVazia: computed(() => store.state.tarefas.length === 0),
    }
  }
})
</script>

<style>
.lista {
  padding: 1.25rem;
  border-radius: 15px;
  color: var(--texto-tarefa)
}
</style>
