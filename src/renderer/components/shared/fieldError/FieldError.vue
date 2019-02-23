<template>
    <p class="error" v-if="invalid"><slot></slot></p>
</template>

<script>
    export default {
        props: {
            invalid: Boolean
        }
    }
</script>

<style scoped>
    .error {
        color: #B03060;
        font-style: italic;
        font-size: 0.9em;
        padding-top: 5px;
    }
</style>