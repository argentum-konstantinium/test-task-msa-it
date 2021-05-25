<template>
    <div class="order">
        <router-link title="Подробнее о заказе" class="order__link" :to="'./' + orderData.id" append></router-link>
        <OrderHeader :order-data="orderData" />
        <div v-if="new Date() < getOrderDeliveryDate() && !orderData.canceled" class="order-body">
            <div class="order-body__nearest-date">
                <span class="order-body__nearest-month" v-html="nearestMonth"></span>
                <span class="order-body__nearest-day" >
                    <b v-html="nearestDay"></b>
                </span>
            </div>
            <div class="order-body__delivery-info">
                <p class="order-body__week-day">Ближайшая доставка <br/> <span class="order-body__week-day_blue-text" v-html="nearestWeekDay"></span></p>
                <p class="order-body__time" v-html="interval"></p>
                <p class="order-body__address" v-html="nearestDelivery.address"></p>
            </div>
            
        </div>
    </div>
</template>

<script>
import OrderHeader from "./order-header.vue";
export default {
    name: "Order",
    props: {
        orderData: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    components: {
        OrderHeader,
    },
    computed: {
        interval() {
            const nearestDelivery = this.nearestDelivery;
            let interval =  nearestDelivery.interval;
            interval = 'c ' + interval.replace('-', ' до ');
            return interval;
        },
        nearestWeekDay() {
            if (this.nearestDate === undefined) return;
            const nearestDate = this.nearestDate.getDay();
            const weekDay = this.getDay(nearestDate);
      
            switch (weekDay) {
                case 'вторник':
                    return 'во вторник –';
                case 'среда':
                    return 'в среду –';
                case 'пятница':
                    
                    return 'в пятницу –';
                case 'суббота': 
                    return 'в субботу –';
                default:
                    return 'в ' + weekDay + ' –';
            }
        },
        nearestMonth() {
            if (this.nearestDate) {
                return this.getMonth(this.nearestDate.getMonth());
            }
        },
        nearestDay() {
            if (this.nearestDate) {
                return this.nearestDate.getDate();
            }
        }
    },
    methods: {
        getMonth(day) {
            const monthArray = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
            return monthArray[day];
        },
        getDay(day) {
            const daysArr = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
            return daysArr[day];
        },
        getOrderDeliveryDate() {
            let deliveries = this.orderData.deliveries;
            let orderDelivery = new Date(
                deliveries[deliveries.length - 1].date
            );
            return orderDelivery;
        },
        setNearestDelivery() {
            const deliveries = this.orderData.deliveries;
            const now = new Date(new Date().toISOString().slice(0, 10));
            let minDate = 0;
            let minDelivery = null;
            deliveries.forEach((delivery) => {
                 
                const deliveryDate = new Date(delivery.date);
        
                if (deliveryDate.valueOf() !== now.valueOf()) {
                    if (deliveryDate.valueOf() > now.valueOf()) {
                        minDate = deliveryDate;
                        minDelivery = delivery;

                    }
                    if ((deliveryDate.valueOf() < minDate.valueOf()) ) {
                        minDate = deliveryDate;
                        minDelivery = delivery;
                    }
                }
            });
            this.nearestDate = minDate;
            this.nearestDelivery = minDelivery;
        }
    },
    created() {
        this.setNearestDelivery();
    },
    mounted() {
        
    },
};
</script>

<style lang="sass">
.order
    padding: 25px 17px
    background: #F5F5F5
    border-radius: 6px
    user-select: none
    position: relative
    transition: background 0.2s ease-in
    &__link
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index: 10
        &[data-focus-visible]
            box-shadow: inset 0 0 10px black
    &:hover
        background: #E5E5E5
.order-body
    margin-top: 23px
    @include dFlex(flex-start, center)
    &__nearest-date
        margin-right: 23px        
        background: #1E6FB9
        border-radius: 4px
        color: #fff
        padding: 0 13px
        @include dFlex(center, center)
        flex-direction: column
        min-height: 100px
    &__nearest-day, &__nearest-month
        display: block
        text-align: center
    &__nearest-month
        @include fontCfg(11px, 1.3634em, 500)
    &__nearest-day
        margin-top: 0.1em
        @include fontCfg(20px, 0.75em, bold)
    &__week-day
        color: #242424
        @include fontCfg(17px, 1.2em, bold)
        margin-bottom: 0.5em
        &_blue-text
            color: #1E6FB9
    &__time
        @include fontCfg(12px, 1em, 500)
        color: #313131
        margin-bottom: 0.25em
    &__address
        color: #949494
        @include fontCfg(12px, 1.08333em)
@media(min-width: 990px)
    .order-body
        &__nearest-month
            font-size: 14px
        &__day
            font-size: 22px
        &__week-day
            font-size: 20px
        &__time
            font-size: 15px
        &__address
            font-size: 14px
</style>