import { Module } from "vuex";
import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { DEFINIR_PROJETOS, ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "@/store/tipo-mutacoes";

export interface EstadoProjeto {
  projetos: IProjeto[],
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [ADICIONA_PROJETO](state, projeto: IProjeto) {
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((projeto) => projeto.id !== id);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('projetos')
        .then((resposta) => commit(DEFINIR_PROJETOS, resposta.data))
    },
    async [CADASTRAR_PROJETO]({ commit }, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      return await http.post('/projetos', projeto)
        .then(() => commit(ADICIONA_PROJETO, projeto))
    },
    async [ALTERAR_PROJETO]({ commit }, projeto: IProjeto) {
      return await http.put(`/projetos/${projeto.id}`, projeto)
        .then(() => commit(ALTERA_PROJETO, projeto));
    },
    async [REMOVER_PROJETO]({ commit }, id: string) {
      return await http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
  }
}
