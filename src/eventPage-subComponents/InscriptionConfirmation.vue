<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="inscriptionConfirmation">
        <p>Merci, nous avons bien enregistré votre inscription !</p>
        <Icon icon="ooui:success" class="icon"/>
    </div>   
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';

.inscriptionConfirmation {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 1rem;
        text-align: center;
    }

    .icon {
        color: $validColor;
        font-size: 1.5rem;
    }
}
    
</style>