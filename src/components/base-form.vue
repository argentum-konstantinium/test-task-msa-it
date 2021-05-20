<template>
    <form @submit.prevent="$emit('submit', $event)" class="form" action="">
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'BaseForm'
}
</script>