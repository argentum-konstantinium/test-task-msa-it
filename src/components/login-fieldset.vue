<template>
    <BaseFieldset class="login-fieldset">
        <BaseFieldsetHeadline class="login-fieldset__headline">
            Добро пожаловать!
        </BaseFieldsetHeadline>
        <BaseFormErrorsMessages
            class="login-fieldset__errors-msgs"
            :errors="errors"
        />
        <BaseFieldsetBody class="login-fieldset__body">
            <div :class="loginError" class="login-fieldset__input-container">
                <BaseTextInput
                    class="login-fieldset__text-input"
                    type="text"
                    name="login"
                    placeholder="Логин"
                    @input="sendInputEvent"
                />
            </div>
            <div :class="passwordError" class="login-fieldset__input-container">
                <BaseTextInput
                    class="login-fieldset__text-input"
                    type="text"
                    name="password"
                    placeholder="Пароль"
                    @input="sendInputEvent"
                />
            </div>
        </BaseFieldsetBody>
    </BaseFieldset>
</template>

<script>
import BaseFieldset from "./base-fieldset.vue";
import BaseFieldsetHeadline from "./base-fieldset-headline.vue";
import BaseFieldsetBody from "./base-fieldset-body.vue";
import BaseTextInput from "./base-text-input.vue";
import BaseFormErrorsMessages from "./base-form-errors-messages";
export default {
    name: "LoginFieldset",
    components: {
        BaseFieldset,
        BaseTextInput,
        BaseFieldsetHeadline,
        BaseFieldsetBody,
        BaseFormErrorsMessages,
    },
    props: {
        errors: Object,
    },
    methods: {
        sendInputEvent(event) {
            this.$emit("input", {
                target: event.target.name,
                value: event.target.value,
            });
        },
    },
    computed: {
        loginError() {
            return {
                "login-fieldset__input-container_error": this.errors.login
                    .errorsState,
                "login-fieldset__input-container_noerror":
                    this.errors.login.errorsState === false,
            };
        },
        passwordError() {
            return {
                "login-fieldset__input-container_error": this.errors.password
                    .errorsState,
                "login-fieldset__input-container_noerror":
                    this.errors.password.errorsState === false,
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
    &__errors-msgs
        font-size: 15px
        margin-bottom: 1em
    &__input-container
        position: relative
        &::after
            background: red
            content: 'x'
            box-shadow: 0 0 5px red
        &::before
            box-shadow: 0 0 5px #00cc99
            content: '✓'
            background: #00cc99
        &::after, &::before
            border-radius: 50%
            color: #fff
            width: 1.5em
            height: 1.5em
            position: absolute
            top: 50%
            transform: translateY(-50%)
            right: 20px
            display: flex
            justify-content: center
            align-items: center
            font-size: 14px
            opacity: 0
            transition: opacity 0.3s ease-in
            pointer-events: none

        &:not(:last-child)
            margin-bottom: 0.6666em
        &_error
            input
                border: 2px solid red
                box-shadow: 0 0 5px red
            &::after
                opacity: 1
        &_noerror
            &::before
                opacity: 1

    &__text-input
        width: 100%
        transition: box-shadow 0.2s ease-in, border-radius 0.3s linear
        &::placeholder
            color: #000000
            opacity: 1
</style>