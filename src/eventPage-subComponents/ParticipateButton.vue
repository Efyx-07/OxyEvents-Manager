<template>
    <button class="btn">
        <p>Je participe</p>
    </button>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/variables.scss';

.btn {
    width: 100%;
    height: 3rem;
    background: $accentColorSecondary;
    border: none;
    border-radius: $containerRadius * 2;
    box-shadow: $shadow;
    cursor: pointer;

    &:hover {
        background: $accentColorPrimary;
    }

    p {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: $whiteColor;
    }
}

@media screen and (min-width: $breakpointDesktop) {

    .btn {
        width: 14rem;
    }
}

</style>