<template>
    <div class="order-header">
        <div class="order-header__info">
            <span class="order-header__time">
                <b v-html="status"></b>
            </span>
            <div class="order-header__params">
                <span class="order-header__name">
                    <b v-html="orderData.packageName"></b>
                </span>
                <span class="order-header__calories">
                    <b v-html="orderData.packageCalories"></b>
                </span>
            </div>
        </div>
        <div class="progress-bar order__progress-bar">
            <div class="progress-bar__line-container">
                <div
                    :style="{ width: deliveryProgress + '%' }"
                    class="progress-bar__progress-line"
                ></div>
            </div>
            <div class="delivery-info progress-bar__delivery-info">
                <span
                    class="delivery-info__order-date"
                    v-html="orderDay"
                ></span>
                <span
                    class="delivery-info__remainder"
                    v-if="deliveryProgress < 100"
                    v-html="reminder"
                ></span>
                <span
                    class="delivery-info__delivery-date"
                    v-html="orderDeliveryDay"
                >
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderHeader",
    props: {
        orderData: {
            type: Object,
           
        },
    },
    computed: {
        status() {
            const now = new Date();
            const orderDelivery = this.getOrderDeliveryDate();
            if (now >= orderDelivery) {
                return "Выполнен";
            } 
            if (this.orderData.canceled) {
                return 'Отменён';
            }
            if (now < orderDelivery) {
                const msInDay = 1000 * 60 * 60 * 24;
                const difference = Math.round(
                    (now - new Date(this.orderData.orderDate)) / msInDay
                );

                return (
                    `${difference} ` +
                    this.calculateWord(difference, ["день", "дня", "дней"])
                );
            }
        },
        reminder() {
            const msInDay = 1000 * 60 * 60 * 24;
            const now = new Date();
            const orderDelivery = this.getOrderDeliveryDate();
            if (this.orderData.canceled) {
                return 'Отменён';
            }
            if (now < orderDelivery) {
                const difference = Math.round(
                    (orderDelivery.valueOf() - now.valueOf()) / msInDay
                );
                let dayWord = this.calculateWord(difference, [
                    "день",
                    "дня",
                    "дней",
                ]);
                let leftWord = this.calculateWord(difference, [
                    "Остался",
                    "Осталось",
                    "Осталось",
                ]);
                return `${leftWord} ${difference}  ${dayWord}`;
            }
        },
        deliveryProgress() {
            const deliveries = this.orderData.deliveries;
            const deliveriesLength = deliveries.length;
            let deliveryCount = 0;
            const now = new Date();
            deliveries.forEach((delivery) => {
                if (now >= new Date(delivery.date)) {
                    deliveryCount += 1;
                }
            });
            return 100 * (deliveryCount / deliveriesLength);
        },
        orderDay() {
            const orderDate = new Date(this.orderData.orderDate);
            const day = orderDate.getDate();
            const month = orderDate.getMonth();
            const date = `${day} ${this.getMonth(month)}`;
            return date;
        },
        orderDeliveryDay() {
            const orderDeliveryDate = this.getOrderDeliveryDate();
            const day = orderDeliveryDate.getDate();
            const month = orderDeliveryDate.getMonth();
            return `${day} ${this.getMonth(month)}`;
        },
    },
    methods: {
        calculateWord(value, words) {
            value = Math.abs(value) % 100;
            var num = value % 10;

            if (value > 10 && value < 20) {
                return words[2];
            }
            if (num > 1 && num < 5) {
                return words[1];
            }
            if (num == 1) {
                return words[0];
            }
            return words[2];
        },
        getOrderDeliveryDate() {
            let deliveries = this.orderData.deliveries;
            let orderDelivery = new Date(
                deliveries[deliveries.length - 1].date
            );
            return orderDelivery;
        },
        getMonth(day) {
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
            return monthArray[day];
        },
    },
};
</script>

<style lang="sass">
.order-header
    &__info
        display: flex
        @include dFlex(space-between, center)
        margin-bottom: 20px
    &__name, &__calories
        display: block
    &__name
        @include fontCfg(10px, 1.6em)
        color: #B1B1B1
    &__calories
        @include fontCfg(14px, 1.1428em)
    &__time
        @include fontCfg(35px, 1em)
.progress-bar
    &__line-container
        min-height: 5.54px
        background: #E9E9E9
        border-radius: 4px
        position: relative
    &__progress-line
        height: 100%
        background: #1E6FB9
        border-radius: 4px
        position: absolute
        &::after
            position: absolute
            content: ''
            border-radius: 50%
            width: 5.78px
            height: 5.78px
            right: 0
            background: #fff
            transform: translateX(50%)
    &__delivery-info
        margin-top: 0.6363em

.delivery-info
    @include fontCfg(11px, 1.1em, 500)
    color: #9E9E9E
    @include dFlex(space-between, center)
    &__remainder
        color: #000
@media (min-width: 768px)
    .order-header
        &__name
            font-size: 12px
        &__calories
            font-size: 16px
    .delivery-info
        font-size: 14px
    .progress-bar
        &__line-container
            min-height: 8px
        &__progress-line
            &::after
                height: 8px
                width: 8px
</style>