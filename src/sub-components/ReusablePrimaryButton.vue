<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/dashboard-styles/mixins.scss';
.btn {
    @include backOfficeButtonStyle;
    background: $accentColorPrimary;

    &:hover {
        background: $accentColorPrimaryLighted;
    }
}

</style>