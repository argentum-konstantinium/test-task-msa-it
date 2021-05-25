<template>
    <div  class="order-list">
            <Order v-for="order in orders" :key="order.packageName" :orderData="order"/>
         
    </div>
</template>

<script>
import Order from './order.vue'
export default {
    name: "OrdersList",
    props: {
        orders: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        Order,
    }
}
</script>

<style lang="sass">
@media(min-width: 0px)
    .order-list
        display: grid
        grid-row-gap: 15px
        max-height: 510px
        overflow-y: auto
        overflow-x: hidden
         
@media(min-width: 768px)
    .order-list
        display: grid
        grid-template-columns: repeat(2, 49%)
        justify-content: space-between
</style>