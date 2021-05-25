<template>
    <div class="wrapper order-page-wrapper">
        <div v-if="orderData" class="order-page">
            <div class="order-page__wrapper">
                <router-link class="order-page__back" to="/orders/">
                    Назад
                </router-link>
                <OrderHeader :order-data="orderData" />
            </div>
            <Deliveries
                :order-data="orderData"
                v-if="orderData"
                class="order-page__deliveries"
            >
            </Deliveries>
        </div>
        <div v-else>Загрузка...</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrderHeader from "./order-header.vue";
import Deliveries from "./deliveries.vue";

export default {
    name: "OrderPage",
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        OrderHeader,
        Deliveries,
    },
    computed: {
        ...mapGetters(["orders"]),
        orderData() {
            let searchedOrder = null;
            this.orders.forEach((order) => {
                if (Number(this.id) === order.id) {
                    searchedOrder = order;
                }
            });

            return searchedOrder;
        },
    },
    methods: {},
    mounted() {
    },
};
</script>

<style lang="sass">
.order-page
    &__back
        @include fontCfg(17px, 1.294em)
        margin-bottom: 1.294em
        color: #1e6fb9
        display: block
        width: fit-content
@media(min-width: 600px)
    .order-page
        background: #fff
        border-radius: 10px
        padding: 15px 0
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5)
        &__wrapper
            padding: 0 15px
@media(min-width: 768px)
    .order-page-wrapper
        max-width: 768px
</style>