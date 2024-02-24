<script setup lang="ts">

import { Icon } from '@iconify/vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';
import { ref, onMounted } from 'vue';
import { useAdminStore } from '@/stores/AdminStore';
import { useRouter } from 'vue-router';

// statut par défaut de la visibilité de la fenetre
const isLogoutConfirmationModalVisible = ref<boolean>(false);

// permet la fermeture de la fenetre au click du bouton Annuler
const closeLogoutConfirmationModal = (): void => {
    isLogoutConfirmationModalVisible.value = false;
};

// ecoute l'événement personnalisé (créé sur 'BackOfficeNavAside') pour réafficher la fenetre
onMounted(() => {
    window.addEventListener('show-logoutConfirmationModal', () => {
        isLogoutConfirmationModalVisible.value = true;
    });
});

// gère le bouton de déconnexion et renvoie sur la page de connexion
const adminStore = useAdminStore();
const router = useRouter();

const handleSignOut = (): void => {

    // supprime le token du localStorage
    localStorage.removeItem('token');
    // supprime les données administrateur du localStorage
    localStorage.removeItem('adminData');
    // réinitialise le store
    adminStore.clearToken();
    // passe le statut de l'administrateur sur 'déconnecté'
    adminStore.isConnected = false;

    // redirige vers la page de connexion
    router.push('/');
};

</script>

<template>
    <div class="modal" :class="{ hiddenLogoutConfirmationModal: !isLogoutConfirmationModalVisible }">
        <div class="modal-content">
            <div class="head-part">
                <div class="icon_container">
                    <Icon icon="uiw:logout" class="icon"/>
                </div>
                <p>Déconnexion</p>
            </div>
            <ReusableSeparator />
            <p class="alertMessage">Souhaitez-vous vous déconnecter ? </p>
            <ReusableSeparator />
            <div class="buttons_container">
                <ReusableSecondaryButton  @click="closeLogoutConfirmationModal">Annuler</ReusableSecondaryButton> 
                <ReusablePrimaryButton @click="handleSignOut">Confirmer</ReusablePrimaryButton>
            </div>
            <Icon icon="ci:close-sm" class="closeIcon" @click="closeLogoutConfirmationModal"/>
        </div>
    </div>  
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/modalStyle';

.hiddenLogoutConfirmationModal {
    visibility: hidden;
    opacity: 0;
}

</style>