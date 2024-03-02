<script setup lang="ts">
import type { Participant } from '@/types/participantsTypes';

const props = defineProps<{
    participants: Participant[];
}>();

interface ArrayItem {
    title: string;
};

const arrayItems: ArrayItem[] = [
    {
        title: 'Entreprise'
    },
    {
        title: 'Nom'
    }, 
    {
        title: 'Prenom'
    }, 
    {
        title: 'Email'
    }, 
    {
        title: 'Téléphone'
    }
];

</script>

<template>
    <div class="participantsList-array_container">
        <table class="participantsList-array">
            <thead>
                <tr>
                    <th v-for="arrayItem in arrayItems" :key="arrayItem.title" style="width: 20%;">{{ arrayItem.title }}</th>
                </tr> 
            </thead>
            <tbody v-for="participant in props.participants" :key="participant.id">
                <tr>
                    <td>{{ participant.nom_entreprise }}</td>
                    <td>{{ participant.nom }}</td>
                    <td>{{ participant.prenom }}</td>
                    <td>{{ participant.email }}</td>
                    <td v-if="participant.telephone && participant.telephone.length > 0">{{ participant.telephone }}</td>
                    <td v-else>Non renseigné</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables.scss';
@import '@/assets/sass/breakPoints.scss';
.participantsList-array_container {
    overflow-x: scroll;
    color: $whiteColor;
    .participantsList-array {
        width: 100%;
        text-align: left;
        border-collapse: collapse;

        th {
            color: $accentColorSecondaryLighted;
        }

        th, td {
            padding: 1rem;   
        }

        thead tr, tbody tr {
            border-bottom: 1px solid $whiteTransparency;
        }

        tbody {
            transition: all .2s ease-in-out;
        }

        tbody:hover {
            background-color: $accentTransparency;
        }
    } 
}

@media screen and (min-width: $breakpointDesktop) {
    .participantsList-array_container {
        overflow-x: unset;
    } 
}

</style>