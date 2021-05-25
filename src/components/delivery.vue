<template>
    <div class="delivery">
        <a title="Подробнее о доставке" href="#" class="delivery__link"></a>
        <div class="delivery__wrapper">
            <div class="delivery__icon-wrapp">
                <svg
                    class="delivery__icon-img"
                    role="img"
                    width="31"
                    height="42"
                    viewBox="0 0 31 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>Доставка</title>
                    <path
                        d="M30.0842 38.0909L27.9673 14.1073C27.8083 12.3007 26.3198 10.9373 24.5054 10.9373C24.0885 10.9373 23.7493 11.2762 23.7493 11.6933V15.4325C23.7493 15.8026 23.4695 16.1259 23.1002 16.1494C22.6953 16.1754 22.359 15.8548 22.359 15.4559V7.37446C22.359 3.39717 19.1238 0.161987 15.1465 0.161987C11.1692 0.161987 7.93405 3.39717 7.93405 7.37446V10.9373H5.78769C3.97327 10.9373 2.48472 12.3007 2.3257 14.1073L0.208883 38.0909C0.0307437 40.1178 1.62904 41.8727 3.67174 41.8727H26.6213C28.6643 41.8727 30.2623 40.1175 30.0842 38.0909ZM20.9686 10.9373H11.4708C11.0537 10.9373 10.7148 11.2762 10.7148 11.6933V15.4325C10.7148 15.8026 10.435 16.1259 10.0656 16.1494C9.6607 16.1754 9.3244 15.8548 9.3244 15.4559V7.37446C9.3244 4.16448 11.9365 1.55234 15.1465 1.55234C18.3565 1.55234 20.9686 4.16448 20.9686 7.37446V10.9373Z"
                        fill="#1E6FB9"
                    />
                    <path
                        d="M8.27441 27.7754H22.6334"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M7.92712 34.4027H22.2862"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
            </div>
            <span
                class="delivery__info delivery__info_date"
                v-html="`${deliveryDay} ${deliveryMonth}, ${deliveryWeekDay}`"
            ></span>
            <span
                class="delivery__info delivery__info_time"
                v-html="deliveryData.interval"
            ></span>
            
                <svg
                    width="9"
                    height="16"
                    viewBox="0 0 9 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                >
                    <title>Подробнее о заказе</title>
                    <path
                        d="M1.27979 15.4775C1.60352 15.4775 1.86084 15.3613 2.08496 15.1455L8.45166 8.92822C8.73389 8.646 8.8667 8.35547 8.875 7.99854C8.875 7.6416 8.74219 7.34277 8.45166 7.06885L2.08496 0.843262C1.86084 0.627441 1.59521 0.51123 1.27979 0.51123C0.632324 0.51123 0.117676 1.02588 0.117676 1.66504C0.117676 1.98047 0.250488 2.2793 0.48291 2.51172L6.12744 7.99854L0.48291 13.4771C0.250488 13.7095 0.117676 14.0083 0.117676 14.3237C0.117676 14.9629 0.632324 15.4775 1.27979 15.4775Z"
                        fill="#D7D7D7"
                    />
                </svg>
            
        </div>
    </div>
</template>

<script>
export default {
    name: "Delivery",
    props: {
        deliveryData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    computed: {
        deliveryDate() {
            const dateStr = this.deliveryData.date;
            const date = new Date(dateStr);
            return date;
        },
        deliveryDay() {
            return this.deliveryDate.getDate();
        },
        deliveryWeekDay() {
            const deliveryDay = this.deliveryDate.getDay();
            return this.getWeekDay(deliveryDay);
        },
        deliveryMonth() {
            const deliveryMonth = this.deliveryDate.getMonth();
            return this.getMonth(deliveryMonth);
        },
    },
    methods: {
        getWeekDay(day) {
            const days = [
                "воскресенье",
                "понедельник",
                "вторник",
                "среда",
                "четверг",
                "пятница",
                "суббота",
            ];
            return days[day];
        },
        getMonth(month) {
            const monthArray = [
                "янв",
                "фев",
                "мар",
                "апр",
                "мая",
                "июн",
                "июл",
                "авг",
                "сен",
                "окт",
                "ноя",
                "дек",
            ];
            return monthArray[month];
        },
    },
};
</script>

<style lang="sass">
.delivery
    padding: 8px 0 20px
    position: relative
    &:hover
        background: #F5F5F5
    &__link
        position: absolute
        width: 100%
        height: 100%
    &__wrapper
        
        @include dFlex(space-between, center)
    
    &:not(:last-child)
        &::before
            position: absolute
            content: ''
            height: 1px
            background: #F5F5F5
            width: 100%
            bottom: 0
            left: 0
    &__icon-img
        @include fluidImg
    &__info
        @include fontCfg(14px, 1.4em)
        color: #000
        &_date
            margin-right: auto
            margin-left: 1em
        &_time
            margin-right: 2.57em
@media(min-width: 600px)
    .delivery
        &__wrapper
            padding: 0 15px
@media(min-width: 768px)
    .delivery
        &__info
            font-size: 16px

</style>