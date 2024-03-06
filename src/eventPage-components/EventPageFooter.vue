<script setup lang="ts">

import ParticipateButton from '@/eventPage-subComponents/ParticipateButton.vue';
import ToTopButton from '@/eventPage-subComponents/ToTopButton.vue';

</script>

<template>
    <div class="footer">
        <div class="content">
            <div class="links_container">
                <p>Conditions d'utilisation</p>
                <p>Contact</p>
            </div>
            <ParticipateButton class="participateButton"/>
            <div class="toTopButton-container">
                <ToTopButton />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/eventPage-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';

.footer {
    width: 100%;
    height: 5rem;
    background: $whiteColor;
    border-top: solid 1px $blackTransparencyLight;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

    .content {
        width: 100%;
        max-width: 77rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0 1rem;

        .links_container {
            display: none;
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {

    .footer {
        height: 8rem;

        .content {
            gap: unset;
            padding: 0 2rem;

            .links_container {
                display: flex;
                gap: 2rem;

                p {
                    margin: 0;
                    font-size: .9rem;
                    font-weight: 500;
                }
            }

            .participateButton {
                display: none;
            }
        }
    }
}

</style>