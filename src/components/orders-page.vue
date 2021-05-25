<template>
    <div class="wrapper orders-page-wrapper">
        <div class="orders">
            <OrdersHeader :quantity="ordersQuantity" />
            <OrdersList :orders="orders" />
        </div>
    </div>
</template>

<script>
import OrdersHeader from "./orders-header.vue";
import OrdersList from "./orders-list.vue";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "OrdersPage",
    data() {
        return {
            ordersQuantity: 0,
        };
    },
    components: {
        OrdersHeader,
        OrdersList,
    },
    computed: {
        ...mapGetters(["orders"]),
    },
    methods: {},
    created() {},
};
</script>

<style lang="sass">
@media(min-width: 600px)
    .orders
        background: #fff
        padding: 15px
        border-radius: 10px
        box-shadow: 0 0 15px rgba(0,0,0, 0.5)
@media(min-width: 1280px)
    .orders-page-wrapper
        max-width: 1280px
</style>