import { Module } from "vuex";
import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";

export interface EstadoTarefa {
  tarefas: ITarefa[],
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  mutations: {
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((task) => task.id === tarefa.id);
      state.tarefas[index] = tarefa;
    },
    [EXCLUIR_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter((tarefa) => tarefa.id !== id);
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas';

      if (filtro) {
        url += '?descricao=' + filtro
      }

      http.get(`${url}`)
        .then((resposta) => commit(DEFINIR_TAREFAS, resposta.data))
    },
    async [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      return await http.post('/tarefas', tarefa).then(() => commit(ADICIONA_TAREFA, tarefa))
    },
    async [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return await http.put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa));
    },
    async [REMOVER_TAREFA]({ commit }, idTarefa: string) {
      return await http.delete(`/tarefas/${idTarefa}`)
        .then(() => commit(EXCLUIR_TAREFA, idTarefa));
    },
  }
}
