<template>
    <div class="errors">
        <div
            v-for="(errorRoot, rootName) in errors"
            :key="rootName"
            :class="`errors ${rootName}-errors`"
        >
            <span
                v-for="(errorObj, errorName) in errorRoot.errors"
                :key="errorName"
                :class="[`errors__error ${rootName}-errors__${errorName}`, {'errors__error_active': errorObj.state}]"
                v-html="errorObj.message"
            ></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseFormErrorsMessages",
    props: {
        errors: Object,
    },
};
</script>

<style lang="sass">
.errors
    &__error
        color: red
        display: none
        &:not(:last-child)
            margin-bottom: 0.1em
        &_active
            display: block
</style>