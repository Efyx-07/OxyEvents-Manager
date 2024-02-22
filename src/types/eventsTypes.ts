type HTMLstring = string;

export interface Event {
    id: number;
    title: string;
    date: Date;
    location: string;
    image: {
        source: string;
        alt: string;
    }
    presentation: HTMLstring;
    programme: HTMLstring;
    practicalInformations: HTMLstring;
    organizerName: string;
    organizerLogo: {
        source: string;
        alt: string;
    }
    organizerWebsite: string;
    creationDate: Date;
    slug: string;
    admin: {
        id: number;
        nom: string;
        prenom: string;
    }
}
