<script setup lang="ts">

import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';

interface SectionTitleProps {
    title: string;
}

const props = defineProps<SectionTitleProps>();

</script>

<template>
    <div class="sectionTitle">
        <h2>{{ props.title }}</h2>
        <ReusableSeparator />
    </div>
</template>

<style lang="scss" scoped>

.sectionTitle {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
        margin: 0;
        font-size: clamp(1.25rem, 3vw, 1.7rem);
        white-space: nowrap;
    }
}

</style>