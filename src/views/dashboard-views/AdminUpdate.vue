<script setup lang="ts">

import NavAside from '@/dashboard-components/NavAside.vue';

</script>

<template>
    <div class="backOfficeAdminPage">
        <NavAside class="backOfficeNavAside"/>
        <div class="adminPage">
            <BO_AdminPage_header />
            <div class="adminOperations_container">
                <div class="adminOperations">
                    <div class="adminPasswordUpdating-section adminOperations-section">
                        <div class="sectionTitle_container">
                            <p class="sectionTitle">Modifier votre mot de passe</p>
                            <ReusableSeparator/>
                        </div>
                        <BO_AdminForm_updatePassword class="adminUpdatePasswordForm"/>
                    </div>
                </div>  
            </div>
        </div>
    </div>
    <BackOfficeNavMobile />  
</template>