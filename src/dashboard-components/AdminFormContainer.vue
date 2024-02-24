<script setup lang="ts">

import ReusableSeparator from '@/sub-components/ReusableSeparator.vue'; 

interface AdminFormContainerProps {
    title: string;
}

const props = defineProps<AdminFormContainerProps>()

</script>

<template>
    <div class="adminFormContainer-wrapper">
        <div class="adminFormContainer">
            <div class="title-container">
                <p>{{ props.title }}</p>
                <ReusableSeparator />
            </div>
            <div class="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/breakPoints.scss';
@import '@/assets/sass/variables.scss';
.adminFormContainer-wrapper {
    width: 100%;
    padding: 1rem 1rem 3rem 1rem;
    .adminFormContainer {
        background: $whiteColor;
        box-shadow: $containerShadow;
        border-radiuS: $containerRadius;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
        .title-container {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: .5rem;

            p {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 700;
            }
        }
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;
        }
    }
}

@media screen and (min-width: $breakpointDesktop) {
    .adminFormContainer-wrapper {
        padding: 2rem 3rem;
        .adminFormContainer {
            .title-container {
                flex-wrap: unset;
                gap: 1rem;

                p {
                    white-space: nowrap;
                }
            }
        }
    }
}

</style>