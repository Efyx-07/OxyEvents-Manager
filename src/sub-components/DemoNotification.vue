<script setup lang="ts">

import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="demoNotification">
        <Icon icon="solar:forbidden-circle-linear" class="icon"/>
        <p>Disabled for demo</p> 
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';

.demoNotification  {
    display: flex;
    align-items: center;
    gap: .5rem;
    .icon {
        color: $errorColor
    }

    p {
        margin: 0;
        font-size: .8rem;
    }
}

</style> 