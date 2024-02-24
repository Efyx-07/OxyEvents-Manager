<script setup lang="ts">

import PlatformLogo from '@/sub-components/PlatformLogo.vue';
import LogoutConfirmationModal from '@/dashboard-modals/LogoutConfirmationModal.vue';
import { Icon } from '@iconify/vue';
import { useAdminStore } from '@/stores/AdminStore';
import type { AdminData } from '@/types/adminsTypes';
import { ref, onMounted, watch } from 'vue';

interface NavItem {
    name: string;
    icon: string;
    navTo: string;
    activePaths: string[];
};

const navItems: NavItem[] = [

  {
    name: 'Vos évènements',
    icon: 'material-symbols:home-outline',
    navTo: '/home',
    activePaths: ['/home']
  },

  {
    name: 'Nouvel évènement',
    icon: 'ic:outline-create',
    navTo: '/home',
    activePaths: []
  },

  {
    name: 'Administration',
    icon: 'material-symbols:manage-accounts-outline',
    navTo: '/admin-update',
    activePaths: ['/admin-update', '/admin-add', '/admin-delete']
  },

];

const adminStore = useAdminStore();

// ref par défaut des données de l'administrateur connecté
const adminData = ref<AdminData | null>(null);

// charge adminData depuis le localStorage avant le rendu du composant et utilise méthode de AdminStore
onMounted(async () => {
    await adminStore.loadAdminDataFromLocalStorage();
});

// surveille les changements de adminData dans le store et met à jour adminData
watch (() => adminStore.adminData, (newAdminData: AdminData) => {
    adminData.value = newAdminData;
});

// ouvre la fenetre 'LogoutConfirmationModal' au clic de l'icone
const openLogoutConfirmationModal = (): void => {
    // crée un nouvel evenement personnalisé 
    const showLogoutConfirmationModalEvent = new CustomEvent('show-logoutConfirmationModal');
    window.dispatchEvent(showLogoutConfirmationModalEvent);
};


</script>

<template>
    <div class="backOfficeNavAside">
        <div class="head-section">
            <PlatformLogo />
        </div>
        <div class="navItems-container">
            <router-link v-for="navItem in navItems" :key="navItem.name" :to="navItem.navTo" class="item-section" :class="{'active-link': navItem.activePaths.includes($route.path)}">
                <Icon :icon="navItem.icon" class="icon"/>
                <p>{{ navItem.name }}</p>
                <div class="active-bar"></div>
            </router-link>
        </div>
        <div class="footer-section">
            <p v-if="adminData">{{ adminData.firstName }} {{ adminData.lastName }}</p>
            <Icon icon="mdi:power" class="icon" @click="openLogoutConfirmationModal()"/>
        </div>
        <LogoutConfirmationModal />
    </div>   
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/variables.scss';

.backOfficeNavAside {
    display: none;
}

@media screen and (min-width: $breakpointDesktop) {
    .backOfficeNavAside {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 25vw;
        max-width: 20rem;
        background: $darkColor;
        z-index: 199;
        .head-section {
            height: 12rem;
            display: flex;
            justify-content: center;
            margin: 0 1rem;
            border-bottom: solid 1px $whiteTransparency;
        }
        .navItems-container {
            padding-top: 3rem;
            .item-section {
                text-decoration: none;
                height: 3.5rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                color: $whiteColor;
                padding-left: 2rem;
                cursor: pointer;
                position: relative;
                &:hover > .active-bar {
                    background: rgba($accentColorPrimary, .25);
                    width: 100%;
                }
                .icon {
                    font-size: 1.5rem;
                }

                p {
                    margin: 0;
                    font-size: 1rem;
                }
                .active-bar {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: -1;
                    width: 0;
                    height: 100%;
                    background: transparent;
                    border-radius: 0 $containerRadius * 2 $containerRadius * 2 0;
                    transition: all .3s ease-in-out;
                }
                &.active-link>.active-bar {
                    background: $accentColorPrimary;
                    width: 100%;
                }
            }        
        }
        .footer-section {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 6rem;
            color: $whiteColor;
            background: $darkColor;
            border-top: solid 1px $whiteTransparency;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;

            p {
                margin: 0;
                font-size: 1rem;
            }
            .icon {
                font-size: 1.5rem;
                cursor: pointer;

                &:hover {
                    color: $accentColorPrimary;
                }
            }
        }
    }
}

</style>