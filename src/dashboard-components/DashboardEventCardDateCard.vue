<script setup lang="ts">

const props = defineProps<{
    date: Date;
}>()

// reformate la date et sépare jour / mois / année
const formatDateDay = (date: string): string => {
    const dateObject = new Date(date);
    const day = dateObject.getDate().toString().padStart(2, '0');
    return day;
};
const formatDateMonth = (date: string): string => {
    const dateObject = new Date(date);
    const monthIndex = dateObject.getMonth();
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return monthNames[monthIndex];
};
const formatDateYear = (date: string): string => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear().toString();
    return year;
};

</script>

<template>
    <div class="dateCard">
        <p class="dateCard-day"> {{ formatDateDay(props.date.toString()) }} </p>
        <div class="monthYear_container">
            <p class="dateCard-month"> {{ formatDateMonth(props.date.toString()) }} </p>
            <p class="dateCard-year"> {{ formatDateYear(props.date.toString()) }} </p>
        </div> 
    </div>
</template>

<style scoped lang="scss">

@import '@/assets/sass/dashboard-styles/colors.scss';
@import '@/assets/sass/variables.scss';
.dateCard {
    background: rgba($whiteColor, .8);
    border-radius: 0 $containerRadiusM;
    display: flex;
    align-items: center;
    gap:.2rem;
    padding: .3rem;

    p {
        margin: 0;
    }
    .dateCard-day {
        font-size: 2rem;
    }
    .monthYear_container {
        display: flex;
        flex-direction: column;
        line-height: 1;
        .dateCard-month {
            font-size: .8rem;
        }
        .dateCard-year {
            font-size: .9rem;
        }
    }
} 

</style>