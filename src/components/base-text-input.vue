<template>
    <input class="input"  @input="$emit('input', $event)" :type="type" :name="name" :placeholder="placeholder">
</template>


<script>
export default {
    name: 'BaseTextInput',
    props: {
        name: String,
        type: {
            type: String, 
            default() {
                return 'text';
            }
        },
        required: {
            type: Boolean,
            default() {
                return false;
            }
        },
        placeholder: {
            type: String,
            default() {
                return 'Введите свой текст';
            }
        }
    }
}
</script>

<style lang="sass">
.input
    display: block
    @include fontCfg(1em, 120%)
    background: #FAFAFA
    border: 2px solid #1E6FB9
    border-radius: 6px
    padding: 0.862em 0.6111em
</style>