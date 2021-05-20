<template>
    <BaseFieldset class="login-fieldset">
        <BaseFieldsetHeadline class="login-fieldset__headline">
            Добро Пожаловать!
        </BaseFieldsetHeadline>
        <BaseFieldsetBody class="login-fieldset__body">
            <BaseTextInput type="text" name="login" placeholder="Логин" />
            <BaseTextInput type="text" name="password" placeholder="Пароль" />
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
        BaseFieldsetBody
    },
};
</script>