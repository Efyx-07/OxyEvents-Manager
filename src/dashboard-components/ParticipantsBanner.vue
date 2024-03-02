<script setup lang="ts">

import type { Participant } from '@/types/participantsTypes';
import { computed } from 'vue';
import ParticipantsExcelButton from '@/sub-components/ParticipantsExcelButton.vue';
import ReusableSeparator from '@/sub-components/ReusableSeparator.vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{
    title: string;
    participants: Participant[];
}>();

// detecte le nombre de participants
const participantsCount = computed(() => props.participants.length);

</script>

<template>
    <div class="participantsBanner">
        <h1>{{props.title}}</h1>
        <ReusableSeparator color="light"/>
        <div class="infos-container">
            <div class="participants-count">
                <Icon icon="heroicons:users-solid" class="icon" />
                <p>{{ participantsCount }}</p>
            </div>
            <ParticipantsExcelButton v-bind="props"/>
        </div>
    </div>
</template>

<style scoped lang="scss">

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables';
.participantsBanner {
    border: solid 1px $whiteTransparency;
    border-radius: $containerRadiusM;
    color: $whiteColor;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
        margin: 0;
        font-size: 1.25rem;
    }
    .infos-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3rem;
        .participants-count {
            display: flex;
            align-items: center;
            gap: .25rem;
            .icon {
                font-size: 1.5rem;
            }

            p {
                margin: 0;
                font-size: 1.1rem;
            }
        }
    }
}

</style>