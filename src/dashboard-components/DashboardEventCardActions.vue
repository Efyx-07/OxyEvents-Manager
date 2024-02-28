<script setup lang="ts">

import { Icon } from '@iconify/vue';

const props = defineProps<{
    slug: string;
}>()

interface ActionItem {
    name: string;
    icon: string;
    clickAction: string;
}

const actionItems: ActionItem[] = [

    {
        name: 'navigateToEvent',
        icon: 'mdi:eye',
        clickAction: `navigateToEvent('${props.slug}')`
    },

    {
        name: 'navigateToEventUpdate',
        icon: 'ic:baseline-edit',
        clickAction: 'navigateToEventUpdatePage(event.slug)'
    },

    {
        name: 'navigateToParticipantsList',
        icon: 'heroicons:users-solid',
        clickAction: 'navigateToParticipantsList(event.slug)'
    },

    {
        name: 'openRemoveEventConfirmationModal',
        icon: 'mdi:trash',
        clickAction: 'openRemoveEventConfirmationModal(event)'
    }
];

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