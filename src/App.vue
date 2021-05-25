<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
        ...mapActions(["authorizeFromCookie", "getOrders"]),

     
    },
    computed: {
        ...mapGetters(["authStatus", "orders"]),
    },
    watch: {
        authStatus: {
            handler(newVal) {
                if (newVal) {
                    this.getOrders();
                    this.$router.push('/orders');
                    
                }
            }
        }
    },
     
    created() {
        this.authorizeFromCookie();

        if (this.authStatus) {
            this.getOrders();
            
        }
    },
};
</script>
 
<style lang="sass">
#app
    width: 100%
</style>