<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto:
        </label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
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
import { defineComponent } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import { ADICIONA_PROJETO, ALTERA_PROJETO } from "@/store/tipo-mutacoes";
import useNotificador from '@/hooks/notificador'

export default defineComponent({
  name: 'TelaFormulario',
  props: {
    id: { type: String }
  },
  data() {
    return {
      nomeDoProjeto: '',
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find((projeto) => projeto.id === this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.commit(ALTERA_PROJETO, { id: this.id, nome: this.nomeDoProjeto });
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
      }
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo!',
        'Prontinho! ;) Seu projeto já está disponível!');
      this.$router.push('/projetos');
    },

  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>
