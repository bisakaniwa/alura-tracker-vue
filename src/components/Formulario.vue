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
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from '@/store';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import useNotificacao from '@/hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: 'FormularioTarefa',
  data() {
    return {
      descricao: '',
      idProjeto: '',
    }
  },
  components: { Temporizador },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.store.commit(ADICIONA_TAREFA, {
        duracaoEmSegundos: tempoDecorrido, descricao: this.descricao,
        projeto: this.projetos.find((projeto) => projeto.id === this.idProjeto),
      });
      this.notificar(TipoNotificacao.SUCESSO, 'Tarefa concluída!', 'Adicionamos seu progresso no board :)')
      this.descricao = '';
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificacao();
    return {
      projetos: computed(() => store.state.projetos),
      store,
      notificar,
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
