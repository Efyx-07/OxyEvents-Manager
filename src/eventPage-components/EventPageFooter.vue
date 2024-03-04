<script setup lang="ts">

//import ParticipateButton from '@/eventPage-subComponents/ParticipateButton.vue';
import ToTopButton from '@/eventPage-subComponents/ToTopButton.vue';

</script>

<template>
    <div class="footer">
        <div class="content">
            <div class="links_container">
                <p>Conditions d'utilisation</p>
                <p>Contact</p>
            </div>
            <ToTopButton />
        </div>
    </div>
    <!-- <div class="footer_mobile">
        <ParticipateButton class="footer_mobile-button"/>
        <div class="mobileToTopButton_container" @click="scrollToTop">
            <Icon icon="iconamoon:arrow-up-2-duotone" class="mobileToTopIcon"/>
        </div>
    </div>     -->
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';

.footer {
    width: 100%;
    height: 8rem;
    background: $whiteColor;
    border-radius: 50% 50% 0 0;
    display: flex;
    justify-content: center;

    .content {
        width: 100%;
        max-width: 77rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;

        .links_container {
            display: flex;
            gap: 3rem;

            p {
                margin: 0;
                font-size: .9rem;
                font-weight: 500;
            }
        }
    }
}

</style>