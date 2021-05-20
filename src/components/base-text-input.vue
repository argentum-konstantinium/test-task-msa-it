<template>
    <input :type="type" :name="name" :placeholder="placeholder">
</template>


<script>
export default {
    name: 'BaseTextInput',
    props: {
        name: String,
        type: {
            type: String, 
            default() {
                return 'text'
            }
        },
        placeholder: {
            type: String,
            default() {
                return 'Введите свой текст'
            }
        }
    }
}
</script>