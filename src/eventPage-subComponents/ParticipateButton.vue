<script setup lang="ts">

// ouvre ParticipateModal au click
const toggleParticipateModalVisibility = (): void => {
    //crée un nouvel évènement personnalisé
    const showParticipateModal: Event = new Event('show-participateModal');
    // déclenche l'évènement sur l'objet window
    window.dispatchEvent(showParticipateModal);
    const showOverlay: Event = new Event('show-overlay');
    window.dispatchEvent(showOverlay);
}

</script>

<template>
    <button class="btn" @click="toggleParticipateModalVisibility">
        <p>Je participe</p>
    </button>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/buttonStyle.scss';
@import '@/assets/sass/breakPoints.scss';

@media screen and (min-width: $breakpointDesktop) {

    .btn {
        width: 14rem;
    }
}

</style>