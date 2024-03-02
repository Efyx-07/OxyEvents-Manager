<script setup lang="ts">

import ReusablePrimaryButton from './ReusablePrimaryButton.vue'; 
import { Icon } from '@iconify/vue';
import * as ExcelJS from 'exceljs';
import type { Participant } from '@/types/participantsTypes';

const props = defineProps<{
    title: string;
    participants: Participant[];
}>();

// fonction pour exporter la liste participants en fichier excel
const exportToExcel = async (): Promise<void> => {

    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();

    // nettoie le titre de l'événement
    const cleanedEventTitle: string = props.title.replace(/[*?:/\\[\]]/g, '_');

    // récupère le titre de l'évènement pour nommer la feuille de calcul
    const eventSheetName: string = cleanedEventTitle.replace(/\s+/g, '_') // remplace les espaces par des underscores
    const worksheet: ExcelJS.Worksheet = workbook.addWorksheet(`Participants_${eventSheetName}`);

    // ajout des colonnes au fichier excel
    worksheet.columns = [
        { header: 'Entreprise / Organisation', key: 'nom_entreprise', width: 20 },
        { header: 'Nom', key: 'nom', width: 20 },
        { header: 'Prénom', key: 'prenom', width: 20 },
        { header: 'Email', key: 'email', width: 20 },
        { header: 'Téléphone', key: 'telephone', width: 20 },
    ];

    // ajout des données participants à la feuille de calcul
    props.participants.forEach(participant => {
        worksheet.addRow(participant);
    });

    // télecharge le fichier excel
    const buffer: ExcelJS.Buffer = await workbook.xlsx.writeBuffer();
    const blob: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `participants_${eventSheetName}.xlsx`;
    link.click();
};

</script>

<template>
    <ReusablePrimaryButton class="button" @click="exportToExcel">
        <p>Excel</p>
        <Icon icon="material-symbols:upload" class="icon"/>
    </ReusablePrimaryButton>
</template>

<style lang="scss" scoped>
.button {
    display: flex;
    align-items: center;
    gap: .25rem;

    p {
        margin: 0;
        font-size: 1rem;
    }
    .icon {
        font-size: 1rem;
    }
}

</style>