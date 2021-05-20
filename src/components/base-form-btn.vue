<template>
    <button @click="$emit('click', $event)" :type="type" class="form__button"><slot>Отправить</slot></button>
</template>

<script>
export default {
    name: 'BaseFormBtn',
    props: {
        type: {
            type: String,
            default() {
                return 'submit'
            }
        }
    }
}
</script>

<style lang="sass">
.form
    &__button
        width: 100%
        font-size: 1em
        border-radius: 6px
        background: #1E6FB9
        padding: 1.26em
        color: #fff
        line-height: 120%
        transition: background 0.2s ease-in
        &:hover
            background: #1053A9
</style>