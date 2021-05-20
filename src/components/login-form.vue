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