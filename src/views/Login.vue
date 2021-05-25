<template>
    <LoginPage/>
</template>

<script>
import LoginPage from '../components/login-page.vue';
import { mapGetters } from 'vuex';
export default {
    name: "Login",
    components: {
        LoginPage
    },
    computed: {
        ...mapGetters(['authStatus']),
    },
    
}
</script>