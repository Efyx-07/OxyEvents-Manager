<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// gestion d'une classe conditionnelle selon la route
const loginPage: boolean = route.name === 'LoginPage';// || route.name === 'BackOfficeResetPassword' || route.name === 'BackOfficeAdminRegister';
const logoClasses = loginPage ? 'loginPageStyle' : [];

</script>

<template>
    <div class="platformLogo">
        <Icon icon="solar:planet-3-broken" class="icon" :class="logoClasses"/>
        <div class="platformName" :class="logoClasses">
            <p class="mainName">O X Y E V E N T S</p>
            <p class="subName">M A N A G E R</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
.loginPageStyle {
    color: rgba($darkColor, .5);
}
.platformLogo {
    width: 100%;
    font-family: 'Blinker', sans-serif;
    color: $ultraWhiteColor;
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