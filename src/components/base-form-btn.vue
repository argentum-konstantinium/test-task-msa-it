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