<template>
    <BaseFieldset class="login-fieldset">
        <BaseFieldsetHeadline class="login-fieldset__headline">
            Добро пожаловать!
        </BaseFieldsetHeadline>
        <BaseFieldsetBody class="login-fieldset__body">
            <BaseTextInput
                class="login-fieldset__text-input"
                type="text"
                name="login"
                placeholder="Логин"
            />
            <BaseTextInput
                class="login-fieldset__text-input"
                type="text"
                name="password"
                placeholder="Пароль"
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
    &__text-input
        width: 100%
        &::placeholder
            color: #000000
            opacity: 1
        &:not(:last-child)
            margin-bottom: 0.6666em
            
</style>