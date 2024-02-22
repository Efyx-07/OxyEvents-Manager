<script setup lang="ts">

import PlatformLogo from '@/sub-components/PlatformLogo.vue';
import AdminFormLogin from '@/dashboard-forms/AdminFormLogin.vue';

</script>

<template>
    <div class="formContainer">
        <PlatformLogo class="platformLogo"/>
        <ReusableSeparator/>
        <AdminFormLogin />
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/formContainerStyle.scss';

</style> 