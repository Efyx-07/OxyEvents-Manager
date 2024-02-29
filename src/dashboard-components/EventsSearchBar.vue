<script setup lang="ts">

import { Icon } from '@iconify/vue';
import { useEventStore } from '@/stores/EventStore';
import { ref, onMounted } from 'vue';

const eventStore = useEventStore();
const keyword = ref<string>('');

// statut par défaut de la visibilité de la searchbar
const isEventsSearchBarVisible = ref<boolean>(false);

// permet la fermeture de la searchbar et réinitialise la valeur du champ de recherche
const closeEventsSearchBar = (): void => {
    isEventsSearchBarVisible.value = false;
    keyword.value = '';
    eventStore.updateSearchedKeyword(keyword.value);
}

// ecoute l'événement personnalisé (créé sur 'SearchIcon') pour réafficher la fenetre
onMounted(() => {
    window.addEventListener('show-eventsSearchBar', () => {
        isEventsSearchBarVisible.value = true;
    });
});

// déclare currentFilter comme réactif avec valeur 'all' par défaut
const currentFilter =ref<string>(''); 

const displayEventsMatchingKeyword = (): void => {

    // met à jour le mot-clé dans le store
    eventStore.updateSearchedKeyword(keyword.value);

    // met à jour les évènements correspondant au mot-clé dans le store
    eventStore.updateFilteredEvents();

    // emet un évènement personnalisé
    currentFilter.value = 'keyword';
    window.dispatchEvent(new CustomEvent('filterChanged', { detail: 'keyword' }));

    // emet un évènement pour réintialiser les classes active de EventsNav
    window.dispatchEvent(new CustomEvent('resetActiveTabs'));

    // ferme la fenêtre
    closeEventsSearchBar();
};

// gestionnaire d'événement pour la touche "Entrée"
const handleEnterKey = (): void => {
    if(keyword.value !== '') {
        // adopte le même comportement que "searchIcon"
        displayEventsMatchingKeyword(); 
    } else {
        closeEventsSearchBar();
    }        
};
   
</script>

<template>
    <div class="searchBar_container" :class="{ hiddenEventsSearchBar: !isEventsSearchBarVisible }">
        <div class="searchBar_content">
            <input 
                type="search" 
                id="searchEventByKeyword" 
                name="searchEventByKeyword" 
                class="searchBar" 
                placeholder="Rechercher par mot-clé" 
                v-model="keyword"
                @keydown.enter.prevent="handleEnterKey"
            >
            <div class="searchIcon_container icon_container" @click="displayEventsMatchingKeyword" v-if="keyword !== ''">
                <Icon icon="ic:sharp-search" class="icon"/>
            </div>
            <div class="closeIcon_container icon_container" @click="closeEventsSearchBar" v-else>
                <Icon icon="ei:close" class="icon" />
            </div>
        </div>
        <div class="closing-overlay" @click="closeEventsSearchBar"></div>
    </div>      
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/variables.scss';

.hiddenEventsSearchBar {
    transform: translateY(-100%);
}
.searchBar_container {
    width: 100%;
    height: 6.8rem;
    background: $darkColor;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .2s ease-in-out;
    position: relative;
    .searchBar_content {
        width: 25rem;
        height: 2.5rem;
        margin: 0 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .2rem;
        .searchBar {
            width: 100%;
            height: 100%;
            background: $whiteColor;
            border-radius: $containerRadius 0 0 0;
            border: solid 2px $whiteColor;
            outline: none;
            padding-left: 1rem;
            font-size: 1rem;
            display: flex;
            align-items: center;

            &:focus {
                border: solid 2px $accentColorPrimary;
            }
        }
        .icon_container {
            width: 3.5rem;
            height: 100%;
            border-radius: 0 0 $containerRadius 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .icon {
                color: $whiteColor;
                font-size: 1.5rem;
            }
        }
        .searchIcon_container {     
            background: $accentColorPrimary;

            &:hover {
                background: $accentColorPrimaryLighted;
            }
        }
        .closeIcon_container {     
            background: $accentColorSecondary;

            &:hover {
                background: $accentColorSecondaryLighted;
            }
        }
    }
    .closing-overlay {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
}

@media screen and (min-width: $breakpointDesktop) {
    .searchBar_container {
        height: 4.5rem;
        .searchBar_content {
            width: 25rem;
            height: 2.2rem;
            .searchBar {
                font-size: 1rem;
            }
        }
    }
}
    
</style>