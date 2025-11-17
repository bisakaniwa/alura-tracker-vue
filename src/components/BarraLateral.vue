<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Logo do Alura Tracker">
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="alterarTema">
        {{ textoBotao }}
      </button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoAlterarTema'],
  data() {
    return {
      modoEscuroAtivo: false,
    }
  },
  computed: {
    textoBotao() {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro';
      }
      return 'Ativar modo escuro';
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit('aoAlterarTema', this.modoEscuroAtivo);
    }
  }
})
</script>

<style scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  align-items: center;
}

.panel li {
  margin: 10px 0 10px 8px;
}

.link {
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
