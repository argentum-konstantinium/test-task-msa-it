<template>
    <OrderPage :id='id'  />
</template>

<script>
import OrderPage from "../components/order-page.vue";
export default {
    name: "Order",
    props: {
        id: {
            type: String,
            required: true
        },
       
    },
    components: {
        OrderPage,
    },
};
</script>