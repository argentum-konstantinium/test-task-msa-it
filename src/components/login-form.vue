<template>
    <BaseForm @submit='submit' class="login-form">
        <LoginFieldset />
        <BaseFormBtn class="login-form__btn" type="submit">Войти</BaseFormBtn>
    </BaseForm>
</template>

<script>
import BaseForm from "./base-form.vue";
import LoginFieldset from "./login-fieldset.vue";
import BaseFormBtn from "./base-form-btn.vue";
export default {
    name: "LoginForm",
    components: {
        BaseForm,
        LoginFieldset,
        BaseFormBtn,
    },
    methods: {
        submit(event) {
            alert('ok')
        }
    }
};
</script>

<style lang="sass">
.login-form
    font-size: 18px
    &__btn
        margin-top: 2.8333em
        text-transform: uppercase
        font-weight: bold
        text-align: center  
</style>