<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { useGlobalDataStore } from '@/stores/GlobalDataStore';

const props = defineProps<{
    location: string;
}>()

// rend reactif le lien google maps
const embedUrl = ref<string>('');

// fetch l'URL du lieu via le backend pour mettre à jour la carte
onMounted( async(): Promise<void> => {

    try {
        const { hostName } = useGlobalDataStore();
        if (props.location) {
            const response: Response = await fetch(`${hostName}/maps?location=${encodeURIComponent(props.location)}`);
            if (response.ok) {
                  const data: any = await response.json();
                embedUrl.value = data.embedUrl;
            } else {
                console.error('Erreur lors de la récupération de l\'URL sécurisée de la carte.');
            }
        }           
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'URL sécurisée de la carte :', error);
    }
});

</script>
<template>
    <iframe 
        class="locationMap" 
        width="600"
        height="450"
        style="border:0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        :src="embedUrl">
    </iframe>
</template>