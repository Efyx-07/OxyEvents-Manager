import { defineStore } from 'pinia';
import * as api from '@/services/eventsApi'; // importe les fonctions de l'api du fichier eventsApi.ts
import type { Event } from '@/types/eventsTypes';

type State = {
    events: Event[];
    upcomingEvents: Event[];
    pastEvents: Event[];
    keyword: string;
    filteredByKeywordEvents: Event[];
}

export const useEventStore = defineStore('events', {

    state: (): State => ({
        events: [], // initialise events comme un tableau vide
        upcomingEvents: [], // initialise les évènements 'à venir' comme un tableau vide
        pastEvents: [], // initialise les évènements 'passés' comme un tableau vide
        keyword: '', // initialise keyword (mot-clé de searchBar) comme chaine vide
        filteredByKeywordEvents: [], // initialise les évènements filtrés par mot-clé comme un tableau vide
    }),

    actions: {

        // récupère les données de tous les évènements à partir de eventsApi.ts
        async loadEventsData(): Promise<void> {

            try {
                const eventsData: Event[] = await api.fetchEventsData();
                this.events = eventsData;
                this.sortEventByCreationDateNewToOld();
                this.updateFilteredEvents();
            } catch (error) {
                console.error('Erreur lors du chargement des données des évènements: ', error);
            }
        },

        // trie les évènements par date de création (du plus récent au plus ancien)
        sortEventByCreationDateNewToOld(): void {
            this.events.sort((a: Event, b: Event) => {
                const dateA = new Date(a.creationDate);
                const dateB = new Date(b.creationDate);
                return dateB.getTime() - dateA.getTime();
            });
        },

        // met à jour keyword
        updateSearchedKeyword(newKeyword: string): void {
            this.keyword = newKeyword;
        },

        // méthode permettant de filtrer les évènements selon date "à venir / passés"
        updateFilteredEvents(): void {
            const currentDate: Date = new Date();
            this.upcomingEvents = this.events.filter(event => new Date(event.date) > currentDate);
            this.pastEvents = this.events.filter(event => new Date(event.date) <= currentDate);
            this.filteredByKeywordEvents = this.events.filter(event => event.title.toLowerCase().includes(this.keyword.toLowerCase()));
        },
    }
})