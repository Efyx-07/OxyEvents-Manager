<script setup lang="ts">

import { Icon } from '@iconify/vue';

// permet le retour vers le haut de page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

</script>

<template>
    <div class="toTopButton_container" @click="scrollToTop">
        <Icon icon="iconamoon:arrow-up-2-duotone" class="toTopIcon"/>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';

.toTopButton_container {
    width: 3rem;
    height: 3rem;
    background: $accentColorPrimary;
    box-shadow: $shadow;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background: $accentColorSecondary;
    }

    .toTopIcon {
        color: $whiteColor;
        font-size: 2.5rem;
    }
}

</style>