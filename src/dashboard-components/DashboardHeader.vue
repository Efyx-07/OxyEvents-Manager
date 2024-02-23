<script setup lang="ts">

interface DashboardHeaderProps {
    title: string;
}

const props = defineProps<DashboardHeaderProps>();

</script>

<template>
    <div class="dashboardHeader">
      <h1>{{ props.title }}</h1>
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<style lang="scss" scoped>

.dashboardHeader {
    width: 100%;
    height: 6rem;
    background: red;
    display: flex;
    justify-content: space-between;

    h1 {
        margin: 0;
    }
}
</style>
