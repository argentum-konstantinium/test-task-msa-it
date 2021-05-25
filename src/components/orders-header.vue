<template>
    <div class="orders__header">
        <h2 class="orders__headline">Мои заказы <span v-if='quantity > 0' class="orders__quantity" v-html="quantity"></span></h2> 
    </div>
</template>

<script>
export default {
    name: 'OrdersHeader',
    props: {
        quantity: {
            type: Number,
            default(){
                return 0;
            }
        }
    }
}
</script>

<style lang="sass">
.orders
    &__header
        margin-bottom: 11px
    &__headline
        @include fontCfg(22px, 1.1818em, bold, 0.01363em)
    &__quantity
        font-family: 'SF Pro Display'
        @include fontCfg(20px, 0.8em, normal)
        color: #929292
</style>