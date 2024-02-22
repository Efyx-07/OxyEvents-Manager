<script setup lang="ts">

import PlatformLogo from '@/sub-components/PlatformLogo.vue';
import AdminFormLogin from '@/dashboard-forms/AdminFormLogin.vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

</script>

<template>
    <div class="formContainer">
        <PlatformLogo class="platformLogo"/>
        <ReusableSeparator/>
        <AdminFormLogin />
        <ReusableSeparator/>
        <div class="options">
            <p>Mot de passe oublié ?</p>
            <p>Mode demo</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/formContainerStyle.scss';

</style> 