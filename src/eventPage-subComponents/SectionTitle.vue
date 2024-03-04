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