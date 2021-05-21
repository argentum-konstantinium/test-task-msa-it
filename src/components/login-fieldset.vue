<template>
    <BaseFieldset  class="login-fieldset">
        <BaseFieldsetHeadline class="login-fieldset__headline">
            Добро пожаловать!
        </BaseFieldsetHeadline>
        <div class="login-fieldset__errors-messages">
            <div class="errors login-fieldset__login-errors">
            </div>
            <div class="errors login-fieldset__password-errors">

            </div>
        </div>
        <BaseFieldsetBody class="login-fieldset__body">
            <BaseTextInput
                class="login-fieldset__text-input"
                type="text"
                name="login"
                placeholder="Логин"
                @input="sendInputEvent"
                :class="loginError"
            />
            <BaseTextInput
                class="login-fieldset__text-input"
                type="text"
                name="password"
                placeholder="Пароль"
                @input="sendInputEvent"
                :class="passwordError"
            />
        </BaseFieldsetBody>
    </BaseFieldset>
</template>

<script>
import BaseFieldset from "./base-fieldset.vue";
import BaseFieldsetHeadline from "./base-fieldset-headline.vue";
import BaseFieldsetBody from "./base-fieldset-body.vue";
import BaseTextInput from "./base-text-input.vue";
export default {
    name: "LoginFieldset",
    components: {
        BaseFieldset,
        BaseTextInput,
        BaseFieldsetHeadline,
        BaseFieldsetBody,
    },
    props: {
        errors: Object
    },
    methods: {
        sendInputEvent(event) {
            this.$emit('input', {
                target: event.target.name,
                value: event.target.value
            })
        },
    },
    computed: {
        loginError() {
            return {
                "login-fieldset__input_error": this.errors.login.errorsState,
            };
        },
        passwordError() {
            return {
                "login-fieldset__input_error": this.errors.password.errorsState,
            };
        },
    },
};
</script>

<style lang="sass">
.login-fieldset
    &__headline
        font-weight: bold
        font-size: 25px
        margin-bottom: 1.8em
        text-align: center
        letter-spacing: 0.012em
        line-height: 1.16em
        display: block
        width: 100%
    &__text-input
        width: 100%
        &::placeholder
            color: #000000
            opacity: 1
        &:not(:last-child)
            margin-bottom: 0.6666em
</style>