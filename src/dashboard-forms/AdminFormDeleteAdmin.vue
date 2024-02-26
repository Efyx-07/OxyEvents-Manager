<script setup lang="ts">

import { useAdminStore } from '@/stores/AdminStore';
import { ref, onMounted } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';
import { Icon } from '@iconify/vue';
import ReusablePrimaryButton from '@/sub-components/ReusablePrimaryButton.vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
import ButtonLoader from '@/sub-components/ButtonLoader.vue';
import type { Admin } from '@/types/adminsTypes';

const adminStore = useAdminStore();

// visibilité par défaut du loader
const isLoading = ref<boolean>(false);

// initialise un tableau vide de successMessage
const successMessage = ref<Record<string | number, boolean>>({});

// initialise un tableau vide des administrateurs filtrés
const filteredAdmins = ref<Admin[]>([]);

// fonction pour supprimer un administrateur
const deleteAdmin = async (adminId: number) => {

    try {

        isLoading.value = true;

        const { hostName } = useGlobalDataStore();

        const response = await fetch(`${hostName}/admins/${adminId}`, {
        method: 'DELETE',
        });

        if (response.ok) {
                
            // administrateur supprimé avec succès, met à jour la liste des administrateurs filtrés
            filteredAdmins.value = adminStore.filteredAdmins;
                
            // rend visible successMessage
            successMessage.value[adminId] = true;

            // fais un reload de la page après apparition de successMessage
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            
        } else {
            console.error('Erreur lors de la suppression de l\'administrateur');
        }

    } catch (error) {
        console.error('Erreur lors de la suppression de l\'administrateur :', error);
    }
};

// chargement asynchrone des données depuis le store
onMounted(() => {

    adminStore.loadAdminDataFromLocalStorage();
    adminStore.loadAdminsData();

    // filtre les administrateurs une fois les données chargées avec la methode définie dans le store
    filteredAdmins.value = adminStore.filteredAdmins;

});

</script>

<template>
    <div class="adminsList">
        <div class="adminsList_block" v-for="admin in filteredAdmins" :key="admin.nom" >
            <div class="deleting-result_message" v-if="successMessage[admin.id]">
                <div class="text_container">
                    <Icon icon="ooui:success" class="successIcon"/>
                    <p>Administrateur supprimé avec succés !</p>
                </div>
            </div>
            <div class="adminNameAndButton_container" v-else>
                <p> {{ admin.prenom }} {{ admin.nom }} </p>
                <div v-if="admin.id > 3">
                    <ButtonLoader v-if="isLoading"/>
                    <ReusablePrimaryButton @click="deleteAdmin(admin.id)" v-else>Supprimer</ReusablePrimaryButton>
                </div>
            </div>
            <ReusableSeparator/>
        </div>           
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';

.adminsList {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .adminsList_block {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .adminNameAndButton_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;

            p {
                margin: 0;
            }
        }
        .deleting-result_message {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .text_container {
                display: flex;
                align-items: center;
                gap: 1rem;

                p {
                margin: 0;
                }
                .successIcon {
                    font-size: 1.3rem;
                    color: $validColor;
                }
            }
        }
    }
}

 @media screen and (min-width: 360px) {
    .adminsList {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .adminsList_block {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .adminNameAndButton_container {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                p {
                    margin: 0;
                }

                button {
                    align-self: end;
                }
            }
            .deleting-result_message {
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text_container {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    p {
                        margin: 0;
                    }
                    .successIcon {
                        font-size: 1.3rem;
                        color: $validColor;
                    }
                }
            }
        }
    }
}
    
</style>