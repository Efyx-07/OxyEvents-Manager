<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'dark' // dark par défaut
  }
});

const colorClass = computed(() => {
  return `color-${props.color}`;
});

</script>

<template>
    <div class="separator" :class="colorClass"></div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
.separator {
    width: 100%;
    height: 1px;
}
.color-dark {
    background: $blackTransparency;
}

.color-light {
    background: $whiteTransparency;
}

</style>