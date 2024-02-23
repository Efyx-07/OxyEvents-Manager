<script setup lang="ts">

import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="platformLogo">
        <Icon icon="solar:planet-3-broken" class="icon" />
        <div class="platformName" >
            <p class="mainName">O X Y E V E N T S</p>
            <p class="subName">M A N A G E R</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
.platformLogo {
    width: 100%;
    font-family: 'Blinker', sans-serif;
    color: $whiteColor;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .icon {
        font-size: 1.5rem;
    }
    .platformName {
        display: flex;
        flex-direction: column;
        align-items:flex-end;

        p {
            margin: 0;
            line-height: 1;
        }
        .mainName {
            font-size: 1.5rem;
            font-weight: 300;
        }
        .subName {
            font-size: .8rem;
            font-weight: 400;
        }
    }
}

</style>