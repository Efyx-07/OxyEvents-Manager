<script setup lang="ts">

import { ref, onMounted } from 'vue';

// visibilité par défaut de l'overlay
const showOverlay = ref<boolean>(false);

// ecoute l'événement personnalisé (créé sur 'ParticipateButton')
onMounted(() => {
    window.addEventListener('show-overlay', () => {
        showOverlay.value = true;
    })
});

</script>

<template>
    <div class="overlay" v-if="showOverlay" ></div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
    width: 100%;
    height: 100vh;
    background: $blackTransparency;
    transition: transform .3s ease-in-out;
}

</style>