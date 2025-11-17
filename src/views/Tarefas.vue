<template>
  <Formulario />
  <div class="lista">
    <Box v-if="listaEstaVazia" class="lista">
      Você não está muito produtivo hoje <span class="has-text-weight-bold">:(</span>
    </Box>
    <div class="field mb-5">
      <p class="control has-icons-left">
        <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @ao-clicar-tarefa="selecionarTarefa" />
  </div>

  <Modal :mostrar="tarefaSelecionada !== null" v-if="tarefaSelecionada">
    <template v-slot:cabecalho>
      <p class="modal-card-title">Editar Tarefa</p>
      <button @click="fecharModal" class="delete" aria-label="close"></button>
    </template>
    <template v-slot:corpo>
      <div class="field">
        <label for="descricaoDaTarefa" class="label">
          Descrição
        </label>
        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa" />
      </div>
      <div class="field select">
        <select v-model="idProjeto">
          <option value="">Selecione o projeto</option>
          <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
            {{ projeto.nome }}
          </option>
        </select>
      </div>
    </template>
    <template v-slot:rodape>
      <button @click="alterarTarefa" class="button is-success">Salvar Alterações</button>
      <button @click="fecharModal" class="button">Cancelar</button>
    </template>
  </Modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, OBTER_TAREFAS } from '@/store/tipo-acoes';
import Modal from '@/components/Modal.vue';

export default defineComponent({
  name: 'TelaTarefas',
  components: { Formulario, Tarefa, Box, Modal },
  setup() {
    const store = useStore();
    const tarefaSelecionada = ref<ITarefa | null>(null);
    const idProjeto = ref<string | undefined>('');
    const filtro = ref('');
    const projetos = computed(() => store.state.projeto.projetos);

    store.dispatch(OBTER_TAREFAS);

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
      idProjeto.value = tarefa.projeto?.id || '';
    };

    const alterarTarefa = () => {
      store.dispatch(ALTERAR_TAREFA, tarefaSelecionada)
        .then(() => fecharModal());
    };

    const fecharModal = () => {
      tarefaSelecionada.value = null;
    }

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      listaEstaVazia: computed(() => store.state.tarefa.tarefas?.length <= 0),
      projetos,
      tarefaSelecionada,
      filtro,
      selecionarTarefa,
      idProjeto,
      alterarTarefa,
      fecharModal,
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
