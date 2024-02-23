<script setup lang="ts">

import { Icon } from '@iconify/vue';
import ReusableSeparatorDark from '@/sub-components/ReusableSeparatorDark.vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ReusableSecondaryButton from '@/sub-components/ReusableSecondaryButton.vue';

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
            <ReusableSeparatorDark/>
            <p class="alertMessage">Souhaitez-vous vous déconnecter ? </p>
            <ReusableSeparatorDark/>
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
/*
    .hiddenLogoutConfirmationModal {
        visibility: hidden;
        opacity: 0;
    }
*/
</style>