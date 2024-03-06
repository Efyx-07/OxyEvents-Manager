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
@import '@/assets/sass/breakPoints.scss';

.toTopButton_container {
    width: 3rem;
    height: 3rem;
    border: solid 1px $blackTransparencyStrong;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        border-color: $accentColorSecondary;
    }

    &:hover > .toTopIcon {
        color: $accentColorSecondary;
    }

    .toTopIcon {
        color: $blackTransparencyStrong;
        font-size: 2.5rem;
    }
}

@media screen and (min-width: $breakpointDesktop) {

    .toTopButton_container {
        background: $accentColorPrimary;
        border: none;
        box-shadow: $shadow;

        &:hover {
            background: $accentColorSecondary;
        }

        &:hover > .toTopIcon {
            color: $whiteColor;
        }

        .toTopIcon {
            color: $whiteColor;
        }
    }
}


</style>