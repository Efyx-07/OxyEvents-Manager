<script setup lang="ts">

import PlatformLogo from '@/sub-components/PlatformLogo.vue';
import AdminFormLogin from '@/dashboard-forms/AdminFormLogin.vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
import AdminFormForgotPassword from '@/dashboard-forms/AdminFormForgotPassword.vue';
import DemoModeLogin from './DemoModeLogin.vue';
import { ref } from 'vue';

// visibilités par défaut
const loginFormVisible = ref<boolean>(true);
const askResetPasswordFormVisible = ref<boolean>(false);
const demoModeLoginVisible = ref<boolean>(false);

// ouvre le formulaire de demande de réinitialisation de mot de passe 
const askResetPassword = (): void => {
    loginFormVisible.value = false;
    askResetPasswordFormVisible.value = true;
    demoModeLoginVisible.value = false;
};

// ouvre la notification du mode demo
const toDemoModeNotification = (): void  => {
    loginFormVisible.value = false;
    askResetPasswordFormVisible.value = false;
    demoModeLoginVisible.value = true;
}

// revient au formulaire par défaut
const backToLoginForm = (): void  => {
    loginFormVisible.value = true;
    askResetPasswordFormVisible.value = false;
    demoModeLoginVisible.value = false;
};

</script>

<template>
    <div class="formContainer">
        <PlatformLogo class="platformLogo"/>
        <ReusableSeparator color="light"/>
        <AdminFormLogin v-if="loginFormVisible"/>
        <AdminFormForgotPassword v-else-if="askResetPasswordFormVisible"/>
        <DemoModeLogin v-else-if="demoModeLoginVisible"/>
        <ReusableSeparator color="light"/>
        <div class="options">
            <p @click="askResetPassword" v-if="loginFormVisible">Mot de passe oublié ?</p>
            <p @click="backToLoginForm" v-else>Retour</p>
            <p @click="toDemoModeNotification" v-if="!demoModeLoginVisible">Mode demo</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/formContainerStyle.scss';

</style> 