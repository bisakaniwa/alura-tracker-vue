<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempo-em-segundos="tempoEmSegundos" />

    <BotaoTemporizador texto="Play" icone="fas fa-play" @ao-clicar="iniciar" :desabilitado="cronometroRodando" />
    <BotaoTemporizador texto="Stop" icone="fas fa-stop" @ao-clicar="finalizar" :desabilitado="!cronometroRodando" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import BotaoTemporizador from './BotaoTemporizador.vue';

export default defineComponent({
  name: 'TemporizadorTarefa',
  emits: ['aoFinalizarTemporizador'],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit('aoFinalizarTemporizador', this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
  components: { Cronometro, BotaoTemporizador },
})
</script>
