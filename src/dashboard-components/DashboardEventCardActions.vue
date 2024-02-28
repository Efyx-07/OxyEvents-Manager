<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
    slug: string;
}>()

interface ActionItem {
    name: string;
    icon: string;
    clickAction: Function;
}

const actionItems: ActionItem[] = [

    {
        name: 'navigateToEvent',
        icon: 'mdi:eye',
        clickAction: () => navigateToEvent(props.slug)
    },

    {
        name: 'navigateToEventUpdate',
        icon: 'ic:baseline-edit',
        clickAction: () => navigateToEventUpdatePage(props.slug)
    },

    {
        name: 'navigateToParticipantsList',
        icon: 'heroicons:users-solid',
        clickAction: () => navigateToEventParticipants(props.slug)
    },

    {
        name: 'openRemoveEventConfirmationModal',
        icon: 'mdi:trash',
        clickAction: 'openRemoveEventConfirmationModal(event)'
    }
];

const router = useRouter()

// permet de naviguer vers la page de l'evenement selectionné
const navigateToEvent = (eventSlug: string): void => {
    router.push({
        name: 'EventDetail',
        params: { eventSlug }
    });
};

// permet de naviguer vers la page de modification de l'évènement selectionné
const navigateToEventUpdatePage = (eventSlug: string): void => {
    router.push({
        name: 'EventToUpdate',
        params: { eventSlug }
    });
};

// permet de naviguer vers la page affichant la liste des participants à l'évènement sélectionné
const navigateToEventParticipants = (eventSlug: string): void => {
    router.push({
        name: 'EventParticipants',
        params: { eventSlug }
    });
};

</script>

<template>
    <div class="actionItems-container">
        <div class="actionItem" v-for="actionItem in actionItems" :key="actionItem.name">
            <Icon :icon="actionItem.icon" @click="actionItem.clickAction" class="icon" />
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
.actionItems-container {
    display: flex;
    gap: 1.5rem;
    .actionItem .icon {
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: $accentColorPrimary;
        }
    }
}

</style>