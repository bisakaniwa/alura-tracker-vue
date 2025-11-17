<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label cor-label">
          Nome do Projeto:
        </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto"
          placeholder="Qual nome você quer dar ao seu projeto?" />
      </div>
      <div class="field">
        <button type="submit" class="button">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";
import IProjeto from "@/interfaces/IProjeto";

export default defineComponent({
  name: 'TelaFormulario',
  props: {
    id: { type: String }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref('');
    const projetos = computed(() => store.state.projeto.projetos);

    if (props.id) {
      const projeto = projetos.value.find((projeto: IProjeto) => projeto.id === props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const lidarComSucesso = (): void => {
      notificar(TipoNotificacao.SUCESSO, 'Projeto salvo!',
        'Prontinho! ;) Seu projeto já está disponível!');
      nomeDoProjeto.value = '';
      router.push('/projetos');
    };

    const lidarComErro = (): void => {
      notificar(TipoNotificacao.FALHA, 'Ops! Algo aconteceu :(',
        'Tivemos um problema e não conseguimos salvar. Vamos tentar de novo?');
    }

    const salvar = () => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, { id: props.id, nome: nomeDoProjeto.value })
          .then(() => lidarComSucesso())
          .catch(() => lidarComErro());
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
          .then(() => lidarComSucesso())
          .catch(() => lidarComErro());
      }
    };

    return {
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>

<style scoped>
.cor-label {
  color: var(--texto-primario);
}
</style>
