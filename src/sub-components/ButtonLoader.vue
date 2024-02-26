<template>
    <div class="loader-container">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .lds-ring {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 50px;
        height: 50px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 32px;
        height: 32px;
        margin: 4px;
        border: 4px solid $accentColorBackof2;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: $accentColorBackof2 transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}

</style>