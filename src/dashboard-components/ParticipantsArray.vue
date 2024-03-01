<script setup lang="ts">
import type { Participant } from '@/types/participantsTypes';

const props = defineProps<{
    participants: Participant[];
}>();

</script>

<template>
    <div class="participantsList-array_container">
        <table class="participantsList-array">
            <thead>
                <tr>
                    <th style="width: 20%;">Entreprise / Organisation</th>
                    <th style="width: 20%;">Nom</th>
                    <th style="width: 20%;">Prénom</th>
                    <th style="width: 20%;">Email</th>
                    <th style="width: 20%;">Téléphone</th>
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