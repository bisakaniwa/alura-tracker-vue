<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-finalizar-temporizador="finalizarTarefa($event)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from '@/store';
import useNotificacao from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { CADASTRAR_TAREFA, OBTER_PROJETOS } from '@/store/tipo-acoes';
import IProjeto from '@/interfaces/IProjeto';

export default defineComponent({
  name: 'FormularioTarefa',
  components: { Temporizador },
  setup() {
    const store = useStore();
    const { notificar } = useNotificacao();
    const idProjeto = ref('');
    const descricao = ref('');
    const projetos = computed(() => store.state.projeto.projetos);

    store.dispatch(OBTER_PROJETOS);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      store.dispatch(CADASTRAR_TAREFA, {
        duracaoEmSegundos: tempoDecorrido, descricao: descricao.value,
        projeto: projetos.value.find((projeto: IProjeto) => projeto.id === idProjeto.value),
      }).then(() => {
        notificar(TipoNotificacao.SUCESSO, 'Tarefa concluída!', 'Adicionamos seu progresso no board :)')
        descricao.value = '';
      });
    }

    return {
      projetos,
      descricao,
      idProjeto,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
