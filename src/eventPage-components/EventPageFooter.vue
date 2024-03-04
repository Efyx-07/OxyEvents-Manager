<script setup lang="ts">

import ParticipateButton from '@/eventPage-subComponents/ParticipateButton.vue';
import { Icon } from '@iconify/vue';

// permet le retour vers le haut de page
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

</script>

<template>
    <div class="footer">
        <div class="content">
            <div class="links_container">
                <p>Conditions d'utilisation</p>
                <p>Contact</p>
            </div>
            <div class="toTopButton_container" @click="scrollToTop">
                <Icon icon="iconamoon:arrow-up-2-duotone" class="toTopIcon"/>
            </div>
        </div>
    </div>
    <div class="footer_mobile">
        <ParticipateButton class="footer_mobile-button"/>
        <div class="mobileToTopButton_container" @click="scrollToTop">
            <Icon icon="iconamoon:arrow-up-2-duotone" class="mobileToTopIcon"/>
        </div>
    </div>    
</template>