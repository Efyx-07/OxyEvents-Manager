<script setup lang="ts">

import { Icon } from '@iconify/vue';

interface AdminNavItem {
    name: string;
    icon: string;
    navTo: string;
    activePath: string;
};

const adminNavItems: AdminNavItem[] = [

  {
    name: 'update',
    icon: 'subway:admin',
    navTo: '/admin-update',
    activePath: '/admin-update'
  },

  {
    name: 'add',
    icon: 'subway:admin-1',
    navTo: '/admin-add',
    activePath: '/admin-add'
  },

  {
    name: 'delete',
    icon: 'subway:admin-2',
    navTo: '/admin-delete',
    activePath: '/admin-delete'
  },

];

</script>

<template>
    <div class="adminPageNav">
        <router-link v-for="adminNavItem in adminNavItems" :key="adminNavItem.name" :to="adminNavItem.navTo" class="navIcon" :class="{ 'active-link': $route.path === adminNavItem.activePath }">
            <Icon :icon="adminNavItem.icon" />
        </router-link>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables.scss';
@import '@/assets/sass/breakPoints.scss';

.adminPageNav {
    border: solid 1px $blackTransparency;
    border-radius: $containerRadius * 2;
    display: flex;
    justify-content: space-around;
    padding: .5rem 2rem;
    align-items: center;
    .navIcon {
        color: $blackColor;
        font-size: 1.5rem;
        &:hover, &.active-link {
            color: $accentColorPrimary;
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {
    .adminPageNav {
        gap: 5rem;
    }
}

</style>