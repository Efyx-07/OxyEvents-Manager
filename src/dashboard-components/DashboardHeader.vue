<script setup lang="ts">

import DashboardMobileMenuIcon from '@/sub-components/DashboardMobileMenuIcon.vue';

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
      <div class="mobileMenuIcon-container">
        <DashboardMobileMenuIcon />
      </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';

.dashboardHeader {
  background: $darkColor;
  color: $whiteColor;
  border-bottom: solid 1px $whiteTransparency;
  box-shadow: $shadow;
  padding: 1rem;
  width: 100%;
  min-height: 5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 99;

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  .content {
    width: 100%;
  }
  .mobileMenuIcon-container {
    position: absolute;
    right: 1rem;
    top: 1.3rem;
  }
}

@media screen and (min-width: $breakpointDesktop) {
  .dashboardHeader {
    padding: 1rem 3rem;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    
    h1 {
      font-size: 1.5rem;
    }
    .content {
      width: unset;
    }
  }
}

@media screen and (min-width: $breakpointLargeDesktop) {
  .dashboardHeader h1 {
    font-size: 1.8rem;
  }
}

</style>
