<script setup lang="ts">

interface NavItem {
    name: string;
    clickAction: Function;
}

const navItems: NavItem[] = [

    {
        name: 'Présentation',
        clickAction:() => scrollToSection('presentation'),
    },

    {
        name: 'Programme',
        clickAction:() => scrollToSection('programme'),
    },

    {
        name: 'Informations-pratiques',
        clickAction:() => scrollToSection('practicalInformations'),
    },
];

// fonction pour lier item à la section ancrée
const scrollToSection = (sectionId: string): void => {
    const section: HTMLElement | null = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
        });
    }
};

</script>

<template>  
    <div class="navigation">
        <div class="navItem_container" v-for="navItem in navItems" :key="navItem.name" @click="navItem.clickAction">
            <p>{{ navItem.name }}</p>
            <div class="activeBar"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';

.navigation {
    width: 100%;
    display: flex;
    gap: 3rem;
    justify-content: end;

    .navItem_container {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        color: $blackColor;
        cursor: pointer;

        p {
            margin: 0;
        }

        .activeBar {
            height: 1px;
            width: 100%;
            background-color: $accentColorPrimary;
            clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
            transition: clip-path .2s ease-in-out;
        }

        &:hover {
            color: $accentColorPrimary;
        }

        &:hover>.activeBar {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
    }        
}

</style>